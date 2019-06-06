<template>
      <div id="RR">
            <div class="my-steps">
                  <a-steps :current="2">
                        <a-step title="选择用户"/>
                        <a-step title="填写信息"/>
                        <a-step title="注册完成"/>
                  </a-steps>
            </div>
            <result
                  :isSuccess="true"
                  :content="false"
                  :title="email"
                  >
                  <template slot="action">
                        
                        <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</a-button>
                  </template>
            </result>
      </div>
  
</template>

<script>
import { Result } from '@/components'

export default {
  name: 'RegisterResult',
  components: {
    Result
  },
  data () {
    return {
      form: {}
    }
  },
  computed: {
    email () {
      const v = this.form && this.form.email || 'xxx'
      const title = `你的账户：${v} 注册成功`
      return title
    }
  },
  created () {
    this.form = this.$route.params
  },
  methods: {
    goHomeHandle () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="less" scoped>
      #RR{
            .my-steps{
                  max-width: 600px;
                  margin: 0 auto;
            }
      }
</style>
