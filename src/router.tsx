import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './pages/Home';
import ListaPedidos from './pages/ListaPedidos';
import Grafico from './pages/Grafico';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Grafico} path="/" exact />
                <Route component={Home} path="/home-segreta"/>
                <Route component={ListaPedidos} path="/lista-pedidos"/>
                <Route component={() => (<h1>Página 404</h1>)} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;