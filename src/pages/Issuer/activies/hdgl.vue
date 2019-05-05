<template>
      <div id="hdgl">
            <div class="header" style="margin-bottom: 24px;">
                  <a-button type="primary" class="item-input" @click="$router.push({name: 'cjhd'})">创建活动</a-button>
                  <a-date-picker class="item-input"/>
                  <a-select value="1" placeholder="全国" style="width: 174px;" class="item-input">
                        <a-select-option value="1">全国</a-select-option>
                  </a-select>
                  <a-select value="1" placeholder="活动类型" style="width: 174px;" class="item-input">
                        <a-select-option value="1">活动类型</a-select-option>
                  </a-select>
                  
                  <a-input-search placeholder="请输入中文活动名称" @search="onSearch" enterButton="搜索" style="width: 350px;" class="item-input"/>
            </div>
            <div class="main">
                <div class="show-item">
                    <a-col :span="11" class="my-item">
                        <div class="ibox float-e-margins">
                            <div class="ibox-content">
                                <div class="first-row">
                                    <h2 class="ant-col-16 title">
                                        This is standard IN+ Panel This is standard IN+ Panel
                                    </h2>
                                    <h2 class="ant-col-5 my-text">
                                        $47.9 <span>万</span>
                                    </h2>
                                    <h2 class="ant-col-5 my-text">
                                        9 <span>位</span>
                                    </h2>    
                                </div>
                                <div class="second-row">
                                    <span class="ant-col-16">开始时间：2019-01-01 20:00:00</span>
                                    <span class="ant-col-5">已赞助</span>
                                    <span class="ant-col-5">参与明星</span>
                                </div>
                                <div class="third-row">
                                    <span class="col-lg-12"><a-icon type="environment"/>吉林省 长春市 长春市南关区卫星广场明珠花园</span>
                                </div>
                                
                            </div>
                            <div class="ibox-footer">
                                <div class="button-box">
                                    <a-button ghost class="btn-success" @click="$router.push({name:'details'})"> &nbsp;&nbsp; 查 看 &nbsp;&nbsp; </a-button>
                                    <div>
                                          <a-button ghost class="btn-primary" @click="$router.push({name: 'zzgl'})"> 赞助审批 </a-button>
                                          <a-button ghost class="btn-info" @click="$router.push({name: 'mxgl'})"> 明星审批 </a-button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="11" class="my-item">
                        <div class="ibox float-e-margins">
                            <div class="ibox-content">
                                <div class="first-row">
                                    <h2 class="ant-col-16 title">
                                        This is standard IN+ Panel This is standard IN+ Panel
                                    </h2>
                                    <h2 class="ant-col-5 my-text">
                                        $47.9 <span>万</span>
                                    </h2>
                                    <h2 class="ant-col-5 my-text">
                                        9 <span>位</span>
                                    </h2>    
                                </div>
                                <div class="second-row">
                                    <span class="ant-col-16">开始时间：2019-01-01 20:00:00</span>
                                    <span class="ant-col-5">已赞助</span>
                                    <span class="ant-col-5">参与明星</span>
                                </div>
                                <div class="third-row">
                                    <span class="col-lg-12"><a-icon type="environment"/>吉林省 长春市 长春市南关区卫星广场明珠花园</span>
                                </div>
                                
                            </div>
                            <div class="ibox-footer">
                                <div class="button-box">
                                    <a-button ghost class="btn-success" @click="$router.push({name:'details'})"> &nbsp;&nbsp; 查 看 &nbsp;&nbsp; </a-button>
                                    
                                    
                                </div>
                                
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="11" class="my-item">
                        <div class="ibox float-e-margins">
                            <div class="ibox-content">
                                <div class="first-row">
                                    <h2 class="ant-col-16 title">
                                        This is standard IN+ Panel This is standard IN+ Panel
                                    </h2>
                                    <h2 class="ant-col-5 my-text">
                                        $47.9 <span>万</span>
                                    </h2>
                                    <h2 class="ant-col-5 my-text">
                                        9 <span>位</span>
                                    </h2>    
                                </div>
                                <div class="second-row">
                                    <span class="ant-col-16">开始时间：2019-01-01 20:00:00</span>
                                    <span class="ant-col-5">已赞助</span>
                                    <span class="ant-col-5">参与明星</span>
                                </div>
                                <div class="third-row">
                                    <span class="col-lg-12"><a-icon type="environment"/>吉林省 长春市 长春市南关区卫星广场明珠花园</span>
                                </div>
                                
                            </div>
                            <div class="ibox-footer">
                                <div class="button-box">
                                    <a-button ghost class="btn-success" @click="$router.push({name:'details'})"> &nbsp;&nbsp; 查 看 &nbsp;&nbsp; </a-button>
                                    <div>
                                          <a-button ghost class="btn-warning" @click="$router.push({name: 'cjhd'})">&nbsp;&nbsp; 修 改 &nbsp;&nbsp;</a-button>
                                          <a-button ghost class="btn-danger" @click="showDeleteConfirm"> &nbsp;&nbsp; 删 除 &nbsp;&nbsp; </a-button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </a-col>
                </div>
                <div class="hide-item" v-if="false">
                    <a-col :span="8">
                        <a-card title="" :bordered="false" :body-style="{padding: 20}">
                            <div class="item-group">
                            <h6>Ready to publish your Campaign</h6>
                            <p>Upgrade now to make your campaign public and start receiving application.</p>
                            <a-button type="primary" @click="$router.push({name: 'cjhd'})">发布活动</a-button>
                            </div>
                        </a-card>
                    </a-col>
                </div>
            </div>   
      </div>
      
</template>
<script>
export default {
        methods: {
            onSearch (value) {
            console.log(value)
        },
        showDeleteConfirm() {
            this.$confirm({
                title: 'Are you sure delete this task?',
                content: 'Some descriptions',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    console.log('OK');
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        },
    },
}
</script>
<style lang="less" scoped>
#hdgl{
    .header{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 20px;
        .item-input{
                margin: 0 10px;
        }
    }
    .main{
        .show-item{
            display: flex;
            justify-content: space-between;
            padding: 20px 30px;
            flex-wrap: wrap;
            .my-item{   
                border: 1px solid #ccc;
                margin: 20px;
                background-color: #fff;
                border-radius: 5px;
                .ibox{
                    margin: 0;
                    .ibox-content{
                            padding: 20px;
                    }
                    .ibox-footer{       
                            padding: 10px;
                            border-top: 1px solid #ccc;
                            .btn-success{
                                border-color:#52C41A;
                                background-color: #52C41A !important;
                                color:#fff;
                            }
                            .btn-primary{
                                border-color:#23C6C8;
                                background-color: #23C6C8 !important;
                                color:#fff;
                            }
                            .btn-info{
                                border-color:#FE980E;
                                background-color: #FE980E !important;
                                color:#fff;
                            }
                            .btn-danger{
                                color: #fff;
                                border-color: #FE0302;
                                background-color: #FE0302 !important;
                            }
                            .btn-warning{
                                color: #fff;
                                border-color: #FE980E;
                                background-color: #FE980E !important;
                            }
                    }
                    
                } 
                .first-row{
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    .title{
                        font-size: 20px;
                        font-weight: bold;
                        color: #21C5C7;
                        padding-right: 40px;
                    }
                    .my-text{
                        color: #333;
                        font-size: 26px;
                        font-weight: normal;
                        display: flex;
                        align-items: baseline;
                        span{
                            font-size: 14px;
                            margin-left: 5px;
                            font-weight: normal;
                        }
                    }
                }
                .second-row{
                    display: flex;
                    span{
                        font-size: 14px;
                        color: #999;
                    }
                }
                .third-row{
                    display: flex;
                    margin-top: 20px;
                    span{
                        font-size: 14px;
                        color: #999;
                        i{
                            font-size: 18px;
                            margin-right: 10px;
                        }
                    }
                
                }
                .button-box{
                    display: flex;
                    justify-content: space-between;
                    button{
                        margin: 0 5px;
                    }
                }
            }
        }
        .hide-item{
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 100px;
            .item-group {
                text-align: center;
                h6{
                    font-size: 20px;
                    color: #666;
                    text-align: center;
                }   
                a {
                    color: rgba(0, 0, 0, 0.65);
                    display: inline-block;
                    font-size: 14px;
                    margin-bottom: 13px;
                    width: 25%;
                }
            }
        }
    }    
}
      
</style>
