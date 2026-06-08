import { setupDropdownToggle } from "@gpublic/js/dropdown";
import { setupOffcanvas } from "@gpublic/js/offcanvas";
import { setupAlert } from "@gpublic/js/alert";

// AUTO INIT
document.addEventListener("DOMContentLoaded", () => {
  console.log("Init TW Layout JS file...");
  setupDropdownToggle();
  setupOffcanvas();
  setupAlert();
});
