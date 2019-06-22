<template>
    <d2-container>
        <template slot="header">
            Performance Analysis
        </template>
        <detail/>
        <div style="margin-top: 2%">
            <el-tabs type="border-card" v-model="activeName">
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
              <!--<el-tab-pane label="性能图表" name="summary">-->
                  <!--<div>-->
                      <!--<ve-pie ref="pie" :data="funcData" height="500px"></ve-pie>-->
                  <!--</div>-->
              <!--</el-tab-pane>-->
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
    methods: {
    },
    created() {
        getTimeLine({
            path: '/Users/yangs/Desktop/htrace/trace.out',
            count: 100,
            name: 'DFSInputStream#byteArrayRead'
        }).then(res => {
            this.chartData = res;
            // this.chartData.stack.func = res.columns
        });
        getFuncFeature({
            path: '/Users/yangs/Desktop/htrace/trace.out'
        }).then(res => {
            this.funcData['columns'] = ['name', 'total'];
            this.funcData['rows'] = res;
        })

    },
    watch: {
      activeName (v) {
        if(v=='time'){
            this.$nextTick(_ => {
            this.$refs['timeline'].echarts.resize()
            })
        }
        if(v=='summary'){
            this.$nextTick(_ => {
                this.$refs['pie'].echarts.resize()
            })
        }
      }
    }
}
</script>
<style lang="less">

</style>