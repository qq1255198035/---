<template>
      <div class="zzgl-title">
            <div class="main">
                  <a-col :span="8" class="item">
                        <div class="profile-image">
                            <a-avatar :size="96" src="./../../assets/a4.jpg" class="img-circle"/>
                        </div>
                        <div class="profile-info">
                                    <h2 class="no-margins">
                                        STEPHON MARBURY: THE NEXT CHAPTER / 馬布里: 我的下一章
                                    </h2>
                                    <p>时间：2019-01-02 11:50:00</p>
                                    <span><a-icon type="environment" class="my-icon"/>吉林省 长春市
                                        长春市南关区卫星广场明珠花园</span>
                        </div>
                  </a-col>
                  <a-col :span="8">
                        <dl class="dl-horizontal">
                            <dt>分类：</dt>
                            <dd>篮球</dd>
                            <dt>参赛人数：</dt>
                            <dd>1300人</dd>
                            <dt>参与明星：</dt>
                            <dd class="project-people">
                                <a-avatar :size="40" class="img-circle" src="./../../assets/a1.jpg"/>
                                <a-avatar :size="40" class="img-circle" src="./../../assets/a1.jpg"/>
                                <a-avatar :size="40" class="img-circle" src="./../../assets/a2.jpg"/>
                                <a-avatar :size="40" class="img-circle" src="./../../assets/a4.jpg"/>
                                <a-avatar :size="40" class="img-circle" src="./../../assets/a5.jpg"/>
                            </dd>
                            <dt>品牌赞助：</dt>
                            <dd class="project-people">
                                <a-avatar :size="40" class="img-circle" src="./../../assets/a3.jpg"/>
                                <a-avatar :size="40" class="img-circle" src="./../../assets/a1.jpg"/>
                                <a-avatar :size="40" class="img-circle" src="./../../assets/a2.jpg"/>
                                <a-avatar :size="40" class="img-circle" src="./../../assets/a4.jpg"/>
                                <a-avatar :size="40" class="img-circle" src="./../../assets/a5.jpg"/>
                            </dd>
                        </dl>
                  </a-col>
            </div>
            <div class="side">
                  <a-row class="status-list">
                        <a-col :xs="12" :sm="12">
                        <div class="text">状态</div>
                        <div class="heading">待审批</div>
                        </a-col>
                        <a-col :xs="12" :sm="12">
                        <div class="text">订单金额</div>
                        <div class="heading">¥ 568.08</div>
                        </a-col>
                  </a-row>
            </div>   
                  
      </div>
</template>
<style lang="less" scoped>
.zzgl-title{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;
            background-color: #fff;
            .main{
                  width: 80%;
                  .item{
                        padding: 20px;
                        display: flex;
                        justify-content: space-around;
                        .profile-info{
                              margin-left: 20px;
                              p{
                                    color: #999;
                              }
                              span{
                                    color: #999;
                              }
                              .no-margins {
                                    font-size: 18px;
                                    color: #333;
                                    font-weight: 600;
                              }
                              .my-icon{
                                    margin-right: 5px;
                              }
                        }
                  }
            }
            .side{
                  width: 20%;
                  display: flex;
                  align-items: center;
                  .status-list {
                        
                        
                        width: 100%;
                        text-align: left;
                        .text {
                              color: rgba(0, 0, 0, .45);
                        }

                        .heading {
                              color: rgba(0, 0, 0, .85);
                              font-size: 20px;
                        }
                  }
            }
            
            .dl-horizontal{
                  padding: 20px;
                  margin: 0;
                  dt{
                        float: left;
                        width: 160px;
                        overflow: hidden;
                        clear: left;
                        text-align: right;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #999;
                  }
                  dd{
                        color: #999;
                        font-weight: normal;
                        
                  }
                  .img-circle{
                        margin: 0 2px;
                  }
            }
}
</style>
<script>
export default {
      
}
</script>
