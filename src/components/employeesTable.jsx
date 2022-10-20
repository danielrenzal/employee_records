import React, {Component} from 'react';
import {FaRegTrashAlt, FaEdit} from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import ConfirmDeleteModal from './confirmDeleteModal';
import FormModal from './formModal';

class EmployeesTable extends Component{
    state = {
        formInputs: {
            name: "",
            surname: "",
            email: "",
            phone: "",
            salary: "",
        },
        showFormModal: false,
        showConfirmDeleteModal: false,
        selectedEmployeeID: null, 
        selectedEmployeeName: null, 
        selectedEmployeeSurname: null, 
    }

    handleCloseModal = () => {
        this.setState({showConfirmDeleteModal: false, showFormModal: false});
    }

    handleEditModal = (employee) => {
        this.setState({showFormModal: true, formInputs: employee});
    }

    render(){
        const {employees, handleFetchEmployees} = this.props;
        const {formInputs, showFormModal, showConfirmDeleteModal, selectedEmployeeID, selectedEmployeeName, selectedEmployeeSurname} = this.state;
        
        return(
            <div>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.surname}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <FaRegTrashAlt 
                                        style={{color: "#D32F2F", cursor: "pointer", marginRight: "10px"}}
                                        onClick={()=>this.setState({
                                            showConfirmDeleteModal: true,
                                            selectedEmployeeID: employee.id, 
                                            selectedEmployeeName: employee.name, 
                                            selectedEmployeeSurname: employee.surname, 
                                        })}
                                    />
                                    <FaEdit
                                        style={{color: "#1976D2", cursor: "pointer"}}
                                        onClick={()=>this.handleEditModal(employee)}
                                    />
                                </td>
                            </tr>
                        ))
                    }</tbody>
                </Table>
                {employees.length <= 0 && <p className="text-center">No results</p>}
                
                {this.state.showConfirmDeleteModal && 
                    <ConfirmDeleteModal
                        show={showConfirmDeleteModal}
                        handleCloseModal={this.handleCloseModal}
                        handleFetchEmployees={handleFetchEmployees}
                        id={selectedEmployeeID}
                        name={selectedEmployeeName}
                        surname={selectedEmployeeSurname}
                    />
                }

                {showFormModal &&
                    <FormModal
                        show={showFormModal} 
                        formInputs={formInputs} 
                        handleCloseModal={this.handleCloseModal} 
                        handleFetchEmployees={handleFetchEmployees}
                        action={"Edit"}
                    />
                }
            </div>
            
        )
    }
}

export default EmployeesTable;