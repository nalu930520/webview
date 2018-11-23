<template>
  <div class="game-index">
    <div class="content">
      <Box fcolor="#FFE91F" bcolor="#fff" type="title" :icon="true">
        {{$t('lang.gg_homePage_view_title_gameNumber', {0: gameInfo.name})}}
      </Box>
      <Box fcolor="#FFE91F" bcolor="#fff" type="box" :icon="false" class="rule">
         <router-link tag='div' to="/gameRule/1">
          {{$t("lang.gg_button_rules_1")}}
          <br>
          {{$t("lang.gg_button_rules_2")}}
         </router-link>
      </Box>
      <Box fcolor="#FFE91F" bcolor="#fff" type="box" :icon="false" class="notice-bar">
        <van-notice-bar
          :text="scrollContent"
          :left-icon="BroadcastIcon"
          color="#000"
          background="#fff"
        />
      </Box>
      <Box fcolor="#FFE91F" bcolor="#fff" type="box" :icon="true" class="chart-box">
        <div class="chart">
          <p style="textAlign: left">{{$t('lang.gg_homePage_view_presentPrice')}} [BTC/USDT]</p>
          <van-row>
            <van-col span="12" style="textAlign: left"><h1>{{lastPirce | formatAmount}}</h1></van-col>
            <van-col span="12" style="textAlign: right"><p>{{$t('lang.gg_homePage_view_beginPrice')}}</p><p>{{gameInfo.opening_price | formatUSDAmount}}</p></van-col>
          </van-row>
          <Chart :plotLines="gameInfo.opening_price/100000000"></Chart>
        </div>
      </Box>
      <div class="bet-box" :disabled="remainType == 2">
        <Box fcolor="#38E6A8" bcolor="#fff" type="box" :icon="false" class="long">
          <div class="long-box" @click="openBetPopup(); betType = 1">
            <p>{{$t('lang.gg_homePage_button_guessUp')}}
            <br>1:{{longScale}}</p>
            <span>{{gameInfo.bet_rise_pools | formatBitsAmount}} bits</span>
          </div>
        </Box>
        <div class="time">
          {{remainTime}}
          <br>{{remainType === 1 ? $t('lang.gg_homePage_view_betCountDown'):$t('lang.gg_homePage_view_lotteryCountDown')}}
          <div class="bar">
            <div class="long-bar" :style="{width: 1/longScale*100+'%'}">
            </div>
            <div class="short-bar" :style="{width: 1/shortScale*100+'%'}">
            </div>
          </div>
        </div>
        <Box fcolor="#FD5B76" bcolor="#fff" type="box" :icon="false" direction="right" class="short">
          <div class="short-box" @click="openBetPopup(); betType = 2">
            <p>{{$t('lang.gg_homePage_button_guessDown')}}
            <br>1:{{shortScale}}</p>
            <span>{{gameInfo.bonus_pools - gameInfo.bet_rise_pools | formatBitsAmount}} bits</span>
          </div>
        </Box>
      </div>
      <div v-if="!showFooter" class="register_btn">
        <Box fcolor="#FFE91F" bcolor="#fff" type="btn" class="sign-w">
          <a :href="url">
            {{$t("lang.gg_sharePage_button_register")}}
          </a>
        </Box>
      </div>
    </div>
    <Footer v-if="showFooter"></Footer>
    <BetKeyboardPopup ref="betPopup" :show="show" :type="betType" @close="show = false" @openConfirmPopup="openConfirmPopup" @getChosenCouponId="getChosenCouponId"/>
    <ConfirmPopup :show="showConfirmPopup" @close="showConfirmPopup = false" :amount="actualAmount" @handleSubmit="onSubmit"></ConfirmPopup>
    <BetResultPopup :show="showBetResultPopup" :amount="amount" :type="betType" @close="showBetResultPopup = false"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Chart from '@/components/Chart'
import Box from '@/components/Box'
import ConfirmPopup from '@/components/confirmPopup'
import store from 'store'
import { Row, Col, NoticeBar, Popup, Picker, Toast } from 'vant'
import BetKeyboardPopup from '@/components/betKeyboardPopup'
import BetResultPopup from '@/components/betResultPopup'
import Footer from '@/components/footer'
import native from '@/utils/native'
import { registerURL } from '@/utils/config'
import broadcastIcon from '@/assets/icon_broadcast.png'
import { queryKChartData, queryCoinBaseTrades, participateBet, queryScrollContent } from '@/service'
Vue.use(Row).use(Col).use(NoticeBar).use(Popup).use(Picker).use(Toast);

export default {
  data() {
    return {
      show: false,
      betType: 1,
      amount: 0,
      actualAmount: 0,
      showConfirmPopup: false,
      showBetResultPopup: false,
      lastPirce: 0,
      klineData: [],
      choosen_coupon_id: '',
      scrollList: [],
      showFooter: true,
      url: registerURL,
      BroadcastIcon: broadcastIcon,
      interval1: '',
      interval2: '',
    }
  },
  components: {
    Chart,
    Box,
    BetKeyboardPopup,
    ConfirmPopup,
    BetResultPopup,
    Footer
  },
  computed: mapState({
    gameInfo: state => state.gameInfo,
    remainTime: state => state.remainTime,
    remainSeconds: state => state.remainSeconds,
    remainType: state => state.remainType,
    customerId: state => state.customerId,
    longScale(state) {
      if( !state.gameInfo ){
        return '-'
      }
      if( state.gameInfo.bonus_pools == 0 || state.gameInfo.bet_rise_pools == 0 ) return 0
      return (state.gameInfo.bonus_pools / state.gameInfo.bet_rise_pools).toFixed(2)
    },
    shortScale(state) {
      if( !state.gameInfo ){
        return '-'
      }
      if( state.gameInfo.bonus_pools == 0 || state.gameInfo.bonus_pools - state.gameInfo.bet_rise_pools === 0 ) return 0
      return (state.gameInfo.bonus_pools / (state.gameInfo.bonus_pools - state.gameInfo.bet_rise_pools)).toFixed(2)
    },
    scrollContent() {
      let txt = ''
      this.scrollList.forEach((value)=> {
        txt = txt + this.$t('lang.gg_homePage_view_marquee_1', {0: value.mobile, 1: this.$options.filters.formatBitsAmount(value.bet_amount), 2: value.side === 1 ? this.$t('lang.gg_status_1'):this.$t('lang.gg_status_2')})
      })
      return txt
    }
  }),
  watch: {
    remainSeconds(curVal){
      if(curVal <= 0) {
        this.$store.dispatch('fetchRemainTime')
      }
    },
  },
  created() {
    this.$store.dispatch('fetchGameInfo')
    this.$store.dispatch('fetchRemainTime')
    if(!native){
      this.showFooter = false
    } else {
      this.$store.dispatch('fetchCustomerId')
        .then(data => {
          window.MtaH5.clickStat('login',{'userid': data})
        })
    }
    if (this.$route.query.invite_code){
      this.url = `${this.url}?invite_code=${this.$route.query.invite_code}`
    }
    this.fetchCoinBaseTrades()
    this.interval1 = setInterval(() => {
      this.fetchCoinBaseTrades()
      this.$store.dispatch('fetchGameInfo')
    }, 20000)
    this.fetchScrollCotent()
    this.interval2 = setInterval(() => {
      this.fetchScrollCotent()
    }, 1000*60)
  },
  destroyed() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  },
  methods: {
    async fetchCoinBaseTrades() {
      queryCoinBaseTrades().then(response => {
        this.lastPirce = response[0].price
      })
    },
    async fetchScrollCotent() {
      queryScrollContent().then(response => {
        if ( response.ret === 1 ) {
          this.scrollList = response.data.list
        }
      })
    },
    getChosenCouponId(coupon_id) {
      this.choosen_coupon_id = coupon_id
    },
    openBetPopup() {
      if(this.remainType === 1 && this.showFooter){
        this.show = true
      }
    },
    openConfirmPopup(amount, actualAmount) {
      this.showConfirmPopup = true
      this.amount = amount
      this.actualAmount = actualAmount
    },
    onSubmit() {
      const formData = new FormData()
      formData.append("game_id", this.gameInfo.id)
      formData.append("side", this.betType)
      formData.append("bet_amount", this.amount*100)
      if(this.choosen_coupon_id){
        formData.append("voucher_id", this.choosen_coupon_id)
      }
      participateBet(formData).then(response => {
        if(response.ret === 1) {
          this.showBetResultPopup = true
          this.$store.dispatch('fetchGameInfo')
          this.$refs.betPopup.resetForm()
          this.$refs.betPopup.getValidCoupon()
        }else{
          Toast.fail(response.error)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less">
.register_btn{
  margin-top: 30px;
  a{
    color: #000;
    display: block;
  }
}
.van-key--delete{
  font-size: 0!important;
}
.van-notice-bar{
  padding: 0!important;
  font-size: 12px;
  border-radius: 4px;
  overflow: hidden;
  .van-notice-bar__left-icon{
    background-color: #FFE91F;
    height: 100%;
    padding: 5px;
    width: 28px;
    display: inline-block;
    position: relative;
    border-right: 2px solid #000;
    img{
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  .van-notice-bar__wrap{
    padding: 5px;
  }
}
</style>
