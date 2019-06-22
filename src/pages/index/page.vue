<template>
  <d2-container>
    <template slot="header">大数据性能分析平台</template>
    <h1>这是一个很XX的平台, 我们可以:</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>BigRoots</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o + " bala bala" }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Spark低效行为</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o + " bala bala" }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 2%">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>HDFS</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o + " bala bala" }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>

</style>
