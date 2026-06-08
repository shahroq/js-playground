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

export function setupOffcanvas() {
  const triggers = document.querySelectorAll('[data-toggle="offcanvas"]');

  triggers.forEach((trigger) => {
    const targetSelector = trigger.getAttribute("data-target");

    const target = document.querySelector(targetSelector);

    if (!target) return;

    const offcanvas = new Offcanvas(target);

    trigger.addEventListener("click", () => offcanvas.toggle());
  });
}
