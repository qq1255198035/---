<template>
      <div id="cjhd">
            <div class="cjhd-header">
                  <a-card title="活动进度">
                        <div class="secetion">
                              <a-steps :current="0">
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
            <div class="cjhd-content">
                  <a-list
                        itemLayout="horizontal"
                        :dataSource="data"
                        >
                        <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
                              <a-list-item-meta>
                              <a slot="title">{{ item.title }}</a>
                              <span slot="description">
                              <span class="security-list-description">{{ item.description }}</span>
                              <span v-if="item.value"> : </span>
                              <span class="security-list-value">{{ item.value }}</span>
                              </span>
                              </a-list-item-meta>
                              <template v-if="item.actions">
                              <a slot="actions" @click="showModal(index,item)">{{ item.actions.title }}</a>
                              </template>
                        </a-list-item>
                  </a-list>
                  <a-modal
                        :title="title"
                        :visible="visible"
                        @ok="handleOk"
                        :confirmLoading="confirmLoading"
                        @cancel="handleCancel"
                        :width="1040"
                        wrapClassName="info-box"
                        :getContainer="getContainer"
                  >    
                        <a-form layout="horizontal">
                              <div class="info-item" v-if="formShow == 0">
                                    <div class="left">
                                          <a-form-item label="中文名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                                <a-input placeholder="请输入中文名称" class="my-input"/>
                                          </a-form-item>
                                          <a-form-item label="英文名称" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                                <a-input placeholder="请输入英文名称" class="my-input"/>
                                          </a-form-item>
                                          <a-form-item label="选择日期" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                                <a-range-picker style="width: 100%;"/>
                                          </a-form-item>
                                          <a-form-item label="选择时间" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
                                                <a-time-picker/>
                                          </a-form-item>
                                          <a-form-item label="选择地点" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
                                                <a-input-group compact style="width: 93%; margin-right: 8px">
                                                      <a-select defaultValue="Zhejiang" >
                                                            <a-select-option value="Zhejiang">Zhejiang</a-select-option>
                                                            <a-select-option value="Jiangsu">Jiangsu</a-select-option>
                                                      </a-select>
                                                      <a-input style="width: 70%" defaultValue="Xihu District, Hangzhou"/>
                                                </a-input-group>
                                          </a-form-item>
                                          <a-form-item
                                                v-for="(k, index) in form.getFieldValue('keys')"
                                                :key="k"
                                                v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
                                                :required="false" 
                                                
                                          >
                                                
                                                <a-input-group compact style="width: 93%; margin-right: 8px">
                                                      <a-select defaultValue="Zhejiang" >
                                                            <a-select-option value="Zhejiang">Zhejiang</a-select-option>
                                                            <a-select-option value="Jiangsu">Jiangsu</a-select-option>
                                                      </a-select>
                                                      <a-input style="width: 70%" defaultValue="Xihu District, Hangzhou"/>
                                                </a-input-group>
                                                <a-icon
                                                v-if="form.getFieldValue('keys').length > 1"
                                                class="dynamic-delete-button"
                                                type="minus-circle-o"
                                                :disabled="form.getFieldValue('keys').length === 1"
                                                @click="() => remove(k)"
                                                
                                                />
                                          </a-form-item>
                                          <a-form-item v-bind="formItemLayoutWithOutLabel">
                                                <a-button
                                                type="dashed"
                                                style="width: 100%"
                                                @click="add"
                                                >
                                                <a-icon type="plus" /> 添加
                                                </a-button>
                                          </a-form-item>
                                          <a-form-item label="电子邮件" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                                <a-input placeholder="请输入电子邮件" class="my-input" type="email"/>
                                          </a-form-item>
                                    
                                    </div>
                                    <div class="right">
                                          <a-form-item label="活动分类" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                                <a-select defaultValue="请选择" >
                                                      <a-select-option value="Zhejiang">Zhejiang</a-select-option>
                                                      <a-select-option value="Jiangsu">Jiangsu</a-select-option>
                                                </a-select>
                                          </a-form-item>
                                          <a-form-item label="参赛人数" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                                <a-input placeholder="请输入人数" class="my-input" type="number"/>
                                          </a-form-item>
                                          <a-form-item label="联系人" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                                <a-input placeholder="请输入名字" class="my-input"/>
                                          </a-form-item>
                                          <a-form-item label="联系电话" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                                <a-input-group>
                                                <a-col :span="8">
                                                      <a-input defaultValue="0571" />
                                                </a-col>
                                                <a-col :span="16">
                                                      <a-input defaultValue="26888888" />
                                                </a-col>
                                                </a-input-group>
                                          </a-form-item>
                                          <a-form-item label="上传封面" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                                <a-upload
                                                      name="avatar"
                                                      listType="picture-card"
                                                      class="avatar-uploader"
                                                      :showUploadList="false"
                                                      action="//jsonplaceholder.typicode.com/posts/"
                                                      :beforeUpload="beforeUpload"
                                                      @change="handleChange"
                                                      >
                                                      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                                      <div v-else>
                                                            <a-icon :type="loading ? 'loading' : 'plus'" />
                                                            <div class="ant-upload-text">上传</div>
                                                      </div>
                                                      </a-upload>
                                                      <span>建议尺寸 200 * 300</span>
                                          </a-form-item>
                                    </div>
                              </div>
                              <div class="info-item-column" v-if="formShow == 1">    
                                    <a-form-item label="活动内容" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-textarea placeholder="请输入中文名称" class="my-input" :autosize="{ minRows: 4, maxRows: 6 }"/>
                                    </a-form-item>
                                    <a-form-item label="上传视频" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-upload
                                                name="avatar"
                                                listType="picture-card"
                                                class="avatar-uploader"
                                                :showUploadList="false"
                                                action="//jsonplaceholder.typicode.com/posts/"
                                                :beforeUpload="beforeUpload"
                                                @change="handleChange"
                                                >
                                                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                                <div v-else>
                                                      <a-icon :type="loading ? 'loading' : 'plus'" />
                                                      <div class="ant-upload-text">上传</div>
                                                </div>
                                          </a-upload>
                                                
                                    </a-form-item>
                                    <a-form-item label="上传多张图片" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                          <a-upload
                                                action="//jsonplaceholder.typicode.com/posts/"
                                                listType="picture-card"
                                                :fileList="fileList"
                                                @preview="handlePreview"
                                                @change="handleChange1"
                                          >
                                                <div v-if="fileList.length < 3">
                                                <a-icon type="plus" />
                                                <div class="ant-upload-text">Upload</div>
                                                </div>
                                          </a-upload>
                                          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                                <img alt="example" style="width: 100%" :src="previewImage" />
                                          </a-modal>
                                          
                                    </a-form-item>
                                          
                              </div>
                              <div class="info-item" v-if="formShow == 2">
                                    <div class="left">
                                          <a-form-item label="主承办方" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}" class="my-form-item">
                                                <a-input-group compact style="width: 93%; margin-right: 8px">
                                                      <a-select defaultValue="主办方" >
                                                            <a-select-option value="主办方">主办方</a-select-option>
                                                            <a-select-option value="承办方">承办方</a-select-option>
                                                            <a-select-option value="协办方">协办方</a-select-option>
                                                      </a-select>
                                                      <a-input style="width: 70%" defaultValue="公司名称"/>
                                                </a-input-group>
                                          </a-form-item>
                                          <a-form-item
                                                v-for="(k, index) in form.getFieldValue('keys')"
                                                :key="k"
                                                v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
                                                :required="false" 
                                                class="my-form-item"
                                          >
                                                
                                                <a-input-group compact style="width: 93%; margin-right: 8px">
                                                      <a-select defaultValue="主办方" >
                                                            <a-select-option value="主办方">主办方</a-select-option>
                                                            <a-select-option value="承办方">承办方</a-select-option>
                                                            <a-select-option value="协办方">协办方</a-select-option>
                                                      </a-select>
                                                      <a-input style="width: 70%" defaultValue="公司名称"/>
                                                </a-input-group>
                                                <a-icon
                                                v-if="form.getFieldValue('keys').length > 1"
                                                class="dynamic-delete-button"
                                                type="minus-circle-o"
                                                :disabled="form.getFieldValue('keys').length === 1"
                                                @click="() => remove(k)"
                                                
                                                />
                                          </a-form-item>
                                          <a-form-item v-bind="formItemLayoutWithOutLabel">
                                                <a-button
                                                type="dashed"
                                                style="width: 100%"
                                                @click="add"
                                                >
                                                <a-icon type="plus" /> 添加
                                                </a-button>
                                          </a-form-item>
                                          <a-form-item label="播放平台" class="my-form-item" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                                                <a-input placeholder="请输入播放平台" class="my-input"/>
                                          </a-form-item>
                                          <a-form-item label="活动特点" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}" class="my-form-item">
                                                <div class="my-tag-box">
                                                      <span :style="{ marginRight: 8 }">活动级别 </span>
                                                      <div>
                                                            <a-checkable-tag
                                                                  v-for=" tag in tags"
                                                                  :key="tag"
                                                                  :checked="selectedTags.indexOf(tag) > -1"
                                                                  @change="(checked) => handleChange(tag, checked)"
                                                                  class="my-tag"
                                                            >
                                                            {{tag}}
                                                            </a-checkable-tag>
                                                      </div>
                                                </div>
                                                <div class="my-tag-box">
                                                      <span :style="{ marginRight: 8 }">适合企业 </span>
                                                      <div>
                                                            <a-checkable-tag
                                                                  v-for=" tag in tags1" 
                                                                  :key="tag"
                                                                  :checked="selectedTags.indexOf(tag) > -1"
                                                                  @change="(checked) => handleChange(tag, checked)"
                                                                  class="my-tag"
                                                            >
                                                            {{tag}}
                                                            </a-checkable-tag>
                                                      </div>
                                                </div>
                                                <div class="my-tag-box">
                                                      <span :style="{ marginRight: 8 }">覆盖范围 </span>
                                                      <div>
                                                            <a-checkable-tag
                                                                  :key="tag"
                                                                  v-for=" tag in tags2"
                                                                  :checked="selectedTags.indexOf(tag) > -1"
                                                                  @change="(checked) => handleChange(tag, checked)"
                                                                  class="my-tag"
                                                            >
                                                            {{tag}}
                                                            </a-checkable-tag>
                                                      </div>
                                                </div>
                                                <div class="my-tag-box">
                                                      <span :style="{ marginRight: 8 }">活动特点 </span>
                                                      <div>
                                                            <a-checkable-tag
                                                                  v-for=" tag in tags3"
                                                                  :key="tag"
                                                                  :checked="selectedTags.indexOf(tag) > -1"
                                                                  @change="(checked) => handleChange(tag, checked)"
                                                                  class="my-tag"
                                                            >
                                                            {{tag}}
                                                            </a-checkable-tag>
                                                      </div>
                                                </div>                       
                                          </a-form-item>
                                    </div>
                                    <div class="right">
                                          <a-form-item label="受众群众" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}" class="my-form-item">
                                                <div class="my-tag-box">
                                                      <span :style="{ marginRight: 8 }">年龄段 </span>
                                                      <div>
                                                            <a-checkable-tag
                                                                  v-for=" tag in tags4"
                                                                  :key="tag"
                                                                  :checked="selectedTags.indexOf(tag) > -1"
                                                                  @change="(checked) => handleChange(tag, checked)"
                                                                  class="my-tag"
                                                            >
                                                            {{tag}}
                                                            </a-checkable-tag>
                                                      </div>
                                                </div>
                                                <div class="my-tag-box">
                                                      <span :style="{ marginRight: 8 }">社会属性 </span>
                                                      <div>
                                                            <a-checkable-tag
                                                                  v-for=" tag in tags5" 
                                                                  :key="tag"
                                                                  :checked="selectedTags.indexOf(tag) > -1"
                                                                  @change="(checked) => handleChange(tag, checked)"
                                                                  class="my-tag"
                                                            >
                                                            {{tag}}
                                                            </a-checkable-tag>
                                                      </div>
                                                </div>
                                                <div class="my-tag-box">
                                                      <span :style="{ marginRight: 8 }">消费特征 </span>
                                                      <div>
                                                            <a-checkable-tag
                                                                  :key="tag"
                                                                  v-for=" tag in tags6"
                                                                  :checked="selectedTags.indexOf(tag) > -1"
                                                                  @change="(checked) => handleChange(tag, checked)"
                                                                  class="my-tag"
                                                            >
                                                            {{tag}}
                                                            </a-checkable-tag>
                                                      </div>
                                                </div>
                                                <div class="my-tag-box">
                                                      <span :style="{ marginRight: 8 }">职业特征 </span>
                                                      <div>
                                                            <a-checkable-tag
                                                                  v-for=" tag in tags7"
                                                                  :key="tag"
                                                                  :checked="selectedTags.indexOf(tag) > -1"
                                                                  @change="(checked) => handleChange(tag, checked)"
                                                                  class="my-tag"
                                                            >
                                                            {{tag}}
                                                            </a-checkable-tag>
                                                      </div>
                                                </div>
                                                <div class="my-tag-box">
                                                      <span :style="{ marginRight: 8 }">地域 </span>
                                                      <div>
                                                            <a-checkable-tag
                                                                  v-for=" tag in tags8"
                                                                  :key="tag"
                                                                  :checked="selectedTags.indexOf(tag) > -1"
                                                                  @change="(checked) => handleChange(tag, checked)"
                                                                  class="my-tag"
                                                            >
                                                            {{tag}}
                                                            </a-checkable-tag>
                                                      </div>
                                                </div>
                                                
                                          </a-form-item>
                                    </div>
                              </div>
                              <div class="info-item-column" v-if="formShow == 3">    
                                    <a-form-item label="招商截止日期" class="my-form-item" :wrapperCol="{span: 20, offset: 1}" :labelCol="{span: 3}">       
                                          <a-date-picker/>
                                    </a-form-item>
                                   <a-form-item label="赞助要求" class="my-form-item" :wrapperCol="{span: 20, offset: 1}" :labelCol="{span: 3}">       
                                          <a-table
                                                :columns="columns"
                                                :dataSource="dataTable"
                                                :pagination="false"
                                                :loading="memberLoading"
                                          >
                                          <template v-for="(col, i) in ['tgWay', 'zzWay', 'zzPrice','zzNum','isPrice','remarks']" :slot="col" slot-scope="text, record">
                                                <a-input
                                                      :key="col"
                                                      v-if="record.editable"
                                                      style="margin: -5px 0"
                                                      :value="text"
                                                      :placeholder="columns[i].title"
                                                      @change="e => handleChange2(e.target.value, record.key, col)"
                                                />
                                                <template v-else>{{ text }}</template>
                                          </template>
                                          <template slot="operation" slot-scope="text, record">
                                                <template v-if="record.editable">
                                                      <span v-if="record.isNew">
                                                      <a @click="saveRow(record)">添加</a>
                                                      <a-divider type="vertical" />
                                                      <a-popconfirm title="是否要删除此行？" @confirm="remove1(record.key)">
                                                      <a>删除</a>
                                                      </a-popconfirm>
                                                      </span>
                                                      <span v-else>
                                                      <a @click="saveRow(record)">保存</a>
                                                      <a-divider type="vertical" />
                                                      <a @click="cancel(record.key)">取消</a>
                                                      </span>
                                                </template>
                                                <span v-else>
                                                      <a @click="toggle(record.key)">编辑</a>
                                                      <a-divider type="vertical" />
                                                      <a-popconfirm title="是否要删除此行？" @confirm="remove1(record.key)">
                                                      <a>删除</a>
                                                      </a-popconfirm>
                                                </span>
                                          </template>
                                          </a-table>
                                          <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">新增成员</a-button>
                                    </a-form-item>      
                                    <a-form-item label="合作要求" class="my-form-item" :wrapperCol="{span: 20, offset: 1}" :labelCol="{span: 3}">       
                                          <a-textarea placeholder="请输入备注" class="my-input" :autosize="{ minRows: 4, maxRows: 6 }"/>
                                    </a-form-item>               
                              </div>
                        </a-form>
                  </a-modal>
            </div>
      </div>
</template>
<style lang="less" scoped>
#cjhd{
      padding: 20px 30px;
      .cjhd-content{
            margin-top: 20px;
            background-color: #fff;
            padding: 30px 50px;
            .info-box{
                  .info-item{
                        display: flex;
                        justify-content: space-between;
                        > div{
                              width: 49%;
                              .my-form-item{
                                    width: 100%;
                                    display: flex;
                                    .my-tag-box{
                                          display: flex;
                                          > span{
                                                margin-right: 10px;
                                                min-width: 56px;
                                                text-align: right;
                                          }
                                          .my-tag{
                                                border: 1px solid #ccc;
                                          }
                                    }
                                    
                                    .ant-form-item-control-wrapper{
                                          width: 90%;
                                    }
                                    .avatar-uploader{
                                          img{
                                                width: 128px;
                                                height: 128px;
                                          }
                                    }
                                    
                              }
                        }
                  }
            }
      }
}
</style>
<script>
let id = 0;
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
      data () {
            return {
                  visible: false,
                  confirmLoading: false,
                  formShow: -1,
                  title:'',
                  loading: false,
                  imageUrl: '',
                  previewVisible: false,
                  previewImage: '',
                  tags: ['业余赛', '职业赛', '顶级IP', '大众体育','校园赛','顶级联赛'],
                  tags1: ['传媒', '地产', '服装', '汽车','通讯','金融','快消', '零售', '运动装备', '广告公关','互联网IT'],
                  tags2: ['市级', '省级', '全国', '国内及国外'],
                  tags3: ['覆盖广', '奖金高', '历史悠久', '美女如云'],
                  tags4: ['0-10', '11-20'],
                  tags5: ['主妇', '外籍人士', '大学生', '公务员','精英','白领'],
                  tags6: ['追星', '夜生活', '发烧友', '个性'],
                  tags7: ['职业经理', '职员', '学生', '自由职业','老板'],
                  tags8: ['一线城市', '二线城市', '三线城市', '国际性都市'],
                  selectedTags: [],
                  fileList: [{
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                  }],
                  data: [
                        { title: '活动基本信息', description: '活动详细内容编辑', value: '', actions: { title: '修改'}},
                        { title: '活动详情', description: '设置活动详细信息以及推广内容设置', value: '', actions: { title: '修改'} },
                        { title: '活动推广', description: '把自己的活动推广到社交平台以及微媒平台上', value: '', actions: { title: '修改'} },
                        { title: '活动赞助', description: '把自己的活动赞助情况设置', value: '', actions: { title: '修改'} },
                        { title: '报名', description: '设置报名信息，用户分组/售票等设置', value: '', actions: { title: '修改' } }
                  ],
                  formItemLayout: {
                        labelCol: {
                               span: 4
                              
                        },
                        wrapperCol: {
                              span: 18, offset: 5
                              
                        },
                  },
                  formItemLayoutWithOutLabel: {
                        wrapperCol: {
                               span: 18, offset: 5
                               }
                             
                  },
                  memberLoading: false,
                  columns: [
                        {
                              title: '推广形式',
                              dataIndex: 'tgWay',
                              key: 'tgWay',
                              width: '15%',
                              scopedSlots: { customRender: 'tgWay' }
                        },
                        {
                              title: '赞助形式',
                              dataIndex: 'zzWay',
                              key: 'zzWay',
                              width: '15%',
                              scopedSlots: { customRender: 'zzWay' }
                        },
                        {
                              title: '赞助金额',
                              dataIndex: 'zzPrice',
                              key: 'zzPrice',
                              width: '15%',
                              scopedSlots: { customRender: 'zzPrice' }
                        },
                        {
                              title: '赞助名额',
                              dataIndex: 'zzNum',
                              key: 'zzNum',
                              width: '15%',
                              scopedSlots: { customRender: 'zzNum' }
                        },
                        {
                              title: '是否议价',
                              dataIndex: 'isPrice',
                              key: 'isPrice',
                              width: '15%',
                              scopedSlots: { customRender: 'isPrice' }
                        },
                        {
                              title: '备注',
                              dataIndex: 'remarks',
                              key: 'remarks',
                              width: '12%',
                              scopedSlots: { customRender: 'remarks' }
                        },
                        {
                              title: '操作',
                              key: 'action',
                              scopedSlots: { customRender: 'operation' }
                        }
                  ],
                  dataTable: [
                        {
                              key: '1',
                              tgWay: '冠名赞助',
                              zzWay: '现金+实物',
                              editable: false,
                              zzPrice: '67890',
                              zzNum: '2',
                              isPrice: '否',
                              remarks: '无'
                        },
                        {
                              key: '2',
                              tgWay: '冠名赞助',
                              zzWay: '现金+实物',
                              editable: false,
                              zzPrice: '67890',
                              zzNum: '2',
                              isPrice: '否',
                              remarks: '无'
                        },
                        {
                              key: '3',
                              tgWay: '冠名赞助',
                              zzWay: '现金+实物',
                              editable: false,
                              zzPrice: '67890',
                              zzNum: '2',
                              isPrice: '否',
                              remarks: '无'
                        },
                  ],
            }
      },
      methods:{  
            showModal(index,item) {
                  this.visible = true
                  this.title = item.title
                  this.formShow = index;
                  console.log(index)
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
            getContainer(){
                  return document.querySelector('.cjhd-content')
            },
             remove  (k) {
                  const { form } = this;
                  // can use data-binding to get
                  const keys = form.getFieldValue('keys');
                  // We need at least one passenger
                  if (keys.length === 1) {
                        return;
                  }
            // can use data-binding to set
                  form.setFieldsValue({
                        keys: keys.filter(key => key !== k),
                  });
            },
            add  () {
                  const { form } = this;
                  // can use data-binding to get
                  const keys = form.getFieldValue('keys');
                  const nextKeys = keys.concat(++id);
                  // can use data-binding to set
                  // important! notify form to detect changes
                  form.setFieldsValue({
                  keys: nextKeys,
                  });
            },
            handleChange (info) {
                  if (info.file.status === 'uploading') {
                  this.loading = true
                  return
                  }
                  if (info.file.status === 'done') {
                  // Get this url from response in real world.
                  getBase64(info.file.originFileObj, (imageUrl) => {
                  this.imageUrl = imageUrl
                  this.loading = false
                  })
                  }
            },
            beforeUpload (file) {
                  const isJPG = file.type === 'image/jpeg'
                  if (!isJPG) {
                  this.$message.error('You can only upload JPG file!')
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2
                  if (!isLt2M) {
                  this.$message.error('Image must smaller than 2MB!')
                  }
                  return isJPG && isLt2M
            },
            handleCancel1 () {
                  this.previewVisible = false
            },
            handlePreview (file) {
                  this.previewImage = file.url || file.thumbUrl
                  this.previewVisible = true
            },
            handleChange1 ({ fileList }) {
                  this.fileList = fileList
            },
            handleChange (tag, checked) {
                  const { selectedTags } = this
                  const nextSelectedTags = checked
                  ? [...selectedTags, tag]
                  : selectedTags.filter(t => t !== tag)
                  console.log('You are interested in: ', nextSelectedTags)
                  this.selectedTags = nextSelectedTags
            },
            newMember () {
                  const length = this.dataTable.length
                  this.dataTable.push({
                        key: length === 0 ? '1' : (parseInt(this.dataTable[length - 1].key) + 1).toString(),
                        tgWay: '',
                        zzWay: '',
                        zzPrice: '',
                        zzNum: '',
                        isPrice: '',
                        remarks: '',
                        editable: true,
                        isNew: true
                  })
            },
            saveRow (record) {
                  this.memberLoading = true
                  const { key, tgWay, zzWay, zzPrice, zzNum, isPrice,remarks} = record
                  if (!tgWay || !zzWay || !zzPrice || !zzNum || !isPrice) {
                  this.memberLoading = false
                  this.$message.error('请填写完整成员信息。')
                  return
                  }
                  // 模拟网络请求、卡顿 800ms
                  new Promise((resolve) => {
                  setTimeout(() => {
                  resolve({ loop: false })
                  }, 800)
                  }).then(() => {
                        const target = this.dataTable.filter(item => item.key === key)[0]
                        target.editable = false
                        target.isNew = false
                        this.memberLoading = false
                  })
            },
            remove1 (key) {
                  const newData = this.dataTable.filter(item => item.key !== key)
                  this.dataTable = newData
            },
            toggle (key) {
                  const target = this.dataTable.filter(item => item.key === key)[0]
                  target.editable = !target.editable
            },
            handleChange2 (value, key, column) {
                  const newData = [...this.dataTable]
                  const target = newData.filter(item => key === item.key)[0]
                  if (target) {
                  target[column] = value
                  this.dataTable = newData
                  }
            },
            getRowByKey (key, newData) {
                  const data = this.dataTable
                  return (newData || data).filter(item => item.key === key)[0]
            },
            cancel (key) {
                  const target = this.dataTable.filter(item => item.key === key)[0]
                  target.editable = false
            },
      },
      beforeCreate () {
            this.form = this.$form.createForm(this);
            this.form.getFieldDecorator('keys', { initialValue: [], preserve: true });
      },
}
</script>
