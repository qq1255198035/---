<template>
      <div id="RR">
            <div class="my-steps">
                  <a-steps :current="2">
                        <a-step :title="$t('login.xzyh')"/>
                        <a-step :title="$t('login.txxx')"/>
                        <a-step :title="$t('login.zccg')"/>
                  </a-steps>
            </div>
            <result
                  :isSuccess="true"
                  :content="false"
                  :title="email"
                  >
                  <template slot="action">
                        
                        <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">{{$t('login.qdl')}}</a-button>
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
      const title = `${this.$t('login.ndzh')}：${v} ${this.$t('login.zccg')}`
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
