import React from 'react'
import { Button, Navbar, Card ,Table} from "react-bootstrap";
import { useRouteMatch } from 'react-router-dom';
import { Panel } from 'react-bootstrap';




function SignIn() {

    return (
        <div style={{ width: '58rem', margin: "100px", justifyContent: "center"}}
           >
            <Navbar  style={{
                backgroundColor: 'lightblue',
                width: '58rem',
                height: '80px',
                justifyContent: "center",
                margin: '20px'
            }}>
                <Navbar.Brand>Welcome to Dropbox</Navbar.Brand>
            </Navbar>
            <Button style={{backgroundColor: 'green',margin: '50px'}}
                    variant="primary" href="https://dropboxum.auth.us-west-1.amazoncognito.com/login?client_id=4r0coa7tau6v2c304uiuhgerjh&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http://localhost:3000/">
                SignIn / SignUp
            </Button>


        </div>

    )
}

export default SignIn
