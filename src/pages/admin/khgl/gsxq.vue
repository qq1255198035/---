<template>
      <div id="gsxq">
            <a-row :gutter="24">
                  <a-col :md="24" :lg="7">
                        <a-card :bordered="false">
                              <div class="account-center-avatarHolder">
                                    <div class="avatar">
                                    <img :src="logo">
                                    </div>
                                    <div class="username">{{ name }}</div>
                              </div>
                              <div class="account-center-detail">
                                          <p>
                                                <a-icon type="user" class="user"></a-icon>{{contact}}
                                          </p>
                                          <p>
                                                <a-icon type="phone" class="tel"></a-icon>{{phone}}
                                          </p>
                                          <p>
                                          <i class="group"></i>{{web}}
                                          </p>
                                          <p>
                                          <i class="address"></i>
                                          <span>{{area}}</span>
                                          
                                          </p>
                              </div>
                              <a-divider :dashed="true"/>
                              <div class="account-center-team">
                                    <img :src="businessImg" alt="">
                              </div>
                        </a-card>
                  </a-col>
                  <a-col :md="24" :lg="17">
                        <div class="info-box">
                              <div class="title">
                                    <h5>公司简介</h5>
                              </div>
                              <div class="content">
                                    <p>{{intro}}</p>
                              </div>
                        </div>
                        <div style="display: flex;justify-content: center;margin-top:30px;">
                              <a-button type="primary" @click="$router.go(-1)">返 回</a-button>
                        </div>
                  </a-col>
            </a-row>
            
      </div>
</template>
<style lang="less" scoped>
#gsxq{
	margin: 24px;
      .account-center-avatarHolder {
            text-align: center;
            margin-bottom: 24px;

            & > .avatar {
                  margin: 0 auto;
                  width: 104px;
                  height: 104px;
                  margin-bottom: 20px;
                  border-radius: 50%;
                  overflow: hidden;
                  img {
                  height: 100%;
                  width: 100%;
                  }
            }

            .username {
                  color: rgba(0, 0, 0, 0.85);
                  font-size: 20px;
                  line-height: 28px;
                  font-weight: 500;
                  margin-bottom: 4px;
            }
      }
      .account-center-detail {
            p {
                  margin-bottom: 8px;
                  padding-left: 26px;
                  position: relative;
            }

            i {
                  position: absolute;
                  height: 14px;
                  width: 14px;
                  left: 0;
                  top: 4px;
                  background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
            }

            .tel {
                  background-position: -44px -44px;
            }
            .group {
                  background-position: 0 -22px;
            }
            .address {
                  background-position: 0 -44px;
            }
            .user{
                  background-position: -44px -44px;
            }
      }
      .account-center-team{
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                  width: 80%;
                  border: 1px solid #ccc;
                  padding: 10px;
            }
      }
      .info-box{
            background-color: #fff;
            .title{
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  padding: 20px 40px 0;
                  h5{
                        margin: 0;
                        font-size: 16px;
                  }
            }
            .content{
                  padding: 20px 40px;
                  p{
                        margin: 20px 0;
                  }
            }
      }
}

</style>
<script>
import { userInfo } from "@/api/common";
export default {
      data(){
            return{
                  name:"",
                  area: "",
                  businessImg: "",
                  contact: "",
                  country: "",
                  email: "",
                  intro: "",
                  logo: "",
                  phone: "",
                  sports: "",
                  web: "",
            }
      },
      mounted(){
            this.getUserInfo(this.$route.query.id)
            console.log(this.$route.query.id)
      },
      methods: {
            
            getUserInfo(id){
                  userInfo(id).then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.email = res.data.email;
                              this.area = res.data.area;
                              this.businessImg = this.$host + res.data.businessImg;
                              this.contact = res.data.contact;
                              this.phone = res.data.phone;
                              this.web = res.data.web;
                              this.intro = res.data.intro;
                              this.logo = this.$host + res.data.logo;
                              this.name = res.data.name;
                        }
                  })
            }
      }
}
</script>
