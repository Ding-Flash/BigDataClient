<template>
  <d2-container>
    <template slot="header">基本配置</template>
    <el-container>
      <el-main>
        <el-row :span="18" :offset="3">
      <el-form ref="form" :model="form" label-width="100px" >
        <el-form-item label="Hadoop路径">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Spark路径">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="master IP">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item v-for="(slave, index) in slaves" :label="'slave' + (index + 1)" :key="index">
          <el-input v-model="slave.ip"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" @click="addSlave">添加slave</el-button>
            <el-button type="danger" @click="deleteSlave">删除slave</el-button>
          </el-button-group>
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
        slaves: [{
          ip: ''
        }]
      }
    },
    methods: {
      onSubmit() {
        this.$store.commit("")
      },
      addSlave(){
        this.slaves.push({
          ip: ''
        })
      },
      deleteSlave(){
        this.slaves.pop()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
