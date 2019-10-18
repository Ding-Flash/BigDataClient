<template>
    <d2-container>
        <template slot="header">
            ASTracer 分析报告
        </template>
        <detail/>
        <div style="margin-top: 2%">
            <el-tabs type="border-card" v-model="activeTab" @tab-click="changeTab">
              <el-tab-pane label="统计信息" name="sampler">
                  <all_func></all_func>
              </el-tab-pane>
              <el-tab-pane label="调用树" name="tree">
                  <tree/>
              </el-tab-pane>
              <el-tab-pane label="时间轴" name="time">
                <el-card v-loading="loading" element-loading-text="你需要选择一个函数">
                    <ve-line :data="chartData" :settings="chartSettings" height="500px" ref="timeline"></ve-line>
                </el-card>
              </el-tab-pane>
            </el-tabs>
        </div>
    </d2-container>
</template>

<script>
import tree from './components/trace-tree.vue'
import detail from './components/detail-info.vue'
import all_func from './components/all-func-info.vue'
import {getTimeLine} from "@/api/hdfs";

export default {
    name: "index",
    components:{
        tree,
        detail,
        all_func,
    },
    created() {
        let task_name = this.$store.state.hdfs.currentTaskName;
        if (task_name === '') {
            this.$router.push({name: 'history'});
            this.$notify({
                title: '注意',
                message: '请选择或创建task',
                type: 'warning'
            });
        } else {
            if(this.selectFunc){
               this.getChartData();
               this.loading = false
            }
        }
    },
    data() {
      return {
          activeName: 'sampler',
          chartData: {},
          loading: true,
          chartSettings: {
            stack: {func: ['all']},
            area: true
          }
      }
    },
    computed:{
        activeTab: {
            get: function () {
                return this.$store.state.hdfs.activeTab
            },
            set: function (value) {
                this.$store.commit("hdfs/setActiveTab", value)
            }
        },
        selectFunc(){
            return this.$store.state.hdfs.selectFunc
        }
    },
    methods:{
        changeTab(tab){
          this.activeTab = tab.name;
        },
        getChartData(){
            getTimeLine({
                name: this.$store.state.hdfs.currentTaskName,
                count: 100,
                func_name: this.selectFunc
            }).then(res => {
                this.chartData = res;
            });
        }
    },
    watch: {
        activeTab (v) {
            if(v==='time'){
                this.$nextTick(_ => {
                    this.$refs['timeline'].echarts.resize()
                })
            }
        },
        selectFunc(v){
            this.getChartData();
            this.loading = false
        }
    }
}
</script>
<style lang="less">

</style>