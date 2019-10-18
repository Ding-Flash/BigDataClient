<template>
    <d2-container>
        <template slot="header">Spark分析报告</template>
        <el-row :gutter="20">
            <el-col :span="17">
                <el-card style="overflow: auto" shadow="always">
                    <div slot="header">Straggler 检测</div>
                    <div id="timeline" style="height: 600px"></div>
                </el-card>
            </el-col>
            <el-col :span="7">
                <el-card style="overflow: auto" shadow="always">
                    <div slot="header">Straggler 类型</div>
                    <div class="block" style="height: 600px" v-if="stragglers.length > 0">
                      <el-timeline>
                        <el-timeline-item v-for="(straggler, index) in stragglers"
                              :timestamp="'Straggler ' + index + ': task-number ' + straggler.task_number"
                              :key="index" placement="top"
                              :color="straggler.task_number > 10? '#f54b42':'#4287f5'"
                        >
                          <el-card>
                            <el-badge v-for="(feature, j) in straggler.feature"
                                  :key="j"
                                  :value="feature[1]" class="item">
                              <el-tag
                                  size="small"
                                  :type="tag_type[Math.floor(Math.random()*(tag_type.length+1))]"
                              >
                                  {{f_label[feature[0]]}}
                              </el-tag>
                            </el-badge>
                          </el-card>
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <div>
          <el-card>
              <div slot="header">Straggler 决策树生成</div>
                <el-row type="flex" justify="center">
                <div v-if="cart_tree">
                    <org-tree
                            :data="cart_tree"
                            collapsable
                            :node-render="nodeRender"
                            :expand-all="true"
                            :props="props"
                    ></org-tree>
                </div>
                </el-row>
            </el-card>
        </div>
    </d2-container>
</template>

<script>
    import echarts from "echarts"
    import config from "@/config/spark/index"
    import OrgTree from 'v-org-tree'
    import {getTaskTimeline, getStraggler, getCartTree} from "@/api/spark"
    export default {
        name: "index",
        created() {
            let task_name = this.$store.state.spark.currentTaskName;
            if (task_name === '') {
                this.$router.push({name: 'history'});
                this.$notify({
                    title: '注意',
                    message: '请选择或创建task',
                    type: 'warning'
                });
            }
            else {
                getTaskTimeline({name: task_name}).then(res => {
                    res = res.data;
                    this.getTimeline(res);
                });
                this.getStraggler(task_name);
                this.getTree(task_name);
            }

        },
        components: {OrgTree},
        data() {
            return{
                stragglers: [],
                f_label: config.featuresLabels,
                tag_type : ['primary','success','warning','danger','info'],
                props: {
                    id: 'name',
                    label: 'label',
                    expand: 'expand',
                    children: 'childs'
                },
                cart_tree: null
            }
        },
        methods: {
            getTimeline(data){
                let timeline = echarts.init(document.getElementById('timeline'));
                // console.log(data);
                let option = config.getTimelineConfig(data.task_num, data.op_list, data.straggler_op_location_list, data.op_name_list);
                timeline.setOption(option, {notMerge: true})
            },
            getStraggler(task){
                getStraggler({name:task}).then(res => {
                    this.stragglers = res.data.straggler_type;
                })
            },
            getTree(task){
                getCartTree({name:task}).then(res => {
                    this.cart_tree = res
                })
            },
            nodeRender(h, data) {
                return h('el-card',
                    Array.apply(null, data.label.map(function (l) {
                            return h('el-alert',{
                               props:{
                                   center: true,
                                   effect: "dark",
                                   closable: false
                               }
                            }, l
                            )
                        }
                    ))
                )
            }
        }
    }
</script>

<style type="less">
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.org-tree-node-label .org-tree-node-label-inner {
    padding: 0px 0px;
    text-align: center;
    border-radius: 3px;
    -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
    box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
}
.org-tree-container {
    display: inline-block;
    padding: 15px;
    /*background-color: #ebf1f6;*/
}
</style>