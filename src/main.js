// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Bg from 'bignumber.js'
import moment from 'moment'
import App from './App'
import router from './router'
import store from './store'
import i18n from './locales'
import {setStore, getStore} from '@/utils/localstorge'
import { firstLanding, gameResult } from '@/service'
require('core-js/fn/object/assign')
require('core-js/fn/array/find')

document.body.addEventListener('touchmove', (e) => {
  if (document.body.clientHeight <= document.documentElement.clientHeight) {
    e.preventDefault()
  }
}, { passive: false })

Vue.config.productionTip = false

Vue.filter('formatGameId', function (id) {
  if (!id) {
    return ''
  }
  switch (id.toString().length) {
    case 1:
      return `00${id}`
    case 2:
      return `0${id}`
    case 3:
      return id
  }
})
// 手机号 000****0000
Vue.filter('formatPhoneNumber', function (value) {
  if (!value) return ''
  return value.substr(0, 3) + '****' + value.substr(7)
})

Vue.filter('formatAmount', function (value) {
  if (!value) return value
  return Bg(value).toFormat(2, 1)
})

Vue.filter('formatTime', function (value) {
  if (!value) return '-'
  return moment.unix(value).format('YYYY-MM-DD')
})

Vue.filter('formatBitsAmount', function (value, dec) {
  if (value === 0) return 0
  if (!value) return ''
  return Bg(value / 100).toFormat(dec === 0 ? 0 : 2, 1)
})
Vue.filter('formatUSDAmount', function (value) {
  if (value === 0) return 0
  if (!value) return ''
  return Bg(value / 100000000).toFormat(2, 1)
})

Vue.filter('segmentation', function (value) {
  if (value === 0) return 0
  if (!value) return ''
  return Bg(value).toFormat(0, 1)
})
const getName = function (code) {
  switch (code) {
    case 0:
      return 'lang.gg_achieveCoupon_view_title_welcome'
    case 1:
      return 'lang.gg_achieveCoupon_view_title_signIn'
    case 2:
      return 'lang.gg_voucherInvite_view_title'
    case 3:
      return 'lang.gg_voucherFriday_view_title'
    default:
      return 'lang.gg_myCoupon_title_coupon'
  }
}
const getReason = function (code) {
  switch (code) {
    case 0:
      return 'lang.gg_voucherNew_view_explain'
    case 1:
      return 'lang.gg_voucherSignIn_view_explain'
    case 2:
      return 'lang.gg_voucherInvite_view_explain'
    case 3:
      return 'lang.gg_voucherFriday_view_explain'
    default:
      return ''
  }
}
Vue.filter('transferCouponList', function (arr) {
  if (arr.length <= 0) return []
  return arr.map((obj) => {
    return {
      id: obj.id,
      discount: 0,
      denominations: obj.amount,
      origin_condition: obj.limit_amount,
      reason: getReason(obj.from_source),
      value: obj.amount,
      from_source: obj.from_source,
      name: getName(obj.from_source),
      start_at: obj.create_at,
      end_at: obj.deadline
    }
  })
})

const whiteList = ['/game/']
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) == -1) {
    next()
  } else {
    fetchFirstLanding().then((datas) => {
      if (datas === '/gameindex') {
        next({ path: '/gameindex', replace: true })
      } else if (datas === '/game') {
        next({ path: '/game', replace: true })
      } else {
        next({ path: '/game', replace: true , query: { data: JSON.stringify(datas)} })
      }
    })
  }
})

// 新人优惠券
async function fetchFirstLanding() {
  const res = await firstLanding()
  if (res.ret === 1) {
    setStore("time", moment().format('YYYY-MM-DD'))
    if (res.data) {
      return res.data
    } else {
      if (moment(moment().format('YYYY-MM-DD')).isSame(getStore('time'))) {
        return '/gameindex'
      } else {
        return '/game'
      }
    }
  }
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
