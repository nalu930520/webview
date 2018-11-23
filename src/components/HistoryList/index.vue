<template lang="html">
  <div>
    <div class="list-group" v-for="(item, index) in list" :key="index">
      <van-row class="list-item">
        <van-col span="4">
          <i18n path="lang.gg_gameHistory_view_gameNumber" tag="div" >
            <span place="0">{{item.game_name | formatGameId}}</span>
          </i18n>
        </van-col>
        <van-col span="9">
          <i18n :path="item.side === 1 ? 'lang.gg_myHistory_view_guessUpAmount': 'lang.gg_myHistory_view_guessDownAmount'" tag="span" >
            <span place="0">{{item.bet_amount / 100}}</span>
          </i18n>
        </van-col>
        <van-col span="4">
          <span :class="[statusColor[item.game_result], 'reault-icon']">{{$t(statusText[item.game_result])}}</span>
        </van-col>
        <van-col span="7" class="item-right-box">
          <div v-if="item.game_result === 1"><span class="high-color">+{{item.win_amount | formatBitsAmount}}</span>bits</div>
          <div v-if="item.game_result === 2 || item.game_result === 3"><span>{{item.win_amount | formatBitsAmount}}</span>bits</div>
          <div v-if="item.game_result === 4"> </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col } from 'vant'
Vue.use(Row).use(Col)

export default {
  name: 'historyList',
  props:['list'],
  data() {
    return {
      statusColor: {
        1: 'successColor',
        2: 'failColor',
        3: 'faltColor',
        4: 'pendingColor'
      },
      statusText: {
        1: 'lang.gg_myHistory_view_win',
        2: 'lang.gg_myHistory_view_lose',
        3: 'lang.gg_myHistory_view_tie',
        4: 'lang.gg_myHistory_view_wait'
      },
    }
  }
}
</script>

<style lang="less" scoped>
  @successColor: rgb(56, 230, 168);
  @failColor: rgb(253, 91, 118);
  @faltColor: rgb(216, 216, 216);
  @black: rgb(0, 0, 0);
  @red: rgb(249, 23, 55);
  @yellow: rgb(255, 233, 31);
  .list-group {
    border-bottom: 1px dashed @black;
    margin: 0 auto;
    width: 93%;
    .list-item {
      height:22px;
      line-height:22px;
      padding: 16px 0;
      font-size: 14px;
      color: @black;
      text-align: left;
      word-spacing:0px;
      letter-spacing: -1px;
      .reault-icon {
        width: 50px;
        height: 22px;
        line-height: 18px;
        display: inline-block;
        box-sizing: border-box;
        border: 2px solid #000;
        border-radius: 12px;
        font-size: 12px;
        text-align: center;
      }
      .successColor {
        background-color: @successColor;
      }
      .failColor {
        background-color: @failColor;
      }
      .faltColor {
        background-color: @faltColor;
      }
      .pendingColor {
        background-color: @yellow;
      }
      .item-right-box {
        text-align: right;
        div {
          span {
            color: @black;
            padding: 0 4px;
          }
          .high-color {
            color: @red;
          }
        }
      }
    }
  }
  .list-group:last-child{
    border: none;
  }
</style>
