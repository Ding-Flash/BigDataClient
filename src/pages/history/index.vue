<template>
    <d2-container>
        <template slot="header">任务清单</template>
        <div style="margin: 1% 2%">
          <h3>BigRoot</h3>
          <el-table :data="bigroot" height="250" border>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="time" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="任务名称">
            </el-table-column>
            <el-table-column prop="desc" label="任务描述">
            </el-table-column>
            <el-table-column prop="status" label="任务状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="lookBigRootReport(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleBigRootDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <h3>Spark List</h3>
          <el-table :data="spark" height="250" border style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="time" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="任务名称">
            </el-table-column>
            <el-table-column prop="desc" label="任务描述">
            </el-table-column>
            <el-table-column prop="status" label="任务状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="lookSparkReport(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleSparkDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <h3>ASTracer List</h3>
          <el-table :data="astracer" height="270" border style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="time" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="任务名称">
            </el-table-column>
            <el-table-column prop="sampler" label="采样器类型">
            </el-table-column>
            <el-table-column prop="desc" label="任务描述">
            </el-table-column>
            <el-table-column prop="status" label="任务状态">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="250">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  :disabled="scope.row.status==='finshed'"
                  @click="refreshHDFSStatus(scope.$index, scope.row)">刷新状态</el-button>
                <el-button
                  size="mini"
                  @click="lookHDFSReport(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleHDFSDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <h3>ALiload List</h3>
          <el-table :data="aliload" height="250" border style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="time" label="日期">
            </el-table-column>
            <el-table-column prop="rate" label="读写速率">
            </el-table-column>
            <el-table-column prop="start" label="开始时间">
            </el-table-column>
            <el-table-column prop="end" label="结束时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="lookAliloadReport(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleAliloadDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <h3>Parameter Optimization Task List</h3>
          <el-table :data="taskopt" height="250" border style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="time" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="任务名称">
            </el-table-column>
            <el-table-column prop="class" label="java类">
            </el-table-column>
            <el-table-column prop="model" label="模型">
            </el-table-column>
            <el-table-column prop="train_time" label="训练次数">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="lookTaskOptReport(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleTaskOptDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </d2-container>
</template>

<script>
    import {gethTaskList, refreshBenchStatus, deleteHDFSTask} from "@/api/hdfs";
    import {getsTaskList, deleteSparkTask} from "@/api/spark";
    import {getbTaskList, deleteBigRootTask} from "@/api/bigroot";
    import {getaTaskList, deleteAliloadTask} from "@/api/aliload";
    import {gettTaskOptList, deleteTaskOpt} from "@/api/taskopt";

    export default {
        name: "history",
        created(){
          gethTaskList().then(res => {
              this.astracer = res.data
          });
          getsTaskList().then(res => {
              this.spark = res.data
          });
          getbTaskList().then(res => {
              this.bigroot = res.data
          });
          getaTaskList().then(res=>{
              this.aliload = res.data
          });
          gettTaskOptList().then(res=>{
              this.taskopt = res.data
          })
        },
        data(){
            return{
                astracer: null,
                spark: null,
                bigroot: null,
                aliload: null,
                taskopt: null,
            }
        },
        methods: {
            // BigRoot相关操作
            lookBigRootReport(index, row){
              this.$store.commit('bigroot/setCurrentTaskName', row.name);
              this.$router.push({name: 'bigroot-report'})
            },
            handleBigRootDelete(index, row){
                deleteBigRootTask({name: row.name}).then(res => {
                  if (res.status === 0){
                    this.bigroot.splice(index, 1);
                  }
                })
            },

            // Spark相关操作
            lookSparkReport(index, row){
              this.$store.commit('spark/setCurrentTaskName', row.name);
              this.$router.push({name: 'spark-report'})
            },
            handleSparkDelete(index, row){
                deleteSparkTask({name: row.name}).then(res => {
                  if (res.status === 0){
                    this.spark.splice(index, 1);
                  }
                })
            },

            // ASTracer 相关操作
            refreshHDFSStatus(index, row){
                refreshBenchStatus({name: row.name}).then(res =>{
                  if(res.status === 1){
                    this.astracer[index].status = "finished"
                  }
                })
            },
            lookHDFSReport(index, row) {
              this.$store.commit('hdfs/setCurrentTaskName', row.name);
              this.$router.push({name: "hdfs-report"})
            },
            handleHDFSDelete(index, row) {
                deleteHDFSTask({name: row.name}).then(res => {
                  if (res.status === 0){
                    this.astracer.splice(index, 1);
                  }
                })
            },

            // Aliload相关操作
            lookAliloadReport(index, row){
              this.$store.commit('aliload/setCurrentTaskName', row.name);
              this.$router.push({name: 'aliload'})
            },
            handleAliloadDelete(index, row){
                deleteAliloadTask({name: row.name}).then(res => {
                  if (res.status === 0){
                    this.aliload.splice(index, 1);
                  }
                })
            },

            // TaskOpt相关操作
            lookTaskOptReport(index, row) {
              this.$store.commit('taskopt/setCurrentTaskName', row.name);
              this.$router.push({name: 'taskopt'})
            },
            handleTaskOptDelete(index, row){
              deleteTaskOpt({name: row.name}).then(res=>{
                if(res.status == 0) {
                  this.taskopt.splice(index, 1);
                }
              })
            },
        }
    }
</script>

<style scoped>

</style>