<template>
    <el-row :gutter="30">
        <el-col :span="8">
            <el-card style="background: #f0f9eb">
                <div slot="header">
                    <d2-icon name="file-code-o"/>
                    <span style="margin-left: 2%">File Size</span>
                </div>
                <div class="iCountUp">
                    <ICountUp :endVal="253.2"/>
                    MB
                </div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card style="background: #f2f2f3">
                <div slot="header">
                    <d2-icon name="code"/>
                    <span style="margin-left: 2%">Function Type</span>
                </div>
                <div class="iCountUp">
                    <ICountUp :endVal="38"/>
                </div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card style="background: #fdf0f0">
                <div slot="header">
                    <d2-icon name="code-fork"/>
                    <span style="margin-left: 2%">Call Tree Type</span>
                </div>
                <div class="iCountUp">
                    <ICountUp :endVal="22"/>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import ICountUp from 'vue-countup-v2';
    export default {
        name: "detail-info",
        components:{
            ICountUp
        },
        data() {
          return {
            endVal: 300,
          };
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