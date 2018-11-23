<template>
  <div>
    <div class="rule-container">
      <div>
        <p v-if="$i18n.locale === 'cn'">
          <span v-if="tab === 1">
            {{$t('lang.gg_listRewardRules_view_rules_special_1')}}
          </span>
          <span v-if="tab === 2">
            {{$t('lang.gg_listRewardRules_view_rules_special_2')}}
          </span>
          <span v-if="tab === 3">
            {{$t('lang.gg_listRewardRules_view_rules_special_3')}}
          </span>
        </p>
        <p v-if="tab === 1">
          {{$t('lang.gg_listRewardRules_view_rules_2')}}
          {{$t('lang.gg_listRewardRules_view_rules_3')}}
          {{$t('lang.gg_listRewardRules_view_rules_4')}}
          {{$t('lang.gg_listRewardRules_view_rules_5')}}
        </p>
        <p v-if="tab === 2">
          {{$t('lang.gg_listRewardRules_view_rules_7')}}
          {{$t('lang.gg_listRewardRules_view_rules_3')}}
          {{$t('lang.gg_listRewardRules_view_rules_4')}}
          {{$t('lang.gg_listRewardRules_view_rules_5')}}
        </p>
        <p v-if="tab === 3">
          {{$t('lang.gg_listRewardRules_view_rules_9')}}
        </p>
        <p>
          {{$t('lang.gg_listRewardRules_view_rules_10')}}
        </p>
      </div>
    </div>
    <template v-if="list && list.length">
      <div class="list-group" v-for="(item, index) in list" :key="index">
        <van-row class="list-item">
          <van-col span="3">
            <span class="item-rank" :class="[index < 3 ? 'item-rank-high-color' : '','item-rank']">{{index + 1 | formatGameId}}</span>
          </van-col>
          <van-col span="6">
            <div>{{item.mobile}}</div>
          </van-col>
          <van-col span="15" class="item-right-box">
            <div v-if="tab === 1">
              <i18n path="lang.gg_list_view_earnings" tag="p" >
                <span place="0" style="color: rgb(249, 23, 55)">{{item.reward | formatBitsAmount}}</span>
              </i18n>
            </div>
            <div v-if="tab === 2">
              <i18n path="lang.gg_list_view_wins" tag="p" >
                <span place="0" style="color: rgb(249, 23, 55)">{{item.winner}}</span>
              </i18n>
            </div>
            <div v-if="tab === 3">
              <i18n path="lang.gg_list_view_popularity" tag="p" >
                <span place="0" style="color: rgb(249, 23, 55)">{{item.invite_num}}</span>
              </i18n>
            </div>
          </van-col>
        </van-row>
      </div>
    </template>
    <template v-else>
      <div class="list-no-data">
        <NoDataBox :name="$t('lang.gg_list_view_noList')"/>
      </div>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col } from 'vant'
import NoDataBox from '@/components/NoDataBox'

Vue.use(Row).use(Col)
export default {
  name: 'rankList',
  props:['list', 'tab'],
  components: {
    NoDataBox
  }
}
</script>

<style rel="stylesheet/less" lang="less">
@import './index.less';
</style>
