import { Link } from "react-router-dom";
import LiveTime from "./components/LiveTime";

import "./header.css"

export default function Header() {
    const title = "Experiment with REACTJS";

    return (
        <>
            <nav>
                <h1>
                    <Link to="/"><i className="react icon"></i>{title}</Link>
                </h1>
                <div>
                    <i aria-hidden="true" className="clock icon"></i>
                    <LiveTime />
                </div>
                <ul style={{ display:"flex", flexDirection: "row", listStyleType: "none", }}>
                    <li>
                        <Link to="/"><i className="home icon"></i>home</Link>
                    </li>
                    <li>
                        <Link to="/about"><i className="user icon"></i>about</Link>
                    </li>
                    <li>
                        <Link to="/contact"><i className="address book icon"></i>contact</Link>
                    </li>
                    <li>
                        <Link to="/gallery"><i className="images icon"></i>gallery</Link>
                    </li>
                    {/* <li>
                        <Link to="/comment">comment</Link>
                    </li> */}
                    <li>
                        <Link to="/videos"><i className="video icon"></i>videos</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}