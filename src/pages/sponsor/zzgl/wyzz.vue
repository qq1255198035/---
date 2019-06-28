<template>
      <div id="wyzz">
            <div class="input-box">
                  <a-form-item label="选择日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-range-picker @change="changeDate" class="my-picker"/>
                  </a-form-item>
                  <a-button type="primary" icon="search" @click="search">搜 索</a-button>
            </div>
            <div class="wyzz-content">
                  <div class="items" v-for="(item,index) in lists" :key="index">
                        <div class="title">
                              <a-col :span="12" class="item">
                                    <div class="profile-image">
                                    <a-avatar :size="96" :src="host + item.coverImg" class="img-circle" v-if="item.coverImg"/>
                                    <a-avatar v-else style="backgroundColor:#23C6C8" :size="96">Sponsor Cube</a-avatar>
                                    </div>
                                    <div class="profile-info">
                                          <h2 class="no-margins">
                                          {{item.name}}
                                          </h2>
                                          <p>时间：{{item.publishTime}}</p>
                                          <p>分类：{{item.campCatalogVal}}</p>
                                          <p>参赛人数：{{item.campNum}}人</p>
                                    </div>
                              </a-col>
                              <a-col :span="12" class="item">
                                    <span>
                                          <a-icon type="environment" class="my-icon"/>
                                          {{item.address}}
                                    </span>
                              </a-col>
                        </div>
                        <a-table :columns="columns" :dataSource="item.sponsor" :pagination="false" :bordered="false" class="my-table">
                              <template slot="operation" slot-scope="text,record">
                                    <a-button @click="showModal(record.ssId)" type="primary">赞 助</a-button>
                              </template>
                        </a-table>
                        
                  </div>
                 
            </div>
            <div style="text-align: center; margin-top: 30px;">
                  <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable || lists.length == 0">加载更多</a-button>
            </div>
            <a-modal
                  title="赞助"
                  :visible="visible"
                  @ok="handleSubmit"
                  :confirmLoading="confirmLoading"
                  @cancel="handleCancel"
                  wrapClassName="my-modal"
            >
            <a-form
                  id="form"
                  ref="form"
                  :form="form"
                  @submit="handleSubmit"
            >
                  <a-form-item label="现金" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-input-number
                              :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                              :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
                              v-model="cashMoney"
                              style="width: 100%;"
                        />
                  </a-form-item>
                  <a-form-item label="实物" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-input class="my-input" placeholder="请输入物品名称" v-model="proname"/>
                  </a-form-item>
                  <div class="calc-price">
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              
                              <a-input type='number' min="0" v-model="price" placeholder="单价" style="width: 100%;"/>
                              
                        </a-form-item>
                        *
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              <a-input type='number' min="0" v-model="number" placeholder="数量" style="width: 100%;"/>
                              
                        </a-form-item>
                        =
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              <a-input
                                    placehodler="总额"
                                    :read-only="true"
                                    v-model="total"
                              />
                        </a-form-item>
                        
                  </div>
                  <a-divider class="my-divider"/>
                  <p>总计：{{totalPrice}}元</p>
                  <a-form-item label="备注" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-textarea class="my-input" v-model="demand"/>
                  </a-form-item>
                  </a-form>
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
            
            flex-wrap: wrap;
            background-color: #fff;
            padding: 20px;
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
                              justify-content: flex-start;
                              .profile-info{
                                    margin-left: 30px;
                                    
                                    p{
                                          color: #999;
                                          margin-bottom: 0;
                                    }
                                    span{
                                          color: #999;
                                    }
                                    .no-margins {
                                          font-size: 18px;
                                          color: #139aa1;
                                          margin-bottom: 0;
                                          font-weight: bold;
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
import { searchCampList,saveMySponsor } from "@/api/sponsor";
import { judge } from "@/api/common";
export default {
      
      data(){
            return{
                  lists:[],
                  columns: [
                        {
                              title: '赞助形式',
                              dataIndex: 'ssKind'
                        },
                        {
                              title: '赞助金额',
                              dataIndex: 'money'
                        },
                        {
                              title: '赞助名额',
                              dataIndex: 'num',
                        },
                        {
                              title: '详情',
                              dataIndex: 'demand',
                        },
                        {
                              title: '是否感兴趣',
                              dataIndex: 'operation',
                              scopedSlots: { customRender: 'operation' },
                        }
                  ],
                  visible: false,
                  confirmLoading: false,
                  loadingMore: false,
                  btnDsiable:false,
                  offset:1,
                  endtime:'',
                  starttime:'',
                  date:'',
                  cashMoney:'',
                  proname: '',
                  price: '',
                  number: '',
                  demand: '',
                  id: '',
                  form: this.$form.createForm(this),
                  host: ''
            }
      },
      mounted(){
            this.host = this.$host;
            this.getSearchCampList(this.starttime,this.endtime,this.offset);
            console.log(this.isPositive)
      },
      methods: {
            
            getSearchCampList(startime, endtime, offset){
                  searchCampList(startime, endtime, offset).then(res=>{
                        if(res.code == 1000){
                              let key = 'key';
                              this.loadingMore = false;
                              this.lists = res.page.rows;
                              console.log(res)
                              this.lists.map((item,index) => {
                                    item.sponsor.map((aitem,index)=>{
                                          aitem[key] = index;
                                    })
                              })
                              
                        }
                  })
            },
            changeDate(val,date){
                  console.log(date)
                  this.starttime = date[0];
                  this.endtime = date[1];
            },
            search(){
                  this.getSearchCampList(this.starttime,this.endtime,this.offset);  
            },
            loadMore(){
                  this.offset++;
                  this.loadingMore = true;
                  searchCampList('','', this.offset).then(res=>{
                        if(res.code == 1000){
                              if (this.offset > res.page.pages) {
                                    this.$message.warning('已加载全部数据');
                                    this.loadingMore = false;
                                    this.btnDsiable = true;
                                    return;
                              }
                              let key = 'key'
                              this.loadingMore = false;
                              this.lists = this.lists.concat(res.page.rows);
                              this.lists.map((item,index) => {
                                    item.sponsor.map((aitem,index)=>{
                                          aitem[key] = index;
                                    })
                              })     
                        }
                  })
            },
            postSaveMySponsor(ssId, price, productName, productNum, productVal, tolMoney, bz, cash){
                  saveMySponsor(ssId, price, productName, productNum, productVal, tolMoney, bz, cash).then(res=>{
                        if (res.code == 1000) {
                              this.$message.success('操作成功！');
                              this.confirmLoading = false;
                              this.visible = false;
                              this.cashMoney = '';
                              this.proname = '';
                              this.price = '';
                              this.number = '';
                              this.demand= ''
                        }
                  })
            },
            showModal(id) {
                  let that = this;
                  judge().then(res=>{
                        if (res.code == 1000) {
                              if (res.data == 0) {
                                    that.id = id;
                                    that.visible = true
                              }else{
                                    that.$error({
                                          okText: '去设置',
                                          title: '错误',
                                          content: '对不起，您的账户尚未通过审批！',
                                          onOk() {
                                                that.$router.push({name: 'zhsz'})
                                          },
                                    });
                              }
                        }
                  })   
            },
            handleSubmit() {
                  this.confirmLoading = true;
                  if (this.totalPrice) {
                        this.confirmLoading = false;
                        if (this.isPositive) {
                              this.postSaveMySponsor(this.id,this.price,this.proname,this.number,this.total,this.totalPrice,this.demand,this.cashMoney)
                        }else{
                              this.$message.error('单价与数量必须为大于0!')
                        }
                  }else{
                        this.confirmLoading = false;
                        this.$message.error('请至少一种赞助形式!')
                  }
                  
            },
            handleCancel(e) {
                  this.loadingMore = false;
                  this.visible = false;
                  this.cashMoney = '';
                  this.proname = '';
                  this.price = '';
                  this.number = '';
                  this.demand= ''
            }
      },
      computed:{
            total(){
                  return this.price*this.number || 0
            },
            totalPrice(){
                  return parseInt(this.cashMoney + this.total)
            },
            isPositive(){
                  if (this.price >= 0 && this.number >= 0) {
                        return true
                  }else{
                        return false
                  }
            }
      },
      watch: {
           
            
      },
}
</script>
