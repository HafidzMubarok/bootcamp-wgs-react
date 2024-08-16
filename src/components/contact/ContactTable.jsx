import { useState, useEffect } from 'react';
import axios from 'axios';

import {CreateContact, DetailContact, EditContact, DeleteContact, Modal} from './ContactAction';

const ContactTable = () => {
    const [contacts, setContact] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [modalType, setModalType] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(5);

    const handleOpenModal = (name, type) => {
        setActiveModal(name);
        setModalType(type)
    }

    const handleCloseModal = () => {
        setActiveModal(null);
        setModalType(null);
    }

    const fetchContacts = async () => {
        const url = "http://localhost:8080/api/contacts";

        try {
            const response = await axios.get(url);
            setContact(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchContacts();
    }, [])

    const handleUpdateContacts = () => {
        fetchContacts();
    }

    // Pagination
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className='ui right aligned container'>
                <button onClick={() => handleOpenModal('create-modal', 'create')} className='ui icon inverted green left labeled button'>
                    <i className="user plus icon"></i>
                    Add Contact
                </button>
            </div>
            {modalType === 'create' && (
                <Modal show={true} onClose={handleCloseModal} title={"Create Contact"}>
                    <CreateContact onClose={handleCloseModal} onUpdate={handleUpdateContacts} />
                </Modal>
            )}
            <table className="ui fixed table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th className='right aligned'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentContacts.map((contact) => (
                        <tr key={contact.name}>
                            <td data-label="Name">{contact.name}</td>
                            <td data-label="Mobile">{contact.mobile}</td>
                            <td data-label="Action" className='right aligned'>
                                <button onClick={() => handleOpenModal(contact.name, 'detail')} className='ui icon inverted primary button'>
                                    <i className="eye icon"></i>
                                </button>
                                <button onClick={() => handleOpenModal(contact.name, 'edit')} className='ui icon inverted yellow button'>
                                    <i className="edit icon"></i>
                                </button>
                                <button onClick={() => handleOpenModal(contact.name, 'delete')} className='ui icon inverted red button'>
                                    <i className="trash alternate icon"></i>
                                </button>
                                {modalType === "detail" && (
                                    <div className='left aligned'>
                                        <Modal show={activeModal === contact.name} onClose={handleCloseModal} title={"Detail Contact"}>
                                            <DetailContact name={contact.name} />
                                        </Modal>
                                    </div>
                                )}
                                {modalType === "edit" && (
                                    <div className='left aligned'>
                                        <Modal show={activeModal === contact.name} onClose={handleCloseModal} title={"Edit Contact"}>
                                            <EditContact name={contact.name} onClose={handleCloseModal} onUpdate={handleUpdateContacts} />
                                        </Modal>
                                    </div>
                                )}
                                {modalType === "delete" && (
                                    <div className='center aligned'>
                                        <Modal show={activeModal === contact.name} onClose={handleCloseModal} title={"Delete Contact"}>
                                            <DeleteContact name={contact.name} onClose={handleCloseModal} onUpdate={handleUpdateContacts} />
                                        </Modal>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="ui right aligned pagination menu">
                {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`item ${currentPage === index + 1 ? 'ui blue button' : 'ui button'}`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}

export default ContactTable;