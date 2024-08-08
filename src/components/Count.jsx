import { Component } from "react";

class Count extends Component{
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
        }
    }

    addCount = () => {
        this.setState({ count: this.state.count + 1 });
    }

    minCount = () => {
        this.setState({ count: this.state.count === 0 ? this.state.count : this.state.count - 1 });
    }

    render() {
        return(
            <>
                <h1>{this.props.counterName} {this.state.count}</h1>
                <button className="ui icon secondary button" onClick={this.minCount}>
                    {this.props.min}
                </button>
                <button className="ui icon primary button" onClick={this.addCount}>
                    {this.props.plus}
                </button>
            </>
        );
    }
}

export default Count;