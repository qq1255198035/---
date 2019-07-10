<template>
      <div id="mxgl">
            <page-header :title="pageTitle"></page-header>
            <div class="mxgl-header">
                  <div class="input-box">
                        <a-form-item :label="$t('admin.mxmc')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                              <a-input :placeholder="$t('admin.ssmx')" v-model="name"/>
                        </a-form-item>
                        <a-button type="primary" icon="search" @click="search">{{$t('issuer.hdgl.searchs')}}</a-button>
                  </div>
                  <div class="btn-box">
                        <a-divider class="my-divider"/>
                        <a-button type="primary" icon="plus" @click="showModal($event)">{{$t('admin.xj')}}</a-button>
                  </div>
            </div>
            <div class="mxgl-content">
                  <a-tabs defaultActiveKey="1" tabPosition="top" size="large" @change="tabChange">
                        <a-tab-pane key="1" :tab="$t('admin.dsp')">
                              <a-row type="flex" justify="start" align="top" v-if="cardItemData.length > 0" class="my-cards">
                                    <a-col :xxl="{span:5,offset:1}" :xl="{span:9,offset:2}" :lg="{span:8,offset:2}" :md="{span:12,offset:2}" class="card-item" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData" :key="index">
                                          <div class="title">
                                                <h5>{{item.name}}</h5>
                                                <span>{{item.en_name}}</span>
                                                <a-avatar :size="64" :src="item.avatar" v-if="item.avatar"/>
                                                <a-avatar v-else style="backgroundColor:#23C6C8" :size="64">Sponsor Cube</a-avatar>
                                                <div class="bottom">
                                                      <span>{{item.catalogVal}}</span>
                                                      <span>{{item.birth}} | {{item.height}} cm</span>
                                                      <span>{{item.addr}}</span>
                                                </div>    
                                          </div>
                                          <div class="footer">
                                                <transition name="fade">
                                                      <div class="button-box" v-show= "btnShow == index" key="1">
                                                            <a-button type="danger" class="danger" @click="showDeleteConfirm(item.athlete_id)">{{$t('admin.sc')}}</a-button>
                                                            <a-button type="primary" class="primary" @click="showModal($event,item.athlete_id)" :loading="loading">{{$t('admin.xg')}}</a-button>
                                                      </div>
                                                </transition>
                                          </div> 
                                    </a-col>
                              </a-row>
                              <p v-else style="text-align: center; color: #ccc;">
                                    {{$t('issuer.index.noData')}}
                              </p>
                              <div style="text-align: center; margin-top: 16px;">
                                    <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable">{{$t('issuer.hdgl.loadMore')}}</a-button>
                              </div>
                        </a-tab-pane>
                        <a-tab-pane key="0" :tab="$t('issuer.hdgl.ysp')">
                              <a-row type="flex" justify="start" align="top" v-if="cardItemData2.length > 0" class="my-cards">
                                    <a-col :xxl="{span:5,offset:1}" :xl="{span:9,offset:2}" :lg="{span:8,offset:2}" :md="{span:12,offset:2}" class="card-item" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData2" :key="index">
                                          <div class="title">
                                                <h5>{{item.name}}</h5>
                                                <span>{{item.en_name}}</span>
                                                <a-avatar :size="64" :src="item.avatar" v-if="item.avatar"/>
                                                <a-avatar v-else style="backgroundColor:#23C6C8" size="96">Sponsor Cube</a-avatar>
                                                <div class="bottom">
                                                      <span>{{item.catalogVal}}</span>
                                                      <span>{{item.birth}} | {{item.height}} cm</span>
                                                      <span>{{item.addr}}</span>
                                                </div>    
                                          </div>
                                          <div class="footer">
                                                <transition name="fade">
                                                      <div class="button-box" v-show= "btnShow == index" key="1">
                                                            <a-button type="primary" class="primary" @click="$router.push({path:'/cjhdgl/mxxq',query:{id: item.athlete_id}})">{{$t('issuer.hdgl.examine')}}</a-button>
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
            <a-locale-provider :locale="locale">
            <a-modal
                  :title="$t('admin.tjmx')"
                  :visible="visible"
                  @ok="handleOk"
                  :confirmLoading="confirmLoading"
                  @cancel="handleCancel"
                  :width="1040"
            >
                  <div class="info-item">
                        <a-form :form="form">
                              <div class="left">
                                    <div class="section">
                                          <a-form-item :label="$t('mar.surname')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 8}">
                                                <a-input :placeholder="$t('mar.qsr')" class="my-input" v-decorator="[
                                                'lastname',{rules: [{ required: true, message: `${$t('mar.qtxxs')}`}]}]"/>
                                          </a-form-item>
                                          <a-form-item :label="$t('mar.ming')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 8}">
                                                <a-input :placeholder="$t('mar.qsr')" class="my-input" v-decorator="[
                                                'firstname',{rules: [{ required: true, message: `${$t('mar.qtxmz')}` }]}]"/>
                                          </a-form-item>
                                    </div>
                                    
                                    <a-form-item :label="$t('mar.ywmc')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input :placeholder="$t('mar.qsrywmc')" class="my-input" v-decorator="[
                                                'enname',{rules: [{ required: true, message: `${$t('mar.qsrywmc')}` }]}]"/>
                                    </a-form-item>
                                    <a-form-item :label="$t('mar.zy')" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}" class="my-form-item">
                                          <a-select class="my-select" :placeholder="$t('mar.qxz')" v-decorator="[
                                                'works',{rules: [{ required: true, message: `${$t('mar.qxzzy')}` }]}]">
                                                <a-select-option v-for="(item,index) in works" :value="item.id" :key="index">{{ item.name }}</a-select-option>
                                          </a-select>
                                    </a-form-item>
                                    <a-form-item :label="$t('mar.gj')" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}" class="my-form-item">
                                          <a-select class="my-select" :placeholder="$t('mar.qxz')" v-decorator="[
                                                'country',{rules: [{ required: true, message: `${$t('mar.qxzgj')}` }]}]">
                                                <a-select-option v-for="(item,index) in country" :value="item.id" :key="index">{{ item.name }}</a-select-option>
                                          </a-select>
                                    </a-form-item>
                                    <a-form-item :label="$t('mar.csrq')" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}" class="my-form-item">
                                          <a-locale-provider :locale="locale">
                                          <a-date-picker class="my-picker" v-decorator="[
                                                'birthday',{rules: [{ required: true, message: `${$t('mar.qxzcsrq')}`}]}]"/>
                                          </a-locale-provider>
                                    </a-form-item>
                                    <a-form-item :label="$t('mar.sg')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input addonAfter="cm" :placeholder="$t('mar.qsr')" v-decorator="[
                                                'height',{rules: [{ required: true, message: `${$t('mar.qtxsg')}` }]}]"/>
                                    </a-form-item>
                                    <a-form-item :label="$t('mar.tz')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input addonAfter="kg" :placeholder="$t('mar.qsr')" v-decorator="[
                                                'heavy',{rules: [{ required: true, message: `${$t('mar.qtxtz')}` }]}]"/>
                                    </a-form-item>
                                    <a-form-item :label="$t('mar.csd')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input :placeholder="$t('mar.qsr')" class="my-input" v-decorator="[
                                                'home',{rules: [{ required: true, message: `${$t('mar.qtxcsd')}` }]}]"/>
                                    </a-form-item>
                                    <a-form-item :label="$t('mar.jj')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-textarea :placeholder="$t('mar.qsrjj')" :rows="6" v-decorator="[
                                                'desc',{rules: [{ required: true, message: `${$t('mar.qsrjj')}` }]}]"></a-textarea>
                                    </a-form-item>
                              </div>
                              <div class="right">
                                    <a-form-item :label="$t('mar.sex')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-radio-group v-decorator="[
                                                'sex',{rules: [{ required: true, message: `${$t('mar.qsrxb')}`}]}]">
                                                <a-radio value="1">
                                                {{$t('mar.boy')}}
                                                </a-radio>
                                                <a-radio value="2">
                                                {{$t('mar.gril')}}
                                                </a-radio>
                                          </a-radio-group>
                                    </a-form-item>
                                    <a-form-item :label="$t('mar.sqzs')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-upload
                                                name="avatar"
                                                listType="picture-card"
                                                class="avatar-uploader"
                                                :showUploadList="false"
                                                :beforeUpload="beforeUpload1"
                                                >
                                                <img v-if="imageUrl1" :src="imageUrl1" alt="avatar" />
                                                
                                                <div v-else>
                                                      <a-icon :type="loading ? 'loading' : 'plus'" />
                                                      <div class="ant-upload-text">{{$t('mar.sc')}}</div>
                                                </div>
                                                <a-input  v-decorator="[
                                                'uploader',{rules: [{ required: true, message: `${$t('mar.qsczs')}` }]}]"
                                                
                                                type="hidden"
                                                />
                                          </a-upload>
                                          <span>{{$t('mar.jycc')}}</span><br>
                                          
                                    </a-form-item>
                                    <a-form-item :label="$t('mar.sctx')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-upload
                                                name="avatar"
                                                listType="picture-card"
                                                class="avatar-uploader"
                                                :showUploadList="false"
                                                :beforeUpload="beforeUpload2"
                                                >
                                                
                                                <img v-if="imageUrl2" :src="imageUrl2" alt="avatar" />
                                                <div v-else>
                                                      <a-icon :type="loading ? 'loading' : 'plus'" />
                                                      <div class="ant-upload-text">{{$t('mar.sc')}}</div>
                                                </div>
                                                 <a-input  v-decorator="[
                                                'avatar',{rules: [{ required: true, message: `${$t('mar.qsctx')}` }]}]"
                                                
                                                type="hidden"
                                                />
                                                </a-upload>
                                                <span>{{$t('mar.jycc')}}</span><br>
                                                
                                    </a-form-item>
                                    <a-form-item :label="$t('mar.sctp')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-upload
                                                name="avatar"
                                                listType="picture-card"
                                                class="avatar-uploader"
                                                :showUploadList="false"
                                                :beforeUpload="beforeUpload3"
                                                >
                                                
                                                <img v-if="imageUrl3" :src="imageUrl3" alt="avatar" />
                                                <div v-else>
                                                      <a-icon :type="loading ? 'loading' : 'plus'" />
                                                      <div class="ant-upload-text">{{$t('mar.sc')}}</div>
                                                </div>
                                                 <a-input  v-decorator="[
                                                'imgs',{rules: [{ required: true, message: `${$t('mar.qsctp')}` }]}]"
                                                
                                                type="hidden"
                                                />
                                                </a-upload>
                                                <span>{{$t('mar.jycc')}}</span><br>

                                    </a-form-item>
                              </div>
                        </a-form>
                  </div>
            </a-modal>
            </a-locale-provider>
      </div>
</template>
<style lang="less" scoped>
#mxgl{
      margin: -24px -24px 0;
      .mxgl-header{
            background-color: #fff;
            margin:0 0 20px;
            padding: 20px;
            .btn-box{
                  padding: 0 20px;
                  .my-divider{
                        margin: 10px 0;
                  }
            }
           .input-box{
                 display: flex;
                 justify-content: flex-start;
                 align-items: center;
                 .my-form-item{
                        margin: 0; 
                        width: 35%;
                  }
           }
      }
      .mxgl-content{
            padding: 20px;
            background-color: #fff;
            .my-cards{
                  flex-wrap: wrap;
                  background-color: #fff;
                  padding: 30px 0;
                  .card-item{
                        height: 290px;
                        border:1px solid #ccc;
                        border-radius: 5px;
                        padding: 20px;
                        background-color: #fff;
                        margin-bottom: 20px;
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
.info-item{
      
      form{
            display: flex;
            justify-content: space-between;
            .section{
                  display: flex;
                  padding-left: 12px;
            }
            > div{
                  width: 49%;
                  .my-form-item{
                        width: 100%;
                        display: flex;
                        margin-bottom: 15px;
                        .my-select{
                              width: 100%;
                        }
                        .my-picker{
                              width: 100%;
                        }
                        .my-tag-box{
                              display: flex;
                              > span{
                                    margin-right: 10px;
                                    min-width: 56px;
                                    text-align: right;
                              }
                              .my-tag{
                                    border: 1px solid #ccc;
                              }
                        }
                        
                        .ant-form-item-control-wrapper{
                              width: 90%;
                        }
                        .avatar-uploader{
                              img{
                                    width: 128px;
                                    height: 128px;
                              }
                        }
                        
                  }
            }
      }
      
}
</style>
<script>
import { starsList,getProfession,getCountry,searchStarInfo,starUpdate,getUpload,starDel } from "@/api/manager";
import { mixinsTitle } from "@/utils/mixin";
import moment from 'moment';
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
function getBase64 (img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
}
export default {
      mixins:[mixinsTitle],
      data(){
            return{
                  locale: lang[localStorage.getItem('lang')],
                  pageTitle: null,
                  btnShow: -1,
                  visible: false,
                  confirmLoading: false,
                  loadingMore:false,
                  loading:false,
                  btnDsiable: false,
                  btnDsiable2: false,
                  imageUrl1: '',
                  imageUrl2: '',
                  imageUrl3: '',
                  cardItemData:[],
                  cardItemData2:[],
                  name: '',
                  offset: 1,
                  offset2: 1,
                  form: this.$form.createForm(this),
                  works:[],
                  country:[],
                  postImg1:'',
                  postImg2:'',
                  postImg3:'',
                  stasId:'',
                  status:1,
            }
      },
      mounted () {
            this.getStarsList(1,this.name,this.offset); 
            this.getStarsList2(0,this.name,this.offset2);
            this.getProfessionList();
            this.getCountryList()
      },
      methods:{
            tabChange(key){
                  this.status = key
            },
            postStarUpdate(params){
                  starUpdate(params).then(res=>{
                        if (res.code == 1000) {
                              this.$message.success(this.$t('issuer.hdgl.czcg'))
                              this.visible = false;
                              this.confirmLoading = false;
                              this.getStarsList(1,'',1);
                              this.form.setFieldsValue({
                                    lastname: '',
                                    firstname: '',
                                    enname: '',
                                    works: '',
                                    country : '',
                                    birthday: moment(),
                                    height: '',
                                    heavy: '',
                                    home: '',
                                    desc: '',
                                    sex: '',
                              });
                              this.imageUrl1 = '';
                              this.imageUrl2 = '';
                              this.imageUrl3 = ''
                        }
                  })
            },
            getSearchStarInfo(athleteId){
                  searchStarInfo(athleteId).then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.form.setFieldsValue({
                                    lastname: res.data.surname,
                                    firstname: res.data.monicker,
                                    enname: res.data.enName,
                                    works: parseInt(res.data.catalog),
                                    country : parseInt(res.data.nationality),
                                    birthday: moment(res.data.birth || moment(), 'YYYY-MM-DD'),
                                    height: res.data.height,
                                    heavy: res.data.weight,
                                    home: res.data.addr,
                                    desc: res.data.introduction,
                                    sex: res.data.sex,
                                    uploader: res.data.credential,
                                    avatar: res.data.avatar,
                                    imgs: res.data.imgs
                              });
                              this.imageUrl1 = res.data.credential;
                              this.imageUrl2 = res.data.avatar;
                              this.imageUrl3 = res.data.imgs;
                              this.postImg1 = res.data.credential;
                              this.postImg2 = res.data.avatar;
                              this.postImg3 = res.data.imgs;
                        }
                  })
            },
            getProfessionList(){
                  const lang = {
                        internationalization : localStorage.lang
                  }
                  console.log(lang)
                  getProfession(lang).then(res=>{
                        console.log(res)
                        if (res.code == 1000) {
                              this.works = res.data
                        }
                  })
            },
            getCountryList(){
                  const lang = {
                        internationalization : localStorage.lang
                  }
                  getCountry(lang).then(res=>{
                        if (res.code == 1000) {
                              this.country = res.data
                        }
                  })
            },
            getStarsList(status,name, offset){
                  starsList(status, name, offset).then(res=>{
                        if (res.code == 1000) {
                              this.cardItemData = res.page.rows;
                              this.loadingMore = false
                              if (res.page.offset >= res.page.pages) {
                                    this.btnDsiable = true;
                              }else{
                                    this.btnDsiable = false;
                              }
                              console.log(res)
                        }
                  })
            },
            getStarsList2(status,name, offset){
                  starsList(status, name, offset).then(res=>{
                        if (res.code == 1000) {
                              this.cardItemData2 = res.page.rows;
                              this.loadingMore = false
                              if (res.page.offset >= res.page.pages) {
                                    this.btnDsiable2 = true;
                              }else{
                                    this.btnDsiable2 = false;
                              }
                              console.log(res)
                        }
                  })
            },
            search(){
                  this.offset = 1;
                  this.offset2 = 1;
                  this.btnDsiable = false;
                  this.btnDsiable2 = false;
                  if (this.status == 1) {
                        this.getStarsList(this.status,this.name,this.offset); 
                  }else{
                        this.getStarsList2(this.status,this.name,this.offset2);
                  }
            },
            loadMore(){
                  this.offset++;
                  this.loadingMore = true;
                  starsList(1,'', this.offset).then(res=>{
                        if (res.code == 1000) {
                              if (this.offset > res.page.pages) {
                                    this.$message.warning(this.$t('admin.yjzqusj'));
                                    this.loadingMore = false;
                                    this.btnDsiable = true;
                                    return;
                              }
                              console.log(res)
                              this.cardItemData = this.cardItemData.concat(res.page.rows);
                              this.loadingMore = false
                        }
                  })

            },
            loadMore2(){
                  this.offset2++;
                  this.loadingMore = true;
                  starsList(0,'', this.offset2).then(res=>{
                        if (res.code == 1000) {
                              if (this.offset2 > res.page.pages) {
                                    this.$message.warning(this.$t('admin.yjzqusj'));
                                    this.loadingMore = false;
                                    this.btnDsiable2 = true;
                                    return;
                              }
                              console.log(res)
                              this.cardItemData2 = this.cardItemData2.concat(res.page.rows);
                              this.loadingMore = false
                        }
                  })

            },
            showModal(e,id) {
                  this.visible = true
                  this.stasId = id
                  
                  if(this.stasId){
                        this.getSearchStarInfo(id)
                  }
            },
            handleOk(e) {
                  this.form.validateFields((err,values) => {
                        if (!err) {
                              
                               var params = {
                                    athleteId: this.stasId,
                                    surname: values.lastname,
                                    monicker: values.firstname,
                                    enName: values.enname,
                                    catalog: values.works,
                                    nationality: values.country,
                                    birth: values.birthday.format('YYYY-MM-DD'),
                                    height: values.height,
                                    weight: values.heavy,
                                    addr: values.home,
                                    introduction: values.desc,
                                    sex: values.sex,
                                    avatar: this.postImg2,
                                    imgs: this.postImg3,
                                    credential: this.postImg1
                              };
                              this.postStarUpdate(params);
                        }
                  },);
            },
            handleCancel(e) {
                  this.visible = false
                  this.form.setFieldsValue({
                        lastname: '',
                        firstname: '',
                        enname: '',
                        works: '',
                        country : '',
                        birthday: moment(),
                        height: '',
                        heavy: '',
                        home: '',
                        desc: '',
                        sex: '',
                  });
                  this.imageUrl1 = '';
                  this.imageUrl2 = '';
                  this.imageUrl3 = ''
            },
            showDeleteConfirm(id) {
                  var that = this;
                  that.$confirm({
                        title: that.$t('mar.qrscm'),
                        okText: that.$t('mar.qd'),
                        okType: 'danger',
                        cancelText: that.$t('mar.qx'),
                        onOk() {
                              starDel(id).then(res=>{
                                    if (res.code == 1000) {
                                          that.$message.success(that.$t('issuer.hdgl.czcg'));
                                          that.getStarsList(1,that.name,that.offset);
                                    }
                              })
                        },
                        onCancel() {
                              
                        },
                  });
            },
            beforeUpload1(file) {
                  const isJPG = file.type == 'image/jpeg'
                  const isPNG = file.type == 'image/png'
                  if (!(!isJPG || !isPNG)) {
                        this.$message.error(this.$t('issuer.accountInfo.onlyImage'))
                        return
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2
                  if (!isLt2M) {
                        this.$message.error(this.$t('issuer.accountInfo.onlyM'))
                        return
                  }
                  getBase64(file, (imageUrl) => {
                        this.imageUrl1 = imageUrl
                        this.loading = false
                        this.form.setFieldsValue({  
                              uploader: imageUrl,
                        });
                  })
                  const formData = new FormData();
                  formData.append('file',file)
                  getUpload(formData).then(res=>{
                        this.postImg1 = res.location
                        console.log(res)
                  })
                  
                  
                  
            },
            beforeUpload2(file) {
                  const isJPG = file.type === 'image/jpeg'
                  const isPNG = file.type === 'image/png'
                  if (!(!isJPG || !isPNG)) {
                        this.$message.error(this.$t('issuer.accountInfo.onlyImage'))
                        return
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2
                  if (!isLt2M) {
                        this.$message.error(this.$t('issuer.accountInfo.onlyM'))
                        return
                  }
                  getBase64(file, (imageUrl) => {
                        this.imageUrl2 = imageUrl
                        this.loading = false;
                        this.form.setFieldsValue({
                              avatar: imageUrl,
                        });
                  })
                  const formData = new FormData();
                  formData.append('file',file)
                  getUpload(formData).then(res=>{
                        this.postImg2 = res.location
                  })
                 
            },
            beforeUpload3(file) {
                  const isJPG = file.type === 'image/jpeg'
                  const isPNG = file.type === 'image/png'
                  if (!(!isJPG || !isPNG)) {
                        this.$message.error(this.$t('issuer.accountInfo.onlyImage'))
                        return
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2
                  if (!isLt2M) {
                        this.$message.error(this.$t('issuer.accountInfo.onlyM'))
                        return
                  }
                  getBase64(file, (imageUrl) => {
                        this.imageUrl3 = imageUrl
                        this.loading = false;
                        this.form.setFieldsValue({
                              imgs: imageUrl,
                        });
                  })
                  const formData = new FormData();
                  formData.append('file',file)
                  getUpload(formData).then(res=>{
                        this.postImg3 = res.location
                        console.log(res)
                  })
                
            },
      },
      
}
</script>
