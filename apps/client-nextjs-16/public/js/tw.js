import { setupDropdownToggle } from "@jsp/shared/public/js/dropdown";
import { setupOffcanvas } from "@jsp/shared/public/js/offcanvas";

// AUTO INIT
document.addEventListener("DOMContentLoaded", () => {
  console.log("Init TW Layout JS file...");
  setupDropdownToggle();
  setupOffcanvas();
});
