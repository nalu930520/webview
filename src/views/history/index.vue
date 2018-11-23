<template>
  <div class="container">
    <div class="rank-title">
      <Box fcolor="rgb(255, 233, 31)" bcolor="rgb(255, 255, 255)" type="title" icon="true">
        {{$t('lang.gg_myHistory_title_myHistory')}}
      </Box>
    </div>
    <div class="rank-list">
      <Box type="box" fcolor="rgb(255, 255, 255)" bcolor="rgb(255, 233, 31)">
        <template v-if="list && list.length">
          <div class="list-contain" ref="wrapper">
            <HistoryList :list="list" />
          </div>
        </template>
        <template v-else>
          <div class="list-no-data">
            <NoDataBox :name="$t('lang.gg_gameHistory_view_noHistory')"/>
          </div>
        </template>
      </Box>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Box from '@/components/Box'
import HistoryList from '@/components/HistoryList'
import NoDataBox from '@/components/NoDataBox'
import { queryUserHistoryList } from '@/service'
import BScroll from 'better-scroll';

export default {
  data() {
    return {
      page: 1,
      loading: false,
      endPage: false,
      list: []
    }
  },
  components: {
    Box,
    HistoryList,
    NoDataBox
  },
  mounted() {
    this.loadHistoryData()
  },
  methods: {
    loadHistoryData() {
      this.loading = true
      queryUserHistoryList({ page: this.page, per_page: 10}).then(
        response => {
          if (response.ret === 1) {
            if (response.data.list.length === 0) {
              this.endPage = true
            }
            this.list = this.list.concat(response.data.list)
            this.loading = false
            this.$nextTick(() => {
              if (!this.scroll) {
                const wrap = this.$refs.wrapper;
                this.scroll = new BScroll(wrap, {});
                this.scroll.on('touchEnd', (pos) => {
                  if (pos.y > 50) {
                    this.page = 1
                    this.loadHistoryData()
                  }
                })
              } else {
                this.scroll.refresh()
              }
              this.scroll.on('scrollEnd', () => {
                if (this.scroll.y <= (this.scroll.maxScrollY + 50) && !this.loading && !this.endPage) {
                  this.page ++
                  this.loadHistoryData()
                }
              })
            });
          } else {
            this.$toast(response.error)
          }
        }
      )
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.container {
  padding: 10px 20px 20px 12px;
}
.rank-title {
  width: 180px;
  margin: 0 auto;
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 15px;
}
.list-contain {
  height: ~"calc(100vh - 100px)";
  overflow: hidden;
  width: 336px;
}
.list-no-data {
  height: ~"calc(100vh - 100px)";
  width: 320px;
  margin: 0 8px;
  position: relative;
  top: 200px;
}
</style>
