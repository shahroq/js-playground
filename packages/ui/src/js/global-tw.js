console.log("Global TW Layout file...");

/*
|--------------------------------------------------------------------------
| OFFCANVAS
|--------------------------------------------------------------------------
*/
class Offcanvas {
  constructor(element) {
    this.element = element;
    this.handleEsc = this.handleEsc.bind(this);
    this.init();
  }

  init() {
    const dismissButtons = this.element.querySelectorAll(
      '[data-dismiss="offcanvas"]',
    );

    dismissButtons.forEach((btn) =>
      btn.addEventListener("click", () => this.hide()),
    );
  }

  createBackdrop() {
    const backdrop = document.createElement("div");
    backdrop.className = "offcanvas-backdrop";
    document.body.appendChild(backdrop);
    this.backdrop = backdrop;

    backdrop.addEventListener("click", () => this.hide());
  }

  show() {
    this.element.classList.add("show");
    this.createBackdrop();
    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", this.handleEsc);
  }

  hide() {
    this.element.classList.remove("show");
    this.backdrop?.remove();
    document.body.classList.remove("overflow-hidden");
    document.removeEventListener("keydown", this.handleEsc);
  }

  toggle() {
    const isOpen = this.element.classList.contains("show");
    isOpen ? this.hide() : this.show();
  }

  handleEsc(e) {
    if (e.key === "Escape") this.hide();
  }
}

// AUTO INIT
document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll('[data-toggle="offcanvas"]');

  triggers.forEach((trigger) => {
    const targetSelector = trigger.getAttribute("data-target");

    const target = document.querySelector(targetSelector);

    if (!target) return;

    const offcanvas = new Offcanvas(target);

    trigger.addEventListener("click", () => offcanvas.toggle());
  });
});

/*
|--------------------------------------------------------------------------
| DROPDOWN MENU
|--------------------------------------------------------------------------
*/
function setupDropdownToggle() {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();

      const dropdown = toggle.closest(".dropdown");
      if (dropdown) {
        const dropdownMenu = dropdown.querySelector(".dropdown-menu");
        if (dropdownMenu) dropdownMenu.classList.toggle("show");
      }
    });
  });

  // Optional: Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      const dropdownMenu = dropdown.querySelector(".dropdown-menu");
      const isClickInside = dropdown.contains(event.target);
      if (!isClickInside && dropdownMenu.classList.contains("show")) {
        dropdownMenu.classList.remove("show");
      }
    });
  });
}

// Call the function to set up the event listeners
setupDropdownToggle();
