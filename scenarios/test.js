import("https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js").then(
  litModule => {
    const { LitElement, html, css } = litModule;

    const HASH_LINKAGE_1 = "#/linkage/1";
    const HASH_LINKAGE_2 = "#/linkage/2";

    // hashchange에 붙일 event listener.
    // hash가 #/linkage/1이면 뒤로가기 버튼을 추가하고,
    // hash가 #/linkage/2이면 뒤로가기 버튼을 제거한다.
    // 둘 다 아닌 경우에는 event listener를 제거한다.
    const onPopState = event => {
      console.log(event);
      switch (event.currentTarget.location.hash) {
        case HASH_LINKAGE_1:
          appEl.appendChild(backButtonEl);
          break;
        case HASH_LINKAGE_2:
          appEl.removeChild(backButtonEl);
          break;
        default:
          window.removeEventListener("popstate", onPopState);
          break;
      }
    };
    window.addEventListener("hashchange", onPopState);

    // 실험 플로우가 끝나면 원래 튜토리얼로 돌아갈 수 있도록,
    // /#/linkage/1 에서의 appEl를 미리 저장
    const rootEl = document.getElementById("root");
    const appEl = rootEl.querySelector(".App.fullscreen");

    // /#linkage/1에 뒤로가기 버튼 추가
    const backButtonEl = document.createElement("back-button");
    if (window.location.hash === HASH_LINKAGE_1) {
      appEl.appendChild(backButtonEl);
    }

    const items = [
      {
        src: "https://lh3.googleusercontent.com/zUz5rpxtrR5bXApNr_xj3JlIKpA4z9fVbYktwMdWMOXVIU9Vb3aSb5jGHlKwG1LoSAvMUFq9mh2qKdLopwBPF4X3FWZmQcqUiYSL806EwclRnHNrtzuT0x8vFqZl_HytNR0vHDZ7=w2400",

        buttonText: "기록해볼까요?",
      },
      {
        src: "https://lh3.googleusercontent.com/wV6cyQJ4EDc2UlZKMaG4QGAkhPM4P2MhNkaov7UFlKLAeALSE5MSSS32Y2XHqQx2Z4maiCXju23IGEnTmSgdX3NmCDx9gaIdjavSfe7XjXc3LwFgeX0iNjtUMpKvVMQpdZKK-QRk=w2400",
        buttonText: "알겠어요!",
      },
    ];

    class ImageWrapper extends LitElement {
      static properties = {
        itemIndex: { type: Number },
      };
      static styles = css`
        :host {
          width: 100%;
          height: 100%;
          background: grey !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: start;
          position: relative;
        }
        .back-button {
          width: auto;
          height: 2.5rem;
          position: absolute;
          left: 4.3vw;
          top: calc(env(safe-area-inset-top) + 2.17687vh);
          display: flex;
          background: none;
          border: none;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .bottom-button {
          margin: 0 2.5rem;
          width: 17.5rem;
          padding: 0.8125rem 0;
          position: absolute;
          bottom: 4.1875rem;
          background: #1f1f1f;
          color: white;
          border-radius: 0.25rem;
          border: none;
        }
      `;

      constructor() {
        super();
        this.itemIndex = 0;
      }

      renderBackButton() {
        if (this.itemIndex !== 0) {
          return html` <button class="back-button" @click="${this._goBack}">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgBAMAAAB54XoeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUdwTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH6NKgYAAAAMdFJOUwDyKA3lH6eYMYrEP4H31jgAAAFKSURBVGje7ZgxagJRFEU/I4G0ARkRfhEMKHZCtuACbHSwVBAsbBTsLCxttXYFSeMWBBGUt6jM/PQjPxxhAvcs4HJ8f+a+7zgnhBBCCCGEEEKIijCE88ZfazQvmVizRwZm3i5k4MvS2MCRN7v1WEGbkRPM864DUHADC44LwXdQ8Gh2noKCnVwwpQXn8ATTLXvE1RakJ5hVfYK44IQW9KxgsoQF2x6umaKo0ZqBBfNdDG8SD2+SMMHPMuIF7fxWQv0QFbi3hzRidn+yeBx4P0UEvtKBNfonh8fa6v0yVtHNYN+tEj7+Ug3gg82/eng5/CqS9RWmmKKK9Ap4giK9RvFFz19FnqB4/B9TRF8X+k7sElwxg//4hIM2XnEAHzRb3fS1KdzdWcWiF2/odyD6M0uhyAbm1d1AA10X/pjmajtWUAghhBBCCCGEqDg/mgU0joovq3oAAAAASUVORK5CYII="
            />
          </button>`;
        }
      }
      render() {
        return html`
          ${this.renderBackButton()}
          <img src=${items[this.itemIndex].src} />
          <button class="bottom-button" @click="${this._goToNextItem}">
            ${items[this.itemIndex].buttonText}
          </button>
        `;
      }

      _goToNextItem(e) {
        if (this.itemIndex + 1 === items.length) {
          // 실험이 끝나면 미리 저장해둔 appEl로 돌아가기
          rootEl.replaceChildren(appEl);
          return;
        }
        this.itemIndex++;
      }

      _goBack(e) {
        if (this.itemIndex - 1 === -1) return;
        this.itemIndex--;
      }
    }

    // linkage/1에 추가할 뒤로가기 버튼
    class BackButton extends LitElement {
      static properties = {
        show: { type: Boolean },
      };

      static styles = css`
        .back-button {
          width: auto;
          height: 2.5rem;
          position: absolute;
          left: 4.3vw;
          top: calc(env(safe-area-inset-top) + 2.17687vh);
          display: flex;
          background: none;
          border: none;
        }
        img {
          width: 100%;
          height: 100%;
        }
      `;
      constructor() {
        super();
        this.show = false;
      }
      render() {
        return html` <button class="back-button" @click="${this._goBack}">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgBAMAAAB54XoeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUdwTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH6NKgYAAAAMdFJOUwDyKA3lH6eYMYrEP4H31jgAAAFKSURBVGje7ZgxagJRFEU/I4G0ARkRfhEMKHZCtuACbHSwVBAsbBTsLCxttXYFSeMWBBGUt6jM/PQjPxxhAvcs4HJ8f+a+7zgnhBBCCCGEEEKIijCE88ZfazQvmVizRwZm3i5k4MvS2MCRN7v1WEGbkRPM864DUHADC44LwXdQ8Gh2noKCnVwwpQXn8ATTLXvE1RakJ5hVfYK44IQW9KxgsoQF2x6umaKo0ZqBBfNdDG8SD2+SMMHPMuIF7fxWQv0QFbi3hzRidn+yeBx4P0UEvtKBNfonh8fa6v0yVtHNYN+tEj7+Ug3gg82/eng5/CqS9RWmmKKK9Ap4giK9RvFFz19FnqB4/B9TRF8X+k7sElwxg//4hIM2XnEAHzRb3fS1KdzdWcWiF2/odyD6M0uhyAbm1d1AA10X/pjmajtWUAghhBBCCCGEqDg/mgU0joovq3oAAAAASUVORK5CYII="
          />
        </button>`;
      }
      _goBack() {
        console.log("BACK!!");
        rootEl.replaceChildren(experimentEl);
      }
    }

    customElements.define("image-wrapper", ImageWrapper);
    customElements.define("back-button", BackButton);

    // 실험 element로 root 안의 내용을 대체
    const experimentEl = document.createElement("image-wrapper");
    rootEl.replaceChildren(experimentEl);
  },
);
