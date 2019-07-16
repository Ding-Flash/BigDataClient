<template>
    <el-row :gutter="30">
        <el-col :span="8">
            <el-card style="background: #f0f9eb">
                <div slot="header">
                    <d2-icon name="file-code-o"/>
                    <span style="margin-left: 2%">文件大小</span>
                </div>
                <div class="iCountUp">
                    <ICountUp :endVal="size"/>
                    MB
                </div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card style="background: #f2f2f3">
                <div slot="header">
                    <d2-icon name="code"/>
                    <span style="margin-left: 2%">函数种类</span>
                </div>
                <div class="iCountUp">
                    <ICountUp :endVal="func_type"/>
                </div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card style="background: #fdf0f0">
                <div slot="header">
                    <d2-icon name="code-fork"/>
                    <span style="margin-left: 2%">调用树种类</span>
                </div>
                <div class="iCountUp">
                    <ICountUp :endVal="tree_type"/>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import ICountUp from 'vue-countup-v2';
    import {getTraceDetail} from "@/api/hdfs";

    export default {
        name: "detail-info",
        components:{
            ICountUp
        },
        created(){
            if(this.taskName){
                this.getData()
            }
        },
        data() {
          return {
              size: 0.0,
              func_type: 0,
              tree_type: 0
          };
        },
        computed:{
            taskName: {
                  get: function () {
                      return this.$store.state.hdfs.currentTaskName
                  }
            }
        },
        watch:{
          taskName(v){
              this.getData()
          }
        },
        methods: {
            getData(){
                getTraceDetail({name: this.taskName}).then(res=>{
                    this.size = res.size;
                    this.func_type = res.func_type;
                    this.tree_type = res.tree_type;
                })
            }
        }
    }
</script>

<style scoped>
    .iCountUp {
        font-size: 2em;
        margin: 0;
        color: #727478;
    }
</style>