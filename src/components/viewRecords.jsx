import React, {Component} from 'react';
import Form               from 'react-bootstrap/Form';
import InputGroup         from 'react-bootstrap/InputGroup';
import Button             from 'react-bootstrap/Button';
import Container          from 'react-bootstrap/Container';

import {FaSearch}         from 'react-icons/fa';
import EmployeesTable     from './employeesTable';
import FormModal          from './formModal';

class ViewRecords extends Component{

    constructor(){  
        super();  
        this.state = {
            showFormModal: false,
            employees: null,
            formInputs: {
                name: "",
                surname: "",
                email: "",
                phone: "",
                salary: "",
            },
            searchInput: "",
        }
    }  

    
    handleCloseModal = () => {
        this.setState({showFormModal: false});
    }

    handleFetchEmployees = async () => {
        const response = await fetch("http://localhost:8000/employees");
        const data = await response.json();
        
        this.setState({employees: data});
    }

    handleFilter = async (e, searchInput) => {
        e.preventDefault();

        if(searchInput){
            const response = await fetch("http://localhost:8000/employees/?name="+searchInput);
            const data = await response.json();
            this.setState({employees: data});
        }else{
            this.handleFetchEmployees();
        }

        
    }

    componentDidMount(){
        this.handleFetchEmployees();
    }

    render(){
        let {showFormModal, employees, formInputs, searchInput} = this.state;

        return(
            <Container className="px-4">
                <h1 className="fs-4 text-center mb-5">View Records</h1>
                <div className="d-flex justify-content-between">
                    <Form style={{width: "fit-content"}} className="mb-4" onSubmit={(e)=>this.handleFilter(e, searchInput)}>
                        <InputGroup>
                            <Form.Control
                                placeholder="Search Employee Here"
                                aria-label="Search Employee Here"
                                style={{backgroundColor: "#f2f2f2"}}
                                onChange={(e)=>this.setState({searchInput: e.target.value})}
                            />
                            <Button className="bg-success border-success" type="submit">
                                <FaSearch className="mb-1"/>
                            </Button>
                        </InputGroup>
                    </Form>
                    <button className="btn btn-primary mb-4" onClick={()=>this.setState({showFormModal: true})}>Add Record</button>
                </div>
                
                {employees && <EmployeesTable employees={employees} handleFetchEmployees={this.handleFetchEmployees} showConfirmDeleteModal={this.showConfirmDeleteModal}/>}

                {showFormModal &&
                    <FormModal
                        show={showFormModal} 
                        formInputs={formInputs} 
                        handleCloseModal={this.handleCloseModal} 
                        handleFetchEmployees={this.handleFetchEmployees}
                        action={"Insert"}
                    />
                }
            </Container>
        )
    }
}

export default ViewRecords;