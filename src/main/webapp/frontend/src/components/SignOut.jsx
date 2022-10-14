import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

function SignOut(props) {
    const [isLogin, logOut] = useState(
       false
    );
    function callDelete() {
        sessionStorage.clear();
        logOut(true)
    }
    return (
        <div>
            
            <Link to="/" onClick={callDelete}>
                <Button
                    variant="danger"
                    style={{ "marginLeft": "20px" }}>
                         SignOut
                 </Button>
            </Link>
        </div>

    );
}

export default SignOut
