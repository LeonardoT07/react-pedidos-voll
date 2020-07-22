import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import ChartComponent from '../ChartGeralComponent';
import StatusComponent from '../ChartStatusComponent';

const Grafico = () => {
    return(
        <div>
            <div className="container">
                <div id="header-pedidos">
                    <div className="col-9">
                        <h1>Gráfico de Pedidos</h1>
                    </div>
                    <div className="col-3">
                        <Link to="/lista-pedidos">
                            <strong>Listar Pedidos</strong>
                        </Link> 
                    </div>
                </div>
            </div>

            {/* GRAFICO DE PEDIDOS */}
            <ChartComponent />
            <StatusComponent />
        </div>
    );
}

export default Grafico;