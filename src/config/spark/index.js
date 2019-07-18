let findStraggler = function(straggler, task_index, op_index){
      for(let i = 0; i < straggler.length; i++){
          if(task_index===straggler[i][0] && op_index===straggler[i][1]){
              return "Straggler"
          }
      }
      return ""
};
export default {
    getTimelineConfig: function (taskNum, data, straggler, op) {
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
                data: temp,
                label: {
                    normal: {
                        show: true,
                        formatter: function (params) {
                            return findStraggler(straggler, params.dataIndex, params.seriesIndex);
                        }
                    }
                }
            })
        }
        return {
            title:{
                show: true,
                // text: "Task-op"
            },
            tooltip : {
                trigger: 'item',
                formatter: function (params) {
                    let rdd = op[params.seriesIndex];
                    if(rdd === undefined){
                        rdd = "unkown"
                    }
                    let item = 'Operator:'+ rdd + '<br> time: ' + params.value + '(ms)';
                    if(findStraggler(straggler, params.dataIndex, params.seriesIndex) === "Straggler"){
                        item = 'Straggler Operator <br>' + item
                    }
                    return item;
                }
            },
            xAxis:  {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: yData
            },
            dataZoom: [
                // { type: 'slider', show: true, yAxisIndex: 0, start: 0, end: 60 },
                // { type: 'inside', yAxisIndex: 0, start: 0, end: 10 },
                // { type: 'slider', show: true, xAxisIndex: 0, start: 0, end: 50 },
                // { type: 'inside', xAxisIndex: 0, start: 0, end: 90 },
            ],
            series: series
        }
    },
    featuresLabels: [
        "Long_Serialization",
        "Long_Deserialization",
        "CPU_Abnormal",
        "Out_Of_Memory",
        "Too_Much_GC",
        "Too_Much_Remote_Fetch",
        "Read_Key_Skew",
        "Read_Value_Skew",
        "Write_Key_Skew",
        "Write_Value_Skew",
        "Bad_Data_Locality",
        "Busy_CPU",
        "Busy_Disk_I/O",
        "Busy_Network",
        "HDFS_Read_Skew",
        "Data_Write_Busy",
        "HDFS_Write_Skew",
        "Unknown_Reason"
    ]
};
