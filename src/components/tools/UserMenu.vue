<template>
  <div class="user-wrapper">
    <div class="content-box">
      <notice-icon class="action"/>
      <a href="javascript:;" @click="handleLogout" class="logout">
              <a-icon type="logout"/>
              <span>{{ $t('header.HeadMenu.logout') }}</span>
      </a>
      <LangSelect></LangSelect>
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
import LangSelect from '@/components/tools/LangSelect'
export default {
  name: 'UserMenu',
  components: {
    NoticeIcon,
    LangSelect
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
          that.Logout();
          window.location.reload()
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
