<template>
    <d2-container>
        <template slot="header">
            BigRoot 分析报告
        </template>
        <el-row :gutter="20">
            <el-col :span="12" >
                <el-card>
                    <div slot="header">Slave1 Straggler分析</div>
                    <div style="height: 400px;" id="root1">
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">Slave1 Straggler分析</div>
                      <el-table v-if="tableData" :data="tableData[0]" border style="width: 100%" height="400">
                        <el-table-column type="index">
                        </el-table-column>
                        <el-table-column prop="start" label="start(s)">
                        </el-table-column>
                        <el-table-column prop="end" label="end(s)">
                        </el-table-column>
                        <el-table-column prop="factor" label="factor">
                        </el-table-column>
                        <el-table-column prop="root-cause" label="root-cause">
                        </el-table-column>
                      </el-table>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="20">
            <el-col :span="12" >
                <el-card>
                    <div slot="header">Slave2 Straggler分析</div>
                    <div style="height: 400px;" id="root2">
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">Slave2 Straggler分析</div>
                      <el-table v-if="tableData" :data="tableData[1]" border style="width: 100%;" height="400">
                        <el-table-column type="index">
                        </el-table-column>
                        <el-table-column prop="start" label="start(s)">
                        </el-table-column>
                        <el-table-column prop="end" label="end(s)">
                        </el-table-column>
                        <el-table-column prop="factor" label="factor">
                        </el-table-column>
                        <el-table-column prop="root-cause" label="root-cause">
                        </el-table-column>
                      </el-table>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="20">
            <el-col :span="12" >
                <el-card>
                    <div slot="header">Slave3 Straggler分析</div>
                    <div style="height: 400px;" id="root3">
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">Slave3 Straggler分析</div>
                      <el-table v-if="tableData" :data="tableData[2]" border style="width: 100%;" height="400">
                        <el-table-column type="index">
                        </el-table-column>
                        <el-table-column prop="start" label="start(s)">
                        </el-table-column>
                        <el-table-column prop="end" label="end(s)">
                        </el-table-column>
                        <el-table-column prop="factor" label="factor">
                        </el-table-column>
                        <el-table-column prop="root-cause" label="root-cause">
                        </el-table-column>
                      </el-table>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="20">
            <el-col :span="12" >
                <el-card>
                    <div slot="header">Slave4 Straggler分析</div>
                    <div style="height: 400px;" id="root4">
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">Slave4 Straggler分析</div>
                      <el-table v-if="tableData" :data="tableData[3]" border style="width: 100%;" height="400">
                        <el-table-column type="index">
                        </el-table-column>
                        <el-table-column prop="start" label="start(s)">
                        </el-table-column>
                        <el-table-column prop="end" label="end(s)">
                        </el-table-column>
                        <el-table-column prop="factor" label="factor">
                        </el-table-column>
                        <el-table-column prop="root-cause" label="root-cause">
                        </el-table-column>
                      </el-table>
                </el-card>
            </el-col>
        </el-row>

    </d2-container>
</template>

<script>
    import echarts from "echarts"
    import config from "@/config/bigroot/index"
    import {getBigRootStraggler} from '@/api/bigroot/index'
    let randomList = function (length) {
      let ans = [];
      for(let i = 0; i < length; i++){
          ans.push(Math.random().toFixed(2));
      }
      return ans;
    };

    let xtime = function (length) {
      let ans = [];
      for(let i = 0; i < length; i++){
          ans.push(i)
      }
      return ans;
    };
    export default {
        name: "index",
        data(){
          return{
           tableData: null
          }
        },
        mounted() {
            // this.getBigRoot();
            getBigRootStraggler({}).then(res=>{
                let sdata = res.data;
                // console.log(data);
                let temp_table = [];
                for (let i = 1; i <=4; i++){
                    let data = sdata[i-1];
                    temp_table.push(data.table);
                    let root = echarts.init(document.getElementById('root'+i));
                    let option = config.getSlaveOption(data.cpu, data.io, data.net, data.time, data.scala, data.tasks);
                    // console.log(option);
                    root.setOption(option);
                }
                this.tableData = temp_table;
            })
        },
        methods:{
            getBigRoot(){
                let root1 = echarts.init(document.getElementById('root1'));
                root1.setOption(config.getOption(xtime(100), randomList(100), randomList(100), randomList(100)));
                let root2 = echarts.init(document.getElementById('root2'));
                root2.setOption(config.getOption(xtime(100), randomList(100), randomList(100), randomList(100)));
                let root3 = echarts.init(document.getElementById('root3'));
                root3.setOption(config.getOption(xtime(100), randomList(100), randomList(100), randomList(100)));
                let root4 = echarts.init(document.getElementById('root4'));
                root4.setOption(config.getOption(xtime(100), randomList(100), randomList(100), randomList(100)));
            }
        }
    }
</script>

<style scoped>

</style>