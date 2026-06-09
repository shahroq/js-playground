import { setupDropdownToggle } from "../../../../packages/shared/js/dropdown";
import { setupOffcanvas } from "../../../../packages/shared/js/offcanvas";
import { setupOffcanvas } from "../../../../packages/shared/js/alert";

// AUTO INIT
document.addEventListener("DOMContentLoaded", () => {
  console.log("Init TW Layout JS file...");
  setupDropdownToggle();
  setupOffcanvas();
  setupAlert();
});
