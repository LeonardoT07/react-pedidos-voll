import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import './styles.css';
import { Link } from 'react-router-dom';

interface OrdersItems {
    id: string;
    status: string;
    total: string;
    line_items: [{
        id: number;
        name: string;
        quantity: number;
        price: string;
    }]
    lenght: number;
}

const CreatePoint = () => {

    const [pedidos, setPedidos] = useState<OrdersItems[]>([]);

    useEffect( () => {
        axios.get<OrdersItems[]>('https://vollpilates.com.br/wp-json/wc/v1/orders?filter[posts_per_page]=-1&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
        .then(response => {
            const lineItems = response.data.map(order => order);
            setPedidos(lineItems);
        });
    }, []);

    return(
        <div className="container">
            <div id="header-pedidos">
                <div className="col-9">
                    <h1>Lista de Pedidos</h1>
                    <h3>Total de Pedidos - {pedidos.length}</h3>

                </div>
                <div className="col-3">
                    <Link to="/grafico">
                        <strong>Visualizar Gráfico</strong>
                    </Link> 
                </div>
            </div>
            <div className="pedidos">
            <Suspense fallback={<h1>Carregando...</h1>}>
                {pedidos.map(pedido => (
                    <ul key={pedido.id} className="each-order">
                        <span><strong>ID:</strong> {pedido.id}</span><br/>
                        <span className="stats-order"><strong>Status:</strong> {pedido.status}</span><br/>
                        <span><strong>VALOR TOTAL:</strong> R$ {pedido.total}</span><br/>

                        <div className="courses">
                        <p><strong>Cursos Adquiridos:</strong></p>
                        {pedido.line_items.map(item => (
                            <li key={item.id} className="each-item">
                                <p>{item.quantity} - {item.name} | Preço: R$ {item.price} (<strong>ID: {item.id}</strong>)</p>
                            </li>
                        ))}
                        </div>
                    </ul>
                ))}
                </Suspense>
            </div>
        </div>
    );
}

export default CreatePoint;