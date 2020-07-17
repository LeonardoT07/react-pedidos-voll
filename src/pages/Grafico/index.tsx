import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import { Link } from 'react-router-dom';

const Grafico = () => {
    return(
        <div className="container">
            <div id="header-pedidos">
                <div className="col-9">
                    <h1>Gráfico</h1>
                </div>
                <div className="col-3">
                    <Link to="/">
                        <strong>Lista de Pedidos</strong>
                    </Link> 
                </div>
            </div>
        </div>
    );
}

export default Grafico;