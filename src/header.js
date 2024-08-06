import { Link } from "react-router-dom";

import "./header.css"

export default function Header() {
    const title = "BOOTCAMP Batch 10: Experiment with REACTJS";

    return (
        <>
            <nav>
                <h1>{title}</h1>
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