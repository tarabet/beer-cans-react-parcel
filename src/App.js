import {Routes, Route} from "react-router-dom";
import { Form } from "./components/Form";
import { EmptyPage } from "./components/EmptyPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Form />} />
            <Route path="form" element={<Form />} />
            <Route path="empty" element={<EmptyPage />} />
        </Routes>)
}

export default App
