export default {
    getSlaveOption: function (cpu, net_rx, net_tx, ior, iow, time) {
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                color: ["#F58080", "#47D8BE", "#F9A589"],
                data: ['NetWork(Receive)', 'NetWork(Send)', 'CPU', 'IO(Read)', 'IO(Write)'],
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
            }],
        series: [{
                name: 'NetWork(Receive)',
                type: 'line',
                data: net_rx,
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
            },{
                name: 'NetWork(Send)',
                type: 'line',
                data: net_tx,
                // color: "#F58080",
                lineStyle: {
                    normal: {
                        width: 2,
                        color: {
                            type: 'linear',
                            //
                            // colorStops: [{
                            //     offset: 0,
                            //     color: '#FFCAD4' // 0% 处的颜色
                            // }, {
                            //     offset: 0.4,
                            //     color: '#F58080' // 100% 处的颜色
                            // }, {
                            //     offset: 1,
                            //     color: '#F58080' // 100% 处的颜色
                            // }],
                            globalCoord: false // 缺省为 false
                        },
                        // shadowColor: 'rgba(245,128,128, 0.5)',
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
                name: 'IO(Read)',
                type: 'line',
                data: ior,
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
            },
            {
                name: 'IO(Write)',
                type: 'line',
                data: iow,
                lineStyle: {
                    normal: {
                        width: 2,
                        color: {
                            type: 'linear',

                            // colorStops: [{
                            //         offset: 0,
                            //         color: '#F6D06F' // 0% 处的颜色
                            //     },
                            //     {
                            //         offset: 0.4,
                            //         color: '#F9A589' // 100% 处的颜色
                            //     }, {
                            //         offset: 1,
                            //         color: '#F9A589' // 100% 处的颜色
                            //     }
                            // ],
                            globalCoord: false // 缺省为 false
                        },
                        // shadowColor: 'rgba(249,165,137, 0.5)',
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