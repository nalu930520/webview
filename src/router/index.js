import Vue from 'vue'
import Router from 'vue-router'
const Game = () => import(/* webpackChunkName: "Game" */'@/views/Game')
const GameIndex = () => import(/* webpackChunkName: "Game" */'@/views/GameIndex')
const rank = () => import(/* webpackChunkName: "rank" */'@/views/rank/index')
const ganmeRule = () => import(/* webpackChunkName: "gameRule" */'@/views/gameRule/index')
const historyList = () => import(/* webpackChunkName: "gameRule" */'@/views/history/index')
const myInformation = () => import(/* webpackChunkName: "myInformation" */'@/views/myInformation')
const gameRecord = () => import(/* webpackChunkName: "gameRecord" */'@/views/gameRecord/index')
const gameShare = () => import(/* webpackChunkName: "gameShare" */ '@/views/gameShare/index')
const InvalidVoucher = () => import(/* webpackChunkName: "InvalidVoucher" */ '@/views/InvalidVoucher/index')
const ValidVoucher = () => import(/* webpackChunkName: "ValidVoucher" */ '@/views/ValidVoucher/index')

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (to.name === 'BettingPage') {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/gameindex',
      name: 'gameindex',
      component: GameIndex
    },
    {
      path: '/myInformation',
      name: 'myInformation',
      component: myInformation
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/gameRule/:type',
      name: 'gameRule',
      component: ganmeRule
    },
    {
      path: '/historyList',
      name: 'historyList',
      component: historyList
    },
    {
      path: '/gameRecord',
      name: 'gameRecord',
      component: gameRecord
    },
    {
      path: '/gameShare/:type',
      name: 'gameShare',
      component: gameShare
    },
    {
      path: '/invalidVoucher',
      name: 'invalidVoucher',
      component: InvalidVoucher
    },
    {
      path: '/validVoucher',
      name: 'validVoucher',
      component: ValidVoucher
    }
  ]
})
