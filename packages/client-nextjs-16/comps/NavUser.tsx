import site from "@gpublic/json/site.json";
import avatar from "@gpublic/img/avatar.png";

const user = site.user;

export function NavUser() {
  return (
    <div className="dropdown user-nav">
      <a
        href="#"
        className="dropdown-toggle"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        <img src={avatar.src} alt={`/${user.name}`} width="32" height="32" />

        <dl>
          <dt>{user.name}</dt>
          <dd>{user.email}</dd>
        </dl>
      </a>
      <ul className="dropdown-menu">
        <li>
          <a href="#">Settings</a>
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
        <li>
          <hr className="sm" />
        </li>
        <li>
          <a href="#">Sign out</a>
        </li>
      </ul>
    </div>
  );
}
