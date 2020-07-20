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

const ChartComponent = () => {

	const [produtos, setProdutos] = useState<string[]>([]);
	const [quantVendidos, setQuantVendidos] = useState<number[]>([]);

    useEffect( () => {
        axios.get<NomeProdutos[]>('https://vollpilates.com.br/wp-json/wc/v1/products?filter[posts_per_page]=-1&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
        .then(response => {
			const produtosVOLLNome = response.data.map(order => order.name);
			console.log(produtosVOLLNome);
			setProdutos(produtosVOLLNome);
        });
	}, []);

	useEffect(() => {
		axios.get<QuantidadeProdutosVendidos[]>('https://vollpilates.com.br/wp-json/wc/v1/products?filter[posts_per_page]=-1&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
        .then(response => {
			const quantVendidosVOLL = response.data.map(order => order.total_sales);
			console.log(quantVendidosVOLL);
			setQuantVendidos(quantVendidosVOLL);
        });
	}, []);

	/*
	for (let i = 0; i < produtos.length; i++) {
		chartData.push({label: produtos[i], y: quantVendidos[i]})
	}*/

	const chartData = [{ label: "", y: 0}]
	var valorMaior = 0;
	var nomeValorMaior = "";

	for (let i = 0; i < 10; i++) {
		for(let j = 0; j < quantVendidos.length; j++){
			if(quantVendidos[i] <= quantVendidos[j]){
				valorMaior = quantVendidos[j];
				nomeValorMaior = produtos[j];
			}
		}
		chartData.push({label: nomeValorMaior, y: valorMaior})
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

export default ChartComponent;