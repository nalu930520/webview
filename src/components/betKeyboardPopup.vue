<!--  -->
<template>
  <div>
    <van-popup v-model="show" position="bottom" @click-overlay="$emit('close')">
      <div class="keyboard-container">
        <Box fcolor="#27378C" bcolor="#C2CCFF" type="box" :icon="true" class="confirm_container">
          <div class="confirm_box">
            <Box :fcolor="type === 1 ? '#38E6A8': '#FD5B76'" bcolor="#C2CCFF" type="btn" class="type-btn">{{type === 1 ? $t('lang.gg_bet_title_guessUp'): $t('lang.gg_bet_title_guessDown')}}</Box>
            <div class="close-btn" @click="$emit('close')">
              <van-icon name="clear" color="#FFE91F"/>
            </div>
            <van-row class="beat-input-container">
              <van-col span="5">
                <div class="opera-btn-reduce" :style="{backgroundColor: type === 1 ? '#38E6A8': '#FD5B76'}" @click="reduce">-</div>
              </van-col>
              <van-col span="14">
                <div class="opera-input">{{bettingNum}}<span class="pre">50 bits x</span></div>
              </van-col>
              <van-col span="5">
                <div class="opera-btn-plus" :style="{backgroundColor: type === 1 ? '#38E6A8': '#FD5B76'}" @click="plus">+</div>
              </van-col>
            </van-row>
            <div class="coupon">
              <div @click="openCouponPopup">
                <div>
                  {{$t('lang.gg_bet_view_coupon')}}
                </div>
                <div>
                  <div v-if="chosenCoupon !== -1">
                    <span><b class="num">- {{usefulCoupons[chosenCoupon].value | formatBitsAmount}} bits</b></span> <van-icon name="arrow"/>
                  </div>
                  <div v-else><span v-html="$t('lang.gg_bet_view_available', {0: usefulCoupons.length})"></span> <van-icon name="arrow" v-if="coupons.length > 0"/></div>
                </div>
              </div>
              <div>
                <div span="12">
                  {{$t('lang.gg_bet_view_actualAmount')}}
                </div>
                <div span="12">
                  {{actualAmount | formatAmount}} bits
                </div>
              </div>
            </div>
            <div class="btn-container" v-if="bettingNum === '' || bettingNum === '0'" >
              <Box fcolor="#ccc" bcolor="#fff" type="btn" class="bet-btn">{{$t('lang.gg_bet_button_bet')}}</Box>
            </div>
            <div v-else class="btn-container" @click="$emit('close'); $emit('openConfirmPopup', bettingNum*50, actualAmount)">
              <Box :fcolor="type === 1 ? '#38E6A8': '#FD5B76'" bcolor="#fff" type="btn" class="bet-btn">{{$t('lang.gg_bet_button_bet')}}</Box>
            </div>
          </div>
        </Box>
        <van-number-keyboard
          :show="show"
          @input="onInput"
          @delete="onDelete"
        />
      </div>
    </van-popup>
    <CouponPopup :show="showCouponPopup" @close="showCouponPopup = false" @onChangeCoupon="onChangeCoupon" :coupons="usefulCoupons" :disabledCoupons="disabledCoupons" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col, NumberKeyboard, Icon, Popup, CouponCell} from 'vant'
import Box from './Box'
import CouponPopup from './couponPopup.vue'
import { queryValidCoupon } from '../service'
import filter from 'lodash.filter';

Vue.use(Button).use(Row).use(Col).use(NumberKeyboard).use(Icon).use(Popup).use(CouponCell)
export default {
  name: 'betKeyboardPopup',
  props: ['balance', 'type', 'show'],
  data () {
    return {
      errorFlag: false,
      bettingNum: 1,
      betFlg: true,
      chosenCoupon: -1,
      usefulCoupons: [],
      coupons: [],
      disabledCoupons: [],
      showCouponPopup: false,
      exchangedCoupons: []
    };
  },
  components: {
    Box,
    Popup,
    CouponPopup,
  },
  created() {
    this.getValidCoupon().then(()=> {
      this.onBetnumChange(this.bettingNum)
    })
  },
  watch: {
    bettingNum: {
      deep: true,
      handler:function(curVal) {
        this.onBetnumChange(curVal)
      }
    },
    usefulCoupons(curVal) {
      if(curVal.length >= 1) {
        this.onChangeCoupon(0)
      }
    }
  },
  computed: {
    actualAmount: function () {
      return this.chosenCoupon !== -1 ? this.bettingNum*50 - this.usefulCoupons[this.chosenCoupon].value / 100 : this.bettingNum*50
    }
  },
  methods: {
    async getValidCoupon() {
      const res = await queryValidCoupon({page: 1, per_page: 10})
      if(res.ret === 1) {
        this.coupons = this.$options.filters.transferCouponList(res.data.list)
        if(res.data.is_used) {
          this.coupons = []
        }
      }
    },
    resetForm() {
      this.bettingNum = 1
      this.chosenCoupon = -1
      this.onChangeCoupon(-1)
    },
    onBetnumChange(curVal) {
      if(curVal) {
        this.chosenCoupon = -1
        this.onChangeCoupon(-1)
        const dCoupons = filter(this.coupons, obj => {
          return this.$options.filters.formatBitsAmount(obj.origin_condition) > curVal*50
        })
        const uCoupons = filter(this.coupons, obj => {
          return this.$options.filters.formatBitsAmount(obj.origin_condition) <= curVal*50
        })
        this.disabledCoupons = dCoupons
        if(uCoupons.length > 1) {
          uCoupons.sort(function(a, b){
            const value1 = a.value
            const value2 = b.value
            if(value1 === value2){
                return a.end_at - b.end_at;
            }
            return value2 - value1;
          })
        }
        this.usefulCoupons = uCoupons
      }
    },
    openCouponPopup() {
      if (this.coupons.length > 0) {
        this.showCouponPopup = true
      }
    },
    onChangeCoupon(index) {
      this.showCouponPopup = false;
      this.chosenCoupon = index;
      const choosen_coupon_id = index !== -1 ? this.usefulCoupons[index].id : ''
      this.$emit('getChosenCouponId', choosen_coupon_id)
    },
    onInput(value) {
      if (this.bettingNum + '' + value - 200 > 0) {
        return
      }
      if (this.bettingNum === '' && value === 0 ) {
        return
      }
      this.bettingNum = this.bettingNum + '' + value
      // this.blurHandle()
    },
    onDelete() {
      this.bettingNum = String(this.bettingNum).substring(0, this.bettingNum.length -1)
    },
    reduce() {
      if (this.bettingNum - 2 < 0 ) {
        return
      }
      this.bettingNum = String(parseInt(this.bettingNum) - 1)
    },
    plus() {
      if (this.bettingNum - 200 > 0 || this.bettingNum - 200 === 0) {
        return
      }
      if (this.bettingNum) {
        this.bettingNum = String(parseInt(this.bettingNum) + 1)
      } else {
        this.bettingNum =1
      }
    },
    betting() {
      // if (this.bettingNum - 1 < 0 || this.bettingNum - 100 > 0 || this.bettingNum === '') {
      //   return
      // }
      // if (this.balance - this.bettingNumShow < 0) {
      //   return
      // }
      this.$emit('betting',this.bettingNumShow)
    }
  }
}

</script>
<style  scoped lang="less">
@white: #fff;
@btn-blue: rgb(33, 78, 162);
.van-popup{
  background: none;
}
.keyboard-container{
  height: 100%;
  width: auto;
  padding-top: 60px;
}
.confirm_container{
  bottom: 30px;
  width: 80vw;
  .confirm_box{
    padding: 40px 20px 20px;
    background-image: radial-gradient(black 1%, transparent 6%),
                      radial-gradient(black 1%, transparent 6%);
    background-size:30px 30px;
    background-position: 0 0, 45px 45px;
    position: relative;
    .close-btn{
      position: absolute;
      top: 5px;
      right: 5px;
      .van-icon{
        background-color: #000;
        border-radius: 100%;
        font-size: 26px;
        border: 1px solid #000;
      }
    }
    .type-btn{
      position: absolute;
      top: -15px;
      left: 50%;
      width: 120px;
      transform: translateX(-50%);
      background: none!important;
      border: none!important;
    }
    .bet-btn{
      width: 60%;
    }
  }
  .coupon{
    border: 2px solid #000;
    background-color: #fff;
    border-radius: 4px;
    line-height: 40px;
    margin: 20px 0;
    .van-icon{
      font-size: 10px;
    }
    &>div{
      display: flex;
      justify-content: space-between;
      padding: 0 8px;
      line-height: 40px;
      height: 40px;
      &:first-child{
        border-bottom: 1px dashed #000;
      }
    }
  }
}

.van-number-keyboard{
  position: relative;
}
.text-samll {
  color: @white;
  text-align: left;
  font-size: 1.4rem;
  margin: 1rem 0;
}
.btn-container .van-button {
  color: @btn-blue;
  font-weight: 600;
  background-color: rgba(255, 255, 255, .6);
  &.able-btn{
    background-color: rgba(255, 255, 255, 1);
  }
}
.beat-input-container {
  border: 2px solid #000;
  box-sizing: border-box;
  border-radius: 30px;
  overflow:hidden;
  .opera-input {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: none;
    background: @white;
    text-align: right;
    padding: 0 10px;
    box-sizing: border-box;
    color: #000;
    font-size: 1.6rem;
    position: relative;
    &[disabled] {
      border: 1px solid rgb(218, 49, 49);
    }
    .pre{
      position: absolute;
      top: 0;
      left: 10px;
      font-size: 16px;
      color: rgb(155, 155, 155);
    }
  }
  .opera-btn-reduce, .opera-btn-plus {
    height: 50px;
    line-height: 46px;
    vertical-align: middle;
    font-size: 30px;
    position: relative;
  }
  .opera-btn-reduce{
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    &::before{
      content: ''!important;
      position: absolute;
      top: 6px;
      left: 20px;
      width: 4px;
      height: 3px;
      border-radius: 2px;
      background-color: #fff;
    }
    &::after{
      content: ''!important;
      position: absolute;
      top: 6px;
      left: 28px;
      width: 15px;
      height: 3px;
      border-radius: 2px;
      background-color: #fff;
    }
  }
  .opera-btn-plus{
    &::before{
      content: ''!important;
      position: absolute;
      top: 6px;
      left: 8px;
      width: 4px;
      height: 3px;
      border-radius: 2px;
      background-color: #fff;
    }
    &::after{
      content: ''!important;
      position: absolute;
      top: 6px;
      left: 15px;
      width: 12px;
      height: 3px;
      border-radius: 2px;
      background-color: #fff;
    }
  }
}
.error-msg {
    font-size: 1.4rem;
    color: rgb(255, 203, 13);
    text-align: left;
    margin: 1rem 0;
  }

</style>
<style lang="less">
  span{
    .num{
      color: #F91737;
      font-weight: normal;
    }
  }
</style>
