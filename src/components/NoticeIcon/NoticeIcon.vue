<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-tabs>
          <a-tab-pane :tab="$t('header.HeadMenu.tz')" key="1">
            <a-list v-for="(item,index) in notice" :key="index">
              <a-list-item >
                <a-list-item-meta :title="item.title" :description="item.createtime">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
              
            </a-list>
            <a class="new-list" @click="newList">{{$t('header.HeadMenu.ckqbxx')}}</a>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" style="position: relative;">
      <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      <a-badge v-if="count" class="diount" :count="count" showZero></a-badge>
        
    </span>
  </a-popover>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import { unread,headMsg } from '@/api/common'

export default {
  name: 'HeaderNotice',
  data () {
    return {
      loadding: false,
      visible: false,
      count: 0,
      notice:[]
    }
  },
  mounted(){
    this.getHeadMsg();
    this.getUnread();
  },
  filters: {
    filterMsg(val){
      return val.slice(0,3)
    }
  },
  computed:{
    
  },
  methods: {
    newList() {
      this.loadding = false
      this.visible = false
      this.$router.push({
        path: '/tzxx'
      })
      setTimeout(() => {
      window.location.reload()
    }, 1000)
    },
    fetchNotice () {
      if (!this.visible) {
        this.loadding = true
        this.visible = false
        setTimeout(() => {
          this.loadding = false
        },100)
      } else {
        this.loadding = false
      }
      this.visible = !this.visible
    },
     
    getUnread(){
      unread().then(res => {
        if(res.code == 1000){
          this.count = res.data
          console.log(this.count)
        }
      })
    },
    getHeadMsg(){
      headMsg().then(res => {
        if(res.code == 1000){
          this.notice = res.data
        }
      })
    },
    
    
  },
  
  
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
.new-list{
  width: 100%;
  display: block;
  text-align: center;
  color: #23C6C8
}
.diount{
  position: absolute;
  top: 10px;
  right: 0px;
}
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
