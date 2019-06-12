<template>
  <div class="logo">
    <router-link :to="{name: 'index'}">
      <img src="~@/assets/logo.png" alt="logo">
    </router-link>
  </div>
</template>
<style lang="less" scoped>
.logo{
  padding: 0 !important;
  display: flex;
    justify-content: center;
    align-items: center;
  a{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    img{
      width: 90%;
      height: 90%;
    }
  }
}
</style>

<script>
export default {
  name: 'Logo',
  components: {
    
  },
  props: {
    
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
