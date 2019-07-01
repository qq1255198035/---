<template>
      <div id="details">
            <glTitle :logo="logo" :title="titleName" :start="startTime" :type="type" :num="num" :stars="starList | filterLength" :sponsors="sponsorList | filterLength" :status="status | filterStatus" :price="money">
                  <span slot="b">
                        <a-icon type="environment" class="my-icon"/>{{adre}}
                  </span>
            </glTitle>
            <div class="details-content">
                  <div class="details-header">
                        <a-card title="活动进度">
                              <div class="secetion">
                                    <a-steps :current="schedule">
                                          <a-popover slot="progressDot" slot-scope="{index, status, prefixCls}">
                                                <template slot="content">
                                                <span>step {{index}} status: {{status}}</span>
                                                </template>
                                                <span :class="`${prefixCls}-icon-dot`"></span>
                                          </a-popover>
                                          <a-step title="创建活动"/>
                                          <a-step title="平台审核" />
                                          <a-step title="活动进行中" />
                                          <a-step title="完成"/>
                                    </a-steps>
                              </div>
                        </a-card>
                  </div>
                  <div class="details-main">
                        <a-tabs defaultActiveKey="1" tabPosition="top" size="large">
                              <a-tab-pane key="1" tab="活动信息">
                                    <a-card :bordered="false">
                                          <detail-list title="活动基本信息">
                                                <detail-list-item term="活动中文名称">{{name}}</detail-list-item>
                                                <detail-list-item term="活动分类">{{campCatalog}}</detail-list-item>
                                                <detail-list-item term="参赛人数">{{campNum}}</detail-list-item>
                                                <detail-list-item term="活动英文名称">{{enName}}</detail-list-item>
                                                <detail-list-item term="活动时间">{{publishTime}} ~ {{endTime}}</detail-list-item>
                                                <detail-list-item term="联系人">{{contact}}</detail-list-item>
                                                <detail-list-item term="电子邮件">{{email}}</detail-list-item>
                                                <detail-list-item term="联系电话">{{phone}}</detail-list-item>
                                          </detail-list>
                                          <detail-list>
                                                <detail-list-item term="活动地区" class="my-item">
                                                      <a-table :columns="columns" :dataSource="data" size="small" :pagination="false" class="my-table"/>
                                                </detail-list-item>
                                                
                                          </detail-list>
                                    </a-card>               
                                    <div class="my-item-list">
                                          <h3>活动详情</h3>
                                          <ul>
                                                <li>
                                                      <span>活动内容：</span>
                                                      <p>{{ content }}</p>
                                                </li>
                                                <li>
                                                      <span>活动视频：</span>
                                                      <video :src="host + video" controls width="200" height="150" v-if="video"></video>
                                                      <p v-else style="color: #ccc;">暂无视频</p>
                                                </li>
                                                <li>
                                                      <span>活动照片：</span>
                                                      <div class="img-box" v-for="(item,index) in imgs" :key="index">
                                                            <img :src="host + item" alt="活动照片" v-if="item">   
                                                            <p v-else style="color: #ccc;">暂无图片</p>     
                                                      </div>
                                                      
                                                </li>
                                          </ul>
                                    </div>     
                                    <div class="my-item-list">
                                          <h3>活动推广</h3>
                                          <ul>
                                                <li>
                                                      <span>主办承办方：</span>
                                                      <a-table :columns="columns1" :dataSource="data1" size="small" :pagination="false" class="my-table"/>
                                                </li>
                                                <li>
                                                      <span>受众群众：</span>
                                                      <div v-if="audiences.length > 0">
                                                            <a-tag v-for="(item,index) in audiences" :key="index" color="red" style="margin-bottom:10px">{{item}}</a-tag>
                                                      </div>
                                                      <p v-else style="color: #ccc;">暂无数据</p>
                                                </li>
                                                <li>
                                                      <span>活动特点：</span>
                                                      <div v-if="campFeature.length > 0">
                                                            <a-tag v-for="(item,index) in campFeature" :key="index" color="cyan" style="margin-bottom:10px">{{item}}</a-tag>
                                                      </div>
                                                      <p v-else style="color: #ccc;">暂无数据</p>
                                                </li>
                                          </ul>
                                    </div> 
                                    <div class="my-item-list">
                                          <h3>活动赞助</h3>
                                          <ul>
                                                <li>
                                                      <span>招商截止日期：</span>
                                                      <p>{{jzTime}}</p>
                                                </li>
                                                <li>
                                                      <span>赞助要求：</span>
                                                      <a-table :columns="columns2" :dataSource="data2" size="small" :pagination="false" class="my-table"/>
                                                </li>
                                                <li>
                                                      <span>活动要求：</span>
                                                      <p>{{demand}}</p>
                                                </li>
                                          </ul>
                                    </div>  
                              </a-tab-pane>
                              <a-tab-pane key="2" tab="赞助信息">
                                    <div v-if="dataName.length > 0">
                                          <div class="my-tables" v-for="(item,index) in dataName" :key="index">
                                                <h3>{{item.name}}<span> ( {{item.list.length}} ) </span></h3>
                                                <a-table :columns="columns3" :dataSource="item.list" size="middle"></a-table>
                                          </div>
                                    </div>
                                    <p v-else style="color: #ccc; text-align: center">暂无数据</p>
                              </a-tab-pane>
                              <a-tab-pane key="3" tab="明星信息">
                                    <div class="my-tables">
                                          <a-table :columns="columns4" :dataSource="data4" size="middle"></a-table>
                                    </div> 
                              </a-tab-pane>
                        </a-tabs>
                        <div style="display: flex;justify-content: center;margin-top: 20px;">
                              <a-button type="primary" @click="$router.go(-1)">返 回</a-button>
                        </div>
                  </div>
            </div>
      </div>
</template>
<style lang="less" scoped>

#details{
      .details-content{
            padding:0 30px 20px;
		margin-top: 20px;
            .details-header{
                  margin:0 0 20px;
			.ant-card-bordered{
			border:0;}
                  .secetion{
                        padding: 20px 0;
                  }
            }
            .details-main{
                  background-color: #fff;
			padding: 20px;
                  .my-item-list{
                        padding:32px;
				margin: 0 32px;
                        width: 80%;
                        border-top: 1px solid #ccc;
                        h3{
                              font-size: 16px;
                              color: #333;
					margin-bottom: 24px;
                        }
                        ul{
                              padding: 0;
                              li{
                                    display: flex;
                                    align-items: flex-start;
                                    margin: 20px 0;
                                    .img-box{
                                          display: flex;
                                          justify-content: space-around;
                                          flex-wrap: wrap;
                                          img{
                                                border: 1px solid #ccc;
                                                border-radius: 5px;
                                                width: 200px;
                                                height: 150px;
                                                margin-right:20px;
                                          }
                                    }
                                    .my-table{
                                          width: 70%;
                                    }
                                    span{
                                          min-width: 70px;
                                          margin-right: 20px;
                                    }
                                    p{
                                          margin: 0;
                                          
                                    }
                                    
                              }
                        }
                  }
                  .my-item{
                        width: 50%;
                        display: flex;
                        justify-content: center;
                  }
                  .my-item-1{
                        margin-left: 50px;
                        display: flex;

                        img{
                              border: 1px solid #ccc;
                              border-radius: 5px;
                              width: 300px;
                              height: 150px;
                        }
                  }
                  .my-tables{
                        padding: 30px 40px 0;
                        h3{
                              margin-bottom: 20px;
                        }
                  }
                  
            }
      }
      
}
</style>
<script>
import glTitle from '@/components/glTitle/glTitle'
import DetailList from '@/components/tools/DetailList'
import imgUrl from '@/assets/a1.jpg'
import { campInformation,searchCampSponsor,searchCampStar,campHeadInfo } from '@/api/admin'
import { campSchedule } from "@/api/common";
const DetailListItem = DetailList.Item
const columns = [
      {
            title: '地区',
            dataIndex: 'area',
      }, {
            title: '详细',
            dataIndex: 'address',
      }, 
];
const columns1 = [
      {
            title: '主办承办方',
            dataIndex: 'workType',
      }, {
            title: '名称',
            dataIndex: 'name',
      }, 
];
const columns2 = [
      {
            title: '推广形式',
            dataIndex: 'ssKind',
      },    {
            title: '赞助形式',
            dataIndex: 'sponsorship',
      }, {
            title: '赞助金额',
            dataIndex: 'money',
      },{
            title: '赞助名额',
            dataIndex: 'num',
      },{
            title: '备注',
            dataIndex: 'bz',
      },
];

const columns3 = [
      {
            title: '序号',
            dataIndex: 'key',
            align: "center"
      }, 
      {
            title: '赞助公司名称',
            dataIndex: 'company',
            align: "center"
      }, 
      {
            title: '赞助形式',
            dataIndex: 'ssKind',
            align: "center"
      }, 
      {
            title: '现金赞助',
            dataIndex: 'cash',
            align: "center"
      },
      {
            title: '实物赞助',
            dataIndex: 'productVal',
            align: "center"
      },
      {
            title: '赞助总额',
            dataIndex: 'tolMoney',
            align: "center"
      },
      {
            title: '已付款金额',
            dataIndex: 'paid',
            align: "center"
      },
];
const columns4 = [
      {
            title: '姓名',
            dataIndex: 'name',
            align: "center"
      }, {
            title: '出厂费用',
            dataIndex: 'cost',
            align: "center"
      }, {
            title: '联系人',
            dataIndex: 'contact',
            align: "center"
      }, {
            title: '联系电话',
            dataIndex: 'phone',
            align: "center"
      },{
            title: '邮箱',
            dataIndex: 'email',
            align: "center"
      },{
            title: '公司',
            dataIndex: 'company',
            align: "center"
      },
];
export default {
      components:{
            glTitle,
            DetailList,
            DetailListItem
      },
      data() {
            return {
                  data:[],
                  columns,
                  data1:[],
                  columns1,
                  data2:[],
                  columns2,
                  dataName:[],
                 
                  columns3,
                  data4:[],
                  columns4,
                  imgUrl,
                  name: '',
                  enName: '',
                  campCatalog:'',
                  campNum:'',
                  publishTime: '',
                  endTime: '',
                  contact: '',
                  email: '',
                  phone: '',
                  content:'',
                  video: '',
                  jzTime: '',
                  imgs:[],
                  audiences: [],
                  campFeature:[],
                  demand:"",
                  titleName:'',
                  startTime: '',
                  adre: '',
                  type: '',
                  num:'',
                  starList: [],
                  sponsorList: [],
                  status: '',
                  logo:'',
                  money:'',
                  host:'',
                  schedule:0
            }
      },
      mounted(){
            this.getCampInformation(this.$route.query.id);
            this.getSearchCampSponsor(this.$route.query.id);
            this.getSearchCampStar(this.$route.query.id);
            this.getCampHeadInfo(this.$route.query.id);
            this.getCampSchedule(this.$route.query.id)
            this.host = this.$host;
      },
      computed:{
            
            
      },
      methods:{
            getCampSchedule(id){
                  campSchedule(id).then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.schedule = parseInt(res.data.schedule - 1) 
                        }
                  })
            },
            getCampInformation(id){
                  campInformation(id).then(res=>{
                        if(res.code == 1000){
                              this.name = res.data.basic.name;
                              this.enName = res.data.basic.enName;
                              this.campCatalog = res.data.basic.campCatalog;
                              this.campNum = res.data.basic.campNum;
                              this.publishTime = res.data.basic.publishTime;
                              this.endTime = res.data.basic.endTime;
                              this.contact = res.data.basic.contact;
                              this.email = res.data.basic.email;
                              this.phone = res.data.basic.phone;
                              this.data = res.data.basic.newArea;
                              this.content = res.data.basic.content;
                              this.video = res.data.basic.video;
                              this.imgs = (res.data.basic.imgs || '').split(',');
                              this.data1 = res.data.campOrgList;
                              this.audiences = (res.data.basic.audiences || '').split(',');
                              this.data2 = res.data.campSponsor;
                              console.log(boolean(this.imgs))
                              this.demand = res.data.campSponsor.length ? res.data.campSponsor[0].demand : '';
                              this.jzTime = res.data.campSponsor.length ? res.data.campSponsor[0].endTime : ''
                        }
                  })
            },
            getSearchCampSponsor(id){
                  searchCampSponsor(id).then(res=>{
                        if(res.code == 1000){
                              let key = "key";
                              console.log(res)
                              this.dataName = res.data;
                              res.data.map((item,index)=>{
                                    item.list.map((aitem,aindex)=>{
                                          aitem[key] = aindex + 1
                                    })
                              })
                              console.log(this.dataName.length > 0)
                        }
                  })
            },
            getSearchCampStar(id){
                  searchCampStar(id).then(res=>{
                        if(res.code == 1000){
                              let key = "key";
                              console.log(res)
                              this.data4 = res.data;
                              this.data4.map((item,index)=>{
                                    item[key] = index
                              })
                        }
                  })
            },
            getCampHeadInfo(id){
                  campHeadInfo(id).then(res=>{
                        if(res.code == 1000){
                              console.log(res)
                              this.logo = this.$host + res.data.campain.coverImg;
                              this.titleName = res.data.campain.name;
                              this.status = res.data.campain.status;
                              this.money = res.data.amount;
                              this.startTime = res.data.campain.publishTime;
                              this.type = res.data.campain.campCatalog;
                              this.num = res.data.campain.campNum;
                              this.starList = res.data.starList;
                              this.adre = res.data.campain.area;
                              this.sponsorList = res.data.sponsorList;
                        }
                  })
            }
      },
      filters:{
            filterStatus(val){
                  switch (val) {
                        case 0 : return '未审批';
                        case 20 : return '已审批';
                        case 30 : return '驳回';
                        case 40 : return '已认证'
                  }
            },
            filterLength(val){
                  if(val.length > 4){
                        return val.slice(0,4)
                  }else{
                        return val
                  }
            }
            
      }
}
</script>
