import { Header } from "./comps/Header";
import { Sidebar } from "./comps/Sidebar";
import "./index.css";
import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard/Dashboard";

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
          <Home />
        </main>
      </div>
    </>
  );
}

export default App;
