/*
|--------------------------------------------------------------------------
| Alert
|--------------------------------------------------------------------------
*/
export function setupAlert() {
  const dismissButtons = document.querySelectorAll('[data-dismiss="alert"]');

  dismissButtons.forEach((dismiss) => {
    dismiss.addEventListener("click", (e) => {
      const alert = dismiss.closest(".alert");
      if (alert) alert.remove();
    });
  });
}
