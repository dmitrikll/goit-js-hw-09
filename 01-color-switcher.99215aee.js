!function(){var t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")},n=null;function e(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}t.stopBtn.disabled=!0,t.startBtn.addEventListener("click",(function(){n=setInterval(e,1e3),t.startBtn.disabled=!0,t.stopBtn.disabled=!1})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),t.startBtn.disabled=!1,t.stopBtn.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.99215aee.js.map
