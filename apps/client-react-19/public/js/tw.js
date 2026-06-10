import { setupDropdownToggle } from "../../../../packages/shared/public/js/dropdown";
import { setupOffcanvas } from "../../../../packages/shared/public/js/offcanvas";

// AUTO INIT
document.addEventListener("DOMContentLoaded", () => {
  console.log("Init TW Layout JS file...");
  setupDropdownToggle();
  setupOffcanvas();
});
