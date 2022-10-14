import React, { PureComponent } from 'react'
import { Button, Navbar, Table } from "react-bootstrap";
import { service } from '../services/service';
import Upload from './Upload';
import SignOut from './SignOut';
import SignIn from './SignIn';
var jwt = require('jsonwebtoken');


class User extends PureComponent {
    constructor(props) {
        super(props)

         this.state = {
            userDataDynamo: [],
            desc: "",
            isAdmin: false,
             userData: undefined,
             result: ""
        }
        this.setDescription = this.setDescription.bind(this)
        this.getUserData = this.getUserData.bind(this)
    }



    getUserData(user) {
        service.getUserData(user)
            .then(json => {
                 if (Array.isArray(json)) {
                    this.setState({
                        userDataDynamo: json
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from DB: ", reason);
            });
    }

    componentDidMount() {

        var token = sessionStorage.getItem("token");
        var decoded = jwt.decode(token);
       // const isAdmin = false;
       //alert(decoded);

        var decoded = jwt.decode(token, { complete: true });

        const userObj = decoded.payload;
        this.setState({
            userData: userObj
        })
        //if(userObj!=null && userObj.sub=="aa75b83f-e148-47b5-8156-91d6e243a7b2") {
          //  isAdmin = true;
            console.log("ujwala is admin");
        //}
        const isAdmin = userObj!=null && userObj.sub=="aa75b83f-e148-47b5-8156-91d6e243a7b2"

        this.setState({ isAdmin });
        setTimeout(()=> {
            if (isAdmin){
                const isAdmin = true;
                this.getUserData(this.state.userData.email,isAdmin)
            } else {
                this.getUserData(this.state.userData.email,isAdmin);
            }
        }, 500);

        service.getUserDetails()
    }

    setDescription(d) {
        this.setState({
            desc: d
        })
    }
    onDownLoad(file) {
        window.open("https://d3stz261h681i8.cloudfront.net/" + file);
    }

    onDelete(fileName, id) {
        service.deleteFile(fileName, id)
            .then(json => {
                console.log(json);
                this.setState({
                    result: "File Deleted successfully...!!"
                });
                setTimeout(()=> {
                if (this.state.isAdmin){
                    this.getUserData(this.state.userData.email);
                } else {
                    this.getUserData(this.state.userData.email);
                }
            }, 300);
                
            })
            .catch(reason => {
                console.log("Failed to delete, reason is : ", reason);
            });
    }




    render() {

        const { isAdmin } = this.state;

        return (

            <div>
                <Navbar style={{
                    backgroundColor: 'lightblue',
                    width: '78rem',
                    height: '80px',
                    justifyContent: "center",
                    margin: '20px'
                }}>
                    <Navbar.Brand>DropBox</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Welcome  &nbsp;&nbsp; {this.state.userData &&
                                <a href="#login">{this.state.userData.email}</a>}
                           {
                                isAdmin && <a> (Admin) </a>
                            }
                            {
                                !isAdmin && <a> (Non Admin)</a>
                            }
                        </Navbar.Text>
                    </Navbar.Collapse>
                    {this.state.userData && <SignOut></SignOut>}
                    {!this.state.userData && <SignIn></SignIn>}
                </Navbar>
                {
                    this.state.userData &&
                    <Upload
                        isAdmin={isAdmin}
                        desc={this.state.desc}
                        user={this.state.userData.email}
                        refreshData={e => this.getUserData(e)}
                    >
                    </Upload>
                }


                <div style={{ "margin": "50px"}}>
                    {/*{this.state.result}*/}
                    <Table striped bordered hover responsive>
                        <thead style={{
                            backgroundColor: 'lightblue',
                            width: '15rem',
                            height: '80px',
                            justifyContent: "center",
                            margin: '20px'
                        }}>
                            <tr key={0}>
                                {
                                    isAdmin &&
                                    <th>User Name</th>
                                }

                                <th>File Name</th>
                                <th>Description</th>
                                <th>File Upload Time</th>
                                <th>File Modified Time</th>
                                <th>Download</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.userDataDynamo.map(item => {
                                    return (
                                        <tr key={item.userId}>
                                            {
                                                isAdmin &&
                                                <td>{item.userNm}</td>

                                            }

                                            <td>{item.fileNm}</td>
                                            <td>{item.desc}</td>
                                            <td>{new Date(item.createdDt).toLocaleString()}</td>
                                            <td>{new Date(item.modifiedDt).toLocaleString()}</td>
                                            <td><Button style={{backgroundColor: 'green'}}  onClick={event => this.onDownLoad(item.fileNm)}>
                                              <text color={'white'}>  DownLoad</text>
                                            </Button></td>
                                            <td><Button   style={{backgroundColor: 'red'}}  onClick={event => this.onDelete(item.fileName, item.userId)}>
                                                Delete
                                            </Button></td>
                                        </tr>

                                    );
                                })
                            }

                        </tbody>
                    </Table>
                </div>

            </div>

        )
    }
}

export default User