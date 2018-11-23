<template lang="html">
  <van-popup v-model="show" position="bottom" @click-overlay="$emit('close')">
    <h1><van-icon name="close" @click="$emit('close')"/>{{$t('lang.gg_pay_title')}}</h1>
    <div class="confirm_box" :disabled="cannotBet">
      <p>{{$t('lang.gg_pay_view_amount')}}</p>
      <div class="amount">
        {{amount | formatAmount}} bits
      </div>
      <p class="error" v-if="cannotBet">{{$t('lang.gg_pay_view_notEnough')}}</p>
      <div class="pay_box">
        <div>
          <div>
            {{$t('lang.gg_pay_view_way')}}
          </div>
          <div>
            {{$t('lang.gg_pay_view_wallet')}}
          </div>
        </div>
        <div>
          <div>
             {{$t('lang.gg_pay_view_remain')}}
          </div>
          <div>
            {{btcBalance | formatBitsAmount}} bits
          </div>
        </div>
      </div>
      <van-button class="confirm_btn" @click="$emit('close');$emit('handleSubmit')" :disabled="cannotBet">{{$t('lang.gg_pay_button_check')}}</van-button>
    </div>
  </van-popup>
</template>

<script>
import Vue from 'vue'
import { PasswordInput, NumberKeyboard, Popup} from 'vant'
import { queryUserWallet } from '@/service'
Vue.use(PasswordInput).use(NumberKeyboard);
export default {
  name:'ConfirmPopup',
  props: ['show', 'amount'],
  data() {
    return {
      btcBalance: ''
    }
  },
  computed: {
    cannotBet() {
      return this.$options.filters.formatBitsAmount(this.btcBalance) < this.amount
    }
  },
  created() {
    queryUserWallet({currencyCode: 'btc'}).then(response => {
      console.log('queryUserWallet:', response)
      this.btcBalance = response.balance
    })
  },
}
</script>

<style lang="less" scoped>
.van-popup{
  background: rgb(242, 242, 242)!important;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
h1{
  text-align: center;
  font-size: 18px;
  font-weight: normal;
  padding: 15px 0;
  position: relative;
}
.confirm_box{
  padding: 20px 0;
  border-top: 1px solid #ddd;
  &[disabled]{
    .amount{
      color: rgb(153, 153, 153);
    }
  }
  .error{
    color: rgb(218, 49, 49);
  }
  p{
    color:rgb(102, 102, 102)
  }
  .amount{
    font-size: 30px;
    color: #000;
    margin: 10px 0;
  }
  .confirm_btn{
    width: ~ 'calc(100% -30px)';
    box-sizing: border-box;
    background-color: rgb(33, 78, 162);
    border-radius: 25px;
    line-height: 50px;
    height: 50px;
    color:#fff;
    border: none;
    &[disabled]{
      color: #fff;
      background-color: rgb(210, 212, 217);
    }
  }
  .pay_box{
    border-radius: 4px;
    line-height: 40px;
    margin: 20px 0 70px;
    .van-icon{
      font-size: 10px;
    }
    &>div{
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      line-height: 40px;
      height: 40px;
      color: rgb(3, 3, 3);
      font-weight: normal;
      border-bottom: 1px solid #ddd;
      span{
        color: #F91737;
      }
    }
  }
}
.van-icon{
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
}

</style>
