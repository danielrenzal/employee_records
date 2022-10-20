import React, {Component} from 'react';
import Form               from 'react-bootstrap/Form';
import Button             from 'react-bootstrap/Button';
import Modal              from 'react-bootstrap/Modal';
import Stack              from 'react-bootstrap/Stack';

class formModal extends Component{
    state = {
        name: "",
        surname: "",
        email: "",
        phone: "",
        salary: "",
        name_border: "",
        surname_border: "",
        email_border: "",
        phone_border: "",
        salary_border: "",
    }

    handleSubmit = (e, handleCloseModal, handleFetchEmployees, action, formInputs) => {
        e.preventDefault();
        

        if(action === "Insert"){
            fetch("http://localhost:8000/employees", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(this.state)
            }).then(() => {
                handleCloseModal();
                handleFetchEmployees();
            })
        }
        else if(action === "Edit"){
            const updatedInfo = {
                name: this.state.name || formInputs.name,
                surname: this.state.surname || formInputs.surname,
                email: this.state.email || formInputs.email,
                phone: this.state.phone || formInputs.phone,
                salary: this.state.salary || formInputs.salary,
            }
        
            fetch("http://localhost:8000/employees/"+formInputs.id, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedInfo)
            }).then(() => {
                handleCloseModal();
                handleFetchEmployees();
            })
        }
    }

    render(){
        const {show, handleCloseModal, formInputs, formInputs: {name, surname, email, phone, salary}, handleFetchEmployees, action} = this.props;

        return(
            <Modal
                show={show} 
                onHide={handleCloseModal} 
                style={{width: "350px", left: "calc(50% - 175px)"}}>
                    <Modal.Body>
                        <h2 className="fs-5 text-center mb-4">{action} Employee Records</h2>
                        <Form onSubmit={(e)=>this.handleSubmit(e, handleCloseModal, handleFetchEmployees, action, formInputs)}>
                            <Stack gap={4}>
                                <Form.Control className={this.state.name_border} placeholder="Enter Name" defaultValue={name} onChange={(e)=>this.setState({name: e.target.value})}/>
                                <Form.Control className={this.state.surname_border} placeholder="Enter Surname" defaultValue={surname} onChange={(e)=>this.setState({surname: e.target.value})} />
                                <Form.Control className={this.state.email_border} placeholder="Enter Email" defaultValue={email} onChange={(e)=>this.setState({email: e.target.value})} />
                                <Form.Control className={this.state.phone_border} placeholder="Enter Phone" defaultValue={phone} onChange={(e)=>this.setState({phone: e.target.value})} />
                                <Form.Control className={this.state.salary_border} placeholder="Enter Salary" defaultValue={salary} onChange={(e)=>this.setState({salary: e.target.value})} />
                                <Button className="mx-auto" type="submit">{action} Record</Button>
                            </Stack>
                        </Form>
                    </Modal.Body>
            </Modal>
        )
    }
}

export default formModal;