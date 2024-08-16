import ContactTable from './ContactTable';

import "../style/modal.css"
import "../style/input.css"

const Contact = () => {

    return(
        <>
            <div className="ui container">
                <div className="ui center aligned segment">
                    <h1 className="ui header">Contact</h1>
                </div>
                <ContactTable />
            </div>
        </>
    );
}

export default Contact;