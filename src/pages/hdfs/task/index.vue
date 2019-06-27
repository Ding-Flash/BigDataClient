<template>
  <d2-container>
    <template slot="header">
        <d2-icon name="cubes"/> 新建任务
    </template>
    <el-container>
      <el-main>
        <el-row type="flex" justify="center">

          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="任务名称">
              <el-input v-model="form.name" placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="jar包位置">
              <el-input v-model="form.name" placeholder="请输入程序jar包的位置"></el-input>
            </el-form-item>
            <el-form-item label="采样器">
              <el-radio-group v-model="form.resource">
                <el-radio label="全采样"></el-radio>
                <el-radio label="概率采样"></el-radio>
                <el-radio label="系统采样"></el-radio>
                <el-radio label="Bump采样"></el-radio>
                <el-radio label="令牌桶采样"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="采样器配置项">
              <el-button type="primary" icon="el-icon-edit" @click="setSampler">点击进行采样器配置</el-button>
            </el-form-item>
            <div v-if="flag">
              <el-form-item label="jar包位置">
                <el-input v-model="form.name" placeholder="请输入程序jar包的位置"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="任务描述">
              <el-input type="textarea" v-model="form.desc" placeholder="请输入任务描述"></el-input>
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
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        flag : 0
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      setSampler(){
        this.flag = !this.flag
      }
    }
  }
</script>

<style scoped>

</style>