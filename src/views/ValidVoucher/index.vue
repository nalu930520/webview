<template lang="html">
  <div class="container">
    <Box fcolor="#FFE91F" bcolor="#fff" type="title" :icon="true" :show="true">
      {{$t('lang.gg_myCoupon_title_coupon')}}
    </Box>
    <div class="invite-container">
      <Box bcolor="#ddd" type="title1" :show="false">
        <van-row class="invite-title">
          <van-col span="20" class="invite-left">
            {{$t('lang.gg_myCoupon_button_invite')}}
          </van-col>
          <van-col span="4" class="invite-right">
            <!-- <router-link @click.native="addMtAH5Event":to="{ name: 'gameShare', params: { type: 0 }}" class="voucher-fotter-link"> -->
              <img src="@/assets/gift.png">
              <van-icon name="arrow" class="icon-arrow" />
            <!-- </router-link> -->
          </van-col>
        </van-row>
      </Box>
    </div>
    <div class="coupon-container"  ref="wrapper">
      <div>
        <template v-if="list && list.length">
          <CouponItem
            ref="card"
            disabled
            v-for="(item, index) in list"
            :key="item.id"
            :data="item"
            :classTrue="false"
          />
        </template>
        <template v-else>
          <div class="list-no-data">
            <NoDataBox :name="$t('lang.gg_HistoryCoupon_view_none')"/>
          </div>
        </template>
      </div>
    </div>
    <div class="voucher-fotter">
      <div class="btn-container">
        <router-link tag='div' :to="{ name: 'invalidVoucher'}" class="voucher-fotter-link">
          {{$t("lang.gg_myCoupon_button_historyCoupon")}}
        </router-link>
        <router-link tag='div' :to="{ path: 'gameRule/2'}" class="voucher-fotter-link">
          {{$t("lang.gg_myCoupon_button_explainCoupon")}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col, Icon } from 'vant'
import Box from '@/components/Box'
import CouponItem from '@/components/CouponList/item'
import NoDataBox from '@/components/NoDataBox'
import { queryValidCoupon} from '@/service'
import BScroll from 'better-scroll';
Vue.use(Button).use(Row).use(Col).use(Icon)

export default {
  components: {
    Box,
    CouponItem,
    NoDataBox
  },
  data() {
    return {
      showList: false,
      page: 1,
      endPage: false,
      loading: false,
      list: []
    };
  },
  created() {
    this.queryValidCoupon()
  },
  methods: {
    queryValidCoupon() {
      this.loading = true
      queryValidCoupon({ page: this.page, per_page: 10 }).then(
        response => {
          if (response.ret === 1) {
            if (response.data.list.length === 0) {
              this.endPage = true
            } else {
              this.list = this.list.concat(this.$options.filters.transferCouponList(response.data.list))
            }
            this.loading = false
            this.$nextTick(() => {
              if (!this.scroll) {
                const wrap = this.$refs.wrapper;
                this.scroll = new BScroll(wrap, {});
              } else {
                this.scroll.refresh()
              }
              this.scroll.on('scrollEnd', () => {
                if (this.scroll.y <= (this.scroll.maxScrollY + 20) && !this.loading && !this.endPage) {
                  this.page ++
                  this.queryValidCoupon()
                }
              })
            });
          } else {
            this.$toast(response.error)
          }
        }
      )
    },
    addMtAH5Event() {
      window.MtaH5.clickStat('share1',{'userid': this.$store.state.customerId})
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 10px 20px 20px 20px;
  .invite-container {
    margin-top: 15px;
    .invite-title {
      width: 335px;
      height: 50px;
      line-height: 50px;
      font-weight: 900;
      position: relative;
      .invite-left {
        text-align: left;
        padding-left:10px;
        font-size: 14px;
      }
      .invite-right {
        text-align: right;
        .icon-arrow {
          font-size: 12px;
          font-weight: 900;
          margin-right: 8px;
          color: #000;
        }
        img {
          width: 34px;
          position: absolute;
          top: 10px;
          right: 30px;
        }
      }
    }
  }
  .coupon-container {
    height: ~"calc(100vh - 200px)";
    overflow: hidden;
    .coupon-item {
      margin-bottom: 10px;
    }
  }
  .list-no-data {
    position: relative;
    top: 160px;
  }
  .voucher-fotter {
    position: fixed;
    bottom: 20px;
    left: 0;
    height: 28px;
    width: 375px;
    .btn-container {
      display: flex;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      top: 0;
      .voucher-fotter-link {
        height: 28px;
        line-height: 28px;
        border: 2px solid #000;
        background: #FFE91F;
        border-radius: 4px;
        margin: 0 10px;
        padding: 0 10px;
        white-space:nowrap;
        font-size: 12px;
      }
    }

  }
}
</style>
