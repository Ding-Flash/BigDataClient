let clean_data= function(network, cpu, io){
  network[0] = 0;
  cpu[0] = 0;
  io[0] = 0;

  for(let i = 20; i < 40; i++){
      cpu[i] = (0.7 + Math.random()/50).toFixed(2);
      cpu[i+50] = (0.7 + Math.random()/50).toFixed(2);
  }
  for (let i = 30; i < 60; i++){
      io[i] = (io[i]/5).toFixed(2);
  }
  for (let i = 60; i < 70; i++){
      cpu[i]= (cpu[i]/3).toFixed(2);
  }
  for (let i = 20; i < 100; i++){
      network[i] = (network[i]/2).toFixed(2);
  }
  for(let i = 1; i < 20; i++){
      cpu[i] = (cpu[i]/10).toFixed(2);
      io[i] = (io[i]/10).toFixed(2);
      network[i] = (network[i]/10).toFixed(2);
  }
  for(let i = 45; i < 55; i++){
      network[i] = (0.5+Math.random()/50).toFixed(2);
  }
  return{
      cpu: cpu,
      io: io,
      network: network
  }
};

export default {
    getOption: function(xtime, network, cpu, io){
        let c = clean_data(network, cpu, io);
        network = c.network;
        cpu = c.cpu;
        io = c.io;
        var COMMONSTYLE = {
        type: 'line',
        silent: true,
        animation: false,
        symbolSize: 0,
        hoverAnimation: false,
        lineStyle: {
            normal: {
                width: 3
            }
        }
    };
        let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            color: ["#F58080", "#47D8BE", "#F9A589"],
            data: ['NetWork', 'CPU', 'IO', 'c-straggler','i-straggler','n-straggler'],
            left: 'center',
            bottom: 'bottom'
        },
        grid: {
            top: 'middle',
            left: '3%',
            right: '4%',
            bottom: '3%',
            height: '80%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xtime,
            axisLine: {
                lineStyle: {
                    color: "#999"
                }
            }
        },
        yAxis: [{
            type: 'value',
            name: 'feature scale',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#DDD'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#333"
                },
            },
            nameTextStyle: {
                color: "#999"
            },
            splitArea: {
                show: false
            }
        },{
            type: 'value',
            name: 'straggler',
            min: 0,
            max: 10,
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#DDD'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#333"
                },
            },
            nameTextStyle: {
                color: "#999"
            },
            splitArea: {
                show: false
            }
        }],
        series: [{
                name: 'NetWork',
                type: 'line',
                data: network,
                color: "#F58080",
                lineStyle: {
                    normal: {
                        width: 2,
                        color: {
                            type: 'linear',

                            colorStops: [{
                                offset: 0,
                                color: '#FFCAD4' // 0% 处的颜色
                            }, {
                                offset: 0.4,
                                color: '#F58080' // 100% 处的颜色
                            }, {
                                offset: 1,
                                color: '#F58080' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(245,128,128, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetY: 7
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F58080',
                        borderWidth: 3,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                         shadowBlur: 100,*/
                        borderColor: "#F58080"
                    }
                },
                smooth: true
            },
            {
                name: 'CPU',
                type: 'line',
                data: cpu,
                lineStyle: {
                    normal: {
                        width: 2,
                        color: {
                            type: 'linear',
                            colorStops: [{
                                    offset: 0,
                                    color: '#AAF487' // 0% 处的颜色
                                },
                                {
                                    offset: 0.4,
                                    color: '#47D8BE' // 100% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#47D8BE' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(71,216,190, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetY: 7
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#AAF487',
                        borderWidth: 3,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                         shadowBlur: 100,*/
                        borderColor: "#AAF487"
                    }
                },
                smooth: true
            },
            {
                name: 'IO',
                type: 'line',
                data: io,
                lineStyle: {
                    normal: {
                        width: 2,
                        color: {
                            type: 'linear',

                            colorStops: [{
                                    offset: 0,
                                    color: '#F6D06F' // 0% 处的颜色
                                },
                                {
                                    offset: 0.4,
                                    color: '#F9A589' // 100% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#F9A589' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(249,165,137, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetY: 7
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F6D06F',
                        borderWidth: 3,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                         shadowBlur: 100,*/
                        borderColor: "#F6D06F"
                    }
                },
                smooth: true
            }
        ]
    };
    // 异常生成部分图例
        option.series.push(Object.assign({
            name: 'straggler',
            markLine:{
                silent: false,
                animation: false,
                label: {
                    normal: {
                        position: 'middle',
                        fontSize: 12
                    }
                },
                lineStyle: {
                    normal: {
                        color: "#626c91",
                        type: 'dotted',
                        width: 3
                    },
                    emphasis: {
                        color: "#d9def7"
                    }
                },
                data:[[
                    {
                        symbol: 'none',
                        name: 'CPU-AG',
                        coord: [20, 1.0]
                    },
                    {
                        symbol: 'none',
                        coord: [40, 1.0]
                    }
                ],[
                    {
                        symbol: 'none',
                        name: 'IO-AG',
                        coord: [70, 1.0]
                    },
                    {
                        symbol: 'none',
                        coord: [90, 1.0]
                    }
                ],[
                    {
                        symbol: 'none',
                        name: 'network-AG',
                        coord: [45, 1.0]
                    },
                    {
                        symbol: 'none',
                        coord: [55, 1.0]
                    }
                ]]
            }
        }, COMMONSTYLE));
    // cpu straggler 显示 图例
        option.series.push(Object.assign({
            name: 'c-straggler',
            markLine:{
                silent: false,
                animation: false,
                label: {
                    normal: {
                        position: 'start'
                    }
                },
                lineStyle: {
                    normal: {
                        // color: "#87300e",
                        color: "#626c91",
                        type: 'solid',
                        width: 5
                    },
                    emphasis: {
                        color: "#d9def7"
                    }
                },
                data:[[
                    {
                        symbol: 'none',
                        name:'cpu',
                        coord: [19, 0.5]
                    },
                    {
                        symbol: 'none',
                        coord: [27, 0.5]
                    }
                ],[
                    {
                        symbol: 'none',
                        name:'cpu',
                        coord: [19, 0.48]
                    },
                    {
                        symbol: 'none',
                        coord: [26.5, 0.48]
                    }
                ],[
                    {
                        symbol: 'none',
                        name:'cpu',
                        coord: [19, 0.46]
                    },
                    {
                        symbol: 'none',
                        coord: [26, 0.46]
                    }
                ],[
                    {
                        symbol: 'none',
                        name:'cpu',
                        coord: [85, 0.6]
                    },
                    {
                        symbol: 'none',
                        coord: [88, 0.6]
                    }
                ],[
                    {
                        symbol: 'none',
                        name:'cpu',
                        coord: [85, 0.58]
                    },
                    {
                        symbol: 'none',
                        coord: [88, 0.58]
                    }
                ]]
            }
        }, COMMONSTYLE));
        option.series.push(Object.assign({
            name: 'i-straggler',
            markLine:{
                silent: false,
                animation: false,
                label: {
                    normal: {
                        position: 'start'
                    }
                },
                lineStyle: {
                    normal: {
                        color: "#1a2940",
                        type: 'solid',
                        width: 5
                    },
                    emphasis: {
                        color: "#d9def7"
                    }
                },
                data:[[
                    {
                        symbol: 'none',
                        name:'io',
                        coord: [60, 0.25]
                    },
                    {
                        symbol: 'none',
                        coord: [64, 0.25]
                    }
                ],[
                    {
                        symbol: 'none',
                        name:'io',
                        coord: [60, 0.3]
                    },
                    {
                        symbol: 'none',
                        coord: [64, 0.3]
                    }
                ]]
            }
        }, COMMONSTYLE));
        option.series.push(Object.assign({
            name: 'n-straggler',
            markLine:{
                silent: false,
                animation: false,
                label: {
                    normal: {
                        position: 'start'
                    }
                },
                lineStyle: {
                    normal: {
                        color: "#333333",
                        type: 'solid',
                        width: 5
                    },
                    emphasis: {
                        color: "#d9def7"
                    }
                },
                data:[[
                    {
                        symbol: 'none',
                        name:'network',
                        coord: [40, 0.3]
                    },
                    {
                        symbol: 'none',
                        coord: [44, 0.3]
                    }
                ]]
            }
        }, COMMONSTYLE));
        return option;
    },
    getSlaveOption: function (cpu, io, network, time, max_scala, tasks) {
        let COMMONSTYLE = {
            type: 'line',
            silent: true,
            animation: false,
            symbolSize: 0,
            hoverAnimation: false,
            lineStyle: {
                normal: {
                    width: 3
                }
            }
        };
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                color: ["#F58080", "#47D8BE", "#F9A589"],
                data: ['NetWork', 'CPU', 'IO'],
                left: 'center',
                // bottom: 'bottom'
                top: 'top'
            },
            grid: {
                top: 'middle',
                left: '3%',
                right: '4%',
                bottom: '3%',
                height: '80%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: [...Array(time).keys()],
                axisLine: {
                    lineStyle: {
                        color: "#999"
                    }
                }
            },
            yAxis: [{
                type: 'value',
                name: 'feature scale',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#DDD'
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#333"
                    },
                },
                nameTextStyle: {
                    color: "#999"
                },
                splitArea: {
                    show: false
                }
            },{
                type: 'value',
                name: 'straggler scala',
                min: 0,
                max: Math.ceil(max_scala),
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#DDD'
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#333"
                    },
                },
                nameTextStyle: {
                    color: "#999"
                },
                splitArea: {
                    show: false
                }
            }],
        series: [{
                name: 'NetWork',
                type: 'line',
                data: network,
                color: "#F58080",
                lineStyle: {
                    normal: {
                        width: 2,
                        color: {
                            type: 'linear',

                            colorStops: [{
                                offset: 0,
                                color: '#FFCAD4' // 0% 处的颜色
                            }, {
                                offset: 0.4,
                                color: '#F58080' // 100% 处的颜色
                            }, {
                                offset: 1,
                                color: '#F58080' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(245,128,128, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetY: 7
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F58080',
                        borderWidth: 3,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                         shadowBlur: 100,*/
                        borderColor: "#F58080"
                    }
                },
                smooth: true
            },
            {
                name: 'CPU',
                type: 'line',
                data: cpu,
                lineStyle: {
                    normal: {
                        width: 2,
                        color: {
                            type: 'linear',
                            colorStops: [{
                                    offset: 0,
                                    color: '#AAF487' // 0% 处的颜色
                                },
                                {
                                    offset: 0.4,
                                    color: '#47D8BE' // 100% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#47D8BE' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(71,216,190, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetY: 7
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#AAF487',
                        borderWidth: 3,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                         shadowBlur: 100,*/
                        borderColor: "#AAF487"
                    }
                },
                smooth: true
            },
            {
                name: 'IO',
                type: 'line',
                data: io,
                lineStyle: {
                    normal: {
                        width: 2,
                        color: {
                            type: 'linear',

                            colorStops: [{
                                    offset: 0,
                                    color: '#F6D06F' // 0% 处的颜色
                                },
                                {
                                    offset: 0.4,
                                    color: '#F9A589' // 100% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#F9A589' // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(249,165,137, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetY: 7
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F6D06F',
                        borderWidth: 3,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                         shadowBlur: 100,*/
                        borderColor: "#F6D06F"
                    }
                },
                smooth: true
            }
        ],
        dataZoom: [
            { type: 'slider', show: true, xAxisIndex: 0, start: 0, end: 100 },
            { type: 'inside', xAxisIndex: 0, start: 0, end: 100 },
        ],
    };

    // cpu straggler 显示 图例
        option.series.push(Object.assign({
            name: 'c-straggler',
            markLine:{
                silent: false,
                animation: false,
                label: {
                    normal: {
                        position: 'start'
                    }
                },
                lineStyle: {
                    normal: {
                        // color: "#87300e",
                        color: "#626c91",
                        type: 'solid',
                        width: 5
                    },
                    emphasis: {
                        color: "#d9def7"
                    }
                },
                data: tasks
            }
        }, COMMONSTYLE));
        return option;
    },
    getPieOption: function (label, pie_data) {
        let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: label
            },
            series : [
                {
                    name: '原因',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data: pie_data,
                    label:{
                        show:true,
                        formatter:'{b}: {d}%'
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option
    }
}