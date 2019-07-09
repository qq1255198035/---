<template>
      <div id="wycj">
            <div class="input-box">
                  <a-form-item :label="$t('admin.xzrq')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-locale-provider :locale="locale">
                        <a-range-picker @change="changeDate" class="my-picker"/>
                        </a-locale-provider>
                  </a-form-item>
                  <a-button type="primary" icon="search" @click="search">{{$t('issuer.hdgl.searchs')}}</a-button>
            </div>
            <div class="wycj-content">
                  <a-row type="flex" justify="space-between" align="top" class="items-box">
                        <a-col class="items" :xxl="{span:11}" :xl="{span:24}" v-for="(item, index) in listInfo" :key="index" @mouseenter="showItem = index" @mouseleave="showItem = -1">
                              <a-row class="title">
                                    <a-col :span="12" class="item">
                                          <div class="profile-image">
                                          <a-avatar :size="96" :src="item.coverImg" class="img-circle" v-if="item.coverImg"/>
                                          <a-avatar v-else style="backgroundColor:#23C6C8" :size="96">Sponsor Cube</a-avatar>
                                          </div>
                                          <div class="profile-info">
                                                <h2 class="no-margins" @click="$router.push({path:'/cjhdgl/ckhd',query:{id:item.campId}})">
                                                      {{item.name}}
                                                </h2>
                                                <p>{{$t('admin.timer')}}：{{item.publishTime}}</p>
                                                <span>
                                                      <a-icon type="environment" class="my-icon"/>
                                                      {{item.address}}
                                                </span>
                                          </div>
                                    </a-col>
                                    <a-col :span="12" class="item">
                                          <p>{{$t('admin.fl')}}：{{item.campCatalogVal}}</p>
                                          <p>{{$t('admin.csrs')}}：{{item.campNum}}人</p>
                                    </a-col>
                              </a-row>
                              <div class="main">
                                    <ul>
                                          <li>{{$t('issuer.accountInfo.companyTitle')}}：{{item.company}}</li>
                                          <li>{{$t('issuer.accountInfo.contact')}}：{{item.contact}}</li>
                                          <li>{{$t('issuer.accountInfo.email')}}：{{item.email}}</li>
                                          <li>{{$t('issuer.accountInfo.telphone')}}：{{item.phone}}</li>
                                    </ul>
                              </div>
                              <div class="footer" v-show="showItem == index">
                                    <a-button type="primary" @click="showModal(item.campId)">{{$t('issuer.accountInfo.wycj')}}</a-button>
                              </div>
                        </a-col>
                  </a-row>
                  <div style="text-align: center; margin-top: 30px;">
                        <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable || listInfo.length == 0">{{$t('issuer.hdgl.loadMore')}}</a-button>
                  </div>
            </div>
            <a-modal
                  :title="$t('admin.zz')"
                  :visible="visible"
                  @ok="handleOk"
                  :confirmLoading="confirmLoading"
                  @cancel="handleCancel"
                  wrapClassName="my-modal"
            >
                  <a-form :form="form">
                        <a-form-item :label="$t('admin.ccfy')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                              <a-input type="number"
                                    v-decorator="[
                                          'ccfy',
                                          {rules: [{ required: true, message: `${$t('admin.qtxccf')}` }]}
                                    ]"
                              />
                        </a-form-item>
                        <a-form-item :label="$t('admin.xzmx')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                              <a-select
                                    v-decorator="[
                                          'stars',
                                          {rules: [{ required: true, message: `${$t('admin.qxzmx')}` }]}
                                          ]"
                                          :placeholder="$t('admin.qxz')"
                                          class="my-select"
                              >
                                          <a-select-option :value="item.athleteId" v-for="(item,index) in starsList" :key="index">{{item.name}}</a-select-option>    
                              </a-select>
                        </a-form-item>
                        <a-form-item :label="$t('issuer.cjhd.bz')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
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
            padding: 20px;
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
                  background-color: #fff;
                  padding: 40px;
                  .items{
                  background-color: #fff;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  height: 293px;
                  padding: 20px 10px;
                  margin: 20px 0;
                  .title{
                        display: flex;
                        .item{
                              display: flex;
                              justify-content: flex-start;
                              padding-left: 10px;
                              > p{
                                    color: #999;
                                    margin: 0 10px;
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
                                          font-size: 18px;
                                          color: #333;
                                          margin-bottom: 0;
                                          cursor: pointer;
                                    }
                                    .my-icon{
                                          margin-top: 20px;
                                          margin-right: 5px;
                                    }
                              
                              }
                        }
                  }
                  .main{
                        padding-left: 100px;
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
import { judge } from "@/api/common";
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
export default {
      data(){
            return{
                  locale: lang[localStorage.getItem('lang')],
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
                  form: this.$form.createForm(this)
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
                              this.$message.success(this.$t('issuer.hdgl.czcg'));
                              this.visible = false;
                              this.confirmLoading = false;
                              this.form.setFieldsValue({
                                    stars: '',
                                    ccfy: '',
                                    desc: '',
                              });
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
                  let that = this;
                  judge().then(res=>{
                        if (res.code == 1000) {
                              if (res.data == 0) {
                                    console.log(res)
                                    that.visible = true
                                    that.key = id
                              }else{
                                    that.$error({
                                          okText: this.$t('issuer.index.gotoSet'),
                                          title: this.$t('issuer.index.error'),
                                          content: this.$t('issuer.index.sorry'),
                                          onOk() {
                                                that.$router.push({name: 'zhsz'})
                                          },
                                    });
                              }
                        }
                  })   
            },
            handleOk(e) {
                  this.form.validateFields((err,values) => {
                        if (!err) {
                              this.postWantJoin(this.key,values.stars,values.ccfy,values.desc)
                              
                        }
                  },);
            },
            handleCancel(e) {
                  
                  this.visible = false
                  this.form.setFieldsValue({
                        stars: '',
                        ccfy: '',
                        desc: '',
                  });
            },
           
           
            changeDate(val,date){
                  this.startime = date[0];
                  this.endtime = date[1]
            },
            loadMore(){
                  this.offset++;
                  this.loadingMore = true;
                  searchCampList('', '', this.offset).then(res=>{
                        if (res.code == 1000) {
                              if (this.offset > res.page.pages) {
                                    this.$message.warning(this.$t('admin.yjzqusj'));
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
