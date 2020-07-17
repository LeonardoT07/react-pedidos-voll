import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import ListaPedidos from './pages/ListaPedidos';
import Grafico from './pages/Grafico';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={ListaPedidos} path="/" exact />
            <Route component={Home} path="/home-segreta"/>
            <Route component={Grafico} path="/grafico"/>

        </BrowserRouter>
    );
}

export default Routes;