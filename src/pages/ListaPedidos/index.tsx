import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';


interface OrdersItems {
    id: string;
    status: string;
    line_items: [{
        id: number;
        name: string;
        price: string;
    }]
}

const CreatePoint = () => {

    const [pedidos, setPedidos] = useState<OrdersItems[]>([]);

    useEffect( () => {
        axios.get<OrdersItems[]>('https://vollpilates.com.br/wp-json/wc/v1/orders?filter[posts_per_page]=-1&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
        .then(response => {
            const lineItems = response.data.map(order => order);
            console.log(lineItems);
            setPedidos(lineItems);
        });
    }, []);

    return(
        <div>
            <div id="header-pedidos">
                <h1>Lista de Pedidos</h1>
            </div>
            <div className="pedidos">
                {pedidos.map(pedido => (
                    <ul key={pedido.id} className="each-order">
                        <span><strong>ID:</strong> {pedido.id}</span><br/>
                        <span className="stats-order"><strong>Status:</strong> {pedido.status}</span>

                        <div className="courses">
                        <p><strong>Cursos Adquiridos:</strong></p>
                        {pedido.line_items.map(item => (
                            <li key={item.id} className="each-item">
                                <p>{item.name} | Preço: {item.price}</p>
                            </li>
                        ))}
                        </div>
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default CreatePoint;