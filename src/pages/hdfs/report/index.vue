<template>
    <d2-container>
        <template slot="header">
            Performance Analysis
        </template>
        <detail/>
        <div style="margin-top: 2%">
            <el-tabs type="border-card" v-model="activeTab" @tab-click="changeTab">
              <el-tab-pane label="function" name="sampler">
                  <all_func></all_func>
              </el-tab-pane>
              <el-tab-pane label="call tree" name="tree">
                  <tree/>
              </el-tab-pane>
              <el-tab-pane label="timeline" name="time">
                <el-card>
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
import {getTimeLine, getFuncFeature} from "@/api/hdfs";

export default {
    name: "index",
    components:{
        tree,
        detail,
        all_func,
    },
    created() {
        this.getChartData()
        getFuncFeature({
            path: '/Users/yangs/Desktop/trace.out'
        }).then(res => {
            this.funcData['columns'] = ['name', 'total'];
            this.funcData['rows'] = res;
        })
    },
    data() {
      return {
          activeName: 'sampler',
          chartData: {},
          loading: true,
          chartSettings: {
            stack: {func: ['all']},
            area: true
          },
          funcData:{}
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
                path: '/Users/yangs/Deskto/trace.out',
                count: 100,
                name: this.selectFunc
            }).then(res => {
                this.chartData = res;
            });
        }
    },
    watch: {
        activeTab (v) {
            if(v=='time'){
                this.$nextTick(_ => {
                this.$refs['timeline'].echarts.resize()
                })
            }
        },
        selectFunc(v){
            this.getChartData()
        }
    }
}
</script>
<style lang="less">

</style>