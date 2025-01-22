import React, { Component } from "react";
import { Table } from "react-bootstrap";

export class Department extends Component {

    constructor(props) {
        super(props)
        this.state = { deps: [] }
    }

    componentDidMount(){
        this.refreshList()
    }

    refreshList() {
        fetch('https://localhost:44303/api/department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data})
        })
    }

    render() {
        const { deps } = this.state
        return (
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
        );
    }
}