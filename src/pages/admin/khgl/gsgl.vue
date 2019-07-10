<template>
      <div id="gsgl">
            <div class="gsgl-header">
                  <a-row :gutter="2">
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item :label="$t('admin.xzrq')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-locale-provider :locale="locale">
                                          <a-range-picker @change="changeDate" class="my-picker"/>
                                          </a-locale-provider>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item :label="$t('issuer.accountInfo.companyTitle')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input :placeholder="$t('issuer.cjhd.inputCompany')" v-model="condition"/>
                                    </a-form-item>
                                    <a-button type="primary" icon="search" @click="search">{{$t('issuer.hdgl.searchs')}}</a-button>
                              </div>
                        </a-col>
                  </a-row>
            </div>
            <div class="gsgl-content">
                  <a-tabs defaultActiveKey="1" tabPosition="top" size="large" @change="tabChange">
                        <a-tab-pane key="1" :tab="$t('issuer.index.pending')">
                              <a-row type="flex" justify="start" align="top" v-if="cardItemData1.length > 0" class="my-cards">
                                    <a-col :xxl="{span:5,offset:1}" :xl="{span:9,offset:2}" :lg="{span:8,offset:2}" :md="{span:12,offset:2}" class="card-item" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData1" :key="index">
                                          
                                          <div class="title">
                                                <a-avatar :size="64" :src="item.logo"/>
                                                <span :title="item.name">{{item.name}}</span>
                                          </div>
                                          <div class="content">
                                                <p>{{$t('issuer.accountInfo.contact')}}: {{ item.contact}}</p>
                                                <p>{{$t('issuer.accountInfo.telphone')}}：{{item.phone}}</p>
                                                <p>{{$t('issuer.accountInfo.email')}}：{{item.email}}</p>
                                                <p>{{$t('issuer.accountInfo.companyTitle')}}：{{item.name}}</p>
                                          </div>
                                          <div class="footer">
                                                <transition name="fade">
                                                      <div class="button-box" v-show= "btnShow == index" key="1">
                                                            <a-button type="danger" class="danger" @click="showModal(item.key)">{{$t('issuer.hdgl.bh')}}</a-button>
                                                            <a-button type="primary" class="primary" @click="success(item.key)" :loading="loading">{{$t('issuer.hdgl.tg')}}</a-button>
                                                            <a-button @click="$router.push({path:'/khgl/gsxq',query:{id: item.key}})">{{$t('issuer.hdgl.examine')}}</a-button>
                                                      </div>
                                                </transition>
                                                
                                          </div>
                                    </a-col>
                              </a-row>
                              <p v-else style="text-align: center; color: #ccc;">
                                    {{$t('issuer.index.noData')}}
                              </p>
                              <div style="text-align: center; margin-top: 16px;">
                                    <a-button @click="loadMore1" :loading="loadingMore" :disabled="btnDsiable1">{{$t('issuer.hdgl.loadMore')}}</a-button>
                              </div>
                        </a-tab-pane>
                        <a-tab-pane key="0" :tab="$t('issuer.hdgl.ysp')">
                              <a-row type="flex" justify="start" align="top" v-if="cardItemData2.length > 0" class="my-cards">
                                    <a-col :xxl="{span:5,offset:1}" :xl="{span:9,offset:2}" :lg="{span:8,offset:2}" :md="{span:12,offset:2}" class="card-item" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData2" :key="index">
                                          
                                          <div class="title">
                                                <a-avatar :size="64" :src="item.logo"/>
                                                <span :title="item.name">{{item.name}}</span>
                                          </div>
                                          <div class="content">
                                                <p>{{$t('issuer.accountInfo.contact')}}: {{ item.contact }}</p>
                                                <p>{{$t('issuer.accountInfo.telphone')}}：{{item.phone}}</p>
                                                <p>{{$t('issuer.accountInfo.email')}}：{{item.email}}</p>
                                                <p>{{$t('issuer.accountInfo.companyTitle')}}：{{item.name}}</p>
                                          </div>
                                          <div class="footer">
                                                <transition name="fade">
                                                      <div class="button-box" v-show= "btnShow == index" key="1">
                                                            
                                                            <a-button type="primary" class="primary" @click="$router.push({path:'/khgl/gsxq',query:{id: item.key}})">{{$t('issuer.hdgl.examine')}}</a-button>
                                                      </div>
                                                </transition>
                                                
                                          </div>
                                    </a-col>
                              </a-row>
                              <p v-else style="text-align: center; color: #ccc;">
                                   {{$t('issuer.index.noData')}}
                              </p>
                              <div style="text-align: center; margin-top: 16px;">
                                    <a-button @click="loadMore2" :loading="loadingMore" :disabled="btnDsiable2">{{$t('issuer.hdgl.loadMore')}}</a-button>
                              </div>
                        </a-tab-pane>
                        
                  </a-tabs>
            </div>
            
            <a-modal
                  title=""
                  :visible="visible"
                  @ok="handleOk"
                  :confirmLoading="confirmLoading"
                  @cancel="handleCancel"
            >
                  <a-form-item :label="$t('issuer.hdgl.yy')">
                        <a-textarea :placeholder="$t('admin.qsryy')" :autosize="{ minRows: 4 }" v-model="reason"/>
                  </a-form-item>
            </a-modal>
      </div>
</template>
<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
#gsgl{
	margin: 24px;
      .gsgl-header{
            background-color: #fff;
            margin: 20px 0;
            padding: 20px 0;
           .input-box{
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 .my-form-item{
                        margin: 0; 
                        width: 100%;
                        .my-picker{
                              width: 100%;
                        }
                  }
           }
            
      }
      .gsgl-content{
		padding: 20px;
            background-color: #fff;
            .my-cards{
                  flex-wrap: wrap;
                  .card-item{
                        height: 420px;
                        margin-bottom: 20px;
                        border:1px solid #ccc;
                        border-radius: 5px;
                        padding: 40px 20px 0;
                        .title{
                              display: flex;
                              height: 145px;
                              align-items: center;
                              flex-direction: column;
                              padding: 20px 0;
                              p{
                                    color: #21C5C7;
                                    font-size: 28px;
                                    margin: 20px 0 10px;
                                    span{
                                          font-size: 14px;
                                          color: #333;
                                          margin-right: 5px;
                                    }
                              }
                              span{
                                    &:nth-child(2){
                                          width: 100%;
                                          padding: 0 10px;
                                          display: block;
                                          font-size: 14px;
                                          color: #21C5C7;
                                          margin-top: 20px;
                                          text-align: center;
                                          overflow: hidden;
                                          text-overflow: ellipsis;
                                          white-space: nowrap;
                                    }   
                              }
                        }
                        .content{   
                              padding: 20px 10px 0;
                              height: 155px;
                              overflow: hidden;
                              p{
                                    margin: 0 0 10px;
                                    word-break:break-all;
                              }
                        }
                        .footer{
                              .button-box{
                                    padding: 20px 0;
                                    display: flex;
                                    justify-content: space-around;
                                    
                                    .danger{
                                          background-color: #ff0000;
                                          color: #fff;
                                          
                                          border-color: red;
                                    }
                                    .primary{
                                          background-color: #23C6C8;
                                          color: #fff;
                                          
                                          border-color: #23C6C8;
                                    }   
                              }   
                        }
                  }
            }
      }
}

</style>
<script>
import { gsspList, organizeApproval } from '@/api/admin'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
export default {
      components:{
            
      },
      data(){
            return{
                  locale: lang[localStorage.getItem('lang')],   
                  btnShow: -1,
                  visible: false,
                  confirmLoading: false,
                  loading:false,
                  btnDsiable1: false,
                  btnDsiable2: false,
                  loadingMore: false,
                  cardItemData1:[],  
                  cardItemData2:[],  
                  condition: '',
                  offset:1,
                  offset1:1,
                  offset2:1,
                  starttime:'',
                  endtime: '',
                  key:'',
                  reason:'',
                  status:1
            }
      },
      mounted(){
            this.getGsspList1(this.condition,1,this.offset,this.starttime,this.endtime);
            this.getGsspList0(this.condition,0,this.offset,this.starttime,this.endtime);
      },
      methods:{
            tabChange(key){
                  this.status = key
            },
            getGsspList1(condition,status, offset,starttime,endtime){
                  gsspList(condition,status,offset,starttime,endtime).then(res=>{
                        if (res.code == 1000) {
                              this.loadingMore = false;
                              console.log(res)
                              this.cardItemData1 = res.page.rows;
                              if (res.page.offset >= res.page.pages) {
                                    this.btnDsiable1 = true;
                              }else{
                                    this.btnDsiable1 = false;
                              }
                              
                        }
                  })
            },
            getGsspList0(condition,status, offset,starttime,endtime){
                  gsspList(condition,status,offset,starttime,endtime).then(res=>{
                        if (res.code == 1000) {
                              this.loadingMore = false;
                              console.log(res)
                              this.cardItemData2 = res.page.rows;
                              if (res.page.offset >= res.page.pages) {
                                    this.btnDsiable2 = true;
                              }else{
                                    this.btnDsiable2 = false;
                              }
                        }
                  })
            },
            loadMore1(){
                  this.loadingMore = true;
                  this.offset1++;
                  gsspList('',1,this.offset1,'','').then(res=>{
                        if (res.code == 1000) {
                              if (this.offset1 > res.page.pages) {
                                    this.$message.warning(this.$t('admin.yjzqusj'));
                                    this.loadingMore = false;
                                    this.btnDsiable1 = true;
                                    return;
                              }
                              this.loadingMore = false;
                              let cardItemData3 = res.page.rows
                              this.cardItemData1 = this.cardItemData1.concat(cardItemData3);
                              
                        }
                  })

            },
            loadMore2(){
                  this.loadingMore = true;
                  this.offset2++;
                  gsspList('',0,this.offset2,'','').then(res=>{
                        if (res.code == 1000) {
                              if (this.offset2 > res.page.pages) {
                                    this.$message.warning(this.$t('admin.yjzqusj'));
                                    this.loadingMore = false;
                                    this.btnDsiable2 = true;
                                    return;
                              }
                              this.loadingMore = false;
                              let cardItemData4 = res.page.rows
                              this.cardItemData2 = this.cardItemData2.concat(cardItemData4)
                        }
                  })

            },
            search(){
                  this.offset1 = 1;
                  this.offset2 = 1;
                  this.btnDsiable1 = false;
                  this.btnDsiable2 = false;
                  if (this.status == 1) {
                        this.getGsspList1(this.condition,this.status,this.offset,this.starttime,this.endtime);
                  }else{
                        this.getGsspList0(this.condition,this.status,this.offset,this.starttime,this.endtime);
                  }
                  
            },
            showModal(orgId) {
                  this.visible = true
                  this.key = orgId;
            },
            changeDate(val,date){
                  this.starttime = date[0];
                  this.endtime = date[1]
            },
            postOrganizeApproval(orgId, reject, agreement){
                  organizeApproval(orgId, reject, agreement).then(res=>{
                        if (res.code == 1000) {
                              this.$message.success(this.$t('issuer.hdgl.czcg'));
                              this.loading = false;
                              this.confirmLoading = false;
                              this.visible = false;
                              setTimeout(() => {
                                    window.location.reload();
                              }, 500);
                        }
                  })
            },
            handleOk(e) {
                  this.confirmLoading = true;
                  this.postOrganizeApproval(this.key, this.reason, 2)
            },
            handleCancel(e) {
                  this.visible = false
            },
            success(orgId) {
                  this.loading = true;
                  this.postOrganizeApproval(orgId, '', 0)
                  
            },
      }
}
</script>
