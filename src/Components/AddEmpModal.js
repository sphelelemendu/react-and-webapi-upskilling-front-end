import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, FormGroup } from "react-bootstrap";
import { IconButton, Snackbar } from "@mui/material";
import { getIconButtonUtilityClass } from "@mui/material";

export class AddEmpModal extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false })
    }

    componentDidMount() {

        fetch("https://localhost:44303/api/department")
            .then(response => response.json())
            .then(data => {
                this.setState({ deps: data })
            });
        console.log(this.deps)
    }

    handleSubmit(event) {
        event.preventDefault();
        const { EmployeeName, DepartmentName, MailID, DOJ } = event.target.elements;
        console.log("EmployeeName:", EmployeeName.value); console.log("Department:", DepartmentName.value); console.log("MailID:", MailID.value); console.log("DOJ:", DOJ.value);
        fetch("https://localhost:44303/api/employee", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: null,
                EmployeeName: EmployeeName.value,
                DepartmentName: DepartmentName.value,
                MailID: MailID.value,
                DOJ: DOJ.value,

            })
        }

        ).then(res => res.json())
            .then((result) => {
                this.setState({ snackbaropen: true, snackbarmsg: result })
            },
                (error) => {
                    this.setState({ snackbaropen: true, snackbarmsg: "Failed" })
                })
    }

    render() {


        return (
            <div className="container">

                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    autoHideDuration={250}
                    onClose={this.state.snackbarClose}
                    message={<span id="messageId">{this.state.snackbarmsg}</span>}
                    open={this.state.snackbaropen}
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherent" onClick={this.snackbarClose} >
                            x
                        </IconButton>
                    ]}
                />
                <Modal
                    show={this.props.show} onHide={this.props.onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit} >
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control required name="EmployeeName" type="text" placeholder="Employee Name" />
                                    </Form.Group>
                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select" name="DepartmentName" defaultValue="Default" >
                                            {this.state.deps.map(dep =>


                                                <option key={dep.DepartmentID} value={dep.EmployeeName}>{dep.DepartmentName}</option>

                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="MailID">
                                        <Form.Label>Mail ID</Form.Label>
                                        <Form.Control required name="MailID" type="text" placeholder="Mail ID" />
                                    </Form.Group>
                                    <Form.Group controlId="DOJ">
                                        <Form.Label>Date Of Join</Form.Label>
                                        <Form.Control required name="DOJ" type="date" placeholder="Date Of Join" />
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button variant="primary" type="submit">Add Employee</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );

    }

}