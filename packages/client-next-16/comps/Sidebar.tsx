import { NavSidebar } from "./NavSidebar";
import { NavUser } from "./NavUser";

export function Sidebar() {
  return (
    <div className="offcanvas offcanvas-start" id="sidebar">
      <div className="offcanvas-header">
        <h2>Pixel</h2>
        <button type="button" data-dismiss="offcanvas">
          ×
        </button>
      </div>

      <div className="offcanvas-body py-4">
        <NavSidebar />
        <hr />
        <NavUser />
      </div>
    </div>
  );
}
