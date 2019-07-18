<template>
    <d2-container>
        <template slot="header">任务清单</template>
        <div style="margin: 1% 2%">
          <h3>ASTracer List</h3>
          <el-table :data="astracer" height="270" border style="width: 100%">
            <el-table-column type="index" :index="indexMethod">
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
                  @click="refreshStatus(scope.$index, scope.row)">刷新状态</el-button>
                <el-button
                  size="mini"
                  @click="lookReport(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <h3>Spark List</h3>
          <el-table :data="null" height="250" border style="width: 100%">
            <el-table-column type="index" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="任务名称">
            </el-table-column>
            <el-table-column prop="sampler" label="采样器类型">
            </el-table-column>
            <el-table-column prop="desc" label="任务描述">
            </el-table-column>
            <el-table-column prop="status" label="任务状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
            <h3>BigRoot</h3>
          <el-table :data="null" height="250" border>
            <el-table-column type="index" :index="indexMethod">
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
            <el-table-column label="操作" min-width="250">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </d2-container>
</template>

<script>
    import {getTaskList, refreshBenchStatus, deleteTask} from "@/api/hdfs";
    export default {
        name: "history",
        created(){
          getTaskList().then(res => {
              this.astracer = res.data
          })
        },
        data(){
            return{
                astracer: null
            }
        },
        methods: {
            indexMethod(index){
                return index + 1
            },
            refreshStatus(index, row){
                refreshBenchStatus({name: row.name}).then(res =>{
                  if(res.status === 1){
                    this.astracer[index].status = "finished"
                  }
                })
            },
            lookReport(index, row) {
              this.$store.commit('hdfs/setCurrentTaskName', row.name);
              this.$router.push({name: "hdfs-report"})
            },
            handleDelete(index, row) {
                deleteTask({name: row.name}).then(res => {
                  if (res.status === 0){
                    this.astracer.splice(index, 1);
                  }
                })
            }
        }
    }
</script>

<style scoped>

</style>