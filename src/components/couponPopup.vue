<template lang="html">
  <van-popup v-model="show" @click-overlay="$emit('close')">
    <Box fcolor="#FFE91F" bcolor="#fff" type="title" :icon="true">
      {{$t('lang.gg_chooseCoupon_title_makeChoice')}}
    </Box>
    <div class="no-use-coupon" @click="onChange(-1); $emit('close')">
      {{$t('lang.gg_chooseCoupon_view_notUse')}}
      <div class="use-btn">
        {{$t('lang.gg_chooseCoupon_button_quit')}}
      </div>
    </div>
    <CouponList
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      :disabled-coupons="disabledCoupons"
      @change="onChange"
      :show-exchange-bar="false"
    />
  </van-popup>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col, Icon, Popup, CouponCell } from 'vant'
import Box from './Box'
import CouponList from './CouponList'
Vue.use(Button).use(Row).use(Col).use(Icon).use(Popup).use(CouponCell)

export default {
  name: 'CouponPopup',
  props: ['show', 'coupons', 'disabledCoupons'],
  components: {
    Box,
    Popup,
    CouponList,
  },
  data() {
    return {
      showList: false,
      chosenCoupon: -1,
    };
  },
  methods: {
    onChange(index) {
      this.$emit('onChangeCoupon', index)
      this.chosenCoupon = index
    },
    randomId(max = 999999) {
      return Math.floor(Math.random() * max) + 1;
    }
  }
}
</script>

<style lang="less" scoped>
@white: #fff;
.van-popup{
  width: 100%;
  height: 100%;
  color: #000;
  padding: 10px 20px 0;
  box-sizing: border-box;
  background:rgb(39, 55, 140);
  background-image: linear-gradient(hsla(0,0%,100%,.3) 1px,transparent 0),
                    linear-gradient(90deg,hsla(0,0%,100%,.3) 1px,transparent 0);
  background-size:20px 20px,20px 20px;
}
.no-use-coupon{
  background-color: #fff;
  border: 2px solid #000;
  line-height: 46px;
  text-align: left;
  margin: 15px 0;
  border-radius: 4px;
  padding: 0 10px;
  .use-btn{
    background-color: #FFE91F;
    border: 2px solid #000;
    display: inline-block;
    float: right;
    border-radius: 4px;
    padding: 0 10px;
    line-height: 28px;
    margin: 6px 0;
  }
}
</style>
