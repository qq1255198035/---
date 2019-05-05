<template>
      <div id="mxgl">
            <page-header :title="pageTitle"></page-header>
            <div class="mxgl-header">
                  <div class="input-box">
                        <a-form-item label="明星名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                              <a-input placeholder="Basic usage"/>
                        </a-form-item>
                        <a-button type="primary" icon="search">搜 索</a-button>
                  </div>
                  <div class="btn-box">
                        <a-divider class="my-divider"/>
                        <a-button type="primary" icon="plus" @click="showModal">新建</a-button>
                  </div>
            </div>
            <div class="mxgl-content">
                  <div class="my-cards">
                        <div class="card-item ant-card-hoverable" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData" :key="index">
                              <div class="title">
                                    <h5>{{item.name}}</h5>
                                    <span>{{item.enName}}</span>
                                    <a-avatar :size="64" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                    <div class="bottom">
                                          <span>{{item.job}}</span>
                                          <span>{{item.desc}}</span>
                                          <span>{{item.erea}}</span>
                                    </div>    
                              </div>
                              <div class="footer">
                                    <transition name="fade">
                                          <div class="button-box" v-show= "btnShow == index" key="1">
                                                <a-button type="danger" class="danger" @click="showDeleteConfirm">删除</a-button>
                                                <a-button type="primary" class="primary" @click="showModal" :loading="loading">修改</a-button>
                                          </div>
                                    </transition>
                              </div>
                        </div>
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
                        <div class="left">
                              <div class="section">
                                    <a-form-item label="姓" class="my-form-item" :wrapperCol="{span: 19, offset: 1}" :labelCol="{span: 2}">
                                          <a-input placeholder="请输入" class="my-input"/>
                                    </a-form-item>
                                    <a-form-item label="名" class="my-form-item" :wrapperCol="{span: 19, offset: 1}" :labelCol="{span: 2}">
                                          <a-input placeholder="请输入" class="my-input"/>
                                    </a-form-item>
                              </div>
                              
                              <a-form-item label="英文名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                    <a-input placeholder="请输入英文名称" class="my-input"/>
                              </a-form-item>
                              <a-form-item label="职业" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}" class="my-form-item">
                                    <a-select defaultValue="请选择" class="my-select">
                                          <a-select-option value="Zhejiang">Zhejiang</a-select-option>
                                          <a-select-option value="Jiangsu">Jiangsu</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item label="国籍" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}" class="my-form-item">
                                    <a-select defaultValue="请选择" class="my-select">
                                          <a-select-option value="Zhejiang">Zhejiang</a-select-option>
                                          <a-select-option value="Jiangsu">Jiangsu</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item label="出生日期" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}" class="my-form-item">
                                    <a-date-picker class="my-picker"/>
                              </a-form-item>
                              <a-form-item label="身高" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                    <a-input addonAfter="cm" defaultValue="请输入" />
                              </a-form-item>
                              <a-form-item label="体重" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                    <a-input addonAfter="公斤" defaultValue="请输入" />
                              </a-form-item>
                              <a-form-item label="出生地" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                    <a-input placeholder="请输入" class="my-input"/>
                              </a-form-item>
                              <a-form-item label="简介" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                    <a-textarea placeholder="请输入简介" :rows="6"></a-textarea>
                              </a-form-item>
                        </div>
                        <div class="right">
                              <a-form-item label="性别" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                    <a-radio-group>
                                          <a-radio value="a">
                                          男
                                          </a-radio>
                                          <a-radio value="b">
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
                                          action="//jsonplaceholder.typicode.com/posts/"
                                          :beforeUpload="beforeUpload"
                                          @change="handleChange"
                                          >
                                          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
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
                                          action="//jsonplaceholder.typicode.com/posts/"
                                          :beforeUpload="beforeUpload"
                                          @change="handleChange"
                                          >
                                          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
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
                                          action="//jsonplaceholder.typicode.com/posts/"
                                          :beforeUpload="beforeUpload"
                                          @change="handleChange"
                                          >
                                          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                          <div v-else>
                                                <a-icon :type="loading ? 'loading' : 'plus'" />
                                                <div class="ant-upload-text">上传</div>
                                          </div>
                                          </a-upload>
                                          <span>建议尺寸 200 * 300</span>
                              </a-form-item>
                        </div>
                  </div>
            </a-modal>
      </div>
</template>
<style lang="less" scoped>
#mxgl{
      margin: -24px -24px 0;
      .mxgl-header{
            background-color: #fff;
            margin: 20px 0;
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
                  justify-content: space-between;
                  flex-wrap: wrap;
                  padding: 0 120px 50px;
                  
                  .card-item{
                        width: 22%;
                        height: 315px;
                        margin: 10px 0;
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
</style>
<script>
import PageHeader from '@/components/PageHeader' 
export default {
      components: {
            'page-header': PageHeader,
      },
      data(){
            return{
                  pageTitle: null,
                  btnShow: -1,
                  visible: false,
                  confirmLoading: false,
                  loading:false,
                  imageUrl: '',
                  cardItemData:[
                        {
                              name:"马布里",
                              enName: 'Stephon Xavier Marbury',
                              job: '篮球运动员',
                              desc:"1977年2月20日 | 188cm",
                              erea:"美国纽约州纽约市布鲁克林区科尼岛",
                        },
                        {
                              name:"马布里",
                              enName: 'Stephon Xavier Marbury',
                              job: '篮球运动员',
                              desc:"1977年2月20日 | 188cm",
                              erea:"美国纽约州纽约市布鲁克林区科尼岛",
                        },
                        {
                              name:"马布里",
                              enName: 'Stephon Xavier Marbury',
                              job: '篮球运动员',
                              desc:"1977年2月20日 | 188cm",
                              erea:"美国纽约州纽约市布鲁克林区科尼岛",
                        },
                        {
                              name:"马布里",
                              enName: 'Stephon Xavier Marbury',
                              job: '篮球运动员',
                              desc:"1977年2月20日 | 188cm",
                              erea:"美国纽约州纽约市布鲁克林区科尼岛",
                        },
                        {
                              name:"马布里",
                              enName: 'Stephon Xavier Marbury',
                              job: '篮球运动员',
                              desc:"1977年2月20日 | 188cm",
                              erea:"美国纽约州纽约市布鲁克林区科尼岛",
                        },
                  ],
            }
      },
      methods:{
            getPageMeta () {
                  // eslint-disable-next-line
                  this.pageTitle = this.$route.meta.title
            },
            showModal() {
                  this.visible = true
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
                  if (!isJPG) {
                  this.$message.error('You can only upload JPG file!')
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2
                  if (!isLt2M) {
                  this.$message.error('Image must smaller than 2MB!')
                  }
                  return isJPG && isLt2M
            },
            handleChange (info) {
                  if (info.file.status === 'uploading') {
                  this.loading = true
                  return
                  }
                  if (info.file.status === 'done') {
                  // Get this url from response in real world.
                  getBase64(info.file.originFileObj, (imageUrl) => {
                  this.imageUrl = imageUrl
                  this.loading = false
                  })
                  }
            },
      },
      mounted () {
            this.getPageMeta();
            
            
      },
}
</script>
