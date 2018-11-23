import { Toast } from 'vant'
import i18n from '../locales'
let interval

const format = (num) => {
  return num < 10 ? `0${num}` : num
}
const count = (time) => {
  const hour = parseInt(time / 3600)
  const min = parseInt((time % 3600) / 60)
  const sec = parseInt((time % 3600) % 60)
  return `${format(hour)}:${format(min)}:${format(sec)}`
}

const countDayTime = (time) => {
  const day = parseInt((time / 3600) / 24)
  const hour = parseInt((time / 3600) % 24)
  const min = parseInt((time % 3600) / 60)
  const sec = parseInt((time % 3600) % 60)
  const language = i18n.locale === 'cn' ? '天' : 'd'
  const dayShow = day > 0 ? `${day}${language}` : ''
  return `${dayShow} ${format(hour)}:${format(min)}:${format(sec)}`
}

export const getRemainTime = (state, payload) => {
  if (interval !== undefined) {
    clearInterval(interval)
  }
  if (payload.result.ret !== 1) {
    state.remainTime = '--:--:--'
  } else {
    state.remainSeconds = payload.result.data.times
    state.remainTime = count(state.remainSeconds)
    state.remainType = payload.result.data.code
    interval = setInterval(() => {
      if (state.remainSeconds <= 0) {
        clearInterval(interval)
        state.remainTime = '00:00:00'
      } else {
        state.remainSeconds--
        state.remainTime = count(state.remainSeconds)
      }
    }, 1000)
  }
}

export const initRemainTime = (state, payload) => {
  state.betRemainTime = '--:--:--'
}

export const getHistory = (state, payload) => {
  state.history = payload.history
}

export const getMyBetHistory = (state, payload) => {
  state.myBetHistory = payload.history
}

export const currentPrice = (state, payload) => {
  console.log(payload.currentPrice.data)
  state.currentPrice = payload.currentPrice.data
}

export const getParticipateResult = (state, payload) => {
  state.participateResult.show = true
  state.participateResult.side = payload.result.data.side
}

export const showErrorPopup = (state, payload) => {
  Toast.fail(payload.result.error)
}

export const closePopup = (state, payload) => {
  state.participateResult.show = false
}

export const countRemainTime = (state, payload) => {
  state.remainSecond = payload.sec
}

export const getRewardInfo = (state, payload) => {
  state.rewardInfo = payload.rewardInfo
}

const getRewardPrice = (person) => {
  if (person <= 900) {
    return 15000
  } else if (person <= 1600) {
    return 32000
  } else if (person <= 3000) {
    return 70000
  } else if (person <= 6000) {
    return 154000
  } else if (person > 6000) {
    return 350000
  } else {
    return 15000
  }
}

const getRewardPerson = (person) => {
  if (person < 900) {
    return 900 - person
  } else if (person < 1600) {
    return 1600 - person
  } else if (person < 3000) {
    return 3000 - person
  } else if (person < 6000) {
    return 6000 - person
  } else if (person > 6000) {
    return 100
  } else {
    return 100
  }
}
export const getParticipateCount = (state, payload) => {
  const totalCountPerson = payload.result.data.fall + payload.result.data.flat + payload.result.data.rise
  state.nextRewardPerson = getRewardPerson(totalCountPerson)
  state.rewardPrice = getRewardPrice(totalCountPerson)
}

export const getGameInfo = (state, payload) => {
  state.gameInfo = payload.result.data
}

export const getCustomerId = (state, payload) => {
  state.customerId = payload.result.data.customer_id
}
