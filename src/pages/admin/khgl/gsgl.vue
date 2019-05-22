<template>
      <div id="gsgl">
            <div class="gsgl-header">
                  <a-row :gutter="2">
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-date-picker class="my-picker" @change="changeDate"/>
                                    </a-form-item>
                              </div>
                        </a-col>
                        <a-col :span="8">
                              <div class="input-box">
                                    <a-form-item label="公司名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input placeholder="Basic usage"/>
                                    </a-form-item>
                                    <a-button type="primary" icon="search">搜 索</a-button>
                              </div>
                        </a-col>
                  </a-row>
            </div>
            <div class="gsgl-content">
                  <a-tabs defaultActiveKey="1" tabPosition="top" size="large">
                        <a-tab-pane key="1" tab="待审批">
                              <div class="my-cards">
                                    <div class="card-item ant-card-hoverable" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData" :key="index">
                                          <div class="title">
                                                <a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                                <span>斯蒂芬·赛维尔·马布里</span>
                                          </div>
                                          <div class="content">
                                                <p>联系人: {{ item.name}}</p>
                                                <p>联系电话：{{item.tel}}</p>
                                                <p>邮箱：{{item.email}}</p>
                                                <p>公司：{{item.desc}}</p>
                                          </div>
                                          <div class="footer">
                                                <transition name="fade">
                                                      <div class="button-box" v-show= "btnShow == index" key="1">
                                                            <a-button type="danger" class="danger" @click="showModal">驳回</a-button>
                                                            <a-button type="primary" class="primary" @click="success" :loading="loading">通过</a-button>
                                                      </div>
                                                </transition>
                                                
                                          </div>
                                    </div>      
                              </div>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="已审批">
                              <div class="my-cards">
                                    <div class="card-item ant-card-hoverable" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData" :key="index">
                                          <div class="title">
                                                <a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                                <span>斯蒂芬·赛维尔·马布里</span>
                                          </div>
                                          <div class="content">
                                                <p>联系人: {{ item.name}}</p>
                                                <p>联系电话：{{item.tel}}</p>
                                                <p>邮箱：{{item.email}}</p>
                                                <p>公司：{{item.desc}}</p>
                                          </div>
                                          <div class="footer">
                                                <transition name="fade">
                                                      <div class="button-box" v-show= "btnShow == index" key="1">
                                                            
                                                            <a-button type="primary" class="primary" @click="$router.push({name:'gsxq'})">查 看</a-button>
                                                      </div>
                                                </transition>
                                                
                                          </div>
                                    </div>      
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
                        <a-textarea placeholder="input placeholder" :autosize="{ minRows: 4 }"/>
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
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  padding: 0 120px 50px;
                  
                  .card-item{
                        width: 22%;
                        height: 400px;
                        margin: 10px 0;
                        border:1px solid #ccc;
                        border-radius: 5px;
                        padding: 40px 20px 0;
                        .title{
                              display: flex;
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
                                          font-size: 14px;
                                          color: #21C5C7;
                                          margin-top: 20px;
                                    }   
                              }
                        }
                        .content{   
                              padding: 20px 10px 0;
                              p{
                                    margin: 0 0 10px;
                              }
                        }
                        .footer{
                              .button-box{
                                    padding: 10px 0;
                                    display: flex;
                                    justify-content: center;
                                    
                                    .danger{
                                          background-color: #ff0000;
                                          color: #fff;
                                          margin: 0 15px;
                                          border-color: red;
                                    }
                                    .primary{
                                          background-color: #23C6C8;
                                          color: #fff;
                                          margin: 0 15px;
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

export default {
      components:{
            
      },
      data(){
            return{       
                  btnShow: -1,
                  visible: false,
                  confirmLoading: false,
                  loading:false,
                  cardItemData:[
                        {
                              name:"李丽丽",
                              tel:"13456874565",
                              email:"11222222@163.com",
                              desc: "无"
                        },
                        {
                              name:"李丽丽",
                              tel:"13456874565",
                              email:"11222222@163.com",
                              desc: "无"
                        },
                        {
                              name:"李丽丽",
                              tel:"13456874565",
                              email:"11222222@163.com",
                              desc: "无"
                        },
                        {
                              name:"李丽丽",
                              tel:"13456874565",
                              email:"11222222@163.com",
                              desc: "无"
                        },
                        {
                              name:"李丽丽",
                              tel:"13456874565",
                              email:"11222222@163.com",
                              desc: "无"
                        },
                  ],  
            }
      },
      methods:{
            showModal() {
                  this.visible = true
            },
            changeDate(val,date){
                  //选择的日期date
                  console.log(val,date)
            },
            handleOk(e) {
                  this.ModalText = 'The modal will be closed after two seconds';
                  this.confirmLoading = true;
                  setTimeout(() => {
                  this.visible = false;
                  this.confirmLoading = false;
                  this.$message.success('操作成功');
                  //失败提示
                  //this.$message.error('This is a message of error');
                  }, 2000);
            },
            handleCancel(e) {
                  console.log('Clicked cancel button');
                  this.visible = false
            },
            success () {
                  this.loading = true;
                  setTimeout(() => {
                        this.loading = false;
                        this.$message.success('操作成功');
                  }, 2000);
                  
            },
      }
}
</script>
