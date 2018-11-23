<template>
  <div class="gameRecord">
  <Box fcolor="#FFE91F" bcolor="#fff" type="title" :icon="true">
    {{$t('lang.gg_gameHistory_title')}}
  </Box>
    <div class="recordContent" ref="wraper">
      <div v-if="!noData">
        <RecordItem
          v-for="(item, index) in RecordList"
          :key="index"
          :recordDetail="item"
        />
      </div>
      <div class="no-data-wraper" v-else>
        <NoDataBox :name="$t('lang.gg_gameHistory_view_noHistory')"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Box from '@/components/Box'
import { queryGameHistory } from '@/service/index'
import NoDataBox from '@/components/NoDataBox'
import RecordItem from './RecordItem'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      RecordList: [],
      scroll_id: null,
      per_page: 5,
      noData: false,
      isLoading: false,
    }
  },
  components: {
    Box,
    RecordItem,
    NoDataBox,
  },
  async created() {
    const changeData = await this.fetchData(null, this.per_page);
    if (changeData) {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wraper, {
            pullUpLoad: {
              threshold: 50
            }
          })
        } else {
          this.scroll.refresh()
        }
        this.scroll.on('pullingUp', () => {
          this.fetchData(this.scroll_id, this.per_page)
            .then(data => {
              if (data) {
                this.scroll.finishPullUp()
                this.scroll.refresh()
              }
            })
        })
      })
    }
  },
  methods: {
    async fetchData(scroll_id, per_page) {
      const ResQueryGameHistory = await queryGameHistory({scroll_id: this.scroll_id, per_page});
      if (ResQueryGameHistory.ret === 1) {
        this.RecordList = this.RecordList.concat(ResQueryGameHistory.data.list)
        if (!this.RecordList.length) {
          this.noData = true
        }
        this.scroll_id = this.RecordList[this.RecordList.length - 1].id;
      }
      return true
    }
  }
}
</script>

<style scoped lang="less">
@gray: #D8D8D8;
@green: #38E6A8;
@red: #FD5B76;

.gameRecord {
  padding-top: 10px;
  padding-bottom: 20px;
  .recordContent {
    overflow: hidden;
    margin-top: 15px;
    height: ~"calc(100vh - 10px - 44px - 15px - 5px)";
  }
  .no-data-wraper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
