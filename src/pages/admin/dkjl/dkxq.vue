<template>
      <div id="dkxq">
            <page-header :title="pageTitle"></page-header>
            <div class="dkxq-content">
                  <ul>
                        <li><span>交易日期： </span>2019-3-25 16:15</li>
                        <li><span>付款公司： </span>李宁体育用品有限公司</li>
                        <li><span>付款账户： </span>6200 0000 0000 000</li>
                        <li><span>收款公司： </span>吉林省热动体育发展有限公司</li>
                        <li><span>收款账户： </span>6200 0000 0000 000</li>
                        <li><span>收款银行开户行： </span>中国工商银行景阳大路支行</li>
                        <li><span>预付金额： </span>$ 300,000</li>
                        <li><span>手续费： </span>$ 30,000</li>
                        <li><span>尾款： </span></li>
                        <li><span>汇款人附言： </span>汇款给XXXX经济公司</li>
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
import PageHeader from '@/components/PageHeader' 
export default {
      components: {
            'page-header': PageHeader,
      },
      data(){
            return{
                  pageTitle: null,
            }
      },
      methods:{
            getPageMeta () {
                  // eslint-disable-next-line
                  this.pageTitle = this.$route.meta.title
            },
      },
      mounted () {
            this.getPageMeta();
            
      },
}
</script>
