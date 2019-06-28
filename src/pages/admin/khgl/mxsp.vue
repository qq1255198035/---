<template>
      <div id="mxsp">
            <div class="mxsp-header">
                  <a-row :gutter="2">
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-range-picker @change="changeDate" class="my-picker"/>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item label="公司名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input placeholder="请输入公司名称" v-model="condition"/>
                                    </a-form-item>
                                    <a-button type="primary" icon="search" @click="search">搜 索</a-button>
                              </div>
                        </a-col>
                  </a-row>
            </div>
            <div class="gsgl-content">
                  <a-tabs defaultActiveKey="1" tabPosition="top" size="large" @change="tabChange">
                        <a-tab-pane key="1" tab="待审批">
                              <div class="my-cards" v-if="cardItemData1.length > 0">
                                    <div class="card-item ant-card-hoverable" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData1" :key="index">
                                          <div class="title">
                                                <h5>{{item.name}}</h5>
                                                <span>{{ item.enName}}</span>
                                                <a-avatar :size="64" :src="host + item.avatar"/>
                                                <div class="bottom">
                                                      <span>{{item.catalog}}</span>
                                                      <span>{{item.birth}} | {{item.height}}cm</span>
                                                      <span>{{item.addr}}</span>
                                                </div>    
                                          </div>
                                          <div class="content">
                                                <p>联系人: {{ item.contact}}</p>
                                                <p>联系电话：{{item.phone}}</p>
                                                <p>邮箱：{{item.email}}</p>
                                                <p>公司：{{item.company}}</p>
                                          </div>
                                          <div class="footer">
                                                <transition name="fade">
                                                      <div class="button-box" v-show= "btnShow == index" key="1">
                                                            <a-button type="danger" class="danger" @click="showModal(item.key)">驳回</a-button>
                                                            <a-button type="primary" class="primary" @click="success(item.key)" :loading="loading">通过</a-button>
                                                            <a-button @click="$router.push({path:'/khgl/mxxq',query:{id: item.key}})">查 看</a-button>
                                                      </div>
                                                </transition>
                                                
                                          </div>
                                    </div>      
                              </div>
                              <p v-else style="text-align: center; color: #ccc;">
                                    暂无数据
                              </p>
                              <div style="text-align: center; margin-top: 16px;">
                                    <a-button @click="loadMore1" :loading="loadingMore" :disabled="btnDsiable1">加载更多</a-button>
                              </div>
                        </a-tab-pane>
                        <a-tab-pane key="0" tab="已审批">
                              <div class="my-cards" v-if="cardItemData2.length > 0">
                                    <div class="card-item ant-card-hoverable" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData2" :key="index">
                                          <div class="title">
                                                <h5>{{item.name}}</h5>
                                                <span>{{ item.enName}}</span>
                                                <a-avatar :size="64" :src="host + item.avatar"/>
                                                <div class="bottom">
                                                      <span>{{item.catalog}}</span>
                                                      <span>{{item.birth}} | {{item.height}}cm</span>
                                                      <span>{{item.addr}}</span>
                                                </div>    
                                          </div>
                                          <div class="content">
                                                <p>联系人: {{ item.contact}}</p>
                                                <p>联系电话：{{item.phone}}</p>
                                                <p>邮箱：{{item.email}}</p>
                                                <p>公司：{{item.company}}</p>
                                          </div>
                                          <div class="footer">
                                                <transition name="fade">
                                                      <div class="button-box" v-show= "btnShow == index" key="1">
                                                            
                                                            <a-button type="primary" class="primary" @click="$router.push({path:'/khgl/mxxq',query:{id: item.key}})">查 看</a-button>
                                                      </div>
                                                </transition>
                                                
                                          </div>
                                    </div>      
                              </div>
                              <p v-else style="text-align: center; color: #ccc;">
                                    暂无数据
                              </p>
                              <div style="text-align: center; margin-top: 16px;">
                                    <a-button @click="loadMore2" :loading="loadingMore" :disabled="btnDsiable2">加载更多</a-button>
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
                  <a-form-item label="原因">
                        <a-textarea placeholder="input placeholder" :autosize="{ minRows: 4 }" v-model="reason"/>
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
#mxsp{
	margin: 24px;
      .mxsp-header{
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
                  display: flex;
                  justify-content: flex-start;
                  flex-wrap: wrap;
                  padding: 0 120px 50px;
                  
                  .card-item{
                        width: 22%;
                        height: 460px;
                        margin: 10px 1%;
                        border:1px solid #ccc;
                        border-radius: 5px;
                        padding: 20px;
                        .title{
                              display: flex;
                              align-items: center;
                              flex-direction: column;
                              padding: 10px 0;
                              .bottom{
                                    margin-top: 20px;
                                    display: flex;
                                    justify-content: center;
                                    flex-direction: column;
                                    align-items: center;
                              }
                              h5{
                                    font-size: 14px;
                                    color: #21C5C7;
                                    margin: 0;
                              }
                              span{
                                    font-size: 14px;
                                    color: #333;
                                    margin-top: 5px; 
                                    
                              }
                        }
                        .content{   
                              padding: 20px 0 0;
                              border-top: 1px solid #ccc;
                              p{
                                    margin: 0 0 10px;
                              }
                        }
                        .footer{
                              .button-box{
                                    padding: 10px 0;
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
import { mxspList, starApproval } from '@/api/admin'
export default {
      components:{
            
      },
      data(){
            return{       
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
                  host: '',
                  key:'',
                  reason:'',
                  status:1,
            }
      },
      mounted(){
            this.getMxspList1(this.condition,1,this.offset,this.starttime,this.endtime);
            this.getMxspList0(this.condition,0,this.offset,this.starttime,this.endtime);
            this.host = this.$host
            
      },
      methods:{
            tabChange(key){
                  this.status = key
            },
            getMxspList1(condition,status,offset,starttime,endtime){
                  mxspList(condition,status,offset,starttime,endtime).then(res=>{
                        if (res.code == 1000) {
                              this.loadingMore = false;
                              console.log(res)
                              this.cardItemData1 = res.page.rows
                              if (this.cardItemData1.length == 0) {
                                    this.btnDsiable1 = true;
                              }
                        }
                  })
            },
            getMxspList0(condition,status,offset,starttime,endtime){
                  mxspList(condition,status,offset,starttime,endtime).then(res=>{
                        if (res.code == 1000) {
                              this.loadingMore = false;
                              console.log(res)
                              this.cardItemData2 = res.page.rows
                              if (this.cardItemData2.length == 0) {
                                    this.btnDsiable2 = true;
                              }
                        }
                  })
            },
            loadMore1(){
                  this.loadingMore = true;
                  this.offset1++;
                  mxspList('',1,this.offset1,'','').then(res=>{
                        if (res.code == 1000) {
                              if (this.offset1 > res.page.pages) {
                                    this.$message.warning('已加载全部数据');
                                    this.loadingMore = false;
                                    this.btnDsiable1 = true;
                                    return;
                              }
                              this.loadingMore = false;
                              let cardItemData3 = res.page.rows
                              this.cardItemData1 = this.cardItemData1.concat(cardItemData3);
                              this.loadingMore = false;
                        }
                  })

            },
            loadMore2(){
                  this.loadingMore = true;
                  this.offset2++;
                  mxspList('',0,this.offset2,'','').then(res=>{
                        if (res.code == 1000) {
                              if (this.offset2 > res.page.pages) {
                                    this.$message.warning('已加载全部数据');
                                    this.loadingMore = false;
                                    this.btnDsiable2 = true;
                                    return;
                              }
                              this.loadingMore = false;
                              let cardItemData4 = res.page.rows
                              this.cardItemData2 = this.cardItemData2.concat(cardItemData4)
                              this.loadingMore = false;
                        }
                  })

            },
            search(){
                  this.offset1 = 1;
                  this.offset2 = 1;
                  this.btnDsiable2 = false;
                  if (this.status == 1) {
                        this.getMxspList1(this.condition,this.status,this.offset,this.starttime,this.endtime);
                  }else{
                        this.getMxspList0(this.condition,this.status,this.offset,this.starttime,this.endtime);
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
            poststarApproval(athleteId, reject, agreement){
                  starApproval(athleteId, reject, agreement).then(res=>{
                        if (res.code == 1000) {
                              this.$message.success('操作成功');
                              this.loading = false;
                              this.confirmLoading = false;
                              this.visible = false;
                              this.getMxspList(this.condition,this.offset,this.starttime,this.endtime);
                        }
                  })
            },
            handleOk(e) {
                  this.confirmLoading = true;
                  this.poststarApproval(this.key, this.reason, 2)
            },
            handleCancel(e) {
                  this.visible = false
            },
            success (athleteId) {
                  this.loading = true;
                  this.poststarApproval(athleteId, '', 0)
                  
            },
      }
}
</script>
