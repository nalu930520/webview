<template>
  <div class="container">
    <div class="rank-title">
      <Box fcolor="rgb(255, 233, 31)" bcolor="rgb(255, 255, 255)" type="title" icon="true">
        {{$t('lang.gg_list_title')}}
      </Box>
    </div>
    <div class="rank-list">
      <div class="list-top">
        <van-row>
          <van-col span="9">
            <Box :fcolor="currentTab === 1? highColor: bgColor" :bcolor="currentTab === 1? bgColor: lowColor" type="box" :class="currentTab === 1? 'mgTop0' :'mgTop10'">
              <div class="box-width" @click="switchTab(1)">{{$t('lang.gg_list_tab_earnings')}}</div>
            </Box>
            <div :class="[currentTab === 1? '' :'line-short', 'box-bottom-line']"></div>
          </van-col>
          <van-col span="7">
            <Box :fcolor="currentTab === 2? highColor: bgColor" :bcolor="currentTab === 2? bgColor: lowColor" type="box" :class="currentTab === 2? 'mgTop0' :'mgTop10'">
              <div class="box-width" @click="switchTab(2)">{{$t('lang.gg_list_tab_wins')}}</div>
            </Box>
            <div :class="[currentTab === 2? '' :'line-short', 'box-bottom-line']"></div>
          </van-col>
          <van-col span="8">
            <Box :fcolor="currentTab === 3? highColor: bgColor" :bcolor="currentTab === 3? bgColor: lowColor" type="box" :class="currentTab === 3? 'mgTop0' :'mgTop10'">
              <div class="box-width" @click="switchTab(3)">{{$t('lang.gg_list_tab_popularity')}}</div>
            </Box>
            <div :class="[currentTab === 3? '' :'line-short', 'box-bottom-line']"></div>
          </van-col>
        </van-row>
      </div>
      <div class="list-contain">
        <Box type="box" fcolor="rgb(255, 255, 255)" bcolor="rgb(126, 136, 184)">
          <div class="scroll-container">
            <div class="scroll" ref="wrapper1" v-show="currentTab === 1">
              <RankList :list="profitList" :tab="1" />
            </div>
            <div class="scroll" ref="wrapper2" v-show="currentTab === 2">
              <RankList :list="winList" :tab="2" />
            </div>
            <div class="scroll" ref="wrapper3"  v-show="currentTab === 3">
              <RankList :list="inviteList" :tab="3" />
            </div>
          </div>
        </Box>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup } from 'vant'
import Box from '@/components/Box'
import RankList from './rankList'
import BScroll from 'better-scroll';
import { queryProfitRank, queryWinnerRank, queryInviteRank } from '@/service'

Vue.use(Cell).use(CellGroup)
export default {
  data() {
    return {
      highColor: 'rgb(255, 233, 31)',
      lowColor: 'rgb(126, 136, 184)',
      bgColor: 'rgb(255, 255, 255)',
      currentTab: 1,
      profitList: [],
      winList: [],
      inviteList: []
    }
  },
  components: {
    Box,
    RankList
  },
  mounted() {
    this.queryProfit()
  },
  methods: {
    queryProfit() {
      queryProfitRank().then(
        response => {
          if (response.ret === 1) {
            this.profitList = response.data.list
            this.$nextTick(() => {
              const wrap1 = this.$refs.wrapper1;
              const scroll1 = new BScroll(wrap1, {
                  scrollY: true,
                  click: false,
              });
            });
          } else {
            this.$toast(response.error)
          }
        }
      )
    },
    switchTab(curTab) {
      this.currentTab = curTab
      if (curTab === 1) {
        this.queryProfit()
      } else if (curTab === 2) {
        queryWinnerRank().then(
          response => {
            if (response.ret === 1) {
              this.winList = response.data.list
              this.$nextTick(() => {
                const wrap2 = this.$refs.wrapper2;
                const scroll2 = new BScroll(wrap2, {
                    scrollY: true,
                    click: false,
                });
              });
            } else {
              this.$toast(response.error)
            }
          }
        )
      } else if (curTab === 3) {
        queryInviteRank().then(
          response => {
            if (response.ret === 1) {
              this.inviteList = response.data.list
              this.$nextTick(() => {
                const wrap3 = this.$refs.wrapper3;
                const scroll3 = new BScroll(wrap3, {
                    scrollY: true,
                    click: false,
                });
              });
            } else {
              this.$toast(response.error)
            }
          }
        )
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
@import './index.less';
</style>
