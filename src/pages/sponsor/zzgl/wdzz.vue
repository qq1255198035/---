<template>
      <div id="wdzz">
            <div class="input-box">
                  <a-form-item label="活动日期" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                        <a-range-picker @change="changeDate" class="my-picker"/>
                  </a-form-item>
                  <a-button type="primary" icon="search" @click="search">搜 索</a-button>
            </div>
            <div class="wdzz-content">
                  <div class="items" v-for="(item,index) in data" :key="index">
                        <div class="title">
                              <a-col :span="12" class="item">
                                    <div class="profile-image">
                                    <a-avatar :size="96" :src="host + item.coverImg" class="img-circle" v-if="item.coverImg"/>
                                    <a-avatar v-else style="backgroundColor:#23C6C8" :size="96">Sponsor Cube</a-avatar>
                                    </div>
                                    <div class="profile-info">
                                          <h2 class="no-margins">{{item.name}}</h2>
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
                        <div class="my-collapse">
                              <a-collapse>
                                    <a-collapse-panel header="赞助纪录">
                                          <a-table :columns="columns" :dataSource="item.sponsor" :pagination="false" :bordered="false" class="my-table"></a-table>
                                    </a-collapse-panel>
                              </a-collapse>
                        </div>
                        
                        
                  </div>  
            </div>
            <div style="text-align: center; margin-top: 30px;">
                  <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable || data.length == 0">加载更多</a-button>
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
      .wdzz-content{
            display: flex;
            justify-content: space-between;
            padding: 20px;
            flex-wrap: wrap;
            background-color:#fff;
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
export default {
      data(){
            return{
                  columns: [
                        {
                              title: '推广形式',
                              dataIndex: 'ssKind'
                        },
                        {
                              title: '赞助形式',
                              dataIndex: 'sponsorship'
                        },
                        {
                              title: '现金赞助',
                              dataIndex: 'cash',
                        },
                        {
                              title: '实物赞助',
                              dataIndex: 'productVal',
                              
                        },
                        {
                              title: '赞助总额',
                              dataIndex: 'tolMoney',
                        },
                        {
                              title: '已付款',
                              dataIndex: 'paid',
                        }
                  ],
                  data: [],
                  starttime:'',
                  endtime:'',
                  offset: 1,
                  confirmLoading: false,
                  loadingMore: true,
                  btnDsiable:false,
                  host:''
            }
      },
      methods: {
            getSearchMySponsor(startime, endtime, offset){
                  searchMySponsor(startime, endtime, offset).then(res=>{
                        if(res.code == 1000){
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
                                    this.$message.warning('已加载全部数据');
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
            this.host = this.$host
      }
}
</script>
