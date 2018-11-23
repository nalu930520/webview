<template lang="html">
  <div class="container">
    <Box fcolor="#FFE91F" bcolor="#fff" type="title" :icon="true">
      {{$t('lang.gg_historyCoupon_title')}}
    </Box>
    <div class="coupon-container"  ref="wrapper">
      <div>
        <template v-if="list && list.length">
          <CouponItem
            disabled
            v-for="item in list"
            :key="item.id || item.name"
            :data="item"
            :classTrue="false"
            class="coupon-item"
          />
        </template>
        <template v-else>
          <div class="list-no-data">
            <NoDataBox :name="$t('lang.gg_HistoryCoupon_view_none')"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col } from 'vant'
import Box from '@/components/Box'
import CouponItem from '@/components/CouponList/item'
import NoDataBox from '@/components/NoDataBox'
import { queryInvalidCoupon} from '@/service'
import BScroll from 'better-scroll';
Vue.use(Button).use(Row).use(Col)

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
    this.queryInvalidCoupon()
  },
  methods: {
    queryInvalidCoupon() {
      this.loading = true
      queryInvalidCoupon({ page: this.page, per_page: 10 }).then(
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
                  this.queryInvalidCoupon()
                }
              })
            });
          } else {
            this.$toast(response.error)
          }
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 10px 20px 20px 20px;
  .coupon-container {
    margin-top: 10px;
    height: ~"calc(100vh - 88px)";
    overflow: hidden;
    .coupon-item {
      margin-bottom: 10px;
    }
  }
  .list-no-data {
    position: relative;
    top: 160px;
  }
}
</style>
