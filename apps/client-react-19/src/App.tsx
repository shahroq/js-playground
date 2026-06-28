import { Routes } from "./modules/router/Routes";
import { Providers } from "./Providers";
import "./index.css";
import "./index-shadcn.css";

export function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}

export default App;
