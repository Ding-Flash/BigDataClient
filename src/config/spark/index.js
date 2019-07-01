export default {
    getTimelineConfig: function (taskNum, data) {
        let yData = [];
        for (let i = 0; i < taskNum; i++){
            yData.push("Task"+ i.toString());
        }
        let series = [];
        for (let i = 0; i < data[0].length; i++){
            let temp = [];
            for (let j = 0; j < taskNum; j++){
                temp.push(data[j][i]);
            }
            series.push({
                type: 'bar',
                stack: 'task',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: temp
            })
        }
        return {
            tooltip : {
                trigger: 'item',
            },
            xAxis:  {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: yData
            },
            // dataZoom: [
            //     // { type: 'slider', show: true, yAxisIndex: 0, start: 0, end: 20 },
            //     { type: 'inside', yAxisIndex: 0, start: 0, end: 20 },
            //     // { type: 'slider', show: true, xAxisIndex: 0, start: 0, end: 10 },
            //     { type: 'inside', xAxisIndex: 0, start: 0, end: 10 },
            // ],
            series: series
        }
    }
};
