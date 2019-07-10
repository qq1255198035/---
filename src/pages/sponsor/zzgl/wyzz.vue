<template>
      <div id="wyzz">
            <div class="input-box">
                  <a-form-item :label="$t('admin.xzrq')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-locale-provider :locale="locale">
                        <a-range-picker @change="changeDate" class="my-picker"/>
                        </a-locale-provider>
                  </a-form-item>
                  <a-button type="primary" icon="search" @click="search">{{$t('issuer.hdgl.searchs')}}</a-button>
            </div>
            <div class="wyzz-content">
                  <a-locale-provider :locale="locale">
                  <a-col class="items" :xxl="{span:11}" :xl="{span:24}" v-for="(item,index) in lists" :key="index">
                        <a-row class="title">
                              <a-col :span="14" class="item">
                                    <div class="profile-image">
                                          <a-avatar :size="96" :src="item.coverImg" class="img-circle" v-if="item.coverImg"/>
                                          <a-avatar v-else style="backgroundColor:#23C6C8" :size="96">Sponsor Cube</a-avatar>
                                    </div>
                                    <div class="profile-info">
                                          <h2 class="no-margins" @click="$router.push({path:'/ckhd',query:{id:item.campId}})">
                                                {{item.name}}
                                          </h2>
                                          <p>{{$t('admin.timer')}}：{{item.publishTime}}</p>
                                          <p>{{$t('admin.fl')}}：{{item.campCatalogVal}}</p>
                                          <p>{{$t('admin.csrs')}}：{{item.campNum}}{{$t('admin.people')}}</p>
                                    </div>
                              </a-col>
                              <a-col :span="12" class="item">
                                    <span>
                                          <a-icon type="environment" class="my-icon"/>
                                          {{item.address}}
                                    </span>
                              </a-col>
                        </a-row>
                        <a-table :columns="columns" :dataSource="item.sponsor" :pagination="false" :bordered="false" class="my-table">
                              <template slot="operation" slot-scope="text,record">
                                    <a-button @click="showModal(record.ssId)" type="primary">{{$t('admin.zz')}}</a-button>
                              </template>
                        </a-table>  
                  </a-col>
                  </a-locale-provider>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                  <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable || lists.length == 0">{{$t('issuer.hdgl.loadMore')}}</a-button>
            </div>
            <a-locale-provider :locale="locale">
            <a-modal
                  :title="$t('admin.zz')"
                  :visible="visible"
                  @ok="handleSubmit"
                  :okText="$t('mar.qd')"
                  :cancelText	="$t('mar.qx')"
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
                  <a-form-item :label="$t('mar.xj')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-input-number
                              :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                              :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
                              v-model="cashMoney"
                              style="width: 100%;"
                        />
                  </a-form-item>
                  <a-form-item :label="$t('mar.sw')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-input class="my-input" :placeholder="$t('mar.qsswpmc')" v-model="proname"/>
                  </a-form-item>
                  <div class="calc-price">
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              
                              <a-input-number :min="0" v-model="price" :placeholder="$t('mar.dj')" style="width: 100%;"/>
                              
                        </a-form-item>
                        *
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              <a-input-number :min="0" v-model="number" :placeholder="$t('mar.sl')" style="width: 100%;"/>
                              
                        </a-form-item>
                        =
                        <a-form-item class="my-form-item" :wrapperCol="{span: 24}">
                              <a-input
                                    :placehodler="$t('mar.ze')"
                                    :read-only="true"
                                    v-model="total"
                              />
                        </a-form-item>
                        
                  </div>
                  <a-divider class="my-divider"/>
                  <p>{{$t('mar.zj')}}：{{totalPrice}} {{$t('mar.money')}}</p>
                  <a-form-item :label="$t('mar.bz')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-textarea class="my-input" v-model="demand"/>
                  </a-form-item>
                  </a-form>
            </a-modal>
            </a-locale-provider>
      </div>
</template>
<style lang="less" scoped>
#wyzz{
      padding: 20px;
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
      .wyzz-content{
            display: flex;
            background-color: #fff;
            padding: 20px 80px;
            justify-content: space-between;
            flex-wrap: wrap;
            .items{
                  background-color: #fff;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  padding: 20px 10px;
                  margin: 20px 0;
                  .my-table{
                        padding-top: 20px;
                  }
                  .title{
                        display: flex;
                        .item{
                              display: flex;
                              justify-content: flex-start;
                              .profile-image{
                                    margin-left: 20px;
                              }
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
                                          cursor: pointer;
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
import { searchCampList,saveMySponsor,checkMySponsor } from "@/api/sponsor";
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
                  lists:[],
                  columns: [
                        {
                              title: this.$t('issuer.cjhd.zzxs'),
                              dataIndex: 'ssKind'
                        },
                        {
                              title: this.$t('issuer.cjhd.zzje'),
                              dataIndex: 'money'
                        },
                        {
                              title: this.$t('issuer.cjhd.zzme'),
                              dataIndex: 'num',
                        },
                        {
                              title: this.$t('issuer.cjhd.xq'),
                              dataIndex: 'demand',
                        },
                        {
                              title: this.$t('issuer.cjhd.sfgxq'),
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
                  form: this.$form.createForm(this)
            }
      },
      mounted(){
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
                                    this.$message.warning(this.$t('admin.yjzqusj'));
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
                              this.$message.success(this.$t('issuer.hdgl.czcg'));
                              
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
                                    checkMySponsor(id).then(res=>{
                                          if (res.code == 1000) {
                                                console.log(res)
                                                if (res.msg == 2) {
                                                      this.$error({
                                                            title: this.$t('mar.sorry'),
                                                            content: this.$t('mar.content'),
                                                      });
                                                }else{
                                                      that.id = id;
                                                      that.visible = true
                                                }
                                          }
                                    })
                                    
                              }else{
                                    that.$error({
                                          okText: this.$t('mar.qsz'),
                                          title: this.$t('mar.errors'),
                                          content: this.$t('mar.sorry1'),
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
                              this.$message.error(this.$t('mar.error2'))
                        }
                  }else{
                        this.confirmLoading = false;
                        this.$message.error(this.$t('mar.error3'))
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
