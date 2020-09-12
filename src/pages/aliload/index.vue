<template>
  <d2-container>
    <template slot="header">
        <d2-icon name="tasks"/> 负载生成报告
    </template>
        <div v-if="slaves" v-for="(slave, index) in slaves" :key="index">
            <el-row>
                <el-col>
                    <el-card>
                        <div slot="header"><strong>{{slave.host}}</strong> 系统状态监控</div>
                        <div style="height: 400px;" :id="'alislave'+(index+1)">
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <br>
        </div>
  </d2-container>
</template>

<script>
    import echarts from "echarts"
    import config from "@/config/aliload/index"
    import {getAliLoadStatus} from '@/api/aliload/index'
    export default {
        name: "index",
        data() {
          return {
              slaves: null
          }
        },
        mounted() {
            let task_name = this.$store.state.aliload.currentTaskName;
            if (task_name === '') {
                this.$router.push({name: 'history'});
                this.$notify({
                    title: '注意',
                    message: '请选择或创建task',
                    type: 'warning'
                });
            } else {
                getAliLoadStatus({name: task_name}).then(res => {
                    this.slaves = res.data;
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
                    let root = echarts.init(document.getElementById('alislave'+i));
                    let option = config.getSlaveOption(data.cpu, data.net_rx , data.net_tx, data.ior, data.iow, data.time);
                    root.setOption(option);
                }
            }
        }
    }
</script>

<style scoped>

</style>