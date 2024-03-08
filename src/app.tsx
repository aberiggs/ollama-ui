import { createRoot } from "react-dom/client";
import Root from "./Root";

// Electron-store setup
// storeInit();


const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Root />);
