import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './home';
import App from './App';
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/nomatch'
import City from "./pages/city";
import Order from "./pages/order";
import Employee from "./pages/employee";
import BicycleMap from "./pages/map";

export default class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/ui/buttons" component={Buttons} />
                                <Route path="/city" component={City} />
                                <Route path="/order" component={Order} />
                                <Route path="/employee" component={Employee} />
                                <Route path="/bikemap" component={BicycleMap} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                </App>
            </HashRouter>
        );
    }
}