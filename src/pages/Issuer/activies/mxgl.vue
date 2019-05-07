<template>
      <div id="mxgl">
            <page-header :title="pageTitle"></page-header>
            <glTitle></glTitle>
            <div class="mxgl-content">
                  <a-tabs defaultActiveKey="1" tabPosition="top" size="large">
                        <a-tab-pane key="1" tab="明星审批">
                              <div class="my-cards">
                                    <div class="card-item ant-card-hoverable" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData" :key="index">
                                          <div class="title">
                                                <h5>马布里</h5>
                                                <span>李宁体育用品有限公司</span>
                                                <a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                                <p><span>$</span>39999</p>
                                                <span>出厂费用</span>
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
                                                            <a-button type="danger" class="danger">驳回</a-button>
                                                            <a-button type="primary" class="primary">通过</a-button>
                                                      </div>
                                                </transition>
                                                
                                          </div>
                                    </div>      
                              </div>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="参加明星">
                              <div class="my-cards">
                                    <div class="card-item ant-card-hoverable" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData" :key="index">
                                          <div class="title">
                                                <h5>马布里</h5>
                                                <span>李宁体育用品有限公司</span>
                                                <a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                                <p><span>$</span>39999</p>
                                                <span>出厂费用</span>
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
                                                            
                                                            <a-button type="primary" class="primary">查 看</a-button>
                                                      </div>
                                                </transition>
                                                
                                          </div>
                                    </div>      
                              </div>
                        </a-tab-pane>
                        
                  </a-tabs>
            </div>
      </div>
</template>
<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
#mxgl{
      margin: -24px -24px 0;
      .mxgl-content{
      background-color: #fff;
	margin: 24px;
	padding: 20px;
      .my-cards{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 0 0 50px;
            
            .card-item{
                  width: 22%;
                  height: 423px;
                  margin: 20px;
                  border:1px solid #ccc;
                  border-radius: 10px;
                  padding: 0 20px;
                  .title{
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        padding: 20px 0;
                        border-bottom: 1px solid #ccc;
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
                                    font-size: 12px;
                                    color: #333;
                                    margin-bottom: 10px;
                              }  
                              &:nth-child(5){
                                    font-size: 14px;
                                    color: #999;
                              }  
                        }
                        h5{
                              font-size: 16px;
                              color: #239FD5;
                              margin: 0;
                        }
                  }
                  .content{   
                        padding-top: 10px;
                        p{
                              margin: 5px;
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
import glTitle from '@/components/glTitle/glTitle'
import { mixinsTitle } from "@/utils/mixin.js";
export default {
      mixins:[mixinsTitle],
      components:{
            glTitle
      },
      data(){
            return{       
                  btnShow: -1,
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
            
      }
}
</script>
