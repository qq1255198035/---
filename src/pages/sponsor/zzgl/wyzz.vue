<template>
      <div id="wyzz">
            <div class="input-box">
                  <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-date-picker class="my-picker"/>
                  </a-form-item>
                  <a-button type="primary" icon="search">搜 索</a-button>
            </div>
            <div class="wyzz-content">
                  <div class="items">
                        <div class="title">
                              <a-col :span="12" class="item">
                                    <div class="profile-image">
                                    <a-avatar :size="96" src="./../../assets/a4.jpg" class="img-circle"/>
                                    </div>
                                    <div class="profile-info">
                                          <h2 class="no-margins">
                                          STEPHON MARBURY: THE NEXT CHAPTER / 馬布里: 我的下一章
                                          </h2>
                                          <p>时间：2019-01-02 11:50:00</p>
                                          <p>分类：篮球</p>
                                          <p>参赛人数：1300人</p>
                                    </div>
                              </a-col>
                              <a-col :span="12" class="item">
                                    <span>
                                          <a-icon type="environment" class="my-icon"/>
                                          吉林省 长春市长春市南关区卫星广场明珠花园
                                    </span>
                              </a-col>
                        </div>
                        <a-table :columns="columns" :dataSource="data" :pagination="false" :bordered="false" class="my-table">
                              <template slot="operation">
                                    <a href="javascript:;" @click="showModal">赞 助</a>
                              </template>
                        </a-table>
                        
                  </div>
                  <div class="items">
                        <div class="title">
                              <a-col :span="12" class="item">
                                    <div class="profile-image">
                                    <a-avatar :size="96" src="./../../assets/a4.jpg" class="img-circle"/>
                                    </div>
                                    <div class="profile-info">
                                          <h2 class="no-margins">
                                          STEPHON MARBURY: THE NEXT CHAPTER / 馬布里: 我的下一章
                                          </h2>
                                          <p>时间：2019-01-02 11:50:00</p>
                                          <p>分类：篮球</p>
                                          <p>参赛人数：1300人</p>
                                    </div>
                              </a-col>
                              <a-col :span="12" class="item">
                                    <span>
                                          <a-icon type="environment" class="my-icon"/>
                                          吉林省 长春市长春市南关区卫星广场明珠花园
                                    </span>
                              </a-col>
                        </div>
                        <a-table :columns="columns" :dataSource="data" :pagination="false" :bordered="false" class="my-table">
                              <template slot="operation">
                                    <a href="javascript:;" @click="showModal">赞 助</a>
                              </template>
                        </a-table>
                        
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
                  <a-form-item label="现金" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-input class="my-input"/>
                  </a-form-item>
                  <a-form-item label="实物" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-input class="my-input"/>
                  </a-form-item>
                  <div class="calc-price">
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              <a-input
                                    defaultValue="单价"
                                    @change="onChange"
                                    
                              />
                        </a-form-item>
                        *
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              <a-input
                                    defaultValue="数量"
                                    @change="onChange"
                                    
                              />
                        </a-form-item>
                        =
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              <a-input
                                    @change="onChange"
                                    defaultValue="总额"
                              />
                        </a-form-item>
                        
                  </div>
                  <a-divider class="my-divider"/>
                  <p>总计： 元</p>
                  <a-form-item label="详情" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-textarea class="my-input"/>
                  </a-form-item>
            </a-modal>
      </div>
</template>
<style lang="less" scoped>
#wyzz{
      padding: 20px;
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
      .wyzz-content{
            display: flex;
            justify-content: space-between;
            padding-top: 20px;
            flex-wrap: wrap;
            .items{
                  background-color: #fff;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  width: 48%;
                  padding: 20px 10px;
                  margin: 10px 0;
                  .my-table{
                        padding-top: 20px;
                  }
                  .title{
                        display: flex;
                        .item{
                        display: flex;
                        justify-content: space-around;
                        .profile-info{
                              margin-left: 20px;
                              
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
                                    margin-right: 5px;
                              }
                        
                        }
                  }
                  }
                  
            }
            
      }
      
}
.my-modal{
      .my-form-item{
            margin-bottom: 10px;
      }
      .calc-price{
            display: flex;
            align-items: center;
            padding-left: 80px;
            .my-form-item{
                  margin: 0 20px;

            }
      }
      .my-divider{
            margin: 10px 0;
      }
      p{
            text-align: right;
            padding-right: 20px;
      }
}

</style>
<script>
export default {
      data(){
            return{
                  columns: [
                        {
                              title: '赞助形式',
                              dataIndex: 'zzxs'
                        },
                        {
                              title: '赞助金额',
                              dataIndex: 'zzje'
                        },
                        {
                              title: '赞助名额',
                              dataIndex: 'zzme',
                        },
                        {
                              title: '是否议价',
                              dataIndex: 'sfyj',
                              
                        },
                        {
                              title: '详情',
                              dataIndex: 'desc',
                        },
                        {
                              title: '是否感兴趣',
                              dataIndex: 'operation',
                              scopedSlots: { customRender: 'operation' },
                        }
                  ],
                  data: [
                              {
                                    key: '0',
                                    zzxs: '冠名',
                                    zzje: '$4,780,000',
                                    zzme: '30',
                                    sfyj: '否',
                                    desc: '2016-09-21  08:50:08',
                              },
                              {
                                    key: '1',
                                    zzxs: '冠名',
                                    zzje: '$4,780,000',
                                    zzme: '30',
                                    sfyj: '否',
                                    desc: '2016-09-21  08:50:08',
                              },
                              {
                                    key: '2',
                                    zzxs: '冠名',
                                    zzje: '$4,780,000',
                                    zzme: '30',
                                    sfyj: '否',
                                    desc: '2016-09-21  08:50:08',
                              },
                  ],
                  visible: false,
                  confirmLoading: false,
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
                  }, 2000);
            },
            handleCancel(e) {
                  console.log('Clicked cancel button');
                  this.visible = false
            },
            onChange(value) {
                  console.log('changed', value);
            },
      }
}
</script>
