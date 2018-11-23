import request from '../utils/request.js'
// reqwest,一个封装了promise的异步请求插件
// 需要cnpm install reqwest --save

export const fetchRemainTime = ({ commit }) => {
  request({
    url: 'bet_public/public/game/countdown',
    method: 'get'
  }).then(result => {
    if (result.ret === 1) {
      commit({
        type: 'getRemainTime', // 这个type很重要，vue会自动去找mutations.js中名为getMsg的方法
        result // 成功后把得到的数据通过commit传入mutations
      })
    }
  })
}

export const countRemainTime = ({ commit }, sec) => {
  commit({
    type: 'countRemainTime',
    sec
  })
}

export const fetchGameInfo = ({ commit, dispatch }, data) => {
  request({
    url: 'bet_public/public/game/info',
    method: 'get',
    data
  }).then(result => {
    if (result.ret === 1) {
      commit({
        type: 'getGameInfo',
        result
      })
    } else {
      commit({
        type: 'showErrorPopup',
        result
      })
    }
  })
}

export const fetchCustomerId = async ({ commit, dispatch }, data) => {
  const result = await request({ url: '/game/user/id', method: 'get' })
  console.log(result)
  if (result.ret === 1) {
    commit({
      type: 'getCustomerId',
      result
    })
    return result.data.customer_id
  }
}
