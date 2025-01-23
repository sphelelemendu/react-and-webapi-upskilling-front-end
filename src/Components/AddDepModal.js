import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, FormGroup } from "react-bootstrap";

export class AddDepModal extends Component {

    constructor(props) {
        super(props);

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

        ).then(res=> res.json())
        .then((result)=>{
            alert(result)
        },
        (error)=>{
            alert("Failed")
        })
    }

    render() {

        return (
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
                    <h4>Centered Modal</h4>
                    <div className="container">
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


                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide} variant="danger">Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}