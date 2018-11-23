<template>
  <div class="game-index">
    <div class="content">
      <Box fcolor="#FFE91F" bcolor="#fff" type="title" :icon="true">
        {{$t("lang.gg_myProfile_title")}}
      </Box>
      <Box fcolor="#fff" bcolor="#FFE91F" type="box" :icon="false" class="user-message content-box-sign">
        <div class="content-box">
          <div class="user-message-img">
            <img :src="DefaultUserImg" alt="">
          </div>
          <van-row class="user-message-title" type="flex">
            <van-col span="7"></van-col>
            <van-col span="12" class="titlegb">{{userData.customer_name}}</van-col>
            <van-col span="6">
              <div class="footer-box-title">
                <router-link
                  @click.native="addMtAH5Event"
                  tag='div'
                  :to="{ name: 'gameShare', params: { type: 1 },query: { data: JSON.stringify(userData) }}"
                  class="footer-box-title-l"
                >
                  {{$t("lang.shareit")}}
                </router-link>
              </div>
            </van-col>
          </van-row>
          <div class="dividing-line"></div>
          <van-row type="flex" class="user-message-record">
            <van-col span="8" offset="1">
              <div class="tem-record">
                {{$t("lang.gg_myProfile_view_wins")}}
              </div>
              <div class="tem-record1">
                <span>{{userData.win_count}}</span><span>/{{userData.all_count}}</span>
              </div>
            </van-col>
            <van-col span="6">
              <div class="tem-record">
                {{$t("lang.gg_myProfile_view_winRate")}}
              </div>
              <div class="tem-record1">
                <span>{{(userData.win_count / userData.all_count) | formatRate}}</span><span>%</span>
              </div>
            </van-col>
            <van-col span="9">
              <div class="tem-record">
                {{$t("lang.gg_myProfile_view_earnings")}}
              </div>
              <div class="tem-record1">
                <span>{{userData.all_reward | formatBitsAmount}}</span><span> bits</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </Box>
      <ConnectionLine class="line-offset"></ConnectionLine>
      <Box fcolor="#FFE91F" bcolor="#FFE91F" type="box" :icon="false" class="user-signIn user-signIn-cen content-box-sign">
        <div class="content-box">
          <van-row class="user-message-title" type="flex">
            <van-col span="24">
              <div class="sign-in">
                {{$t("lang.gg_myProfile_title_signIn")}}
              </div>
            </van-col>
          </van-row>
          <div class="sign-in-img sign-in-qd">
            <van-row class="sign-title" type="flex">
              <van-col span="18">
                <div class="sign-in-day">
                  <i18n path="lang.gg_myProfile_view_signInDays" tag="div">
                    <span place="0" style="color:red"> {{signInqdData.order_count}} </span>
                  </i18n>
                </div>
              </van-col>
              <van-col span="6" style="padding:0 0 0 10px">
                <div class="yhj-list yhj-list-small yhj-list-btn" disabled>
                  <van-row type="flex">
                    <van-col span="4" class="yhj-pad-small yhj-padl yhj-circle2">
                    </van-col>
                    <van-col span="20" class="yhj-pad-small yhj-padr">
                      <van-row type="flex">
                        <i18n class="coupon-num" path="lang.gg_myProfile_button_get" tag="div">
                          <span place="0" style="color:#000;"> {{signInqdData.voucher_count}} </span>
                        </i18n>
                      </van-row>
                    </van-col>
                  </van-row>
                </div>
              </van-col>
            </van-row>
            <van-row class="user-message-sign-top" type="flex" gutter="25">
              <van-col span="6">
                <div class="transparency" :class="{ current: signInDay > 0 }" >
                  <img src="@/assets/print_bom.png" alt="">
                </div>
              </van-col>
              <van-col span="10">
                <div style="width:80%;margin: 0 auto;">
                  <van-row class="user-message-title transparency" :class="{ current: signInDay > 2 }" type="flex">
                    <van-col span="9">
                      <ul class="circle-point">
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </van-col>
                    <van-col span="15">
                      <div>
                        <img src="@/assets/print_bom.png" alt="">
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </van-col>
              <van-col span="10">
                <div style="width:80%;margin: 0 auto;">
                  <van-row class="user-message-title transparency" :class="{ current: signInDay > 4 }" type="flex">
                    <van-col span="9">
                      <ul class="circle-point">
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </van-col>
                    <van-col span="15">
                      <div class="yhj-list yhj-list-small">
                        <van-row type="flex">
                          <van-col span="5" class="yhj-pad-small yhj-padl yhj-circle1">
                          </van-col>
                          <van-col span="19" class="yhj-pad-small yhj-padr">
                            <van-row type="flex">
                             <div class="coupon-num">
                               <span>66</span>bits
                             </div>
                            </van-row>
                          </van-col>
                        </van-row>
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </van-col>
            </van-row>
            <van-row type="flex" class="user-message-sign-bom">
              <van-col span="12">
                <div class="" style="width:80%;margin: 0 auto;">
                  <van-row class="user-message-title transparency" :class="{ current: signInDay > 1 }" type="flex">
                      <van-col span="7">
                        <ul class="circle-point">
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                      </van-col>
                      <van-col span="15">
                        <div>
                          <img src="@/assets/print_top.png" alt="">
                        </div>
                      </van-col>
                    </van-row>
                </div>
              </van-col>
              <van-col span="12">
                <div style="width:80%;margin: 0 auto;">
                  <van-row class="user-message-title transparency" :class="{ current: signInDay > 3 }" type="flex">
                      <van-col span="7">
                        <ul class="circle-point">
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                      </van-col>
                      <van-col span="15">
                        <div>
                          <img src="@/assets/print_top.png" alt="">
                        </div>
                      </van-col>
                    </van-row>
                </div>
              </van-col>
            </van-row>
            <van-row type="flex">
              <van-col span="24">
                <Box fcolor="#FFE91F" type="title1" :show="false" disabled>
                  <div class="sign-btn">
                    {{$t("lang.gg_myProfile_button_signIn")}}
                  </div>
                </Box>
              </van-col>
            </van-row>
          </div>
        </div>
      </Box>
      <ConnectionLine class="line-offset-cen"></ConnectionLine>
      <Box fcolor="#FFE91F" bcolor="#FFE91F" type="box" :icon="false" class="user-signIn user-signIn-cen content-box-sign">
        <div class="content-box">
          <van-row class="user-message-title" type="flex">
            <van-col span="24">
              <div class="sign-in">
                {{$t("lang.gg_myHistory_title_myHistory")}}
              </div>
            </van-col>
          </van-row>
          <div class="sign-in-img sign-in-hot">
            <HistoryList v-if="historicalRecordData && historicalRecordData.length" :list="historicalRecordData" style="margin-bottom:20px;"></HistoryList>
            <div v-else style="margin-bottom:10px;">
              {{$t("lang.gg_no_data")}}
            </div>
            <van-row type="flex">
              <van-col span="24" class="yhj-pad yhj-padl yhj-circle" v-if="historicalRecordData && historicalRecordData.length">
                <router-link tag='div' to="/historyList" style="text-decoration: underline;">
                  {{$t("lang.gg_myProfile_button_viewAll")}}
                </router-link>
              </van-col>
            </van-row>
          </div>
        </div>
      </Box>
      <ConnectionLine class="line-offset-cen"></ConnectionLine>
      <Box fcolor="#FFE91F" bcolor="#FFE91F" type="box" :icon="false" class="user-signIn user-signIn-cen content-box-sign">
        <div class="content-box">
          <van-row class="user-message-title" type="flex">
            <van-col span="24">
              <div class="sign-in">
                {{$t("lang.gg_myCoupon_title_coupon")}}
              </div>
            </van-col>
          </van-row>
          <div class="sign-in-img sign-in-hot" style="padding-top:0;">
            <CouponList :classTrue="true" v-if="couponData && couponData.length" :disabledCoupons="couponData" :show-exchange-bar="false" />
            <div v-else-if="couponData!==''" style="padding-top:15px;margin-bottom:10px;">
              <div>
                <div class="yqbtn">
                  <img src="@/assets/gift.png" alt="">
                </div>
                <div class="yqtext">
                  {{$t("lang.gg_myCoupon_button_invite")}}
                </div>
              </div>
            </div>
            <van-row type="flex">
              <van-col span="24" class="yhj-pad yhj-padl yhj-circle">
                <router-link tag='div' to="/validVoucher" style="text-decoration: underline;">
                  {{$t("lang.gg_myProfile_button_viewAll")}}
                </router-link>
              </van-col>
            </van-row>
          </div>
        </div>
      </Box>
      <!-- 签到弹框 -->
      <van-popup v-model="signinShow">
        <div class="check-box">
          <Box fcolor="#FFE91F" bcolor="#FFE91F" type="box" :icon="false" class="user-signIn user-signIn-cen content-box-sign">
          <div class="content-box">
            <van-row class="user-message-title" type="flex">
              <van-col span="24">
                <div class="sign-in">
                  {{$t("lang.gg_signIn_sucess_title")}}
                </div>
              </van-col>
            </van-row>
            <div class="sign-in-img">
              <div class="yhj-list" style="padding-bottom:10px;">
                  <van-row class="sign-title" type="flex">
                  <van-col span="24">
                    <div class="bullet-box">
                      <img class="bullet-box-img" src="@/assets/calendar.png" alt="">
                    </div>
                  </van-col>
                </van-row>
                <van-row class="sign-title" type="flex">
                  <van-col span="24">
                    <div class="bullet-title">
                      <i18n path="lang.gg_signIn_sucess_view_days" tag="div">
                        <span place="0" style="color:red"> {{signInqdData.order_count}} </span>
                      </i18n>
                    </div>
                  </van-col>
                </van-row>
                <van-row type="flex">
                  <van-col span="24">
                    <Box fcolor="#FFE91F" type="title1" :show="false" @click.native="signOut()">
                      <div class="sign-btn">
                        {{$t("lang.gg_signIn_sucess_button_finish")}}
                      </div>
                    </Box>
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
        </Box>
        <div class="line-modal">
          <ConnectionLine></ConnectionLine>
        </div>
      </div>
        </van-popup>
        <FirstCouponPopup @close="closeModal" :show="showFirstCouponPopup" :coupon="firstCoupon" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { UserInfo, historicalRecord, queryValidCoupon, signInqd, signInqdHistory, pendingVolume } from '@/service'
import Box from '@/components/Box'
import DefaultUserImg from '@/assets/head.png'
import HistoryList from '@/components/HistoryList'
import FirstCouponPopup from '@/components/firstCouponPopup'
import ConnectionLine from '@/components/connectionLine'
import CouponList from '@/components/CouponList'
import NoDataBox from '@/components/NoDataBox'
import { Row, Col, Popup } from 'vant'

Vue.use(Row).use(Col).use(Popup)

export default {
  data(){
    return {
      signInDay: 0,
      signinShow: false,
      DefaultUserImg: DefaultUserImg,
      userData: {},
      historicalRecordData: [],
      couponData: '',
      signInqdData: {},
      signInqdHistoryData: [],
      showFirstCouponPopup: false,
      firstCoupon:{},
    }
  },
  components: {
    Box,
    HistoryList,
    ConnectionLine,
    FirstCouponPopup,
    CouponList,
    NoDataBox
  },
  created(){
    this.fetchUserInfo()
    this.fetchHistoricalRecord()
    this.fetchCoupon()
    this.fetchSignInqdHistory()
  },
  filters: {
    formatRate: function (value) {
      if (!value) return 0
      return Math.round(value * 100)
    }
  },
  methods:{
    signIn(){
      this.fetchSignInqd()
      this.fetchSignInqdHistory()
    },
    signOut() {
      this.signinShow = false
    },
    couponNum(value) {
      if (value) {
        this.fetchPendingVolume()
      }
    },
    closeModal() {
      this.showFirstCouponPopup = false
    },
    // 个人信息
    async fetchUserInfo() {
      const res = await UserInfo()
      if (res.ret === 1) {
        this.userData = res.data
      } else {
        this.$toast(res.error)
      }
    },
    // 历史战绩
    async fetchHistoricalRecord() {
      const res = await historicalRecord({
        page: 1,
        per_page: 5
      })
      if (res.ret === 1) {
        this.historicalRecordData = res.data.list
      } else {
        this.$toast(res.error)
      }
    },
    // 优惠券
    async fetchCoupon() {
      const res = await queryValidCoupon({
        page: 1,
        per_page: 3
      })
      if (res.ret === 1) {
        this.couponData = this.$options.filters.transferCouponList(res.data.list)
      } else {
        this.$toast(res.error)
      }
    },
    // 签到
    async fetchSignInqd() {
      const res = await signInqd()
      if (res.ret === 1) {
        this.signInqdData = res.data
        this.signinShow = true
        if (this.signInqdData.order_count) {
          this.signInDay = this.signInqdData.order_count % 5 === 0 ? 5 : this.signInqdData.order_count % 5
        } else {
          this.signInDay = 0
        }
        this.fetchSignInqdHistory()
        // if(this.signInqdData.status === 1){
        //   this.$toast(this.$t("lang.gg_achieveCoupon_toast_view_runOut"))
        //   this.fetchSignInqdHistory()
        // }
        // if(this.signInqdData.status === 2){
        //   this.showFirstCouponPopup = true
        //   this.firstCoupon = this.$options.filters.transferCouponList([this.signInqdData.voucher_info])[0]
        //   this.firstCoupon = Object.assign({}, this.firstCoupon, { day: this.signInqdData.order_count });
        //   this.fetchSignInqdHistory()
        // }
      } else {
        this.$toast(res.error)
      }
    },
    // 签到历史
    async fetchSignInqdHistory() {
      const res = await signInqdHistory()
      if (res.ret === 1) {
        this.signInqdData = res.data
        if (this.signInqdData.order_count) {
          this.signInDay = this.signInqdData.order_count % 5 === 0 ? 5 : this.signInqdData.order_count % 5
        } else {
          this.signInDay = 0
        }
      } else {
        this.$toast(res.error)
      }
    },
    // 待领卷
    async fetchPendingVolume() {
      const res = await pendingVolume()
      if (res.ret === 1) {
        this.showFirstCouponPopup = true
        this.firstCoupon = this.$options.filters.transferCouponList([res.data])[0]
        this.firstCoupon = Object.assign({}, this.firstCoupon, { day: this.signInqdData.order_count });
        this.fetchSignInqdHistory()
      } else {
        this.$toast(res.error)
      }
    },
    addMtAH5Event() {
      window.MtaH5.clickStat("share3", {'userid': this.$store.state.customerId})
    }
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
