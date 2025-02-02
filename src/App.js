import Header from "./header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/contact/Contact";
import Gallery from "./components/Gallery";
import Videos from "./components/Videos";
import EmployeeForm from "./components/EmployeeForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function NotFound() {
    return <h1>Page not found</h1>;
}

export default function App() {

    return (
        <div>
            <BrowserRouter>
                <Header />
                <div style={{ paddingLeft: "64px", paddingTop: "32px", paddingBottom: "64px" }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="gallery" element={<Gallery />} />
                        <Route path="videos" element={<Videos />} />
                        <Route path="employee" element={<EmployeeForm />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}