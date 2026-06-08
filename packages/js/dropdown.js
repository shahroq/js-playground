/*
|--------------------------------------------------------------------------
| DROPDOWN MENU
|--------------------------------------------------------------------------
*/
export function setupDropdownToggle() {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
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
