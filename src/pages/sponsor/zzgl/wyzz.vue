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
                                    <a-avatar :size="96" :src="host + item.coverImg" class="img-circle"/>
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
                                    <a href="javascript:;" @click="showModal(record.ssId)">赞 助</a>
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
                              
                              <a-input type='text' v-model="price" @change="handlePriceChange" placeholder="单价" style="width: 100%;"/>
                        </a-form-item>
                        *
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              <a-input type='text' v-model="number" @change="handleNumberChange" placeholder="数量" style="width: 100%;"/>
                        </a-form-item>
                        =
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              <a-input
                                    @change="onChange"
                                    placehodler="总额"
                                    :read-only="true"
                                    v-model="total"
                                    
                              />
                        </a-form-item>
                        
                  </div>
                  <a-divider class="my-divider"/>
                  <p>总计：{{totalPrice}}元</p>
                  <a-form-item label="详情" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
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
import { searchCampList,saveMySponsor } from "@/api/sponsor";
const hasProp = (instance, prop) => {
  const $options = instance.$options || {};
  const propsData = $options.propsData || {};
  return prop in propsData;
};
export default {
      
      data(){
            const value = this.value || {};
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
                              title: '是否议价',
                              dataIndex: 'bargain',
                              
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
                  loadingMore: true,
                  btnDsiable:false,
                  offset:1,
                  endtime:'',
                  starttime:'',
                  date:'',
                  cashMoney:'',
                  proname: '',
                  price: value.price,
                  number: value.number,
                  demand: '',
                  id: '',
                  form: this.$form.createForm(this),
                  host: ''
            }
      },
      mounted(){
            this.host = this.$host;
            this.getSearchCampList(this.starttime,this.endtime,this.offset);
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
            postSaveMySponsor(ssId, price, productName, productNum, productVal, tolMoney, bz){
                  saveMySponsor(ssId, price, productName, productNum, productVal, tolMoney, bz).then(res=>{
                        if (res.code == 1000) {
                              this.$message.success('操作成功！');
                              this.confirmLoading = false;
                              this.visible = false;
                        }
                  })
            },
            showModal(id) {
                  this.id = id;
                  this.visible = true
            },
            handleSubmit() {
                  this.confirmLoading = true;
                  this.postSaveMySponsor(this.id,this.cashMoney,this.proname,this.number,this.total,this.totalPrice,this.demand)
            },
            handleCancel(e) {
                  console.log('Clicked cancel button');
                  this.visible = false
            },
            onChange(value) {
                  console.log('changed', value);
            },
           
            handlePriceChange(e) {
                  const price = parseInt(e.target.value || 0, 10);
                  if (isNaN(price)) {
                        return;
                  }
                  if (!hasProp(this, 'value')) {
                  this.price = price;
                  }
                  this.triggerChange({ price });
            },
            handleNumberChange(e) {
                  const number = parseInt(e.target.value || 0, 10);
                  if (isNaN(number)) {
                        return;
                  }
                  if (!hasProp(this, 'value')) {
                  this.number = number;
                  }
                  this.triggerChange({ number });
            },
            triggerChange  (changedValue) {
                  // Should provide an event to pass value to Form.
                  this.$emit('change', Object.assign({}, this.$data, changedValue));
            },
            
      },
      computed:{
            total(){
                  return this.price*this.number || 0
            },
            totalPrice(){
                  return this.cashMoney + this.total
            }
      },
      watch: {
            value (val = {}) {
                  this.price = val.price || 0;
                  this.number = val.number || 0;
            },
            
      },
}
</script>
