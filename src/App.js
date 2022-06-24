import {Routes, Route} from "react-router-dom";
import { Form } from "./components/Form";
import { History } from "./components/History";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Form />} />
            <Route path="form" element={<Form />} />
            <Route path="history" element={<History />} />
        </Routes>)
}

export default App
