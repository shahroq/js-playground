import { setupDropdownToggle } from "../../../../packages/shared/js/dropdown";
import { setupOffcanvas } from "../../../../packages/shared/js/offcanvas";

// AUTO INIT
document.addEventListener("DOMContentLoaded", () => {
  console.log("Init TW Layout JS file...");
  setupDropdownToggle();
  setupOffcanvas();
});
