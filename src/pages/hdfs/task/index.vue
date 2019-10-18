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
              <el-collapse v-model="task.sampler" accordion>
                <el-collapse-item title="概率采样" name="概率采样">
                  <div>使用用户设定的采样概率进行采样</div>
                  <div>建议设定采样率为0.001，如果采样率过低，会造成较大的性能影响；采样率过低，会导致大部分函数调用消失。</div>
                </el-collapse-item>
                <el-collapse-item title="系统采样" name="系统采样">
                  <div>间隔采样</div>
                  <div>根据采样到的函数的个数进行间隔采样</div>
                </el-collapse-item>
                <el-collapse-item title="Bump采样" name="Bump采样">
                  <div>使用Bump函数进行采样</div>
                  <div>自适应采样，当某一函数执行次数过多时，会进行背压；当执行次数过少时，会提高采样概率</div>
                </el-collapse-item>
                <el-collapse-item title="令牌桶采样" name="令牌桶采样">
                  <div>令牌桶采样</div>
                  <div>自适应采样器，保留完整的函数种类的同时，也能保证能够应对峰值造成的性能压力。</div>
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
        // TODO 如果有完成的任务则不能创建新任务
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