<template>
      <div id="zhxx">
            <a-row :gutter="24">
                  <a-col :md="24" :lg="7">
                        <a-card :bordered="false">
                              <div class="account-center-avatarHolder">
                                    <div class="avatar">
                                    <img :src="avatar()">
                                    </div>
                                    <div class="username">{{ nickname() }}</div>
                              </div>
                              <div class="account-center-detail">
                                          <p>
                                                <a-icon type="user" class="user"></a-icon>张集
                                          </p>
                                          <p>
                                                <a-icon type="phone" class="tel"></a-icon>137 5684 2365
                                          </p>
                                          <p>
                                          <i class="group"></i>www.baidu.com
                                          </p>
                                          <p>
                                          <i class="address"></i>
                                          <span>浙江省</span>
                                          <span>杭州市</span>
                                          </p>
                              </div>
                              <a-divider :dashed="true"/>
                              <div class="account-center-team">
                                    <img :src="imgUrl" alt="">
                              </div>
                        </a-card>
                  </a-col>
                  <a-col :md="24" :lg="17">
                        <div class="info-box">
                              <div class="title">
                                    <a-button type="primary" @click="$router.push({name: 'zhsz'})">账户设置</a-button>
                              </div>
                              <a-divider :dashed="true"/>
                              <div class="content">
                                    <p>段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</p>
                                    <p>段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</p>
                                    <p>段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</p>
                              </div>
                        </div>
                  </a-col>
            </a-row>
      </div>
</template>
<style lang="less" scoped>
#zhxx{
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
                  justify-content: flex-end;
                  padding: 20px 40px 0;
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
import imgUrl from '@/assets/123.png'
export default {
      data(){
            return{
                  imgUrl
            }
      },
      methods: {
            ...mapGetters(['nickname', 'avatar']),
    }
}
</script>
