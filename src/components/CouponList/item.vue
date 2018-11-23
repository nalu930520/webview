<template>
  <div class="item" :class="{ disabled: disabled }">
    <div class="head">
      <div class="lines" />
      <div class="gradient" :class="[classTrue ? 'circle1' : 'circle']">
        <h2 v-html="faceAmount" />
        <!-- <p>{{ conditionMessage }}</p> -->
      </div>
    </div>
    <div class="body">
      <h2>{{ $t(data.name) }}
        <div v-if="!disabled" class="use-btn">
          <router-link tag='div' to="/gameindex">
            {{$t("lang.gg_use")}}
          </router-link>
        </div>
      </h2>
      <span>{{ validPeriod }}</span>
      <p v-if="data.reason">{{$t(data.reason, {0: $options.filters.formatBitsAmount(data.origin_condition)})}}</p>
      <!-- <div v-if="chosen" class="corner" >
        <van-icon name="success" />
      </div> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
Vue.use(Icon)

export default {
  name: 'coupon-item',

  props: {
    data: Object,
    chosen: Boolean,
    disabled: Boolean,
    classTrue: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    validPeriod() {
      return `${this.getDate(this.data.start_at)}-${this.getDate(this.data.end_at)}`;
    },

    faceAmount() {
      return this.data.denominations !== 0
        ? `${this.formatAmount(this.data.denominations)} <br/><span style="font-size: 16px">bits</span>`
        : this.data.discount !== 0
          ? this.formatDiscount(this.data.discount)
          : '';
    },

    conditionMessage() {
      let condition = this.data.origin_condition;
      condition = condition % 100 === 0 ? Math.round(condition / 100) : (condition / 100).toFixed(2);
      return this.data.origin_condition === 0 ? this.$t('unlimited') : this.$t('condition', condition);
    }
  },

  methods: {
    getDate(timeStamp) {
      const date = new Date(timeStamp * 1000);
      return `${date.getFullYear()}.${this.padZero(date.getMonth() + 1)}.${this.padZero(date.getDate())}`;
    },

    padZero(num) {
      return (num < 10 ? '0' : '') + num;
    },

    formatDiscount(discount) {
      return this.$t('discount', `${(discount / 10).toFixed(discount % 10 === 0 ? 0 : 1)}`);
    },

    formatAmount(amount) {
      return (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
    }
  }
};
</script>
<style lang="less" scoped>
  .item{
    display: flex;
    min-height: 95px;
    overflow: hidden;
    margin-top: 10px;
    .head{
      display: flex;
      height: auto;
      width: 23%;
      line-height: 1;
      min-height: 100%;
    }
    .gradient{
      flex: 1;
      width: 70%;
      color: #F91737;
      border:2px solid #000;
      border-right: none;
      border-radius:7px 0 0 7px; /* 左上、右上、右下、左下 */
      background-color: #FFE91F;
      display: flex;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      &.circle{
        position: relative;
        z-index: 99;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &::before{
          content: ''!important;
          position: absolute;
          top: -10px;
          right: -10px;
          border:2px solid #000;
          width:15px;
          height:15px;
          background-color:#27378C;
          border-radius:0 0 15px 15px; /* 左上、右上、右下、左下 */
        }
        &::after{
          content: ''!important;
          position: absolute;
          bottom: -10px;
          right: -10px;
          border:2px solid #000;
          width:15px;
          height:15px;
          background-color:#27378C;
          border-radius:10px 10px 0 0; /* 左上、右上、右下、左下 */
        }
      }
      &.circle1{
        position: relative;
        z-index: 99;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &::before{
          content: ''!important;
          position: absolute;
          top: -10px;
          right: -10px;
          border:2px solid #000;
          width:15px;
          height:15px;
          background-color:#FFF;
          border-radius:0 0 15px 15px; /* 左上、右上、右下、左下 */
        }
        &::after{
          content: ''!important;
          position: absolute;
          bottom: -10px;
          right: -10px;
          border:2px solid #000;
          width:15px;
          height:15px;
          background-color:#FFF;
          border-radius:10px 10px 0 0; /* 左上、右上、右下、左下 */
        }
      }
      h2{
        font-size: 22px;
        font-weight: normal;
        margin: 0;
        span{
          font-size: 12px;
        }
      }
    }
    &.disabled{
      .gradient{
        color: #666;
        background-color: #D8D8D8;
      }
    }
    .body{
      flex: 1;
      height: 100%;
      min-height: 70px;
      display: flex;
      padding: 10px;
      border:2px solid #000;
      border-left: none;
      overflow: hidden;
      position: relative;
      background-color: #fff;
      flex-direction: column;
      justify-content: center;
      border-radius: 0 4px 4px 0;
      .use-btn{
        background-color: #FFE91F;
        border: 1px solid #000;
        display: inline-block;
        float: right;
        border-radius: 4px;
        padding: 0 10px;
        line-height: 28px;
        font-size: 14px;
      }
      h2,span{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
      }
      h2{
        margin: 0;
        line-height: 30px;
        opacity: .8;
        font-size: 16px;
        font-weight: normal;
      }
      span{
        color: #999;
        font-size: 12px;
        margin: 5px 0 0;
      }
      p{
        color: #999;
        font-size: 10px;
        margin: 5px 0 0;
        text-align: left;
        white-space: pre-line;
      }
    }
  }
</style>
