import { Component } from "react";

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }

    render() {
        return (
            <>
                <label htmlFor="input">
                    {this.props.label}:
                </label>
                <br />
                <div className="ui input">
                    <input
                        id="input"
                        type={this.props.type}
                        name={this.props.name}
                        onChange={this.props.handleChange}
                        required={this.props.isRequired}
                    />
                </div>
            </>
        );
    }
}

export default InputForm;