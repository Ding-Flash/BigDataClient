<template>
  <d2-container>
    <template slot="header">
        <d2-icon name="cubes"/> 新建任务
    </template>
    <el-container>
      <el-main>
        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-card>
              <div slot="header">
                <span>创建新的ASTracer任务</span>
              </div>
              <el-form ref="form" :model="task" label-width="100px" style="margin: 5%">
                <el-form-item label="任务名称">
                  <el-input v-model="task.name" placeholder="请输入任务名称"></el-input>
                </el-form-item>
                <el-form-item label="采样器">
                  <el-radio-group v-model="task.sampler">
                    <el-radio label="概率采样"></el-radio>
                    <el-radio label="系统采样"></el-radio>
                    <el-radio label="Bump采样"></el-radio>
                    <el-radio label="令牌桶采样"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-edit">采样器配置</el-button>
                </el-form-item>
                <div v-if="task.sampler === '概率采样'">
                  <el-form-item label="采样概率">
                    <el-input-number v-model="task.probability" :precision="3" :step="0.001" :max="1" :min="0"></el-input-number>
                  </el-form-item>
                </div>
                 <div v-if="task.sampler === '系统采样'">
                  <el-form-item label="采样间隔">
                    <el-input-number v-model="task.count"  :step="10" :min="0"></el-input-number>
                  </el-form-item>
                </div>
                 <div v-if="task.sampler === 'Bump采样'">
                  <el-form-item label="lambda">
                    <el-input-number v-model="task.lambda"  :step="100" :min="0"></el-input-number>
                  </el-form-item>
                  <el-form-item label="最低采样概率">
                    <el-input-number v-model="task.probability" :precision="3" :step="0.001" :max="1" :min="0"></el-input-number>
                  </el-form-item>
                </div>
                 <div v-if="task.sampler === '令牌桶采样'">
                  <el-form-item label="令牌桶大小">
                    <el-input-number v-model="task.bsize"  :step="100" :min="0"></el-input-number>
                  </el-form-item>
                  <el-form-item label="replenish rate">
                    <el-input-number v-model="task.brate"  :step="10" :min="0"></el-input-number>
                  </el-form-item>
                </div>
                <el-form-item label="任务描述">
                  <el-input type="textarea" v-model="task.desc" placeholder="请输入任务描述" :rows="6"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button @click="cancel">取消</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-card>
              <div slot="header">
                <span>关于ASTracer采样</span>
              </div>
              <div style="margin-bottom: 5%">
                介绍关于ASTracer采样
              </div>
              <el-collapse v-model="task.sampler" accordion>
                <el-collapse-item title="概率采样" name="概率采样">
                  <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                  <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item title="系统采样" name="系统采样">
                  <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="Bump采样" name="Bump采样">
                  <div>简化流程：设计简洁直观的操作流程；</div>
                  <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                  <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="令牌桶采样" name="令牌桶采样">
                  <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                  <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </d2-container>
</template>

<script>
  import {createTask} from '@/api/hdfs'
  export default {
    data() {
      return {
        task: {
          name: '',
          sampler: '概率采样',
          probability: 0.001,
          count: 100,
          lambda: 1000,
          bsize: 1000,
          brate: 20,
          desc: ''
        },
        select: '1'
      }
    },
    methods: {
      onSubmit() {
        if(this.task.name==='') {
            this.$notify.error({
              title: '错误',
              message: '必须填写任务名称',
              duration: 2000
            });
            return
        }
        this.$store.commit("hdfs/setTask", this.task);
        createTask(this.task).then(res => {
          if(res.status === 0){
            this.$notify.success({
              title: '成功',
              message: '创建成功, 即将跳转到任务清单',
              duration: 3000
            });
            setTimeout(()=>{
              this.$router.push({name: "history"})
            }, 1000)
          }
          else{
            this.$notify.error({
              title: '警告',
              message: '重复命名'
            })
          }
        })
      },
      cancel(){
        this.task = {
          name: '',
          sampler: '概率采样',
          probability: 0.001,
          count: 100,
          lambda: 1000,
          bsize: 1000,
          brate: 20,
          desc: ''
        };
        this.$notify.info({
          title: '消息',
          message: '取消成功',
          duration: 2000
        });
      }
    }
  }
</script>

<style scoped>

</style>