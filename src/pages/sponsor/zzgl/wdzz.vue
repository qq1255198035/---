<template>
      <div id="wdzz">
            <div class="input-box">
                  <a-form-item :label="$t('admin.hdsj')" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-locale-provider :locale="locale">
                        <a-range-picker @change="changeDate" class="my-picker"/>
                        </a-locale-provider>
                  </a-form-item>
                  <a-button type="primary" icon="search" @click="search">{{$t('issuer.hdgl.searchs')}}</a-button>
            </div>
            <div class="wdzz-content">
                  <a-row type="flex" justify="space-between">
                        <a-col class="items" :xxl="{span:11}" :xl="{span:24}" v-for="(item,index) in data" :key="index">
                              <div class="title">
                                    <a-col :span="12" class="item">
                                          <div class="profile-image">
                                          <a-avatar :size="96" :src="item.coverImg" class="img-circle" v-if="item.coverImg"/>
                                          <a-avatar v-else style="backgroundColor:#23C6C8" :size="96">Sponsor Cube</a-avatar>
                                          </div>
                                          <div class="profile-info">
                                                <h2 class="no-margins">{{item.name}}</h2>
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
                              </div>
                              <div class="my-collapse">
                                    <a-collapse>
                                          <a-collapse-panel :header="$t('admin.czjl')">
                                                <a-table :columns="columns" :dataSource="item.sponsor" :pagination="false" :bordered="false" class="my-table"></a-table>
                                          </a-collapse-panel>
                                    </a-collapse>
                              </div>
                        </a-col>
                  </a-row>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                  <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable || data.length == 0">{{$t('issuer.hdgl.loadMore')}}</a-button>
            </div>
      </div>
</template>
<style lang="less" scoped>
#wdzz{
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
      .wdzz-content{
            padding: 20px 50px;
            background-color:#fff;
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
            .my-collapse{
                  margin-top: 20px;
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
import { searchMySponsor } from "@/api/sponsor";
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
                  columns: [
                        {
                              title: this.$t('issuer.cjhd.tgxs'),
                              dataIndex: 'ssKind'
                        },
                        {
                              title: this.$t('issuer.cjhd.zzxs'),
                              dataIndex: 'sponsorship'
                        },
                        {
                              title: this.$t('issuer.cjhd.xjzz'),
                              dataIndex: 'cash',
                        },
                        {
                              title: this.$t('issuer.cjhd.swzz'),
                              dataIndex: 'productVal',
                              
                        },
                        {
                              title: this.$t('issuer.cjhd.zzze'),
                              dataIndex: 'tolMoney',
                        },
                        {
                              title: this.$t('admin.yfk'),
                              dataIndex: 'paid',
                        }
                  ],
                  data: [],
                  starttime:'',
                  endtime:'',
                  offset: 1,
                  confirmLoading: false,
                  loadingMore: true,
                  btnDsiable:false
            }
      },
      methods: {
            getSearchMySponsor(startime, endtime, offset){
                  searchMySponsor(startime, endtime, offset).then(res=>{
                        if(res.code == 1000){
                              console.log(res)
                              let key = 'key';
                              this.loadingMore = false;
                              this.data = res.page.rows;
                              this.data.map((item,index) => {
                                    item.sponsor.map((aitem,index)=>{
                                          aitem[key] = index;
                                    })
                              })
                              
                        }
                  })
            },
            loadMore(){
                  this.offset++;
                  this.loadingMore = true;
                  searchMySponsor('','', this.offset).then(res=>{
                        if(res.code == 1000){
                              if (this.offset > res.page.pages) {
                                    this.$message.warning(this.$t('admin.yjzqusj'));
                                    this.loadingMore = false;
                                    this.btnDsiable = true;
                                    return;
                              }
                              let key = 'key'
                              this.loadingMore = false;
                              this.data = this.data.concat(res.page.rows);
                              this.data.map((item,index) => {
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
                  this.getSearchMySponsor(this.starttime,this.endtime,this.offset);  
            },
      },
      mounted(){
            this.getSearchMySponsor(this.starttime,this.endtime,this.offset);
      }
}
</script>
