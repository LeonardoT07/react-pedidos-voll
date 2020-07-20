import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import ListaPedidos from './pages/ListaPedidos';
import Grafico from './pages/Grafico';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Grafico} path="/" exact />
            <Route component={Home} path="/home-segreta"/>
            <Route component={ListaPedidos} path="/lista-pedidos"/>

        </BrowserRouter>
    );
}

export default Routes;