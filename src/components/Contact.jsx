import { Component } from "react";
import ContactForm from "./ContactForm";

export default class Contact extends Component {
    
    render() {
        return(
            <>
                <div className="ui container">
                    <div className="ui center aligned segment">
                        <h1 className="ui header">Contact</h1>
                    </div>
                    <ContactForm title={"Add new contact"} />
                </div>
            </>
        );
    }
}