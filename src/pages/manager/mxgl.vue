<template>
      <div id="mxgl">
            <page-header :title="pageTitle"></page-header>
            <div class="mxgl-header">
                  <div class="input-box">
                        <a-form-item label="明星名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                              <a-input placeholder="Basic usage" v-model="name"/>
                        </a-form-item>
                        <a-button type="primary" icon="search" @click="search">搜 索</a-button>
                  </div>
                  <div class="btn-box">
                        <a-divider class="my-divider"/>
                        <a-button type="primary" icon="plus" @click="showModal($event)">新建</a-button>
                  </div>
            </div>
            <div class="mxgl-content">
                  <div class="my-cards" v-if="cardItemData.length > 0">
                        <div class="card-item ant-card-hoverable" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData" :key="index">
                              <div class="title">
                                    <h5>{{item.name}}</h5>
                                    <span>{{item.en_name}}</span>
                                    <a-avatar :size="64" :src="host + item.avatar"/>
                                    <div class="bottom">
                                          <span>{{item.catalogVal}}</span>
                                          <span>{{item.birth}} | {{item.height}} cm</span>
                                          <span>{{item.addr}}</span>
                                    </div>    
                              </div>
                              <div class="footer">
                                    <transition name="fade">
                                          <div class="button-box" v-show= "btnShow == index" key="1">
                                                <a-button type="danger" class="danger" @click="showDeleteConfirm">删除</a-button>
                                                <a-button type="primary" class="primary" @click="showModal($event,item.athlete_id)" :loading="loading">修改</a-button>
                                          </div>
                                    </transition>
                              </div>
                        </div>
                  </div>
                  <p v-else style="text-align: center; color: #ccc;">
                        暂无数据
                  </p>
                  <div style="text-align: center; margin-top: 16px;">
                        <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable">加载更多</a-button>
                  </div>
            </div>
            <a-modal
                  title="添加明星"
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
                                          <a-form-item label="姓" class="my-form-item" :wrapperCol="{span: 19, offset: 1}" :labelCol="{span: 3}">
                                                <a-input placeholder="请输入" class="my-input" v-decorator="[
                                                'lastname',{rules: [{ required: true, message: '请填写姓氏'}]}]"/>
                                          </a-form-item>
                                          <a-form-item label="名" class="my-form-item" :wrapperCol="{span: 19, offset: 1}" :labelCol="{span: 3}">
                                                <a-input placeholder="请输入" class="my-input" v-decorator="[
                                                'firstname',{rules: [{ required: true, message: '请填写名字' }]}]"/>
                                          </a-form-item>
                                    </div>
                                    
                                    <a-form-item label="英文名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input placeholder="请输入英文名称" class="my-input" v-decorator="[
                                                'enname',{rules: [{ required: true, message: '请填写英文名称' }]}]"/>
                                    </a-form-item>
                                    <a-form-item label="职业" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}" class="my-form-item">
                                          <a-select class="my-select" placeholder="请选择" v-decorator="[
                                                'works',{rules: [{ required: true, message: '请选择活职业' }]}]">
                                                <a-select-option v-for="(item,index) in works" :value="item.id" :key="index">{{ item.name }}</a-select-option>
                                          </a-select>
                                    </a-form-item>
                                    <a-form-item label="国籍" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}" class="my-form-item">
                                          <a-select class="my-select" placeholder="请选择" v-decorator="[
                                                'country',{rules: [{ required: true, message: '请选择国籍' }]}]">
                                                <a-select-option v-for="(item,index) in country" :value="item.id" :key="index">{{ item.name }}</a-select-option>
                                          </a-select>
                                    </a-form-item>
                                    <a-form-item label="出生日期" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}" class="my-form-item">
                                          <a-date-picker class="my-picker" v-decorator="[
                                                'birthday',{rules: [{ required: true, message: '请选择出生日期' }]}]"/>
                                    </a-form-item>
                                    <a-form-item label="身高" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input addonAfter="cm" placeholder="请输入" v-decorator="[
                                                'height',{rules: [{ required: true, message: '请填写身高' }]}]"/>
                                    </a-form-item>
                                    <a-form-item label="体重" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input addonAfter="公斤" placeholder="请输入" v-decorator="[
                                                'heavy',{rules: [{ required: true, message: '请填写体重' }]}]"/>
                                    </a-form-item>
                                    <a-form-item label="出生地" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-input placeholder="请输入" class="my-input" v-decorator="[
                                                'home',{rules: [{ required: true, message: '请填写出生地址' }]}]"/>
                                    </a-form-item>
                                    <a-form-item label="简介" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-textarea placeholder="请输入简介" :rows="6" v-decorator="[
                                                'desc',{rules: [{ required: true, message: '请输入简介' }]}]"></a-textarea>
                                    </a-form-item>
                              </div>
                              <div class="right">
                                    <a-form-item label="性别" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-radio-group v-decorator="[
                                                'sex',{rules: [{ required: true, message: '请输入性别' }]}]">
                                                <a-radio value="1">
                                                男
                                                </a-radio>
                                                <a-radio value="2">
                                                女
                                                </a-radio>
                                          </a-radio-group>
                                    </a-form-item>
                                    <a-form-item label="授权证书" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-upload
                                                name="avatar"
                                                listType="picture-card"
                                                class="avatar-uploader"
                                                :showUploadList="false"
                                                :beforeUpload="beforeUpload"
                                                @change="handleChange1"
                                                v-decorator="[
                                                'uploader',{rules: [{ required: true, message: '请上传证书' }]}]"
                                                >
                                                <img v-if="imageUrl1" :src="imageUrl1" alt="avatar" />
                                                <div v-else>
                                                      <a-icon :type="loading ? 'loading' : 'plus'" />
                                                      <div class="ant-upload-text">上传</div>
                                                </div>
                                          </a-upload>
                                          <span>建议尺寸 200 * 300</span>
                                    </a-form-item>
                                    <a-form-item label="上传头像" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-upload
                                                name="avatar"
                                                listType="picture-card"
                                                class="avatar-uploader"
                                                :showUploadList="false"
                                                :beforeUpload="beforeUpload"
                                                @change="handleChange2"
                                                v-decorator="[
                                                'avatar',{rules: [{ required: true, message: '请上传头像' }]}]"
                                                >
                                                
                                                <img v-if="imageUrl2" :src="imageUrl2" alt="avatar" />
                                                <div v-else>
                                                      <a-icon :type="loading ? 'loading' : 'plus'" />
                                                      <div class="ant-upload-text">上传</div>
                                                </div>
                                                </a-upload>
                                                <span>建议尺寸 200 * 300</span>
                                    </a-form-item>
                                    <a-form-item label="上传图片" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-upload
                                                name="avatar"
                                                listType="picture-card"
                                                class="avatar-uploader"
                                                :showUploadList="false"
                                                :beforeUpload="beforeUpload"
                                                @change="handleChange3"
                                                v-decorator="[
                                                'imgs',{rules: [{ required: true, message: '请上传图片' }]}]"
                                                >
                                                
                                                <img v-if="imageUrl3" :src="imageUrl3" alt="avatar" />
                                                <div v-else>
                                                      <a-icon :type="loading ? 'loading' : 'plus'" />
                                                      <div class="ant-upload-text">上传</div>
                                                </div>
                                                </a-upload>
                                                <span>建议尺寸 200 * 300</span>
                                    </a-form-item>
                              </div>
                        </a-form>
                  </div>
            </a-modal>
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
            .my-cards{
                  display: flex;
                  justify-content: flex-start;
                  flex-wrap: wrap;
                  padding: 30px 120px 50px;
                  background-color: #fff;
                  .card-item{
                        width: 22%;
                        height: 315px;
                        margin: 10px 1%;
                        border:1px solid #ccc;
                        border-radius: 5px;
                        padding: 20px;
                        background-color: #fff;
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
import { starsList,getProfession,getCountry,searchStarInfo } from "@/api/manager";
import { mixinsTitle } from "@/utils/mixin";
import moment from 'moment';
export default {
      mixins:[mixinsTitle],
      data(){
            return{
                  pageTitle: null,
                  btnShow: -1,
                  visible: false,
                  confirmLoading: false,
                  loadingMore:true,
                  loading:false,
                  btnDsiable: false,
                  imageUrl1: '',
                  imageUrl2: '',
                  imageUrl3: '',
                  cardItemData:[],
                  name: '',
                  offset: 1,
                  host:'',
                  form: this.$form.createForm(this),
                  works:[],
                  country:[],
                  
                 
            }
      },
      mounted () {
            this.getStarsList(this.name,this.offset); 
            this.getProfessionList();
            this.getCountryList();
            this.host = this.$host
      },
      methods:{
            getSearchStarInfo(athleteId){
                  searchStarInfo(athleteId).then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.form.setFieldsValue({
                                    lastname: res.data.surname,
                                    firstname: res.data.monicker,
                                    enname: res.data.enName,
                                    works: res.data.catalog,
                                    country : res.data.nationality,
                                    birthday: moment(res.data.birth, 'YYYY-MM-DD'),
                                    height: res.data.height,
                                    heavy: res.data.weight,
                                    home: res.data.addr,
                                    desc: res.data.introduction,
                                    sex: res.data.sex,
                                    
                              });
                              this.imageUrl1 = this.host + res.data.credential;
                              this.imageUrl2 = this.host + res.data.avatar;
                              this.imageUrl3 = this.host + res.data.imgs
                        }
                  })
            },
            getProfessionList(){
                  getProfession().then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.works = res.data
                        }
                  })
            },
            getCountryList(){
                  getCountry().then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.country = res.data
                        }
                  })
            },
            getStarsList(name, offset){
                  starsList(name, offset).then(res=>{
                        if (res.code == 1000) {
                              
                              this.cardItemData = res.page.rows;
                              this.loadingMore = false
                        }
                  })
            },
            search(){
                  this.getStarsList(this.name,1);
            },
            loadMore(){
                  this.offset++;
                  this.loadingMore = true;
                  starsList('', this.offset).then(res=>{
                        if (res.code == 1000) {
                              if (this.offset > res.page.pages) {
                                    this.$message.warning('已加载全部数据');
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
            showModal(e,id) {
                  this.visible = true
                  setTimeout(() => {
                        if(e.target.innerText === '修 改'){
                              this.getSearchStarInfo(id)
                        }
                  }, 500);
                  
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
            
            showDeleteConfirm() {
                  var that = this;
                  that.$confirm({
                        title: '确定删除吗？',
                        okText: '确定',
                        okType: 'danger',
                        cancelText: '取消',
                        onOk() {
                              console.log('OK');
                              that.$message.success('操作成功');
                        },
                        onCancel() {
                              console.log('Cancel');
                        },
                  });
            },
            beforeUpload (file) {
                  const isJPG = file.type === 'image/jpeg'
                  const isPNG = file.type === 'image/png'
                  if (!isJPG || !isPNG) {
                  this.$message.error('You can only upload JPG file!')
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2
                  if (!isLt2M) {
                  this.$message.error('Image must smaller than 2MB!')
                  }
                  return isJPG && isLt2M
            },
            handleChange1 (info) {
                  if (info.file.status === 'uploading') {
                        this.loading = true
                        return
                  }
                  if (info.file.status === 'done') {
                  // Get this url from response in real world.
                        getBase64(info.file.originFileObj, (imageUrl) => {
                              this.imageUrl1 = imageUrl
                              this.loading = false
                        })
                  }
            },
            handleChange2 (info) {
                  if (info.file.status === 'uploading') {
                        this.loading = true
                        return
                  }
                  if (info.file.status === 'done') {
                  // Get this url from response in real world.
                        getBase64(info.file.originFileObj, (imageUrl) => {
                              this.imageUrl2 = imageUrl
                              this.loading = false
                        })
                  }
            },
            handleChange3 (info) {
                  if (info.file.status === 'uploading') {
                        this.loading = true
                        return
                  }
                  if (info.file.status === 'done') {
                  // Get this url from response in real world.
                        getBase64(info.file.originFileObj, (imageUrl) => {
                              this.imageUrl3 = imageUrl
                              this.loading = false
                        })
                  }
            },
      },
      
}
</script>
