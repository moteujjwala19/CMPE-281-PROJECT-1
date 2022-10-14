import React, { PureComponent } from 'react'
import { service } from '../services/service';
import { Card, Button } from 'react-bootstrap';

const jwt = require('jsonwebtoken');


class Upload extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            files: [],
            descr: "",
            result: ""
        }
        this.upload = this.upload.bind(this);
    }



    render() {
        return (
            <div>
                <Card className="text-center" style={{ margin: '5rem 10rem 2rem 10rem'}} >
                    <Card.Header
                        style={{
                            backgroundColor: 'lightblue',
                            width: '57rem',
                            height: '80px',
                            justifyContent: "center",
                            margin: '20px'
                        }}> File Upload Result: {this.state.result} </Card.Header>
                    <Card.Body>
                        <input type="file" style={{"marginLeft": "21px"}} onChange={e => this.setState({
                            files: e.target.files
                        })}> 
                        </input>
                       <a  style={{"marginLeft": "41px"}}>
                       <input
                            value={this.state.descr}
                            onChange={e => this.setState({
                                descr: e.target.value
                            })}
                            placeholder="Description"
                            type="text"
                            name="Description"
                        />
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <Button style={{backgroundColor: 'green'}} onClick={this.upload} style={{"padding": "6px"}}>Upload</Button>
                       </a>
                        
                    </Card.Body>
                </Card>

            </div>
        )
    }

    upload() {
        const userData = this.props.user
        const files = this.state.files;
        if (files.length > 0) {
            service.uploadFile(files[0], userData, this.state.descr)
                .then(json => {
                    this.setState({
                        result: "File Uploaded successfully...!!"
                    });
                    setTimeout(()=> {
                            this.props.refreshData(userData);
                    }, 500);

                })
                .catch(reason => {
                    console.log(reason);
                    this.props.refreshData(userData);
                });
        }
    }
}

export default Upload