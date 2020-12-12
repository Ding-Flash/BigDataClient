export default {
    getSlaveOption: function (cpu, net_rx, net_tx, ior, iow, time) {
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                color: ["#F58080","#3628F5", "#47D8BE", "#6F6F6F"],
                data: ['NetWork(Receive)', 'NetWork(Send)', 'CPU', 'IO'],
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
                color: "#3628F5",
                lineStyle: {
                    normal: {
                        width: 2,
                        color: {
                            type: 'linear',

                            colorStops: [{
                                offset: 0,
                                color: '#A2BDFF' // 0% 处的颜色
                            }, {
                                offset: 0.4,
                                color: '#778ff5' // 100% 处的颜色
                            }, {
                                offset: 1,
                                color: '#4C5DF5' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        // shadowColor: 'rgba(245,128,128, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetY: 7
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#A2BDFF',
                        borderWidth: 3,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                         shadowBlur: 100,*/
                        borderColor: "#A2BDFF"
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
            // {
            //     name: 'IO(Read)',
            //     type: 'line',
            //     data: ior,
            //     lineStyle: {
            //         normal: {
            //             width: 2,
            //             color: {
            //                 type: 'linear',
            //
            //                 colorStops: [{
            //                         offset: 0,
            //                         color: '#F6D06F' // 0% 处的颜色
            //                     },
            //                     {
            //                         offset: 0.4,
            //                         color: '#F9A589' // 100% 处的颜色
            //                     }, {
            //                         offset: 1,
            //                         color: '#F9A589' // 100% 处的颜色
            //                     }
            //                 ],
            //                 globalCoord: false // 缺省为 false
            //             },
            //             shadowColor: 'rgba(249,165,137, 0.5)',
            //             shadowBlur: 10,
            //             shadowOffsetY: 7
            //         }
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: '#F6D06F',
            //             borderWidth: 3,
            //             /*shadowColor: 'rgba(72,216,191, 0.3)',
            //              shadowBlur: 100,*/
            //             borderColor: "#F6D06F"
            //         }
            //     },
            //     smooth: true
            // },
            {
                name: 'IO',
                type: 'line',
                data: iow,
                color: "#6F6F6F",
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
                        color: '#6F6F6F',
                        borderWidth: 3,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                         shadowBlur: 100,*/
                        borderColor: "#AEAEB3"
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
    }
}