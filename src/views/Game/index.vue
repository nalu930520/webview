<template>
  <div class="game-index">
    <div class="content">
      <van-row>
        <van-col span="24" class="content-top">
         <div class="bannerIndex">
           <img :src="imgData" width="100%" alt="">
         </div>
         <Box fcolor="#FFE91F" bcolor="#fff" type="box" :icon="false" class="rule">
            <router-link tag='div' to="/gameRule/1">
             {{$t("lang.gg_button_rules_1")}}
             <br>
             {{$t("lang.gg_button_rules_2")}}
            </router-link>
         </Box>
        </van-col>
      </van-row>
      <van-row style="marginTop: 35px;" gutter="20" type="flex">
        <van-col span="12">
          <Box fcolor="#FFE91F" bcolor="#fff" type="btn" class="sign-w">
            <router-link tag='div' to="/myInformation">
              {{$t("lang.gg_prepare_button_sign")}}
            </router-link>
          </Box>
        </van-col>
        <van-col span="12">
          <Box fcolor="#FFE91F" bcolor="#fff" type="btn" class="sign-w">
            <router-link tag='div' to="/gameindex" replace>
              {{$t("lang.gg_prepare_button_start")}}
            </router-link>
          </Box>
        </van-col>
      </van-row>
    </div>
    <Footer></Footer>
    <FirstCouponPopup @close="closeModal" :show="showFirstCouponPopup" :coupon="firstCoupon" />
  </div>
</template>

<script>
import Vue from 'vue'
import { firstLanding, gameResult } from '@/service'
import Chart from '@/components/Chart'
import Box from '@/components/Box'
import bannerIndexEn from '@/assets/banner_index_en.png'
import bannerIndexCn from '@/assets/banner_index_cn.png'
import FirstCouponPopup from '@/components/firstCouponPopup'
import Footer from '@/components/footer'
import native from '@/utils/native'
import {setStore, getStore} from '@/utils/localstorge'
import { Row, Col , Toast } from 'vant'
Vue.use(Row).use(Col)
export default {
  data(){
    return {
      showFirstCouponPopup: false,
      firstCoupon: {},
    }
  },
  components: {
    Box,
    FirstCouponPopup,
    Footer
  },
  created(){
    this.fetchFirstLanding()
  },
  computed: {
    imgData: function() {
      return this.$i18n.locale === "en" ? bannerIndexEn : bannerIndexCn
    }
  },
  methods:{
    // 新人优惠券
    fetchFirstLanding() {
      if(this.$route.query.data){
        this.showFirstCouponPopup = true
        this.firstCoupon = this.$options.filters.transferCouponList([JSON.parse(this.$route.query.data)])[0]
      }
    },
    closeModal(){
      this.showFirstCouponPopup = false
    },
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
