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
                    {this.props.label}
                </label>
                <br />
                <div className={`ui ${this.props.size} ${this.props.isSearchInput ? "icon" : ""} input`}>
                    <input
                        id="input"
                        type={this.props.type}
                        name={this.props.name}
                        onChange={this.props.handleChange}
                        placeholder={this.props.placeholder}
                        required={this.props.isRequired}
                    />
                    {this.props.isSearchInput ? <i className="inverted circular search link icon"></i> : <></>}
                </div>
            </>
        );
    }
}

export default InputForm;