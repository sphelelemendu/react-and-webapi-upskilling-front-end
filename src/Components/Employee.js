import React, { Component } from "react";
import { ButtonToolbar, Table } from "react-bootstrap";
import { Button, ButtonToolBar } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {
    constructor(props) {
        super(props)
        this.state = { emps: [], AddModalShow: false, EditModalShow: false }
    }
    componentDidMount() {
        this.refreshList()
    }

    refreshList() {
        fetch('https://localhost:44303/api/employee')
            .then(response => response.json())
            .then(data => {
                this.setState({ emps: data })
            });
    }
    componentDidUpdate() {
        this.refreshList();
    }

    deleteEmp(empid) {
        if (window.confirm("Are you sure?")) {
            fetch("https://localhost:44303/api/employee/" + empid, {
                method: 'Delete',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },

            }

            )
        }
    }
    render() {

        let AddModalClose = () => this.setState({ AddModalShow: false });
        let EditModalClose = () => this.setState({ EditModalShow: false });
        const { emps, empid, empname,empdepartmentname,empmailid,empdoj } = this.state;
        return (
            <div className="container mt-4">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Mail ID</th>
                            <th>Date Of Join</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.MailID}</td>
                                <td>{emp.DOJ}</td>
                                <td><ButtonToolbar>
                                    <Button className="mr-5" variant="info" onClick={() => this.setState({ EditModalShow: true, empid: emp.EmployeeID, empname: emp.EmployeeName,empdepartmentname: emp.Department, empmailid: emp.MailID, empdoj:emp.DOJ })}>
                                        Edit
                                    </Button>
                                    <Button className="ml-2" variant="danger" onClick={() => this.deleteEmp(emp.EmployeeID)}>
                                        Delete
                                    </Button>
                                    <EditEmpModal
                                        show={this.state.EditModalShow}
                                        onHide={EditModalClose}
                                        empid={empid}
                                        empdepartmentname={empdepartmentname}
                                        empmailid={empmailid}
                                        empdoj={empdoj}
                                        empname={empname} />


                                </ButtonToolbar></td>
                            </tr>

                        )}

                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ AddModalShow: true })
                    }>Add Employee</Button>
                </ButtonToolbar>
                <AddEmpModal show={this.state.AddModalShow} onHide={AddModalClose} />
            </div>
        );
    }
}