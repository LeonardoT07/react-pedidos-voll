import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface NomeProdutos {
	name: string;
}
interface QuantidadeProdutosVendidos {
	total_sales: number;
}

const ChartComponent2 = () => {

	const [produtos, setProdutos] = useState<string[]>([]);
	const [quantVendidos, setQuantVendidos] = useState<number[]>([]);

    useEffect( () => {
        axios.get<NomeProdutos[]>('https://vollpilates.com.br/wp-json/wc/v1/products?filter[posts_per_page]=-1&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
        .then(response => {
			const produtosVOLLNome = response.data.map(order => order.name);
			setProdutos(produtosVOLLNome);
        });
	}, []);

	useEffect(() => {
		axios.get<QuantidadeProdutosVendidos[]>('https://vollpilates.com.br/wp-json/wc/v1/products?filter[posts_per_page]=-1&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
        .then(response => {
			const quantVendidosVOLL = response.data.map(order => order.total_sales);
			setQuantVendidos(quantVendidosVOLL);
        });
	}, []);



    const chartData = [];

    var aux, aux2;
    var troca = true;


    while (troca) {
        troca = false;            
        for (var i = 0; i < quantVendidos.length - 1; i++) {
            if (quantVendidos[i] < quantVendidos[i + 1]) {
                aux = quantVendidos[i];
                quantVendidos[i] = quantVendidos[i + 1];
                quantVendidos[i + 1] = aux;

                aux2 = produtos[i];
                produtos[i] = produtos[i + 1];
                produtos[i + 1] = aux2;
                troca = true;
            }
        }
    }

	// Algoritmo para Preencher os Arrys
	for (let i = 0; i < 10; i++) {
		if(quantVendidos[i] > 0){
			chartData.push({label: produtos[i], y: quantVendidos[i]});
		}
	}


	const options = {
		title: {
		text: ""
		},
		data: [{				
				type: "column",
				dataPoints: chartData
		}]
	}


	return(
		<div>
			<CanvasJSChart options = {options} />
		</div>
	);
}

export default ChartComponent2;