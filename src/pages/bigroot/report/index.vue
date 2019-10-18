<template>
    <d2-container>
        <template slot="header">
            BigRoot 分析报告
        </template>
        <div v-if="slaves" v-for="(slave, index) in slaves" :key="index">
            <el-row :gutter="20">
                <el-col :span="16" >
                    <el-card>
                        <div slot="header"><strong>{{slave.host}}</strong> Straggler分析</div>
                        <div style="height: 400px;" :id="'slave'+(index+1)">
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-tabs type="border-card">
                        <el-tab-pane :label="slave.host + '-straggler种类统计'">
                            <div :id="'pie'+(index+1)" style="height: 428px">
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="slave.host + '-straggler信息'">
                            <el-table :data="slave.table" border style="width: 100%" height="428" >
                                <el-table-column type="index"></el-table-column>
                                <el-table-column prop="start" label="time-start(s)"></el-table-column>
                                <el-table-column prop="end" label="time-end(s)"></el-table-column>
                                <el-table-column prop="factor" label="straggler-scala"></el-table-column>
                                <el-table-column prop="root-cause" label="root-cause"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <br>
        </div>
    </d2-container>
</template>

<script>
    import echarts from "echarts"
    import config from "@/config/bigroot/index"
    import {getBigRootStraggler} from '@/api/bigroot/index'
    export default {
        name: "index",
        data(){
          return{
           slaves: null
          }
        },
        mounted() {
            let task_name = this.$store.state.bigroot.currentTaskName;
            if (task_name === '') {
                this.$router.push({name: 'history'});
                this.$notify({
                    title: '注意',
                    message: '请选择或创建task',
                    type: 'warning'
                });
            } else {
                getBigRootStraggler({name: task_name}).then(res=>{
                    this.slaves = res.data;
                    this.$nextTick(()=>{
                        this.renderSlaves(this.slaves)
                    })
                })
            }

        },
        methods:{
            renderSlaves(sdata){
                for (let i = 1; i <= sdata.length; i++){
                    let data = sdata[i-1];
                    let root = echarts.init(document.getElementById('slave'+i));
                    let option = config.getSlaveOption(data.cpu, data.io, data.net, data.time, data.scala, data.tasks);
                    root.setOption(option);

                    let pie = echarts.init(document.getElementById('pie'+i));
                    pie.setOption(config.getPieOption(data.label, data.pie_data));
                }
            }
        }
    }
</script>

<style scoped>

</style>