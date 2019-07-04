<template>
    <div>
        <el-form
                v-if="funcData"
                :inline="true"
                size="mini"
                style="margin: 10px"
            >
            <el-form-item :label="`data export [ ${funcData.length} ]`">
                <el-button-group>
                    <el-button
                            type="primary"
                            size="mini"
                            :disabled="!funcData"
                    >
                        xlsx
                    </el-button>
                    <el-button
                            type="primary"
                            size="mini"
                            :disabled="!funcData"
                    >
                        csv
                    </el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        <el-table
                v-loading="loading"
                :data="funcData"
                style="width: 100%"
                size="mini"
                stripe
                :default-sort = "{prop: 'count', order: 'descending'}"
            >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column prop="name" label="function name" width="250">
            </el-table-column>
            <el-table-column
                    prop="count"
                    label="count"
                    sortable
                >
                <template slot-scope="scope">
                    <el-tag>{{scope.row.count}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="mean"
                    label="mean(ms)"
                    sortable
                >
                <template slot-scope="scope">
                    <el-tag type="danger">{{scope.row.mean.toFixed(2)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="std" label="std">
                <template slot-scope="scope">
                    <el-tag type="success">{{scope.row.std.toFixed(2)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="status">
                <template slot-scope="scope">
                <span v-if="scope.row.std < scope.row.mean">
                    <d2-icon
                            name="check-circle"
                            style="font-size: 20px; line-height: 32px; color: #67C23A;"
                            slot="active"/>
                </span>
                    <span v-else>
                    <d2-icon
                            name="times-circle"
                            style="font-size: 20px; line-height: 32px; color: #F56C6C;"
                            slot="inactive"/>
                </span>
                </template>
            </el-table-column>
            <el-table-column  prop="total" label="total(ms)" sortable>
                <template slot-scope="scope">
                    <el-tag type="info">{{Math.round(scope.row.total)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="min" label="min(ms)"></el-table-column>
            <!--<el-table-column prop="25%" label="上四分位(ms)"></el-table-column>-->
            <el-table-column prop="50%" label="median(ms)"></el-table-column>
            <!--<el-table-column prop="75%" label="下四分位(ms)"></el-table-column>-->
            <el-table-column prop="max" label="max(ms)"></el-table-column>
            <el-table-column label="operate" width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="info"
                            @click="moveTree(scope.row.name)"
                    >call tree
                    </el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="moveTimeline(scope.row.name)"
                    >timeline
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import {getFuncFeature} from "@/api/hdfs";

    export default {
        name: "all-func-info",
        data() {
            return {
                funcData: null,
                loading: true,
                funcname: null,
            }
        },
        created() {
            getFuncFeature({
                path: '/Users/yangs/Desktop/trace.out'
            }).then(res => {
                this.loading = false;
                this.funcData = res;
            })
        },
        methods:{
            moveTree(name){
                this.$store.commit('hdfs/setSelectFunc', name);
                this.$store.commit('hdfs/setActiveTab', 'tree')
            },
            moveTimeline(name){
                this.$store.commit('hdfs/setSelectFunc', name);
                this.$store.commit('hdfs/setActiveTab', 'time');
            }
        }
    }
</script>

<style scoped>

</style>