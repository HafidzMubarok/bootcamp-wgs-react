import Count from "./Count";
import LiveTime from "./LiveTime";

export default function Home() {
    const title = "Home";

    return (
        <>
            <h1>{title}</h1>
            <div className="ui cards">
                <div className="card">
                    <div className="content">
                        <div className="header">Time</div>
                        <div className="description"><LiveTime /></div>
                    </div>
                </div>
            </div>
            <div className="ui cards">
                <div className="card">
                    <div className="content">
                        <div className="header">Counter</div>
                        <div className="description"><Count /></div>
                    </div>
                </div>
            </div>
        </>
    );
}