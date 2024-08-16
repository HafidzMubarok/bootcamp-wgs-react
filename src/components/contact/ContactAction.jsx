import { useState, useEffect } from 'react';
import { Form, Field } from "react-final-form";
import axios from 'axios';

// Komponen untuk menampilkan pesan error
const ErrorMessage = ({ error }) => (
    error ? <span className='error'>{error}</span> : null
);

const CreateContact = ({onClose, onUpdate}) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [apiErrors, setApiErrors] = useState({});

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const required = value => (value ? undefined : 'This field is required');

    const onSubmit = async (values, form) => {
        await sleep(300);
        
        const url = "http://localhost:8080/api/contact";
        
        try {
            const response = await axios.post(url, values, { proxy: { host: 'localhost', port: 8080 } });
            
            if (response) {
                setIsSuccess(true);
                onUpdate();
            }
            
            setTimeout(() => {
                onClose(); // Menutup modal setelah beberapa saat
            }, 2000); // Menutup modal setelah 2 detik (bisa disesuaikan)
            
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const apiErrors = error.response.data.errors;
                
                setApiErrors(apiErrors);
            } else {
                console.error('Error submitting form:', error);
            }
        }
    };

    return (
        <>
            {isSuccess ? (
                <div className="ui success message">Contact created successfully!</div>
            ) : (
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} className='ui form'>
                            <div className='field'>
                                <label>Name</label>
                                <Field
                                    name="name"
                                    component="input"
                                    type="text"
                                    placeholder="Name"
                                    validate={required}
                                />
                                <ErrorMessage error={apiErrors.name} />
                            </div>
                            <div className='field'>
                                <label>Email</label>
                                <Field
                                    name="email"
                                    component="input"
                                    type="email"
                                    placeholder="Email"
                                />
                               <ErrorMessage error={apiErrors.email} />
                            </div>
                            <div className='field'>
                                <label>Phone Number</label>
                                <Field
                                    name="mobile"
                                    component="input"
                                    type="text"
                                    placeholder="Phone Number"
                                />
                                <ErrorMessage error={apiErrors.mobile} />
                            </div>
                            <div className="buttons">
                                <button type="submit" className='ui primary button' disabled={submitting || pristine}>
                                    Submit
                                </button>
                                <button
                                    className='ui secondary button'
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    )}
                />          
            )}
        </>
    );
}

const DetailContact = ({name}) => {
    const [contact, setContact] = useState({});

    const fetchContact = async (id) => {
        const url = `http://localhost:8080/api/contact/${id}`;
        try {
            const response = await axios.get(url);
            console.log(response);
            
            setContact(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchContact(name);
    }, [name])

    return (
        <div className='ui items'>
            <div className='item'>
                <div className="content">
                    <div className='ui three column grid'>
                        <span className='four wide column'>Name</span>
                        <span className='one wide column'>:</span>
                        <p className='eleven wide column'>{contact.name}</p>
                    </div>
                    <div className='ui three column grid'>
                        <span className='four wide column'>Email</span>
                        <span className='one wide column'>:</span>
                        <span className='eleven wide column'>{contact.email}</span>
                    </div>
                    <div className='ui three column grid'>
                        <span className='four wide column'>Phone Number</span>
                        <span className='one wide column'>:</span>
                        <span className='eleven wide column'>{contact.mobile}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const EditContact = ({name, onClose, onUpdate}) => {
    const [contact, setContact] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [apiErrors, setApiErrors] = useState({});

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const onSubmit = async (values) => {
        await sleep(300);
        
        const url = `http://localhost:8080/api/contact/${name}`;
        
        try {
            const response = await axios.put(url, values, { proxy: { host: 'localhost', port: 8080 } });

            if (response) {
                setIsSuccess(true);
                onUpdate();
            }
            
            setTimeout(() => {
                onClose(); // Menutup modal setelah beberapa saat
            }, 2000); // Menutup modal setelah 2 detik (bisa disesuaikan)
            
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const apiErrors = error.response.data.errors;
                
                setApiErrors(apiErrors);
            } else {
                console.error('Error submitting form:', error);
            }
        }
    };

    const fetchContact = async (id) => {
        const url = `http://localhost:8080/api/contact/${id}`;
        try {
            const response = await axios.get(url);
            setContact(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchContact(name);
    }, [name])

    return (
        <>
            {isSuccess ? (
                <div className="ui success message">Contact updated successfully!</div>
            ) : (
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ originalName: name }}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} className='ui form'>
                            <div className='field'>
                                <label>Name</label>
                                <Field
                                    name="name"
                                    component="input"
                                    type="text"
                                    placeholder="Name"
                                    initialValue={contact.name}
                                />
                                <ErrorMessage error={apiErrors.name} />
                            </div>
                            <div className='field'>
                                <label>Email</label>
                                <Field
                                    name="email"
                                    component="input"
                                    type="email"
                                    placeholder="Email"
                                    initialValue={contact.email}
                                />
                                <ErrorMessage error={apiErrors.email} />
                            </div>
                            <div className='field'>
                                <label>Phone Number</label>
                                <Field
                                    name="mobile"
                                    component="input"
                                    type="text"
                                    placeholder="Phone Number"
                                    initialValue={contact.mobile}
                                />
                                <ErrorMessage error={apiErrors.mobile} />
                            </div>
                            <div className="buttons">
                                <button type="submit" className='ui primary button' disabled={submitting || pristine}>
                                    Submit
                                </button>
                                <button
                                    className='ui secondary button'
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    )}
                />         
            )}
        </>
    );
}

const DeleteContact = ({ name, onClose, onUpdate }) => {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDelete = async (id) => {
        const url = `http://localhost:8080/api/contact/${id}`;

        try {
            const response = await axios.delete(url, { proxy: { host: 'localhost', port: 8080 } });
            
            if (response) {
                setIsSuccess(true);
                onUpdate();
            }
            
            setTimeout(() => {
                onClose(); // Menutup modal setelah beberapa saat
            }, 2000); // Menutup modal setelah 2 detik (bisa disesuaikan)
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            {isSuccess ? (
                <div className="ui success message">Contact updated successfully!</div>
            ) : (
                    <div className='ui container' style={{ padding: "8px 0" }}>
                        <i className="massive yellow exclamation triangle icon"></i>
                        <h3 className='header' style={{ padding: "24px 0" }}>Do you want to delete {name} from contact?</h3>
                        <button onClick={onClose} className='ui button'>Cancel</button>
                        <button onClick={() => handleDelete(name)} className='ui red button'>Delete</button>
                    </div>
            )}
        </>
    );
}

const Modal = ({show, onClose, title, children}) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                    <button onClick={onClose} className="ui button">Close</button>
                </div>
                <div className="modal-body ui segment">
                {children}
                </div>
                {/* <div className="modal-footer">
                
                </div> */}
            </div>
        </div>
    );
}

export { CreateContact, DetailContact, EditContact, DeleteContact, Modal };