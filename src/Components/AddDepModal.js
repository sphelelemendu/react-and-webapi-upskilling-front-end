import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, FormGroup } from "react-bootstrap";
import { IconButton, Snackbar } from "@mui/material";
import { getIconButtonUtilityClass } from "@mui/material";

export class AddDepModal extends Component {

    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false })
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("https://localhost:44303/api/department", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentID: null,
                DepartmentName: event.target.DepartmentName.value
            })
        }

        ).then(res => res.json())
            .then((result) => {
                this.setState({snackbaropen:true, snackbarmsg: result})
            },
                (error) => {
                    this.setState({snackbaropen:true, snackbarmsg: "Failed"})
                })
    }

    render() {

        return (
            <div className="container">

                <Snackbar anchorOrigin={{vertical:"top",horizontal:"left"}} 
                autoHideDuration={250}
                onClose={this.state.snackbarClose}
                message={<span id= "messageId">{this.state.snackbarmsg}</span>}
                open={this.state.snackbaropen}
                action ={[
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
                            Add Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit} >
                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control required name="DepartmentName" type="text" placeholder="Department Name" />
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button variant="primary" type="submit">Add Department</Button>
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