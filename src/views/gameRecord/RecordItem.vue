<template>
  <div :class="['recordItem', getTypeClassName]">
    <div
      class="title"
    >{{recordDetail.name}}</div>
    <div class="vsWraper">
      <div class="up">{{$t('lang.gg_bet_title_guessUp')}}</div>
      <div class="vsText">VS</div>
      <div class="down" >{{$t('lang.gg_bet_title_guessDown')}}</div>
    </div>
    <div class="winRate" >
      <div class="left" :style="{ width: getWidth() }">
        <div class="leftContent">
          <span class="leftText">{{recordDetail.bet_rise_pools | formatBitsAmount(0)}} bits</span>
        </div>
      </div>
      <div class="right" > {{(recordDetail.bonus_pools - recordDetail.bet_rise_pools) | formatBitsAmount(0)}} bits</div>
    </div>
  </div>
</template>
<script>
const typeClassName = {
  1: 'win',
  2: 'lose',
  3: ''
}
export default {
  props: {
    recordDetail: {
      type: Object,
    }
  },
  computed: {
    getTypeClassName() {
      return typeClassName[this.recordDetail.win_side]
    },
  },
  methods: {
    getWidth() {
      if (this.recordDetail.bonus_pools === '0') { return '50%'}
      let rate = this.recordDetail.bet_rise_pools / this.recordDetail.bonus_pools * 100
      if (rate > 65) {
        rate = 65
      }
      if (rate < 30) {
        rate = 30
      }
      return `${rate}%`
    },
  }
}
</script>

<style scoped lang="less">
@gray: #D8D8D8;
@green: #38E6A8;
@red: #FD5B76;
.recordItem {
  &.win {
    .title {
      background: @green;
    }
    .vsWraper {
      .up {
        background: @green;
      }
    }
    .winRate {
      .left {
        .leftContent {
          background: @green;
        }
      }
    }
  }
  &.lose {
    .title {
      background: @red;
    }
    .vsWraper {
      .down {
        background: @red;
      }
    }
    .winRate {
      background: @red;
    }
  }
  
  margin: 0 auto;
  margin-bottom: 15px;
  overflow: hidden;
  border: 1px solid #000;
  border-radius: 4px;
  width: 335px;
  background: #fff;
  padding-bottom: 10px;
  box-shadow: -4px 4px 0 #7E88B8, -5px 5px 0 #000;
  // 视觉居中
  transform: translate(5px, 0);
  .title {
    background: @gray;
    border-bottom: 1px solid #000;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }
  .vsWraper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
    .commonvsWraper {
      border: 2px solid #000000;
      border-radius: 100px;
      width: 68px;
      height: 32px;
      line-height: 32px;
    }
    .up {
      .commonvsWraper;
      background: @gray;
    }
    .down {
      .commonvsWraper;
      background: @gray;
    }
    .vsText {
      margin-left: 30px;
      margin-right: 30px;
    }
  }
  .winRate {
    position: relative;
    font-size: 12px;
    width: 300px;
    border-radius: 100px;
    border: 2px solid #000;
    height: 30px;
    margin: 0 auto;
    margin-bottom: 10px;
    overflow: hidden;
    background: @gray;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    .left, .right {
      box-sizing: border-box;
      height: inherit;
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      background: @gray;
      background: transparent;
    }
    .left {
      padding-left: 17px;
      width: 50%;
      position: relative;
      .leftContent {
        background: @gray;
        border-right: 2.5px solid #000;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: scaleY(.9) perspective(20px) rotateX(-5deg);
        transform-origin: bottom left;
        z-index: -1;
        .leftText {
          position: absolute;
          padding-left: 17px;
          text-align: left;
          top: 50%;
          left: 0;
          transform: scaleY(1.1) perspective(20px) rotateX(5deg) translate(0, -50%);
          transform-origin: bottom left;
        }
      }
    }
    .right {  
      padding-right: 17px;
      justify-content: flex-end;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin: 0 auto;
  }
}
</style>

