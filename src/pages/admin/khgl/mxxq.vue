<template>
      <div id="zzsxq">
            <a-row :gutter="24">
                  <a-col :md="24" :lg="7">
                        <a-card :bordered="false">
                              <div class="account-center-avatarHolder">
                                    <div class="avatar">
                                    <img :src="avatar">
                                    </div>
                                    <div class="username">{{ lastname + firstname }}</div>
                                    <p>{{enname}}</p>
                              </div>
                              <div class="account-center-detail">
                                          <p v-if="sex == 1">
                                                <a-icon type="man"/>{{$t('issuer.accountInfo.boy')}}
                                          </p>
                                          <p v-if="sex == 2">
                                                <a-icon type="woman"/>{{$t('issuer.accountInfo.gril')}}
                                          </p>
                                          <p>
                                                <a-icon type="bank" class="tel"></a-icon>{{country}}
                                          </p>
                                          <p>
                                                <a-icon type="sort-descending" />{{height}}cm
                                          </p>
                                          <p>
                                                <a-icon type="contacts" /> {{heavy}}kg
                                          </p>
                                          <p>
                                                <a-icon type="environment" /><span>{{home}}</span>
                                          </p>
                              </div>
                              <a-divider :dashed="true"/>
                              <div class="account-center-team">
                                    <p>{{$t('issuer.accountInfo.companyTitle')}}：{{company}}</p>
                                    <p>{{$t('issuer.accountInfo.contact')}}：{{contact}}</p>
                                    <p>{{$t('issuer.accountInfo.telphone')}}：{{phone}}</p>
                                    <p>{{$t('issuer.accountInfo.email')}}：{{email}}</p>
                              </div>
                        </a-card>
                  </a-col>
                  <a-col :md="24" :lg="17">
                        <div class="info-box">
                              <div class="title">
                                    <h5>{{$t('issuer.accountInfo.companyName')}}</h5>
                              </div>
                              <div class="content">
                                    <p>{{desc}}</p>
                              </div>
                              <div class="title">
                                    <h5>{{$t('issuer.accountInfo.grtc')}}</h5>
                              </div>
                              <div class="img-content">
                                    <img :src="imgs" alt="">
                              </div>
                              <div class="title">
                                    <h5>{{$t('mar.sqzs')}}</h5>
                              </div>
                              <div class="img-content">
                                    <img :src="credential" alt="">
                              </div>
                        </div>
                        <div style="display: flex;justify-content: center;margin-top:30px;">
                              <a-button type="primary" @click="$router.go(-1)">{{$t('issuer.accountInfo.back')}}</a-button>
                        </div>
                  </a-col>
            </a-row>
      </div>
</template>
<style lang="less" scoped>
#zzsxq{
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
                  color:#21C5C7;
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
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            p{
                  margin: 5px 0;
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
            .img-content{
                  display: flex;
                  justify-content: flex-start;
                  padding: 20px 40px;
                  flex-wrap: wrap;
                  img{
                        width: 22%;
                        height: 150px;
                        margin: 10px;
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
import { mapGetters } from 'vuex'
import { searchStarInfo } from "@/api/manager";
export default {
      data(){
            return{
                  lastname: "",
                  firstname: "",
                  enname: "",
                  works: "",
                  country : "",
                  birthday: "",
                  height: "",
                  heavy: "",
                  home: "",
                  desc: "",
                  sex: "",
                  avatar: "",
                  credential: '',
                  imgs: "",
                  company:"",
                  contact:"",
                  phone:"",
                  email:"",
                 
            }
      },
      mounted(){
            this.getSearchStarInfo(this.$route.query.id)
      },
      methods: {
           
            getSearchStarInfo(athleteId){
                  searchStarInfo(athleteId).then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.lastnam = res.data.surname,
                              this.firstname = res.data.monicker,
                              this.enname = res.data.enName,
                              this.works = res.data.catalog,
                              this.country  = res.data.nationality,
                              this.birthday = res.data.birth,
                              this.height = res.data.height,
                              this.heavy = res.data.weight,
                              this.home = res.data.addr,
                              this.desc = res.data.introduction,
                              this.sex = res.data.sex,
                              this.email = res.data.email,
                              this.avatar = res.data.avatar,
                              this.imgs = res.data.imgs,
                              this.credential = res.data.credential,
                              this.company = res.data.company,
                              this.contact = res.data.contact,
                              this.phone = res.data.phone
                        }
                  })
            },
      }
}
</script>
