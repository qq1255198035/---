<template>
      <div id="dkxq">
            <page-header :title="pageTitle"></page-header>
            <div class="dkxq-content">
                  <ul>
                        <li><span>交易日期： </span>{{list.createTime}}</li>
                        <li><span>付款公司： </span>{{list.payCompany}}</li>
                        <li><span>付款账户： </span>{{list.payAccount}}</li>
                        <li><span>收款公司： </span>{{list.receiveCompany}}</li>
                        <li><span>收款账户： </span>{{list.receiveAccount}}</li>
                        <li><span>收款银行开户行： </span>{{list.receiveBank}}</li>
                        <li><span>预付金额： </span>{{list.payment}}</li>
                        <li><span>手续费： </span>{{list.serviceCharge}}</li>
                        <li><span>尾款： </span>{{list.balance}}</li>
                        <li><span>汇款人附言： </span>{{list.bz}}</li>
                        <li><span>交易状态： </span>交易成功</li>
                  </ul>
                  <div class="btn-box">
                        <a-button type="primary" @click="$router.go(-1)">返 回</a-button>
                  </div>
            </div>
      </div>
</template>
<style lang="less" scoped>
#dkxq{
      margin: -24px -24px 0px;
      .dkxq-content{
            ul{
                  padding: 20px 50px;
                  list-style: none;
                  li{
                        color: #333;
                        display: flex;
                        margin: 5px 0;
                        span{
                              width: 116px;
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
            
            this.list = this.$route.params.data
      },
}
</script>
