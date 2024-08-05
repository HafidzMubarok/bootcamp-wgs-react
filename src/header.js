
export default function Header() {
    const navStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
    const navLinkStyle = {
        textDecoration: "none",
        marginRight: "16px",
        color: "black",
    }
    return (
        <>
            <nav style={navStyle}>
                <h1>BOOTCAMP Batch 10: Experiment with REACTJS</h1>
                <ul style={{ display:"flex", flexDirection: "row", listStyleType: "none", }}>
                    <li>
                        <a href="/" style={navLinkStyle}>home</a>
                    </li>
                    <li>
                        <a href="/about" style={navLinkStyle}>about</a>
                    </li>
                    <li>
                        <a href="/contact" style={navLinkStyle}>contact</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}