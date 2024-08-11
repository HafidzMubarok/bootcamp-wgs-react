import Header from "./header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Comment from "./components/Comment";
import Gallery from "./components/Gallery";
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
                        <Route path="comment" element={<Comment />} />
                        <Route path="gallery" element={<Gallery />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}