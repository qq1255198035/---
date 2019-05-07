<template>
      <div id="details">
            <glTitle></glTitle>
            <div class="details-content">
                  <div class="details-header">
                        <a-card title="活动进度">
                              <div class="secetion">
                                    <a-steps :current="2">
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
                                                <detail-list-item term="活动中文名称">馬布里: 我的下一章</detail-list-item>
                                                <detail-list-item term="活动分类">篮球</detail-list-item>
                                                <detail-list-item term="参赛人数">1200人</detail-list-item>
                                                <detail-list-item term="活动英文名称">STEPHON MARBURY: THE NEXT CHAPTER /</detail-list-item>
                                                <detail-list-item term="活动时间">2019-04-18 10:00 ~ 17:00</detail-list-item>
                                                <detail-list-item term="联系人">万启源</detail-list-item>
                                                <detail-list-item term="电子邮件">446996141@qq.com</detail-list-item>
                                                <detail-list-item term="联系电话">150 0000 0000</detail-list-item>
                                          </detail-list>
                                          <detail-list>
                                                <detail-list-item term="活动地区" class="my-item">
                                                      <a-table :columns="columns" :dataSource="data" size="small" :pagination="false" class="my-table"/>
                                                </detail-list-item>
                                                <detail-list-item term="活动封面" class="my-item-1">
                                                      <img :src="imgUrl" alt="">
                                                </detail-list-item>
                                          </detail-list>
                                    </a-card>               
                                    <div class="my-item-list">
                                          <h3>活动详情</h3>
                                          <ul>
                                                <li>
                                                      <span>活动内容：</span>
                                                      <p>这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...这段描述很长很长很长很长很长很长很长很长</p>
                                                </li>
                                                <li>
                                                      <span>活动视频：</span>
                                                      <video src="" controls poster="./../../../assets/a1.jpg" width="200px" height="150px"></video>
                                                </li>
                                                <li>
                                                      <span>活动照片：</span>
                                                      <img :src="imgUrl" alt="">
                                                      <img :src="imgUrl" alt="">
                                                      <img :src="imgUrl" alt="">
                                                      <img :src="imgUrl" alt="">
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
                                                      <a-tag color="pink">pink</a-tag>
                                                      <a-tag color="red">red</a-tag>
                                                      <a-tag color="orange">orange</a-tag>
                                                      <a-tag color="green">green</a-tag>
                                                      <a-tag color="cyan">cyan</a-tag>
                                                      <a-tag color="blue">blue</a-tag>
                                                      <a-tag color="purple">purple</a-tag>
                                                </li>
                                                <li>
                                                      <span>活动特点：</span>
                                                      <a-tag color="pink">pink</a-tag>
                                                      <a-tag color="red">red</a-tag>
                                                      <a-tag color="orange">orange</a-tag>
                                                      <a-tag color="green">green</a-tag>
                                                      <a-tag color="cyan">cyan</a-tag>
                                                      <a-tag color="blue">blue</a-tag>
                                                      <a-tag color="purple">purple</a-tag>
                                                </li>
                                          </ul>
                                    </div> 
                                    <div class="my-item-list">
                                          <h3>活动赞助</h3>
                                          <ul>
                                                <li>
                                                      <span>招商截止日期：</span>
                                                      <p>2019-04-18 20:00</p>
                                                </li>
                                                <li>
                                                      <span>赞助要求：</span>
                                                      <a-table :columns="columns2" :dataSource="data2" size="small" :pagination="false" class="my-table"/>
                                                </li>
                                                <li>
                                                      <span>活动要求：</span>
                                                      <p>这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...这段描述很长很长很长很长很长很长很长很长</p>
                                                </li>
                                          </ul>
                                    </div>  
                              </a-tab-pane>
                              <a-tab-pane key="2" tab="赞助信息">
                                    <div class="my-tables">
                                          <h3>冠名赞助<span>（ 2 ）</span></h3>
                                          <a-table :columns="columns3" :dataSource="data3" size="middle"></a-table>   
                                    </div>
                                    <div class="my-tables">
                                          <h3>非冠名赞助<span>（ 2 ）</span></h3>
                                          <a-table :columns="columns3" :dataSource="data3" size="middle"></a-table>   
                                    </div>
                                    <div class="my-tables">
                                          <h3>其他赞助<span>（ 2 ）</span></h3>
                                          <a-table :columns="columns3" :dataSource="data3" size="middle"></a-table>   
                                    </div>
                              </a-tab-pane>
                              <a-tab-pane key="3" tab="明星信息">
                                    <div class="my-tables">
                                          <a-table :columns="columns4" :dataSource="data4" size="middle"></a-table>
                                    </div> 
                              </a-tab-pane>
                        </a-tabs>
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
                                    img{
                                          border: 1px solid #ccc;
                                          border-radius: 5px;
                                          width: 200px;
                                          height: 150px;
							margin-right:20px;
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
const DetailListItem = DetailList.Item
const columns = [{
  title: '地区',
  dataIndex: 'address',
}, {
  title: '详细',
  dataIndex: 'desc',
}, ];
const columns1 = [{
  title: '主办承办方',
  dataIndex: 'name',
}, {
  title: '名称',
  dataIndex: 'desc',
}, ];
const columns2 = [{
  title: '推广形式',
  dataIndex: 'tgWay',
}, {
  title: '赞助形式',
  dataIndex: 'zzWay',
}, {
      title: '赞助金额',
      dataIndex: 'zzPrice',
},
{
      title: '赞助名额',
      dataIndex: 'zzNum',
},
{
      title: '是否议价',
      dataIndex: 'desc',
},
{
      title: '备注',
      dataIndex: 'remarks',
},
];
const data = [{
  key: '1',
  address: '香港',
  desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场',
  
}, {
  key: '2',
  address: '深圳',
  desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场',
  
}, {
  key: '3',
  address: '广州',
  desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场',
  
}];
const data1 = [{
  key: '1',
  name: '主办方',
  desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场',
  
}, {
  key: '2',
  name: '承办方',
  desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场',
  
}, {
  key: '3',
  name: '协办方',
  desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场',
  
}];
const data2 = [{
            key: '1',
            tgWay: '冠名赞助',
            zzWay: '现金+实物',
            zzprice: '1000万',
            zzNum: '10名',
            desc: '否',
            remarks: '宽城区万达广场3楼某某某'
      },
      {
            key: '2',
            tgWay: '冠名赞助',
            zzWay: '现金+实物',
            zzprice: '1000万',
            zzNum: '10名',
            desc: '否',
            remarks: '宽城区万达广场3楼某某某'
      },
];
const columns3 = [{
                        title: '编号',
                        dataIndex: 'num',
                        align: "center"
                  }, {
                        title: '赞助公司名称',
                        dataIndex: 'name',
                        align: "center"
                  }, {
                        title: '赞助形式',
                        dataIndex: 'way',
                        align: "center"
                  }, {
                        title: '是否议价',
                        dataIndex: 'isPrice',
                        align: "center"
                  },{
                        title: '现金赞助',
                        dataIndex: 'cash',
                        align: "center"
                  },{
                        title: '实物赞助',
                        dataIndex: 'pro',
                        align: "center"
                  },
                  {
                        title: '赞助总额',
                        dataIndex: 'calPrice',
                        align: "center"
                  },
                  {
                        title: '已付款金额',
                        dataIndex: 'payPrice',
                        align: "center"
                  },
            ];
            const columns4 = [{
                        title: '姓名',
                        dataIndex: 'name',
                        align: "center"
                  }, {
                        title: '出厂费用',
                        dataIndex: 'price',
                        align: "center"
                  }, {
                        title: '联系人',
                        dataIndex: 'lxr',
                        align: "center"
                  }, {
                        title: '联系电话',
                        dataIndex: 'tel',
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
const data3 = [{
                        key: '1',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, {
                        key: '2',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, {
                        key: '3',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, {
                        key: '4',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, {
                        key: '5',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, {
                        key: '6',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, {
                        key: '7',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, {
                        key: '8',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, {
                        key: '9',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, {
                        key: '10',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, {
                        key: '11',
                        num: '01',
                        name: "李宁体育用品公司",
                        way: '现金 + 实物',
                        isPrice: "否",
                        cash: "2.00",
                        pro: "1 * 衣物",
                        calPrice: '28.00',
                        payPrice: '23.00'
                  }, 
];
const data4 = [
      {
            key: '1',
            name: '斯蒂芬·赛维尔·马布里',
            price: "$39999",
            lxr: '张 **',
            tel: "155 **** 0000",
            email: "**** @mlsports.com.hk",
            company: "北京大学附属中学初中男",
      },
      {
            key: '2',
            name: '斯蒂芬·赛维尔·马布里',
            price: "$39999",
            lxr: '张 **',
            tel: "155 **** 0000",
            email: "**** @mlsports.com.hk",
            company: "北京大学附属中学初中男",
      },
      {
            key: '3',
            name: '斯蒂芬·赛维尔·马布里',
            price: "$39999",
            lxr: '张 **',
            tel: "155 **** 0000",
            email: "**** @mlsports.com.hk",
            company: "北京大学附属中学初中男",
      },
      {
            key: '4',
            name: '斯蒂芬·赛维尔·马布里',
            price: "$39999",
            lxr: '张 **',
            tel: "155 **** 0000",
            email: "**** @mlsports.com.hk",
            company: "北京大学附属中学初中男",
      },
      
]
export default {
      components:{
            glTitle,
            DetailList,
            DetailListItem
      },
      data() {
            return {
                  data,
                  columns,
                  data1,
                  columns1,
                  data2,
                  columns2,
                  data3,
                  columns3,
                  data4,
                  columns4,
                  imgUrl,
                  btnShow: -1,
                   cardItemData:[
                        {
                              name:"李丽丽",
                              tel:"13456874565",
                              email:"11222222@163.com",
                              desc: "无"
                        },
                        {
                              name:"李丽丽",
                              tel:"13456874565",
                              email:"11222222@163.com",
                              desc: "无"
                        },
                        {
                              name:"李丽丽",
                              tel:"13456874565",
                              email:"11222222@163.com",
                              desc: "无"
                        },
                        {
                              name:"李丽丽",
                              tel:"13456874565",
                              email:"11222222@163.com",
                              desc: "无"
                        },
                        {
                              name:"李丽丽",
                              tel:"13456874565",
                              email:"11222222@163.com",
                              desc: "无"
                        },
                  ],  
            }
      }
}
</script>
