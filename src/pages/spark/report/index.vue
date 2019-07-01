<template>
    <d2-container>
        <template slot="header">测试任务</template>
        <el-row :gutter="20">
            <el-col :span="16">
                <el-card>
                    <div slot="header">Straggler 检测</div>
                    <div id="timeline" style="width: 1200px;height: 700px"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div slot="header">Straggler 类型</div>
                    <div class="block">
                      <el-timeline>
                        <el-timeline-item timestamp="Straggler 0" placement="top" color="#f54b42">
                          <el-card>
                            <el-badge :value="0.191" class="item">
                              <el-tag>CPU_Abnormal</el-tag>
                            </el-badge>
                          </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="Straggler 1" placement="top" color="#42a7f5">
                          <el-card>
                            <el-badge :value="0.191" class="item">
                              <el-tag size="smalll">CPU_Abnormal</el-tag>
                            </el-badge>
                            <el-badge :value="0.148" class="item">
                              <el-tag type="success">Long_Deserialization</el-tag>
                            </el-badge>
                          </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="Straggler 2" placement="top" color="#42a7f5">
                          <el-card>
                            <el-badge :value="0.1465" class="item">
                              <el-tag type="danger">Unknown_Reason</el-tag>
                            </el-badge>
                          </el-card>
                        </el-timeline-item>
                          <el-timeline-item timestamp="Straggler 3" placement="top" color="#f54b42">
                          <el-card>
                            <el-badge :value="0.1004" class="item">
                              <el-tag type="warning">Read_Value_Skew</el-tag>
                            </el-badge>
                          </el-card>
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </d2-container>
</template>

<script>
    import echarts from "echarts"
    import config from "@/config/spark/index"
    import {getTaskTimeline} from "@/api/spark"
    export default {
        name: "index",
        mounted() {
            getTaskTimeline({}).then(res => {
                res = res.data;
                this.getTimeline(res);
            })
        },
        methods: {
            getTimeline(data){
                let timeline = echarts.init(document.getElementById('timeline'));
                let option = config.getTimelineConfig(data.task_number, data.op_list);
                timeline.setOption(option, {notMerge: true})
            }
        }
    }
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>