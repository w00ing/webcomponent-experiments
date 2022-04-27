function loadExperiment() {
  try {
    const tailwindScriptElId = "tailwind-cdn";
    const existingTailwindScriptEl =
      document.getElementById(tailwindScriptElId);
    if (!existingTailwindScriptEl) {
      const tailwindScript = document.createElement("script");
      tailwindScript.id = tailwindScriptElId;
      tailwindScript.setAttribute("src", "https://cdn.tailwindcss.com");
      document.head.appendChild(tailwindScript);
    }
    tailwind.config = {
      prefix: "tw-",
    };
    const root = document.querySelector("#root > div.App.fullscreen");
    root.replaceChildren();
    const customImgEl = document.createElement("custom-img");
    customImgEl.className = "tw-w-full tw-h-full";
    root.appendChild(customImgEl);
    class CustomImg extends HTMLElement {
      connectedCallback() {
        this.render();
      }
      render() {
        console.log(this);
        const img = document.createElement("img");
        // img.className = "w-full h-full";
        img.setAttribute(
          "src",
          "https://lh3.googleusercontent.com/tDld1WnawVojF2zt3gjbx3LwLv5vbMfrYVrw71sZ6KVuMK97VlyhMNc4K5fX7N2Bc2R4oVmrspxQVCuaJtCF4eG75CXn54sD7W1Xqkyq9f6PrqO0hrYB40WaIuV9W562ijHd4FK6=w2400",
        );
        this.appendChild(img);
      }

      static get observedAttributes() {
        return ["name"];
      }

      attributeChangedCallback() {
        this.render();
      }
    }

    customElements.define("custom-img", CustomImg);
  } catch (e) {
    console.log("error", e);

    //      window.requestAnimationFrame(loadExperiment);
  }
}

loadExperiment();
