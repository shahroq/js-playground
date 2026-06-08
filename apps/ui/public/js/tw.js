import { setupDropdownToggle } from "@packages/js/dropdown";
import { setupOffcanvas } from "@packages/js/offcanvas";
import { setupAlert } from "@packages/js/alert";

// AUTO INIT
document.addEventListener("DOMContentLoaded", () => {
  console.log("Init TW Layout JS file...");
  setupDropdownToggle();
  setupOffcanvas();
  setupAlert();
});
