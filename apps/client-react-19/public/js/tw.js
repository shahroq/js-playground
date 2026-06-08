import { setupDropdownToggle } from "@packages/js/dropdown";
import { setupOffcanvas } from "@packages/js/offcanvas";

// AUTO INIT
document.addEventListener("DOMContentLoaded", () => {
  console.log("Init TW Layout JS file...");
  setupDropdownToggle();
  setupOffcanvas();
});
