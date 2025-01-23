import React, { Component } from "react";
import { ButtonToolbar, Table } from "react-bootstrap";
import { Button, ButtonToolBar } from "react-bootstrap";
import { AddDepModal } from "./AddDepModal";
export class Department extends Component {

    constructor(props) {
        super(props)
        this.state = { deps: [], AddModalShow: false }
    }

    componentDidMount() {
        this.refreshList()
    }

    refreshList() {
        fetch('https://localhost:44303/api/department')
            .then(response => response.json())
            .then(data => {
                this.setState({ deps: data })
            });
    }
    componentDidUpdate(){
        this.refreshList();
    }

    render() {
        let AddModalClose = () => this.setState({ AddModalShow: false });
        const { deps } = this.state;
        return (
            <div className="container mt-4">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td>{dep.DepartmentID}</td>
                                <td>{dep.DepartmentName}</td>
                            </tr>

                        )}

                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ AddModalShow: true })
                    }>Add Department</Button>
                </ButtonToolbar>
                <AddDepModal show ={this.state.AddModalShow} onHide ={AddModalClose} />
            </div>

        );
    }
}