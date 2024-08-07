import { Component } from "react";

class LiveTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            time: new Date().toLocaleTimeString(),
        });
    }

    render() {
        return (
            <>
                <h1>{this.state.time}</h1>
            </>
        );
    }
}

export default LiveTime;