import { Component } from "react";
import InputForm from "./InputForm";

export default class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            mobile: "",
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    handleChangeMobile(event) {
        this.setState({ mobile: event.target.value });
    }

    handleSubmit(event) {
        alert(
            "Name: " + this.state.name + "\n"
            + "Email: " + this.state.email + "\n"
            + "Phone Number: " + this.state.mobile
        );
        event.preventDefault();
    }

    render() {
        return (
            <div className="ui centered cards">
                <div className="ui card">
                    <div className="content">
                        <div className="center aligned header">
                            {this.props.title}
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <InputForm
                                label={"Name"}
                                type={"name"}
                                name={this.state.name}
                                isRequired={true}
                                handleChange={this.handleChangeName}
                            />
                            <br />
                            <InputForm
                                label={"Email"}
                                type={"email"}
                                name={this.state.email}
                                isRequired={false}
                                handleChange={this.handleChangeEmail}
                            />
                            <br />
                            <InputForm
                                label={"Phone Number"}
                                type={"text"}
                                name={this.state.mobile}
                                isRequired={false}
                                handleChange={this.handleChangeMobile}
                            />
                            <button type="submit" name="Submit" className="ui icon primary left labeled button" style={{ marginTop: "16px" }}>
                                <i aria-hidden="true" className="edit icon"></i>Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
} 