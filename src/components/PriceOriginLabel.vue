<template>
  <div class="price_origin">
    <a @click="openBrowers" target="_self">
      <img src="../assets/cmegroup.png"/>
      <span>{{$t('lang.game.game_button_prediction_source')}}</span>
    </a>
  </div>
</template>
<style lang="less">
  .price_origin{
    padding-top: 1.5rem;
    a{
      color: #808596;
      display: inline-block;
      text-decoration: underline;
    }
    span{
      font-size: 1rem;
    }
    img{
      height: 1.2rem;
      line-height: 1.6rem;
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
<script>
import native from '@/utils/native'
export default {
  name: 'PriceOriginLabel',
  methods: {
    openBrowers() {
      if (native) {
        native.openSystemBrowser('http://www.cmegroup.com/trading/cf-bitcoin-reference-rate.html')
      }
    }
  }
}
</script>
