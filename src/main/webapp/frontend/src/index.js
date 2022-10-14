import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './components/User';
import SignIn from './components/SignIn';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';

import {createBrowserHistory} from 'history';


const browsingHistory =  createBrowserHistory();

const routing = (
    <BrowserRouter history={browsingHistory}>
        <div>
            <Switch>
                <Route path="/" component={App}/>
                <Route path="/login" component={SignIn}/>
                <Route path="/user" component={User} />

            </Switch>
        </div>
    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
