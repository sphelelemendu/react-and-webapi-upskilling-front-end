import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, FormGroup } from "react-bootstrap";
import { IconButton, Snackbar } from "@mui/material";
import { getIconButtonUtilityClass } from "@mui/material";

export class EditEmpModal extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false })
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("https://localhost:44303/api/employee", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: event.target.EmployeeID.value,
                EmployeeName: event.target.EmployeeName.value,
                DepartmentName: event.target.DepartmentName.value,
                MailID: event.target.MailID.value,
                DOJ: event.target.DOJ.value,
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
    componentDidMount() {
        fetch("https://localhost:44303/api/department")
            .then(response => response.json())
            .then(data => {
                this.setState({ deps: data })
            });
        console.log(this.deps)
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
                            Edit Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit} >

                                    <Form.Group controlId="EmployeeID">
                                        <Form.Label>Employee ID</Form.Label>
                                        <Form.Control required disabled defaultValue={this.props.empid} name="EmployeeID" type="text" placeholder="Employee ID" />
                                    </Form.Group>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control required defaultValue={this.props.empname} name="EmployeeName" type="text" placeholder="Employee Name" />
                                    </Form.Group>
                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control defaultValue="Dafault" name="DepartmentName" as="select" placeholder="Department Name">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.DepartmentID} value={dep.DepartmentName}>{dep.DepartmentName}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="DOJ">
                                        <Form.Label>DOJ</Form.Label>
                                        <Form.Control required defaultValue={this.props.empdoj} name="DOJ" type="date" placeholder="Date of join" />
                                    </Form.Group>


                                    <Form.Group controlId="MailID">
                                        <Form.Label>MailID</Form.Label>
                                        <Form.Control required defaultValue={this.props.empmailid} name="MailID" type="text" placeholder="Mail ID" />
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button variant="primary" type="submit">Save Changes</Button>
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