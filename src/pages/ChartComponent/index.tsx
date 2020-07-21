import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './styles.css';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface StatusProdutos {
	status: string;
}

const ChartComponent = () => {

	const [statusPending, setPendingStatus] = useState<string[]>([]);
	const [statusProcessing, setProcessingStatus] = useState<string[]>([]);
	const [statusOnHold, setOnHoldStatus] = useState<string[]>([]);
	const [statusCompleted, setCompletedStatus] = useState<string[]>([]);
	const [statusCancelled, setCancelledStatus] = useState<string[]>([]);
	const [statusRefunded, setRefundedStatus] = useState<string[]>([]);
	var chartData = [];

	useEffect(()=> {
		// Pending Effect
		axios.get<StatusProdutos[]>('https://vollpilates.com.br/wp-json/wc/v1/orders?filter[posts_per_page]=-1&status=pending&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
		.then(response => {
			const pending = response.data.map(order => order.status);
			setPendingStatus(pending);
		});
		// Processing Effect
		axios.get<StatusProdutos[]>('https://vollpilates.com.br/wp-json/wc/v1/orders?filter[posts_per_page]=-1&status=processing&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
		.then(response => {
			const processing = response.data.map(order => order.status);
			setProcessingStatus(processing);
		});
		// On-Hold Effect
		axios.get<StatusProdutos[]>('https://vollpilates.com.br/wp-json/wc/v1/orders?filter[posts_per_page]=-1&status=on-hold&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
		.then(response => {
			const onHold = response.data.map(order => order.status);
			setOnHoldStatus(onHold);
		});
		// Completed Effect
		axios.get<StatusProdutos[]>('https://vollpilates.com.br/wp-json/wc/v1/orders?filter[posts_per_page]=-1&status=completed&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
		.then(response => {
			const completed = response.data.map(order => order.status);
			setCompletedStatus(completed);
		});
		// Cancelled Effect
		axios.get<StatusProdutos[]>('https://vollpilates.com.br/wp-json/wc/v1/orders?filter[posts_per_page]=-1&status=cancelled&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
		.then(response => {
			const cancelled = response.data.map(order => order.status);
			setCancelledStatus(cancelled);
		});
		// Refunded Effect
		axios.get<StatusProdutos[]>('https://vollpilates.com.br/wp-json/wc/v1/orders?filter[posts_per_page]=-1&status=refunded&consumer_key=ck_9dd3ba58c6c5120ceb1de771d08038055da2cb27&consumer_secret=cs_a0bb9ce335fe159a9f9c30c7ebe079ace00bb55e')
		.then(response => {
			const refunded = response.data.map(order => order.status);
			setRefundedStatus(refunded);
		});
	});

	chartData.push({label: "Pendente", y: statusPending.length});
	chartData.push({label: "Processando", y: statusProcessing.length});
	chartData.push({label: "Aguardando", y: statusOnHold.length});
	chartData.push({label: "Concluído", y: statusCompleted.length});
	chartData.push({label: "Cancelado", y: statusCancelled.length});
	chartData.push({label: "Reembolsado", y: statusRefunded.length});

	const options = {
		title: {
		text: ""
		},
		data: [{				
				type: "bar",
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