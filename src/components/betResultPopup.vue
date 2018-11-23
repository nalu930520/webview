<template lang="html">
  <van-popup v-model="show" @click-overlay="$emit('close')">
    <div class="bet-container">
      <Box fcolor="#27378C" bcolor="#C2CCFF" type="box" :icon="true" class="bet_container">
        <div class="bet_box">
          <h1>{{$t('lang.gg_betFinished_title', {0: type === 1 ? $t('lang.gg_status_1') : $t('lang.gg_status_2')})}}</h1>
          <p>{{$t('lang.gg_betFinished_view', {0: amount})}}</p>
          <img src="@/assets/betSuccess.png" alt="">
          <van-row style="marginTop: 35px;" gutter="20" type="flex">
            <van-col span="12">
              <Box fcolor="#FFE91F" bcolor="#fff" type="btn">
                <div class="btn" @click="toShare">
                  {{$t('lang.gg_betFinished_button_invite')}}
                </div>
              </Box>
            </van-col>
             <van-col span="12">
              <Box fcolor="#FFE91F" bcolor="#fff" type="btn">
                <div class="btn" @click="$emit('close')">
                  {{$t('lang.gg_betFinished_button_ok')}}
                </div>
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
Vue.use(Button).use(Row).use(Col).use(Icon).use(Popup)

export default {
  name: 'BetResultPopup',
  props: ['show', 'amount', 'type'],
  components: {
    Box,
    Popup,
  },
  methods: {
    toShare() {
      this.$emit('close');
      `/gameShare/2?status=${this.type}&amount=${this.amount}`
      this.$router.push({
        name: 'gameShare',
        params: { type: 2 },
        query: { status: this.type, amount: this.amount }
      });
      window.MtaH5.clickStat("share2", {'userid': this.$store.state.customerId})
    }
  }
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
  width: 80vw;
  .bet_box{
    padding: 20px 20px 20px 14px;
    background-image: radial-gradient(black 1%, transparent 6%),
                      radial-gradient(black 1%, transparent 6%);
    background-size:30px 30px;
    background-position: 0 0, 45px 45px;
    position: relative;
    .btn{
      width: 100%;
    }
    h1, p{
      color:@white;
    }
    img{
      width: 60%;
      display: block;
      text-align: center;
      margin: 20px auto;
    }
    h1{
      font-size: 20px;
      font-weight: normal;
    }
  }
}
</style>
