import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class ConfirmDeleteModal extends Component{


    handleDelete = (id, handleFetchEmployees, handleCloseModal) => {
        fetch(`http://localhost:8000/employees/${id}`, {
            method: "DELETE"
        }).then(() => {
            handleFetchEmployees();
            handleCloseModal();
        })
    }

    render(){
        const {show, handleCloseModal, handleFetchEmployees, id, name, surname} = this.props;

        return(
            <Modal show={show}
                   onHide={handleCloseModal} 
                   style={{width: "350px", left: "calc(50% - 175px)"}}>
                <Modal.Body>
                    <h2 className="fs-5 text-center mb-4">Delete {name} {surname}?</h2>
                    <Button
                        className="d-block bg-danger mx-auto border-danger"
                        onClick={()=>this.handleDelete(id, handleFetchEmployees, handleCloseModal)}>Delete</Button>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ConfirmDeleteModal;