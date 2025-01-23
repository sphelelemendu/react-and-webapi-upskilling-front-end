import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class AddDepModal extends Component {

    constructor(props) {
        super(props);

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


                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide} variant="danger">Close</Button>
                </Modal.Footer>
            </Modal>
        ); 
    }
}