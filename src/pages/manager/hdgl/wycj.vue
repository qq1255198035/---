<template>
      <div id="wycj">
            <div class="input-box">
                  <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-range-picker @change="changeDate" class="my-picker"/>
                  </a-form-item>
                  <a-button type="primary" icon="search" @click="search">搜 索</a-button>
            </div>
            <div class="wycj-content">
                  <div class="items-box">
                        <div class="items" v-for="(item, index) in listInfo" :key="index" @mouseenter="showItem = index" @mouseleave="showItem = -1">
                              <div class="title">
                                    <a-col :span="14" class="item">
                                          <div class="profile-image">
                                          <a-avatar :size="96" src="./../../assets/a4.jpg" class="img-circle"/>
                                          </div>
                                          <div class="profile-info">
                                                <h2 class="no-margins">
                                                      {{item.name}}
                                                </h2>
                                                <p>时间：{{item.publishTime}}</p>
                                                <span>
                                                      <a-icon type="environment" class="my-icon"/>
                                                      {{item.address}}
                                                </span>
                                          </div>
                                    </a-col>
                                    <a-col :span="8" class="item">
                                          <p>分类：{{item.campCatalogVal}}</p>
                                          <p>参赛人数：{{item.campNum}}人</p>
                                    </a-col>
                              </div>
                              <div class="main">
                                    <ul>
                                          <li>公司：{{item.company}}</li>
                                          <li>联系人：{{item.contact}}</li>
                                          <li>邮箱：{{item.email}}</li>
                                          <li>联系电话：{{item.phone}}</li>
                                    </ul>
                              </div>
                              <div class="footer" v-show="showItem == index">
                                    <a-button type="primary" @click="showModal(item.campId)">我要参加</a-button>
                              </div>
                        </div>
                  </div>
                  
                  <div style="text-align: center; margin-top: 30px;">
                        <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable || listInfo.length == 0">加载更多</a-button>
                  </div>
            </div>
            <a-modal
                  title="赞助"
                  :visible="visible"
                  @ok="handleOk"
                  :confirmLoading="confirmLoading"
                  @cancel="handleCancel"
                  wrapClassName="my-modal"
            >
                  <a-form :form="form">
                        <a-form-item label="出场费用" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                              <a-input type="number"
                                    v-decorator="[
                                          'ccfy',
                                          {rules: [{ required: true, message: '请填写出场费用!' }]}
                                    ]"
                              />
                        </a-form-item>
                        <a-form-item label="选择明星" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                              <a-select
                                    v-decorator="[
                                          'stars',
                                          {rules: [{ required: true, message: '请选择明星!' }]}
                                          ]"
                                          placeholder="请选择"
                                          class="my-select"
                              >
                                          <a-select-option :value="item.athleteId" v-for="(item,index) in starsList" :key="index">{{item.name}}</a-select-option>    
                              </a-select>
                        </a-form-item>
                        <a-form-item label="详情" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                              <a-textarea class="my-input" v-decorator="[
                                          'desc',
                                          {rules: [{ required: false, }]}
                                          ]"/>
                        </a-form-item>
                  </a-form>
            </a-modal>
      </div>
</template>
<style lang="less" scoped>
#wycj{
      .input-box{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 20px 0;
            background-color: #fff;
            .my-form-item{
                  margin: 0; 
                  width: 40%;
                  .my-picker{
                        width: 100%;
                  }
            }
      }
      .wycj-content{
            padding: 30px;
            .items-box{
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  background-color: #fff;
                  .items{
                  background-color: #fff;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  width: 48%;
                  height: 293px;
                  padding: 20px 10px;
                  margin: 20px 1%;
                  .title{
                        display: flex;
                        .item{
                              display: flex;
                              justify-content: space-around;
                              p{
                                    color: #999;
                              }
                              .profile-info{
                                    margin-left: 20px;
                                    h2{color: #21C5C7 !important;}
                                    p{
                                          color: #999;
                                          margin-bottom: 0;
                                    }
                                    span{
                                          color: #999;
                                    }
                                    .no-margins {
                                          font-size: 16px;
                                          color: #333;
                                          margin-bottom: 0;
                                          
                                    }
                                    .my-icon{
                                          margin-top: 20px;
                                          margin-right: 5px;
                                    }
                              
                              }
                        }
                  }
                  .main{
                        padding-left: 114px;
                        padding-right: 20px;
                        ul{
                              display: flex;
                              flex-wrap: wrap;
                              border-top: 1px solid #ccc;
                              padding-left: 20px;
                              padding-top: 20px;
                              margin: 20px 0 0;
                              li{
                                    width: 50%;
                                    list-style: none;
                                    margin: 5px 0;
                              }
                        }
                  }
                  .footer{
                        text-align: right;
                        padding-right: 30px;
                        margin-top: 10px;
                  }
            }
            }
            
      }
}
.my-select{
      width: 100%;
}
</style>
<script>
import { searchCampList,chooseStar,wantJoin } from "@/api/manager";
export default {
      data(){
            return{
                  showItem: -1,
                  visible: false,
                  confirmLoading: false,
                  loadingMore: false,
                  btnDsiable:false,
                  startime:'',
                  endtime:'',
                  offset:1,
                  form: this.$form.createForm(this),
                  listInfo:[],
                  key:'',
                  starsList:[],
                  form: this.$form.createForm(this),
                  
            }
      },
      mounted(){
            this.getSearchCampList(this.startime,this.endtime,this.offset);
            this.getChooseStar();
      },
      methods: {
            postWantJoin(campId, athleteId, cost, details){
                  wantJoin(campId, athleteId, cost, details).then(res=>{
                        if (res.code == 1000) {
                              this.$message.success('操作成功！');
                              this.visible = false;
                              this.confirmLoading = false;
                        }
                  })
            },
            getChooseStar(){
                  chooseStar().then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.starsList = res.data
                        }
                  })
            },
            getSearchCampList(startime, endtime, offset){
                  searchCampList(startime, endtime, offset).then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.listInfo = res.page.rows
                        }
                  })
            },
            showModal(id) {
                  this.visible = true
                  this.key = id
            },
            handleOk(e) {
                  this.form.validateFields((err,values) => {
                        if (!err) {
                              this.postWantJoin(this.key,values.stars,values.ccfy,values.desc)
                        }
                  },);
            },
            handleCancel(e) {
                  console.log('Clicked cancel button');
                  this.visible = false
            },
           
           
            changeDate(val,date){
                  this.starttime = date[0];
                  this.endtime = date[1]
            },
            loadMore(){
                  this.offset++;
                  this.loadingMore = true;
                  searchCampList('', '', this.offset).then(res=>{
                        if (res.code == 1000) {
                              if (this.offset > res.page.pages) {
                                    this.$message.warning('已加载全部数据');
                                    this.loadingMore = false;
                                    this.btnDsiable = true;
                                    return;
                              }
                              console.log(res)
                              this.listInfo = this.listInfo.concat(res.page.rows);
                              this.loadingMore = false
                        }
                  })
            },
            search(){
                  this.getSearchCampList(this.startime,this.endtime,this.offset)
            }
      }
}
</script>
