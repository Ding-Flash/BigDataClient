<template>
  <d2-container>
    <template slot="header">
        <d2-icon name="cubes"/> 新建任务
    </template>
    <el-container>
      <el-main>
        <el-row type="flex" justify="center">

          <el-form ref="form" :model="task" label-width="100px">
            <el-form-item label="任务名称">
              <el-input v-model="task.name" placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="Hadoop路径">
              <el-input v-model="task.hadoop" placeholder="请输入主机Hadoop路径"></el-input>
            </el-form-item>
            <el-form-item label="Spark路径">
              <el-input v-model="task.spark" placeholder="请输入主机Spark路径"></el-input>
            </el-form-item>
            <el-form-item label="jar包路径">
              <el-input v-model="task.spark" placeholder="请输入主机Spark路径"></el-input>
            </el-form-item>
            <el-form-item label="采样器">
              <el-radio-group v-model="task.sampler">
                <el-radio label="概率采样"></el-radio>
                <el-radio label="系统采样"></el-radio>
                <el-radio label="Bump采样"></el-radio>
                <el-radio label="令牌桶采样"></el-radio>
                <el-radio label="全采样"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-edit" @click="setSampler">采样器配置</el-button>
            </el-form-item>
            <div v-if="task.sampler === '概率采样'">
              <el-form-item label="采样概率">
                <el-input-number v-model="task.settings.probability" :precision="3" :step="0.001" :max="1" :min="0"></el-input-number>
              </el-form-item>
            </div>
             <div v-if="task.sampler === '系统采样'">
              <el-form-item label="采样间隔">
                <el-input-number v-model="task.settings.count"  :step="10" :min="0"></el-input-number>
              </el-form-item>
            </div>
             <div v-if="task.sampler === 'Bump采样'">
              <el-form-item label="Bump采样">
                <el-input placeholder="请输入程序jar包的位置"></el-input>
              </el-form-item>
            </div>
             <div v-if="task.sampler === '令牌桶采样'">
              <el-form-item label="令牌桶采样">
                <el-input placeholder="请输入程序jar包的位置"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="任务描述">
              <el-input type="textarea" v-model="task.desc" placeholder="请输入任务描述"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>

        </el-row>
      </el-main>
    </el-container>
  </d2-container>
</template>

<script>
  export default {
    data() {
      return {
        task: {
          name: '',
          jar: '',
          hadoop: '',
          spark: '',
          sampler: '概率采样',
          settings: {
            probability: 0.001,
            count: 100
          },
          desc: ''
        },
        flag : 0
      }
    },
    methods: {
      onSubmit() {
        this.$store.commit("hdfs/setTask", this.task)
      },
      setSampler(){
        this.flag = !this.flag
      }
    }
  }
</script>

<style scoped>

</style>