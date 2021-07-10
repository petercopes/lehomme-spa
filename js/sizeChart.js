"use strict";

function InitSizeChart () {
    const sizeChartButton = document.querySelector('.sizeChartButton');
    const sizeChart = document.querySelector('.sizeChartContainer');
    const sizeTable = document.getElementById('sizingChart');
    const chartCloseButton = document.querySelector('.sizeChartExit');
    let onSizeTable = false;
    sizeChartButton.addEventListener('click', () => {
        onSizeTable = true;
        sizeChart.classList.add('sizeChartActivated');
    });
    chartCloseButton.addEventListener('click', exitSizeChart);
    window.addEventListener('click', () => {
        if ((sizeChart.classList.contains('sizeChartActivated')) && (!onSizeTable)) {
            exitSizeChart();
        }
    })


    document.addEventListener('keydown', (event) => {
        event = event || window.event;
        if (event.keyCode == 27) {
            exitSizeChart();
        }

    });
    sizeTable.addEventListener('mouseenter', () => {
        if (sizeChart.classList.contains('sizeChartActivated')) {
            onSizeTable = true;
        }



    });
    sizeTable.addEventListener('mouseleave', () => {
        if (sizeChart.classList.contains('sizeChartActivated')) {
            onSizeTable = false;
        }

    });



    function exitSizeChart() {
        sizeChart.classList.remove('sizeChartActivated');
    }
}

InitSizeChart();