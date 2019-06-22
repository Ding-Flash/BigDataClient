<template>
    <d2-container>
        <template slot="header">
                <span style="display: inline-block; line-height: 30px">调用关系树</span>
                <div style="float: right; display: inline;">
                    <el-button @click="expandAll = !expandAll" size="small" round>{{ expandAll ? '收起' : '展开' }}</el-button>
                    <el-button @click="direct = !direct" size="small" round>{{ direct? '垂直': '水平'}}</el-button>
                </div>
        </template>

        <el-container>
           <el-main style="align-items:center;">
               <el-card
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  class="tree-bg"
               >
                  <el-carousel  height="500px" class="tree-bg" style="margin: 2%" v-if="tree">
                      <el-carousel-item v-for="(item,index) in tree" :key="index">
                          <div class="tree-wrapper">
                              <org-tree
                                :data="item"
                                collapsable
                                :node-render="nodeRender"
                                :expand-all="expandAll"
                                :horizontal="direct"
                                :props="props"
                                @on-node-click="onNodeClick"
                              ></org-tree>
                          </div>
                      </el-carousel-item>
                  </el-carousel>
               </el-card>
           </el-main>
        </el-container>

    </d2-container>
</template>

<script>
    import OrgTree from 'v-org-tree'
    import 'v-org-tree/dist/v-org-tree.css'
    import {getCallTree} from '@/api/hdfs'

    export default {
        name: 'tree',
        created(){
            getCallTree({
                path: '/Users/yangs/Desktop/htrace/trace.out',
                func_name: 'dataStreamer'
            }).then(res => {
                this.loading = false;
                this.tree = res['res']
            })
        },
        data() {
            return {
                tree: {},
                loading: true,
                expandAll: true,
                direct: true,
                props: {
                    id: 'hash',
                    label: 'name',
                    expand: 'expand',
                    children: 'childs'
                }
            }
        },
        components: {OrgTree},
        methods: {
            nodeRender(h, data) {
                let b_type = data.name=='dataStreamer'? 'danger': 'primary';
                return (
                    <el-button type={b_type}>{data.name}</el-button>
                )
            },
            onNodeClick(e, data){
                console.log(data.name)
            }
        }
    }
</script>

<style type="less">
    .tree-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .org-tree-node-label .org-tree-node-label-inner {
        padding: 0px 0px;
        text-align: center;
        border-radius: 3px;
        -webkit-box-shadow: 0 1px 5px rgba(0,0,0,.15);
        box-shadow: 0 1px 5px rgba(0,0,0,.15);
    }

    .org-tree-container {
        display: inline-block;
        padding: 15px;
        background-color: #ebf1f6;
    }

    .tree-bg{
        background-color: #ebf1f6;
    }
</style>