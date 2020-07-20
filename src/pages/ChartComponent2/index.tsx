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

const ChartComponent2 = () => {

	const [produtos, setProdutos] = useState<string[]>([]);
	const [quantVendidos, setQuantVendidos] = useState<number[]>([]);
	const [filtroOptions, setFiltroOptions] = useState(10);

	var chartData = [];
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


	function handleSelectedOption(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
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
	for (let i = 0; i < filtroOptions; i++) {
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
			<div id="chart-options">
				<div className="options">
					<ul>
						<li id="todos" 
							onClick={handleSelectedOption}>Todos</li>
						<li id="top10"
							className="ativo" 
							onClick={handleSelectedOption}>Top 10</li>
						<li id="cres" 
							onClick={handleSelectedOption}>Ordem Crescente</li>
						<li id="desc" 
							className="ativo"
							onClick={handleSelectedOption}>Ordem Decrescente</li>
					</ul>
				</div>
			</div>
			<CanvasJSChart options = {options} />
		</div>
	);
}

export default ChartComponent2;