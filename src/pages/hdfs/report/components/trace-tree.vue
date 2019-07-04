<template>
    <div>
        <el-button @click="expandAll = !expandAll" size="small" round>{{ expandAll ? 'Collapse' : 'Expand' }}</el-button>
        <el-button @click="direct = !direct" size="small" round>{{ direct? 'Vertical': 'Horizontal'}}</el-button>


        <el-container>
            <el-main style="align-items:center;">
                <el-card
                        v-loading="loading"
                        element-loading-text="Loading"
                        element-loading-spinner="el-icon-loading"
                        class="tree-bg"
                >
                    <el-carousel height="500px" class="tree-bg" style="margin: 2%" v-if="tree">
                        <el-carousel-item v-for="(item,index) in tree" :key="index">
                            <div class="tree-wrapper">
                                <org-tree
                                        :data="item"
                                        collapsable
                                        :node-render="nodeRender"
                                        :expand-all="expandAll"
                                        :horizontal="direct"
                                        :props="props"
                                ></org-tree>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-card>
            </el-main>
        </el-container>
    </div>


</template>

<script>
    import OrgTree from 'v-org-tree'
    import 'v-org-tree/dist/v-org-tree.css'
    import {getCallTree} from '@/api/hdfs'

    export default {
        name: 'trace-tree',
        components: {OrgTree},
        created() {
            this.getTree()
        },
        computed:{
            selectFunc: {
                get: function () {
                    return this.$store.state.hdfs.selectFunc
                },
                set: function (value) {
                    this.$store.commit("hdfs/setSelectFunc", value)
                }
            }
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
        watch:{
            selectFunc(v){
                this.getTree()
            }
        },
        methods: {
            getTree(){
             getCallTree({
                    path: '/Users/yangs/Desktop/trace.out',
                    func_name: this.selectFunc
                }).then(res => {
                    this.loading = false;
                    this.tree = res['res']
                })
            },
            nodeRender(h, data) {
                let b_type = data.name === this.selectFunc ? 'danger' : 'primary';
                return (
                    <el-button type = {b_type} > {data.name}</el-button>
                )
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
        -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
        box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
    }

    .org-tree-container {
        display: inline-block;
        padding: 15px;
        /*background-color: #ebf1f6;*/
    }

</style>