<template>
      <div id="zzgl">
            <glTitle></glTitle>
            <div class="zzgl-content">
                  <a-tabs defaultActiveKey="1" tabPosition="top" size="large">
                        <a-tab-pane key="1" tab="赞助审批">
                              <div>
                                    <a-collapse accordion activeKey="1" :bordered="false">
                                          <a-collapse-panel key="1">
                                          <h5 slot="header" class="panel-title">冠名赞助
                                                <span>（ <i>1</i> / 2 ）</span>
                                                <a-tag color="#f50">5</a-tag>
                                          </h5>
                                          <div class="my-cards">
                                                <div class="card-item ant-card-hoverable" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData" :key="index">
                                                      <div class="title">
                                                            <a-avatar :size="40" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" class="user-img"/>
                                                            <span>李宁体育用品有限公司</span>
                                                      </div>
                                                      <div class="content">
                                                            <p>赞助金额：</p>
                                                            <div class="my-charts">
                                                                  <v-chart :height="320" :data="pieData" :scale="pieScale">
                                                                        <v-legend dataKey="item" :useHtml="true" :itemTpl="itemTpl" position="right" :offsetX="-50" :offsetY="-40"/>
                                                                        <v-tooltip :showTitle="false" dataKey="item*percent" />
                                                                        <v-axis />
                                                                        <v-guide :type="guideOpts.type" :position="guideOpts.position" :content="guideOpts.content" :v-style="guideOpts.style" />
                                                                        <v-pie position="percent" :color="c" :vStyle="pieStyle"/>
                                                                        <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                                                                  </v-chart>
                                                            </div>
                                                      </div>
                                                      <div class="footer">
                                                            <p>联系人: {{ item.name}}</p>
                                                            <p>联系电话：{{item.tel}}</p>
                                                            <p>邮箱：{{item.email}}</p>
                                                            <p>备注：{{item.desc}}</p>
                                                            <transition name="fade">
                                                                  <div class="button-box" v-show= "btnShow == index" key="1">
                                                                        <a-button type="danger" class="danger">驳回</a-button>
                                                                        <a-button type="primary" class="primary">通过</a-button>
                                                                  </div>
                                                            </transition>
                                                            
                                                      </div>
                                                </div>
                                                
                                          </div>
                                          </a-collapse-panel>
                                          <a-collapse-panel key="2" :disabled='false' :bordered="false">
                                                <h5 slot="header" class="panel-title">非冠名赞助
                                                      <span>（ <i>1</i> / 2 ）</span>
                                                      <a-tag color="#f50">5</a-tag>
                                                </h5>
                                                <div class="my-cards">
                                                <div class="card-item ant-card-hoverable" @mouseenter="btnShow = index" @mouseleave="btnShow = -1" v-for="(item,index) in cardItemData" :key="index">
                                                      <div class="title">
                                                            <a-avatar :size="40" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" class="user-img"/>
                                                            <span>李宁体育用品有限公司</span>
                                                      </div>
                                                      <div class="content">
                                                            <p>赞助金额：</p>
                                                            <div class="my-charts">
                                                                  <v-chart :height="320" :data="pieData" :scale="pieScale">
                                                                        <v-legend dataKey="item" :useHtml="true" :itemTpl="itemTpl" position="right" :offsetX="-50" :offsetY="-40"/>
                                                                        <v-tooltip :showTitle="false" dataKey="item*percent" />
                                                                        <v-axis />
                                                                        <v-guide :type="guideOpts.type" :position="guideOpts.position" :content="guideOpts.content" :v-style="guideOpts.style" />
                                                                        <v-pie position="percent" :color="c" :vStyle="pieStyle"/>
                                                                        <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                                                                  </v-chart>
                                                            </div>
                                                      </div>
                                                      <div class="footer">
                                                            <p>联系人: {{ item.name}}</p>
                                                            <p>联系电话：{{item.tel}}</p>
                                                            <p>邮箱：{{item.email}}</p>
                                                            <p>备注：{{item.desc}}</p>
                                                            <transition name="fade">
                                                                  <div class="button-box" v-show= "btnShow == index">
                                                                        <a-button type="danger" class="danger">驳回</a-button>
                                                                        <a-button type="primary" class="primary">通过</a-button>
                                                                  </div>
                                                            </transition>
                                                            
                                                      </div>
                                                </div>
                                                
                                          </div>
                                          </a-collapse-panel>
                                          
                                    </a-collapse>
                              </div>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="我的赞助">
                              <div>
                                    <a-collapse accordion activeKey="1" :bordered="false">
                                          <a-collapse-panel key="1">
                                                <h5 slot="header" class="panel-title">冠名赞助
                                                      <span>（ 2 ）</span>
                                                </h5>
                                                <div class="my-tables">
                                                      <a-table :columns="columns" :dataSource="data" size="middle"></a-table>   
                                                </div>
                                          </a-collapse-panel>
                                          <a-collapse-panel key="2" :disabled='false' :bordered="false">
                                                <h5 slot="header" class="panel-title">非冠名赞助
                                                      <span>（ 2 ）</span>
                                                </h5>
                                                <a-table :columns="columns" :dataSource="data" size="middle"></a-table>
                                          </a-collapse-panel>
                                          
                                    </a-collapse>
                              </div>
                        </a-tab-pane>
                        
                  </a-tabs>
            </div>
      </div>
</template>
<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
#zzgl{
      
      .zzgl-content{
            background-color: #fff;
            padding: 20px;
            .my-icon{
                  font-size: 24px;
            }
            .panel-title{
                  font-size: 18px;
                  font-weight: normal;
                  color: #333;
                  margin: 0;
                  span{
                        i{
                              color: #f50;
                        }
                  }
            }
            .card-avatar {
                  width: 48px;
                  height: 48px;
                  border-radius: 48px;
            }
            .ant-card-actions {
                  background: #f7f9fa;
                  li {
                        float: left;
                        text-align: center;
                        margin: 12px 0;
                        color: rgba(0, 0, 0, 0.45);
                        width: 50%;
                        &:not(:last-child) {
                              border-right: 1px solid #e8e8e8;
                        }
                        a {
                              color: rgba(0, 0, 0, .45);
                              line-height: 22px;
                              display: inline-block;
                              width: 100%;
                              &:hover {
                                    color: #1890ff;
                              }
                        }
                  }
            }
            .my-cards{
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  
                  .card-item{
                        width: 24%;
                        margin: 10px 0;
                        border:1px solid #ccc;
                        border-radius: 10px;
                        padding: 0 20px;
                        height: 455px;
                        
                        .title{
                              display: flex;
                              align-items: center;
                              padding: 10px 0;
                              .user-img{
                                    border: 1px solid #ccc;
                              }
                              span{
                                    font-size: 14px;
                                    color: #333;
                                    margin-right: 5px
                              }
                        }
                        .content{
                              position: relative;
                              
                              padding: 20px 0;
                              height: 230px;
                              border-bottom: 1px solid #ccc;
                              .my-charts{
                                    overflow: hidden;
                                    position: absolute;
                                    right: 0;
                                    top: 10px;
                              }
                        }
                        .footer{
                              padding: 10px 0;
                              p{
                                    margin: 3px;
                              }
                              
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
            .my-tables{
                  .table-footer{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        h6{
                              text-align: center;
                              width: 107px;
                             
                              margin: 0;
                        }
                        .total-price{
                              display: flex;
                              align-items: center;
                              span{
                                    width: 176px;
                                    text-align: left;
                                    
                              }
                        }
                        
                  }
            }
      }
}
</style>
<script>
import glTitle from '@/components/glTitle/glTitle'
const sourceData = [
  { item: '现金', count: 50 },
  { item: '实物', count: 50 },
]
const guideOpts = {
  type: 'text',
  position: [ '50%', '50%' ],
  content: '2400 万',
  style: {
    lineHeight: '240px',
    fontSize: '20',
    fill: '#FF0000',
    textAlign: 'center',
  },
};
const DataSet = require('@antv/data-set')
const dv = new DataSet.View().source(sourceData)

dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})

const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]
const pieData = dv.rows
const columns = [{
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
const data = [{
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
export default {
      components:{
            glTitle
      },
      data(){
            return{
                  btnShow: -1,
                  current: 1,
                  data,
                  columns,
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
                  dataSource:[
                        {
                              title: '李宁体育用品有限公司',
                              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                              content: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
                        },
                        {
                              title: '李宁体育用品有限公司',
                              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                              content: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
                        },
                        {
                              title: '李宁体育用品有限公司',
                              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                              content: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
                        }
                  ],
                  pieData,
                  sourceData,
                  pieScale,
                  c:["item", ["#FBD437","#F2637B",]],
                  pieStyle: {
                        stroke: '#fff',
                        lineWidth: 1
                  },
                  itemTpl: (value, color, checked, index) => {
                        const obj = dv.rows[index];
                        checked = checked ? 'checked' : 'unChecked';
                        return '<tr class="g2-legend-list-item item-' + index + ' ' + checked +
                              '" data-value="' + value + '" data-color=' + color +
                              ' style="cursor: pointer;font-size: 14px;">' +
                              '<td width=150 style="border: none;padding:0; color:{color};"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' + color + ';"></i>' +
                              '<span class="g2-legend-text">' + value + '</span></td>' +
                              '<td style="text-align: right;border: none;padding:0;">' + obj.count + '</td>' +
                              '</tr>';
                  },
                  guideOpts
                  
            }
      },
      methods:{
            
      }
}
</script>
