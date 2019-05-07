<template>
      <div id="wycj">
            <div class="input-box">
                  <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-date-picker class="my-picker"/>
                  </a-form-item>
                  <a-button type="primary" icon="search">搜 索</a-button>
            </div>
            <div class="wycj-content">
                  <div class="items" v-for="(item, index) in listInfo" :key="index" @mouseenter="showItem = index" @mouseleave="showItem = -1">
                        <div class="title">
                              <a-col :span="14" class="item">
                                    <div class="profile-image">
                                    <a-avatar :size="96" src="./../../assets/a4.jpg" class="img-circle"/>
                                    </div>
                                    <div class="profile-info">
                                          <h2 class="no-margins">
                                          STEPHON MARBURY: THE NEXT CHAPTER / 馬布里: 我的下一章
                                          </h2>
                                          <p>时间：2019-01-02 11:50:00</p>
                                          <span>
                                                <a-icon type="environment" class="my-icon"/>
                                                吉林省 长春市长春市南关区卫星广场明珠花园
                                          </span>
                                    </div>
                              </a-col>
                              <a-col :span="8" class="item">
                                    <p>分类：篮球</p>
                                    <p>参赛人数：1300人</p>
                              </a-col>
                        </div>
                        <div class="main">
                              <ul>
                                    <li>公司：{{item.company}}</li>
                                    <li>联系人：{{item.contect}}</li>
                                    <li>邮箱：{{item.email}}</li>
                                    <li>联系电话：{{item.tel}}</li>
                              </ul>
                        </div>
                        <div class="footer" v-show="showItem == index">
                              <a-button type="primary" @click="showModal">我要参加</a-button>
                        </div>
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
                  <a-form-item label="出场费用" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-input
                              v-decorator="[
                                    'note',
                                    {rules: [{ required: true, message: 'Please input your note!' }]}
                              ]"
                        />
                  </a-form-item>
                  <a-form-item label="选择明星" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-select
                              v-decorator="[
                                          'gender',
                                          {rules: [{ required: true, message: 'Please select your gender!' }]}
                                          ]"
                                          placeholder="请选择"
                                          @change="handleSelectChange"
                                          class="my-select"
                                    >
                                    <a-select-option value="male">
                                    male
                                    </a-select-option>
                                    <a-select-option value="female">
                                    female
                                    </a-select-option>
                        </a-select>
                  </a-form-item>
                  <a-form-item label="详情" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-textarea class="my-input"/>
                  </a-form-item>
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
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            padding: 30px;
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
.my-select{
      width: 100%;
}
</style>
<script>
export default {
      data(){
            return{
                  showItem: -1,
                  visible: false,
                  confirmLoading: false,
                  form: this.$form.createForm(this),
                  listInfo:[
                        {
                              company: '北京大学附属中学初中男篮',
                              contect: '张 **',
                              email: '**** @mlsports.com.hk',
                              tel: '155 **** 0000'
                        },
                        {
                              company: '北京大学附属中学初中男篮',
                              contect: '张 **',
                              email: '**** @mlsports.com.hk',
                              tel: '155 **** 0000'
                        },
                        {
                              company: '北京大学附属中学初中男篮',
                              contect: '张 **',
                              email: '**** @mlsports.com.hk',
                              tel: '155 **** 0000'
                        },
                  ]
            }
      },
      methods: {
            showModal() {
                  this.visible = true
            },
            handleOk(e) {
                  this.ModalText = 'The modal will be closed after two seconds';
                  this.confirmLoading = true;
                  setTimeout(() => {
                        this.visible = false;
                        this.confirmLoading = false;
                        this.$message.success('操作成功！');
                  }, 2000);
            },
            handleCancel(e) {
                  console.log('Clicked cancel button');
                  this.visible = false
            },
            onChange(value) {
                  console.log('changed', value);
            },
            handleSelectChange (value) {
                  console.log(value);
                  this.form.setFieldsValue({
                        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
                  });
            },
      }
}
</script>
