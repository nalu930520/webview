<template lang="html">
  <van-popup v-model="show" @click-overlay="$emit('close')">
    <div class="bet-container">
      <Box fcolor="#27378C" bcolor="#C2CCFF" type="box" :icon="true" class="bet_container">
        <div class="bet_box">
          <h1>{{filterName(coupon.from_source)}}</h1>
          <p>{{Introduction(coupon)}}</p>
          <coupon-item
            :data="coupon"
          />
          <van-row style="marginTop: 35px;" gutter="20" type="flex">
            <van-col span="12">
              <Box fcolor="#FFE91F" bcolor="#fff" type="btn" class="btn-w">
                <div  @click="$emit('close')">
                  {{$t("lang.gg_achieveCoupon_button_gotIt")}}
                </div>
              </Box>
            </van-col>
             <van-col span="12">
              <Box fcolor="#FFE91F" bcolor="#fff" type="btn" class="btn-w">
                <router-link tag='div' to="/gameindex">
                 {{$t("lang.gg_voucherNew_button_useNow")}}
                </router-link>
              </Box>
            </van-col>
          </van-row>
        </div>
      </Box>
    </div>
  </van-popup>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col, Icon, Popup} from 'vant'
import Box from './Box'
import CouponItem from './CouponList/item.vue'
Vue.use(Button).use(Row).use(Col).use(Icon).use(Popup)
export default {
  name: 'FirstCouponPopup',
  props: ['show', 'coupon'],
  methods:{
    filterName(name) {
      switch (name)
      {
        case 0:
          return this.$t("lang.gg_voucherNew_view_title")
        case 1:
          return this.$t("lang.gg_achieveCoupon_view_title_signIn")
        default:
          return this.$t("lang.gg_achieveCoupon_view_title_welcome")
      }
    },
    Introduction(data){
      switch (data.from_source)
      {
      case 0:
        return this.$t("lang.gg_achieveCoupon_view_welcome", [this.$options.filters.formatBitsAmount(data.value)])
      case 1:
        return this.$t("lang.gg_achieveCoupon_view_signIn", {'0': data.day, '1': this.$options.filters.formatBitsAmount(data.value)})
      default:
        return this.$t("lang.gg_achieveCoupon_view_title_welcome")
      }
    }
  },
  components: {
    Box,
    Popup,
    CouponItem,
  },
}
</script>

<style lang="less" scoped>
@white: #fff;
.bet-container{
  height: 100%;
  width: auto;
  overflow: auto;
  padding-top: 2px;
}
.van-popup{
  width: 100%;
  background: none;
}
.bet_container{
  width: 85%;
  .bet_box{
    padding: 20px 15px 20px;
    background-image: radial-gradient(black 1%, transparent 6%),
                      radial-gradient(black 1%, transparent 6%);
    background-size:30px 30px;
    background-position: 0 0, 45px 45px;
    position: relative;
    h1, p{
      color:@white;
      font-size: 14px;
    }
    p{
      margin-bottom: 10px;
    }
    img{
      width: 60%;
      display: block;
      text-align: center;
      margin: 20px auto;
    }
    h1{
      font-size: 20px;
      margin-bottom: 10px;
      font-weight: normal;
    }
  }
  .btn-w{
    width: 130px;
  }
}
</style>
