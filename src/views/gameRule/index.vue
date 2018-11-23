<template>
  <div class="container">
    <div class="bg-contain">
      <div class="bg-left"></div>
      <div class="bg-close" @click="goBack">
        <img src="@/assets/close.png" alt="" />
      </div>
      <div class="bg-bottom">
        <img src="@/assets/rule-footer.png" alt="">
      </div>
      <template v-if="type === '1'">
        <div class="text-contain"  ref="wrapper">
          <div class="scroll-container">
            <div>
              <h1>{{$t('lang.gg_rules_view_title_gameRules')}}</h1>
              <p>{{$t('lang.gg_rules_view_gameRules_1')}}</p>
              <p>{{$t('lang.gg_rules_view_gameRules_2')}}</p>
              <p>{{$t('lang.gg_rules_view_gameRules_3')}}</p>
              <p>{{$t('lang.gg_rules_view_gameRules_4')}}</p>
              <p>{{$t('lang.gg_rules_view_gameRules_5')}}</p>
              <p>{{$t('lang.gg_rules_view_gameRules_6')}}</p>
              <p>{{$t('lang.gg_rules_view_gameRules_7')}}</p>
              <p>{{$t('lang.gg_rules_view_gameRules_8')}}</p>
            </div>
            <div>
              <h1 class="top-20">{{$t('lang.gg_rules_view_title_couponRules')}}</h1>
              <p>{{$t('lang.gg_rules_view_couponRules_1')}}</p>
              <p>{{$t('lang.gg_rules_view_couponRules_2')}}</p>
              <p>{{$t('lang.gg_rules_view_couponRules_3')}}</p>
              <p>{{$t('lang.gg_rules_view_couponRules_4')}}</p>
              <p>{{$t('lang.gg_rules_view_couponRules_5')}}</p>
            </div>
            <div>
              <h1 class="top-20">{{$t('lang.gg_couponRules_view_title_use')}}</h1>
              <p>{{$t('lang.gg_couponRules_view_use_1')}}</p>
              <p>{{$t('lang.gg_couponRules_view_use_2')}}</p>
              <p>{{$t('lang.gg_couponRules_view_use_3')}}</p>
              <p>{{$t('lang.gg_couponRules_view_use_4')}}</p>
              <p>{{$t('lang.gg_couponRules_view_use_5')}}</p>
            </div>
            <div>
              <h1 class="top-20">{{$t('lang.gg_rules_view_title_ranking')}}</h1>
              <p>{{$t('lang.gg_listRewardRules_view_rules_1')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_2')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_3')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_4')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_5')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_6')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_7')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_3')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_4')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_5')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_8')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_9')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_rules_10')}}</p>
              <p>{{$t('lang.gg_listRewardRules_view_use')}}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-if="type === '2'">
        <div class="text-contain"  ref="wrapper2">
          <div class="scroll-container">
            <h1>{{$t('lang.gg_couponRules_view_title_use')}}</h1>
            <p>{{$t('lang.gg_couponRules_view_use_1')}}</p>
            <p>{{$t('lang.gg_couponRules_view_use_2')}}</p>
            <p>{{$t('lang.gg_couponRules_view_use_3')}}</p>
            <p>{{$t('lang.gg_couponRules_view_use_4')}}</p>
            <p>{{$t('lang.gg_couponRules_view_use_5')}}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col } from 'vant'
import i18n from '../../locales'
import BScroll from 'better-scroll'
Vue.use(Row).use(Col)

export default{
  data() {
    return {
      type: ''
    }
  },
  created() {
    this.type = this.$route.params.type
  },
  mounted() {
    if (this.type === '1'){
      this.$nextTick(() => {
        const wrapper = this.$refs.wrapper;
        const scroll = new BScroll(wrapper, {
          click: true,
          taps: true
        });
      });
    } else if (this.type === '2'){
      this.$nextTick(() => {
        const wrapper2 = this.$refs.wrapper2;
        const scroll2 = new BScroll(wrapper2, {});
      });
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 20px 15px 20px 17px;
}
.bg-contain {
  width: 345px;
  height: ~"calc(100vh - 104px)";
  box-sizing: border-box;
  background-color: #fff;
  border: 4px solid #000;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 0;
  position: relative;
  .bg-left {
    width: 30px;
    height: ~"calc(100vh - 104px)";
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    box-sizing: border-box;
    background-color: #000;
    border: 4px solid #000;
    position: absolute;
    top: -2px;
    left: -2px;
  }
  .bg-close {
    text-align: right;
    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
      margin-top: 10px;
    }
  }
  .bg-bottom {
    height: 60px;
    width: 315px;
    position: absolute;
    bottom: -50px;
    left: 24px;
    img {
      height: 62px;
      width: 317px;
    }
  }
  .text-contain {
    padding: 0px 15px 15px 45px;
    color: #000; 
    height: ~"calc(100vh - 200px)";
    overflow: hidden;
    h1 {
      font-size: 20px;
      height:28px;
      text-align: left;
      margin: 10px 0;
    }
    p {
      font-size: 12px;
      text-align: left;
    }
    .top-20 {
      padding-top: 10px;
    }
  }
}
</style>
