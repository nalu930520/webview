<!--  -->
<template>
  <div class="time-title">
    <div class="triangle-left"></div>
    <div class="time-contain">
      <span>{{$t('lang.game.worldcup_text_prediction_close_time')}}：{{betRemainTime}}</span>
    </div>
    <div class="triangle-right"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
export default {
  name: 'Timer',
  computed: {
    ...mapState([
      'betRemainTime',
    ])
  }
}

</script>
<style  scoped lang="less">
@blue: #05325A;
@white: #ffffff;
.time-title {
  display: flex;
  margin: 0 auto;
  width: 22rem;
  height: 2rem;
  .triangle-left, .triangle-right {
    width: 0px;
    height: 0px;
    border-top: 2rem solid @blue;
    border-right: 2rem solid  rgba(0,0,0,0);
    border-bottom: 2rem solid rgba(0,0,0,0);
    border-left: 2rem solid  rgba(0,0,0,0);
    margin-bottom: .2rem;
  }
  .time-contain {
    width: 20rem;
    height: 2rem;
    line-height: 2rem;
    background-color: @blue;
    position: relative;
    z-index: 99;
    color: @white;
  }
  .triangle-left {
      transform: translate(2rem,0rem);
  }
  .triangle-right {
      transform: translate(-2rem,0rem);
  }
}
</style>
