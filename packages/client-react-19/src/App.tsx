import { Header } from "./comps/Header";
import { Sidebar } from "./comps/Sidebar";
import "./index.css";
import { Routes } from "./modules/router/Routes";

export function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className="layout">
        <aside>
          <Sidebar />
        </aside>
        <main>
          <Routes />
        </main>
      </div>
    </>
  );
}

export default App;
