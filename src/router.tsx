import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import ListaPedidos from './pages/ListaPedidos';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={ListaPedidos} path="/" exact />
            <Route component={Home} path="/home-segreta"/>
        </BrowserRouter>
    );
}

export default Routes;