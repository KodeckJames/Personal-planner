export function loadVanta() {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
  
    const setupVanta = async () => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js");
  
      if (window.VANTA) {
        window.VANTA.HALO({
          el: "#vanta-bg",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
        });
      }
    };
  
    setupVanta();
  }
  