import React, { Fragment } from 'react';
import './App.css';
import User from './components/User';
import SignIn from './components/SignIn';

function App(props) {

    debugger;
   /* const useQuery = () => new URLSearchParams(props.location.search);
    const query = useQuery();
    const code = query.get('code');
    if (code ) {
            sessionStorage.setItem("token", code);
        }*/
    if (props.location && props.location.hash) {
        console.log(props.location.hash);
        const tokenArr = props.location.hash.split("&");
        if(tokenArr.length > 0) {
            const token = tokenArr[0]
                .replace("#id_token=", "").replace("#access_token=", "")
            sessionStorage.setItem("token", token);
        }
    }

    const sessionToken = sessionStorage.getItem("token")

    const isValid =  sessionToken != undefined &&  sessionToken.length>0 ;



    return (
        <Fragment>
            {
                isValid &&
                <User/>
            }
            {
                !isValid &&
                <SignIn/>
            }

        </Fragment>

    );
}

export default App;
