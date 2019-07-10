<template>
      <div id="dkxq">
            <page-header :title="pageTitle"></page-header>
            <div class="dkxq-content">
                  <ul>
                        <li><span>{{$t('admin.jysj')}}： </span>{{list.createTime}}</li>
                        <li><span>{{$t('admin.fkgs')}}： </span>{{list.payCompany}}</li>
                        <li><span>{{$t('admin.fkzh')}}： </span>{{list.payAccount}}</li>
                        <li><span>{{$t('admin.skgs')}}： </span>{{list.receiveCompany}}</li>
                        <li><span>{{$t('admin.skzh')}}： </span>{{list.receiveAccount}}</li>
                        <li><span>{{$t('admin.skyhkhh')}}： </span>{{list.receiveBank}}</li>
                        <li><span>{{$t('admin.yfje')}}： </span>{{list.payment}}</li>
                        <li><span>{{$t('admin.sxf')}}： </span>{{list.serviceCharge}}</li>
                        <li><span>{{$t('admin.wk')}}： </span>{{list.balance}}</li>
                        <li><span>{{$t('admin.hkrfy')}}： </span>{{list.bz}}</li>
                        <li><span>{{$t('admin.jyzt')}}： </span>{{$t('admin.jycg')}}</li>
                  </ul>
                  <div class="btn-box">
                        <a-button type="primary" @click="$router.go(-1)">{{$t('admin.back')}}</a-button>
                  </div>
            </div>
      </div>
</template>
<style lang="less" scoped>
#dkxq{
      margin: -24px -24px 0px;
      .dkxq-content{
            background-color: #fff;
            ul{
                  padding: 20px 50px;
                  list-style: none;
                  li{
                        color: #333;
                        display: flex;
                        margin: 5px 0;
                        span{
                              width: 158px;
                              color: #21C5C7;
                              text-align: right;
                        }
                  }
            }
            .btn-box{
                  border-top: 1px solid #ccc;
                  padding: 20px 100px;
            }
      }
}
</style>
<script>
import { mixinsTitle } from "@/utils/mixin";
export default {
      
      mixins:[mixinsTitle],
      data(){
            return{
                  pageTitle: null,
                  list:{}
            }
      },
      methods:{
            
      },
      mounted () {
            this.list = this.$route.query.data
            console.log(this.list)
            console.log(11)
            console.log(this.$route.query)
      },
}
</script>
