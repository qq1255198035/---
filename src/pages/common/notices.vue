<template>
  <div id="notices">
    <page-header :title="pageTitle">
      <div slot="pageMenu">
        <div class="page-menu-search">
          <a-input-search
            style="width: 80%; max-width: 522px;"
            :placeholder="$t('issuer.notices.pleaseEnter')"
            size="large"
            :enterButton="$t('issuer.hdgl.searchs')"
            @search="onSearch"
          />
        </div>
      </div>
    </page-header>
    <div class="content">
      <a-locale-provider :locale="locale">
      <a-card style="margin-top: 24px;" :bordered="false">
        <a-list
          size="large"
          rowKey="id"
          :loading="loading"
          itemLayout="vertical"
          :dataSource="data"
        >
          <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
            <a-list-item-meta>
              <span slot="title">{{ item.title }}</span>
            </a-list-item-meta>
            <article-list-content :description="item.content" :updateAt="item.createtime" />
          </a-list-item>
          <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
            <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable">{{$t('issuer.hdgl.loadMore')}}</a-button>
          </div>
        </a-list>
      </a-card>
      </a-locale-provider>
    </div>
  </div>
</template>
<style lang="less" scoped>
#notices {
  .page-menu-search {
    display: flex;
    justify-content: flex-start;
    padding: 50px 0;
  }
}
</style>
<script>
import { mixinsTitle } from '@/utils/mixin.js'
import { ArticleListContent } from '@/components'
import { infoList } from '@/api/common'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
export default {
  mixins: [mixinsTitle],
  components: {
    ArticleListContent
  },
  data() {
    return {
      locale: lang[localStorage.getItem('lang')],
      loading: true,
      loadingMore: false,
      data: [],
      offset: 1,
      btnDsiable: false,
      pages: 0
    }
  },
  methods: {
    getInfoList(key, offset) {
      infoList(key, offset).then(res => {
        if (res.code == 1000) {
          let page = parseInt(this.pages)
          this.data = res.page.rows
          this.pages = res.page.pages
          this.loading = false
        }
      })
    },
    loadMore() {
      this.offset++
      this.loadingMore = true
      this.loading = true

      infoList('', this.offset).then(res => {
        if (res.code == 1000) {
          let page = parseInt(this.pages)
          if (res.page.offset > page) {
            this.btnDsiable = true
            this.$message.warning(this.$t('issuer.hdgl.allLoaded'))
            this.loadingMore = false
            this.loading = false
            return
          }
          this.data = this.data.concat(res.page.rows)
          this.loading = false
          this.loadingMore = false
          this.pages = res.page.pages
          this.loading = false
        }
      })
    },
    onSearch(value) {
      this.getInfoList(value, 1)
    }
  },
  mounted() {
    this.getInfoList('', this.offset)
    
  },
  updated() {}
}
</script>
