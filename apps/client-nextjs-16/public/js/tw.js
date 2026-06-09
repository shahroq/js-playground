import { setupDropdownToggle } from "@jsp/shared/js/dropdown";
import { setupOffcanvas } from "@jsp/shared/js/offcanvas";

// AUTO INIT
document.addEventListener("DOMContentLoaded", () => {
  console.log("Init TW Layout JS file...");
  setupDropdownToggle();
  setupOffcanvas();
});
