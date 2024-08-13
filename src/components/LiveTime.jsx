import { useState, useEffect } from "react";

function LiveTime() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        // Start timer
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString()); // Update time every second
        }, 1000);

        // Stop the timer if unmounted
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <span>{time}</span>
        </>
    );
}

export default LiveTime;

// import { Component } from "react";

// class LiveTime extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             time: new Date().toLocaleTimeString(),
//         }
//     }

//     componentDidMount() {
//         this.timer = setInterval(() => this.tick(), 1000);
//     }
    
//     componentWillUnmount() {
//         clearInterval(this.timer);
//     }

//     tick() {
//         this.setState({
//             time: new Date().toLocaleTimeString(),
//         });
//     }

//     render() {
//         return (
//             <>
//                 <span>{this.state.time}</span>
//             </>
//         );
//     }
// }