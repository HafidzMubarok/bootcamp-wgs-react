import { Link } from "react-router-dom";
import LiveTime from "./components/LiveTime";

import "./header.css"

export default function Header() {
    const title = "Experiment with REACTJS";

    return (
        <>
            <nav>
                <h1>{title}</h1>
                <div>
                    <i aria-hidden="true" className="clock icon"></i>
                    <LiveTime />
                </div>
                <ul style={{ display:"flex", flexDirection: "row", listStyleType: "none", }}>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    <li>
                        <Link to="/contact">contact</Link>
                    </li>
                    <li>
                        <Link to="/comment">comment</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}