<template>
  <d2-container>
    <template slot="header">
      大数据性能评测软件
    </template>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
            <div slot="header">
              <span>软件介绍</span>
            </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
            <div slot="header">
              <span>使用介绍</span>
            </div>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
            <div slot="header">
              <span>BigRoot功能介绍</span>
            </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
            <div slot="header">
              <span>SparkTree功能介绍</span>
            </div>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
            <div slot="header">
              <span>ASTracer功能介绍</span>
            </div>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
