import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface NomeProdutos {
	name: string;
}

interface QuantidadeProdutosVendidos2 {
	quantity: number;
}

const PeriodChart = () => {

	const [produtosPeriodo, setProdutosPeriodo] = useState<string[]>([]);
	const [quantVendidosPeriodo, setQuantVendidosPeriodo] = useState<number[]>([]);
    const [url, setUrl] = useState("https://vollpilates.com.br/wp-json/wc/v1/reports/top_sellers?period=week&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e");
	
	var chartData2 = [];
    var aux, aux2;
    var troca = true;

	useEffect( () => {
		axios.get<NomeProdutos[]>(url)
        .then(response => {
			const produtosNomePeriodo = response.data.map(order => order.name);
			setProdutosPeriodo(produtosNomePeriodo);
		});
	});

	useEffect(() => {
		axios.get<QuantidadeProdutosVendidos2[]>(url)
        .then(response => {
			const quantVendidosPeriodo = response.data.map(order => order.quantity);
			setQuantVendidosPeriodo(quantVendidosPeriodo);
        });
	});

	function handlePeriodOption(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
		if(event.currentTarget.textContent === "Uma Semana"){
			event.currentTarget.classList.add("ativo");
			chartData2 = [];
			setUrl("https://vollpilates.com.br/wp-json/wc/v1/reports/top_sellers?period=week&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e");
			document.getElementById('month')?.classList.remove("ativo");
			document.getElementById('last-month')?.classList.remove("ativo");
			document.getElementById('year')?.classList.remove("ativo");
			document.getElementById('todos')?.classList.remove("ativo");
			document.getElementById('top10')?.classList.add("ativo");
		}
		if(event.currentTarget.textContent === "Um Mês"){
			if(event.currentTarget.className === "ativo"){
				event.currentTarget.classList.remove("ativo");
				chartData2 = [];
				setUrl("https://vollpilates.com.br/wp-json/wc/v1/reports/top_sellers?period=week&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e");
				document.getElementById('week')?.classList.add("ativo");
			} else {
				event.currentTarget.classList.add("ativo");
				chartData2 = [];
				setUrl("https://vollpilates.com.br/wp-json/wc/v1/reports/top_sellers?period=month&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e");
				document.getElementById('week')?.classList.remove("ativo");
				document.getElementById('last-month')?.classList.remove("ativo");
				document.getElementById('year')?.classList.remove("ativo");
				document.getElementById('todos')?.classList.remove("ativo");
				document.getElementById('top10')?.classList.add("ativo");
			}
		}
		if(event.currentTarget.textContent === "Mês Passado"){
			if(event.currentTarget.className === "ativo"){
				event.currentTarget.classList.remove("ativo");
				chartData2 = [];
				setUrl("https://vollpilates.com.br/wp-json/wc/v1/reports/top_sellers?period=week&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e");
				document.getElementById('week')?.classList.add("ativo");
			} else {
				event.currentTarget.classList.add("ativo");
				chartData2 = [];
				setUrl("https://vollpilates.com.br/wp-json/wc/v1/reports/top_sellers?period=last_month&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e");
				document.getElementById('week')?.classList.remove("ativo");
				document.getElementById('month')?.classList.remove("ativo");
				document.getElementById('year')?.classList.remove("ativo");
				document.getElementById('todos')?.classList.remove("ativo");
				document.getElementById('top10')?.classList.add("ativo");
			}
		}
		if(event.currentTarget.textContent === "Um Ano"){
			if(event.currentTarget.className === "ativo"){
				event.currentTarget.classList.remove("ativo");
				chartData2 = [];
				setUrl("https://vollpilates.com.br/wp-json/wc/v1/reports/top_sellers?period=week&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e");
				document.getElementById('week')?.classList.add("ativo");
			} else {
				event.currentTarget.classList.add("ativo");
				chartData2 = [];
				setUrl("https://vollpilates.com.br/wp-json/wc/v1/reports/top_sellers?period=year&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e");
				document.getElementById('week')?.classList.remove("ativo");
				document.getElementById('month')?.classList.remove("ativo");
				document.getElementById('last-month')?.classList.remove("ativo");
				document.getElementById('todos')?.classList.remove("ativo");
				document.getElementById('top10')?.classList.add("ativo");
			}
		}
	}

	while (troca) {
		troca = false;            
		for (var j = 0; j < quantVendidosPeriodo.length - 1; j++) {
			if (quantVendidosPeriodo[j] < quantVendidosPeriodo[j + 1]) {
				aux = quantVendidosPeriodo[j];
				quantVendidosPeriodo[j] = quantVendidosPeriodo[j + 1];
				quantVendidosPeriodo[j + 1] = aux;

				aux2 = produtosPeriodo[j];
				produtosPeriodo[j] = produtosPeriodo[j + 1];
				produtosPeriodo[j + 1] = aux2;
				troca = true;
			}
		}
	}

	// Algoritmo para Preencher os Arrys
	for (let i = 0; i < 10; i++) {
		if(quantVendidosPeriodo[i] > 0){
			chartData2.push({label: produtosPeriodo[i], y: quantVendidosPeriodo[i]});
		}
	}

	const options = {
		title: {
		text: ""
		},
		data: [{				
				type: "column",
				dataPoints: chartData2
		}]
	}

	return(
		<div>			
			<div className="grafico-info">
				<h2>Grafico por Período</h2>
				<div className="periods">
					<ul>
						<li id="week"
							className="ativo"
							onClick={handlePeriodOption}>Uma Semana</li>
						<li id="month"
							className=""
							onClick={handlePeriodOption}>Um Mês</li>
						<li id="last-month"
							className=""
							onClick={handlePeriodOption}>Mês Passado</li>
						<li id="year"
							className=""
							onClick={handlePeriodOption}>Um Ano</li>
					</ul>
				</div>
				<CanvasJSChart options = {options} />
			</div>
		</div>
	);
}

export default PeriodChart;