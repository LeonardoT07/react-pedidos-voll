import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './styles.css';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface NomeProdutos {
	name: string;
}
interface QuantidadeProdutosVendidos {
	total_sales: number;
}
interface QuantidadeProdutosVendidos2 {
	quantity: number;
}

const ChartComponent2 = () => {

	const [produtos, setProdutos] = useState<string[]>([]);
	const [quantVendidos, setQuantVendidos] = useState<number[]>([]);
	const [filtroOptions, setFiltroOptions] = useState(10);

	const [produtosPeriodo, setProdutosPeriodo] = useState<string[]>([]);
	const [quantVendidosPeriodo, setQuantVendidosPeriodo] = useState<number[]>([]);
	const [periodo, setPeriodo] = useState("week");

	var chartData = [];
	var chartData2 = [];
    var aux, aux2;
    var troca = true;

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

	useEffect( () => {
        axios.get<NomeProdutos[]>(`https://vollpilates.com.br/wp-json/wc/v1/reports/top_sellers?period=week&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e`)
        .then(response => {
			const produtosNomePeriodo = response.data.map(order => order.name);
			setProdutosPeriodo(produtosNomePeriodo);
		});
	}, []);

	useEffect(() => {
		axios.get<QuantidadeProdutosVendidos2[]>(`https://vollpilates.com.br/wp-json/wc/v1/reports/top_sellers?period=week&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e`)
        .then(response => {
			const quantVendidosPeriodo = response.data.map(order => order.quantity);
			setQuantVendidosPeriodo(quantVendidosPeriodo);
        });
	}, []);

	function handleValueOption(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
		if(event.currentTarget.textContent === "Todos"){
			if(event.currentTarget.className === "ativo"){
				event.currentTarget.classList.remove("ativo");
				setFiltroOptions(10);
				document.getElementById('top10')?.classList.add("ativo");
			} else {
				event.currentTarget.classList.add("ativo");
				setFiltroOptions(quantVendidos.length);
				document.getElementById('top10')?.classList.remove("ativo");
			}
		}

		if(event.currentTarget.textContent === "Top 10"){
			if(event.currentTarget.className === "ativo"){
				event.currentTarget.classList.remove("ativo");
				setFiltroOptions(quantVendidos.length);
				document.getElementById('todos')?.classList.add("ativo");
			} else {
				event.currentTarget.classList.add("ativo");
				setFiltroOptions(10);
				document.getElementById('todos')?.classList.remove("ativo");
			}
		}
	}

	function handleOrderOption(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
		if(event.currentTarget.textContent === "Ordem Crescente"){
			if(event.currentTarget.className === "ativo"){
				event.currentTarget.classList.remove("ativo");
				console.log("Ordem Decrescente");
				document.getElementById('desc')?.classList.add("ativo");
			} else {
				event.currentTarget.classList.add("ativo");
				console.log("Ordem Crescente");
				document.getElementById('desc')?.classList.remove("ativo");
			}
		}

		if(event.currentTarget.textContent === "Ordem Decrescente"){
			if(event.currentTarget.className === "ativo"){
				event.currentTarget.classList.remove("ativo");
				console.log("Ordem Crescente");
				document.getElementById('cres')?.classList.add("ativo");
			} else {
				event.currentTarget.classList.add("ativo");
				console.log("Ordem Decrescente");
				document.getElementById('cres')?.classList.remove("ativo");
			}
		}
	}

	function handlePeriodOption(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
		if(event.currentTarget.textContent === "Uma Semana"){
			event.currentTarget.classList.add("ativo");
			setPeriodo("month");
			document.getElementById('month')?.classList.remove("ativo");
			document.getElementById('last-month')?.classList.remove("ativo");
			document.getElementById('year')?.classList.remove("ativo");
			document.getElementById('todos')?.classList.remove("ativo");
			document.getElementById('top10')?.classList.add("ativo");
		}
		if(event.currentTarget.textContent === "Um Mês"){
			if(event.currentTarget.className === "ativo"){
				event.currentTarget.classList.remove("ativo");
				setPeriodo("week");
				document.getElementById('week')?.classList.add("ativo");
			} else {
				event.currentTarget.classList.add("ativo");
				setPeriodo("month");
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
				setPeriodo("week");
				document.getElementById('week')?.classList.add("ativo");
			} else {
				event.currentTarget.classList.add("ativo");
				setPeriodo("last_month");
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
				setPeriodo("week");
				document.getElementById('week')?.classList.add("ativo");
			} else {
				event.currentTarget.classList.add("ativo");
				setPeriodo("year");
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
	for (let i = 0; i < filtroOptions; i++) {
		if(quantVendidos[i] > 0){
			chartData.push({label: produtos[i], y: quantVendidos[i]});
		}
	}

	// Algoritmo para Preencher os Arrys
	for (let i = 0; i < filtroOptions; i++) {
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
				dataPoints: chartData
		}]
	}
	const options2 = {
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
			<div id="chart-options">
				<div className="options">
					<ul>
						<li id="todos" 
							onClick={handleValueOption}>Todos</li>
						<li id="top10"
							className="ativo" 
							onClick={handleValueOption}>Top 10</li>
						<li id="cres"
							className="desativado" 
							onClick={handleOrderOption}>Ordem Crescente</li>
						<li id="desc"
							className="desativado" 
							onClick={handleOrderOption}>Ordem Decrescente</li>
					</ul>
				</div>
				<div className="periods">
					<ul>
					<h4>Períodos:</h4>
						<li id="week"
							className="ativo"
							onClick={handlePeriodOption}>Uma Semana</li>
						<li id="month"
							onClick={handlePeriodOption}>Um Mês</li>
						<li id="last-month"
							onClick={handlePeriodOption}>Mês Passado</li>
						<li id="year"
							onClick={handlePeriodOption}>Um Ano</li>
					</ul>
				</div>
			</div>
			<div id="comPeriodo">
				<CanvasJSChart options = {options} />
			</div>
			<div id="semPeriodo">
				<CanvasJSChart options = {options2} />
			</div>
		</div>
	);
}

export default ChartComponent2;