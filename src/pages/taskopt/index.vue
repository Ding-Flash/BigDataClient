<template>
    <d2-container>
        <template slot="header">
            参数优化
        </template>
        <el-row :gutter="10">
            <el-col :span="10">
                <el-card shadow="never" v-if="cmd">
                  <div slot="header">
                    <span>优化指令</span>
                    <el-button style="float: right;"  icon="fa fa-clipboard" @click="copyCMD()">拷贝到剪贴板</el-button>
                  </div>
                  <d2-highlight :code="cmd"/>
                </el-card>
                <br>
                <el-card>
                    <div slot="header">调优参数列表</div>
                    <el-table v-if="tune"
                      :data="tune"
                      style="width: 100%">
                      <el-table-column
                        prop="index"
                        label="序号">
                      </el-table-column>
                      <el-table-column
                        prop="param"
                        label="参数">
                      </el-table-column>
                      <el-table-column
                        prop="value"
                        label="参数值">
                      </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="14">
                <div v-if="slaves" v-for="(slave, index) in slaves" :key="index">
                    <el-row>
                        <el-col>
                            <el-card>
                                <div slot="header"><strong>{{slave.host}}</strong> 系统状态监控</div>
                                <div style="height: 400px;" :id="'slave'+(index+1)">
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <br>
                </div>
            </el-col>
        </el-row>

    </d2-container>
</template>

<script>
    import echarts from "echarts"
    import config from "@/config/aliload/index"
    import {getTaskOptStatus} from "@/api/taskopt";
    import * as clipboard from 'clipboard-polyfill'
    export default {
        name: "index",
        data() {
            return {
                tune: null,
                cmd: null,
                slaves: null,
            }
        },
        mounted() {
            let task_name = this.$store.state.taskopt.currentTaskName;
            if(task_name == '') {
                this.$router.push({name: 'history'});
                this.$notify({
                    title: '注意',
                    message: '请选择或创建task',
                    type: 'warning'
                });
            } else {
                getTaskOptStatus({name: task_name}).then(res=>{
                    this.slaves = res.data.status;
                    this.tune = this.genTuneData(res.data.tune);
                    this.cmd = res.data.cmd;
                    this.$nextTick(() => {
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
                    let option = config.getSlaveOption(data.cpu, data.net_rx , data.net_tx, data.ior, data.iow, data.time);
                    root.setOption(option);
                }
            },
            genTuneData(tune) {
                let res = [];
                let i = 1;
                for(let key in tune) {
                    res.push({
                        index: i,
                        param: key,
                        value: tune[key]
                    });
                    i++;
                }
                return res;
            },
            copyCMD() {
                clipboard.writeText(this.cmd);
                this.$notify({
                    title: '拷贝成功',
                    message: '优化命令已经复制到剪贴板中',
                    type: 'success'
                });
            }
        }
    }
</script>

<style scoped>

</style>