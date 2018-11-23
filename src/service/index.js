import request from '../utils/request.js'

export const fetchInviteCode = (data) => {
  return request({
    url: 'user/invite_code',
    method: 'post',
    data
  })
}
export const queryUserHistoryList = (data) => {
  return request({
    url: 'height_bet/user/bet_history',
    method: 'get',
    data
  })
}

export const queryProfitRank = () => {
  return request({
    url: 'height_bet/game/profit_rank',
    method: 'get'
  })
}

export const queryWinnerRank = () => {
  return request({
    url: 'height_bet/game/winner_rank',
    method: 'get'
  })
}

export const queryInviteRank = () => {
  return request({
    url: 'height_bet/charts/invite',
    method: 'get'
  })
}
// 用户信息
export const UserInfo = data => {
  return request({
    url: 'user/height_game/info',
    method: 'get',
    data
  })
}
// 历史战绩
export const historicalRecord = data => {
  return request({
    url: 'height_bet/user/bet_history',
    method: 'get',
    data
  })
}

// 签到
export const signInqd = data => {
  return request({
    url: 'height_bet/user/sign_in',
    method: 'post',
    data
  })
}
// 签到历史
export const signInqdHistory = data => {
  return request({
    url: 'height_bet/user/sign_in_list',
    method: 'get',
    data
  })
}
// 待领卷
export const pendingVolume = data => {
  return request({
    url: 'height_bet/sign/voucher',
    method: 'post',
    data
  })
}
// 首次登陆送优惠券
export const firstLanding = data => {
  return request({
    url: 'height_bet/user/first_voucher',
    method: 'get',
    data
  })
}
// 游戏结果
export const gameResult = data => {
  return request({
    url: 'height_bet/user/last_result',
    method: 'get',
    data
  })
}
export const queryKChartData = data => {
  return request({
    url: `https://api.pro.coinbase.com/products/BTC-USD/candles?start=${data.start}&end=${data.end}&granularity=60`,
    method: 'get'
    // data
  }, true)
}

export const queryCoinBaseTrades = data => {
  return request({
    url: 'https://api.pro.coinbase.com/products/BTC-USD/trades',
    method: 'get'
  }, true)
}

export const queryGameInfo = data => {
  return request({
    url: 'bet_public/public/game/info',
    method: 'get',
    data
  })
}

export const queryUserLastResult = data => {
  return request({
    url: 'height_bet/user/last_result',
    method: 'get'
  })
}

export const participateBet = data => {
  return request({
    url: 'height_bet_participation',
    method: 'post',
    data
  })
}

export const queryValidCoupon = data => {
  return request({
    url: 'height_bet/user/voucher_valid',
    mehtod: 'get',
    data
  })
}

export const queryInvalidCoupon = data => {
  return request({
    url: 'height_bet/user/voucher_list',
    mehtod: 'get',
    data
  })
}

export const queryGameHistory = data => {
  return request({
    url: 'height_bet/game/history',
    method: 'get',
    data
  })
}

export const queryScrollContent = data => {
  return request({
    url: 'bet_public/public/game/scroll',
    method: 'get',
    data
  })
}

export const queryUserWallet = data => {
  return request({
    url: `wallet/${data.currencyCode}`,
    method: 'get'
  })
}
