import React, { Component } from "react";
import { ButtonToolbar, Table } from "react-bootstrap";
import { Button, ButtonToolBar } from "react-bootstrap";
import { AddDepModal } from "./AddDepModal";
import { EditDepModal } from "./EditDepModal";
export class Department extends Component {

    constructor(props) {
        super(props)
        this.state = { deps: [], AddModalShow: false, EditModalShow: false }
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

    deleteDep(depid){
        if(window.confirm("Are you sure?")){
            fetch("https://localhost:44303/api/department/"+depid,{
                method:'Delete',
                headers: {'Accept':'application/json', 'Content-Type':'application/json'},
        
            }

            )}
    }

    render() {
        let AddModalClose = () => this.setState({ AddModalShow: false });
        let EditModalClose = () => this.setState({ EditModalShow: false });
        const { deps,depid,depname } = this.state;
        return (
            <div className="container mt-4">
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td>{dep.DepartmentID}</td>
                                <td>{dep.DepartmentName}</td>
                                <td><ButtonToolbar>
                                    <Button className="mr-5" variant="info" onClick={()=> this.setState({EditModalShow:true, depid:dep.DepartmentID,depname:dep.DepartmentName})}>
                                        Edit
                                    </Button>
                                    <Button className="ml-2" variant="danger" onClick={()=> this.deleteDep(dep.DepartmentID)}>
                                        Delete
                                    </Button>
                                    <EditDepModal
                                    show={this.state.EditModalShow}
                                    onHide={EditModalClose}
                                    depid = {depid}
                                    depname = {depname}/>


                                    </ButtonToolbar></td>
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