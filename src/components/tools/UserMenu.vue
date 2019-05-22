<template>
  <div class="user-wrapper">
    <div class="content-box">
      <notice-icon class="action"/>
      <a href="javascript:;" @click="handleLogout" class="logout">
              <a-icon type="logout"/>
              <span>退出登录</span>
      </a>
    </div>
  </div>
</template>
<style lang="less" scoped>
.content-box{
  padding-right: 20px;
  .logout{
    color: #333;
    &:hover{
      color: red;
    }
    span{
      margin-left: 5px;
    }
  }
  .action{
    margin-right: 10px;
  }
}

</style>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),
    handleLogout () {
      const that = this
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          return that.Logout({}).then(() => {
            window.location.reload()
          }).catch(err => {
            that.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
