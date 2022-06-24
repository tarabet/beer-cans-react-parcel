import { createRoot } from 'react-dom/client';
import App  from "./App"
import { BrowserRouter } from "react-router-dom";
import {Layout} from "./components/Layout";

const app = document.getElementById("app");
const root = createRoot(app);
root.render(
    <BrowserRouter>
        <Layout>
            <App />
        </Layout>
    </BrowserRouter>
)
