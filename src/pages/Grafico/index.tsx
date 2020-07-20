import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import ChartComponent from '../ChartComponent';
import ChartComponent2 from '../ChartComponent2';

const Grafico = () => {
    return(
        <div>
            <div className="container">
                <div id="header-pedidos">
                    <div className="col-9">
                        <h1>Gráfico de Pedidos</h1>
                    </div>
                    <div className="col-3">
                        <Link to="/">
                            <strong>Lista de Pedidos</strong>
                        </Link> 
                    </div>
                </div>
            </div>

            {/* GRAFICO DE PEDIDOS */}
            <ChartComponent2 />
        </div>
    );
}

export default Grafico;