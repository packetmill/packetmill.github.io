function makeChart(packetApps) {

  var appSize = packetApps.map(function(d) {
    return d.Size;
  });
  var appPacketmill = packetApps.map(function(d) {
    return +d.PacketMill/1000000000;
  });

  var appFastClick = packetApps.map(function(d) {
    return +d.FastClick_CPY/1000000000;
  });

  var appVPP = packetApps.map(function(d) {
    return +d.VPP/1000000000;
  });

   var appFastClick_Light = packetApps.map(function(d) {
    return +d.FastClick_OVRLY/1000000000;
  });

   var appBESS = packetApps.map(function(d) {
    return +d.BESS/1000000000;
  });



  var chart = new Chart('comparison-result-canvas', {
    type: "line",
	data: {
		labels: appSize,
		datasets: [
			{
				label: 'PacketMill',
				backgroundColor: window.chartColors.blue_kth,
				borderColor: window.chartColors.blue_kth,
				borderDash: [5, 1],
				pointRadius: 4,
				pointHoverRadius: 6,
          		data: appPacketmill,
          		fill: false,
        	},
			{
				label: 'BESS',
				backgroundColor: window.chartColors.brewer_red2,
				borderColor: window.chartColors.brewer_red2,
				borderDash: [3, 3],
          		data: appBESS,
          		fill: false,
        	},  
			{
				label: 'FastClick',
				backgroundColor: window.chartColors.brewer_blue4,
				borderColor: window.chartColors.brewer_blue4,
				borderDash: [5, 10],
          		data: appFastClick,
          		fill: false,
        	},
			{
				label: 'VPP',
				backgroundColor: window.chartColors.brewer_red1,
				borderColor: window.chartColors.brewer_red1,
				borderDash: [2, 2],
          		data: appVPP,
          		fill: false,
        	}, 
			// {
			// 	label: 'FastClick (Light)',
			// 	backgroundColor: window.chartColors.brewer_blue2,
			// 	borderColor: window.chartColors.brewer_blue2,
			// 	borderDash: [10, 5],
   //        		data: appFastClick_Light,
   //        		fill: false,
   //      	},   	
      	]
    	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: true,
			text: 'PacketMill vs. Other Packet Processing Frameworks'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Packet Size (Byte)'
				},
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Throughput (Gbps)'
				},
				ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    beginAtZero: true
                }
			}]
		},
    legend: {
      labels: {
        generateLabels: chart => chart.data.datasets.map((dataset, i) => ({
          datasetIndex: i,
          text: dataset.label,
          fillStyle: dataset.backgroundColor,
          strokeStyle: dataset.borderColor
        }))        
      }
    },
	}
  });
}

// Request data using D3
d3
  .csv("/data/throughput.csv")
  .then(makeChart);