<template>
  <d2-container>
    <template slot="header">
        <d2-icon name="cubes"/> 新建任务
    </template>
    <el-container>
      <el-header style="margin-top: 5%">
        <el-steps :active="1" align-center>
          <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </el-header>
      <el-main>
        <el-row type="flex" justify="center">
          <el-card style="margin-top: 6%; padding: 2%">
              <el-col :span="6" >
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">上次jar文件，且不超过500kb</div>
                </el-upload>
              </el-col>
          </el-card>
        </el-row>
      </el-main>
    </el-container>
  </d2-container>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                index: 1,
            }
        },
        methods:{
            next(){
                if(this.index++ > 2){
                    this.index = 0
                }
            }
        }
    }
</script>

<style scoped>

</style>