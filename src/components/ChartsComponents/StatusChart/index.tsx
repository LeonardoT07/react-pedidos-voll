import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface OrdersItems {
    status: string;
}

const StatusChart = () => {

    const [pending, setPending] = useState<string[]>([]);
    const [processing, setProcessing] = useState<string[]>([]);
    const [onHold, setOnHold] = useState<string[]>([]);
    const [completed, setCompleted] = useState<string[]>([]);
    const [cancelled, setCancelled] = useState<string[]>([]);
    const [refunded, setRefunded] = useState<string[]>([]);
    var chartData = [];

    //pending, processing, on-hold, completed, cancelled, refunded, failed

    useEffect( () => {
        axios.get<OrdersItems[]>('https://vollpilates.com.br/wp-json/wc/v1/orders?filter[posts_per_page]=-1&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
        .then(response => {
            const lineItems = response.data.map(order => order.status);
            const statusPending = lineItems.filter(fil => fil === "pending");
            const statusProcessing = lineItems.filter(fil => fil === "processing");
            const statusOnHold = lineItems.filter(fil => fil === "on-hold");
            const statusCompleted = lineItems.filter(fil => fil === "completed");
            const statusCancelled = lineItems.filter(fil => fil === "cancelled");
            const statusRefunded = lineItems.filter(fil => fil === "refunded");
            setPending(statusPending);
            setProcessing(statusProcessing);
            setOnHold(statusOnHold);
            setCompleted(statusCompleted);
            setCancelled(statusCancelled);
            setRefunded(statusRefunded);
        });
    }, []);

    chartData.push({label: "Concluído", y: completed.length});
    chartData.push({label: "Processando", y: processing.length});
    chartData.push({label: "Aguardando", y: onHold.length});
    chartData.push({label: "Pendente", y: pending.length});
    chartData.push({label: "Cancelado", y: cancelled.length});
    chartData.push({label: "Reembolsado", y: refunded.length});

    const options = {
        theme: "light1", // "light1", "dark1", "dark2"
        title:{
            text: ""
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: [{y}]",		
            startAngle: -90,
            dataPoints: chartData
        }]
    }

    return(
        <div>
            <div className="grafico-info">
                <h2>Gráfico de Status</h2>
            </div>
            <CanvasJSChart options = {options} />
            <br/><br/><br/>
        </div>
    );
}

export default StatusChart;