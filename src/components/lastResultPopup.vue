<template lang="html">
  <van-popup v-model="show" @click-overlay="$emit('close')">
    <div class="bet-container">
      <Box fcolor="#27378C" bcolor="#C2CCFF" type="box" :icon="true" class="bet_container">
        <div class="bet_box">
          <img :src="typeImg" alt="">
          <h1>{{esult(this.newGameResultData.is_win)}}</h1>
          <p>{{esultDetailed(this.newGameResultData.is_win)}}</p>
          <van-row style="marginTop: 20px;" type="flex">
            <van-col span="24">
              <Box fcolor="#FFE91F" bcolor="#fff" type="btn" class="btn-w">
                <div @click="$emit('closePopup')">
                  <!-- {{this.newGameResultData.is_win ? $t("lang.gg_result_button_win") : $t("lang.gg_result_button_lose") }} -->
                  {{$t("lang.gg_result_button_win")}}
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
import LongImg from '@/assets/long-result.png'
import ShortImg from '@/assets/short-result.png'
Vue.use(Button).use(Row).use(Col).use(Icon).use(Popup)
export default {
  name: 'LastResultPopup',
  props: ['show', 'transferData'],
  computed: {
    newGameResultData: function () {
      return this.transferData
    },
    typeImg: function () {
      return this.newGameResultData.is_win ? LongImg : ShortImg
    }
  },
  components: {
    Box,
    Popup,
  },
  methods: {
    esult(num) {
      if (num) {
        return this.$t("lang.gg_result_view_title_win")
      } else {
        return this.$t("lang.gg_result_view_title_lose")
      }
    },
    esultDetailed(num) {
      if (num) {
        return this.$t("lang.gg_result_view_win", [this.newGameResultData.game_name, this.$options.filters.formatBitsAmount(this.newGameResultData.amount)])
      } else {
        return this.$t("lang.gg_result_view_lose", [this.newGameResultData.game_name, this.filterDetailed(this.newGameResultData.result)])
      }
    },
    filterDetailed(num) {
      switch (num)
      {
      case 1:
        return this.$t("lang.gg_status_1")
      case 2:
        return this.$t("lang.gg_status_2")
      default:
        return this.$t("lang.gg_status_3")
      }
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
    }
    p{
      font-size: 14px;
    }
    img{
      width: 40%;
      display: block;
      text-align: center;
      margin: 20px auto;
    }
    h1{
      font-size: 20px;
      margin-bottom: 10px;
      font-weight: normal;
    }
    .btn-w{
      width: 167px;
    }
  }
}
</style>
