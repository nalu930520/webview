<template>
  <div id="app">
    <router-view/>
    <LastResultPopup
      :show="showLastResultPopup"
      @closePopup="close"
      :transferData="gameResultData"
    />
  </div>
</template>

<script>
import native from '@/utils/native'
import { Toast } from 'vant'
import moment from 'moment'
import { setStore, getStore } from '@/utils/localstorge'
import { fetchInviteCode, firstLanding, gameResult } from '@/service'
import LastResultPopup from '@/components/lastResultPopup'

const setTitle = (titleName) => {
  if (!native) return ''
  return native.setTitle(titleName)
}

const updateShareTriggerState = (showShare) => {
  if (!native) return ''
  return native.updateShareTriggerState(showShare)
}
export default {
  name: 'App',
  data() {
    return{
      showLastResultPopup: false,
      showShare: false,
      shareType: 0,
      gameResultData: {}
    }
  },
  components: {
    LastResultPopup,
  },
  updated () {
    setTitle(this.$t('lang.gg_title'))
    const routeName = this.$route.name
    // title 切换根据 route name
    // switch (routeName) {
    //   case 'record':
    //     updateShareTriggerState(false)
    //     break;
    //   default:
    //     updateShareTriggerState(false)
    //     break
    // }
  },
  methods: {
    // 游戏结果
    async fetchGameResult() {
      const res = await gameResult()
      if (res.ret === 1 && res.data.result !== 3) {
        this.gameResultData = res.data
        if(getStore("gameTerm")){
          if(getStore("gameTerm") < res.data.game_name){
            this.showLastResultPopup = true
          }
        }else{
          this.showLastResultPopup = true
        }
        setStore("gameTerm", res.data.game_name)
      }
    },
    async getInviteCode() {
      const formData = new FormData();
      formData.append('type', 3)
      const code = await fetchInviteCode(formData)
      if (code.ret === 1) {
        setStore('invite_code', code.invite_code)
      }
    },
    close(){
      this.showLastResultPopup = false
    }
  },
  created() {
    const txt = this.$t('lang.no_signal');
    this.getInviteCode()
    this.fetchGameResult()
    window.addEventListener('offline', function() {
      const toast =  Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: txt
      })
    })
    window.addEventListener('online', function() {
      Toast.clear();
      this.$store.dispatch('fetchGameInfo')
      this.$store.dispatch('fetchRemainTime')
    })
    let rclick = true
  }
}
</script>

<style lang="less">
@font-face {
  font-family: 'DIN';
  src: url('./assets/fonts/DIN/DIN-Medium.otf');
}
* {
 margin: 0;
 padding: 0;
}
img {
  content: normal !important;
}
body {
  -webkit-overflow-scrolling: touch;
}
#app {
  font-family: 'DIN', sans-serif, Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  background:rgb(39, 55, 140);
  background-image: linear-gradient(hsla(0,0%,100%,.3) 1px,transparent 0),
                    linear-gradient(90deg,hsla(0,0%,100%,.3) 1px,transparent 0);
  background-size:20px 20px,20px 20px;
  min-height: 100vh;
  width: 100vw;
  height: 100%;
  overflow: hidden;
}
.common-title {
  font-size: 3.2rem;
  color: #fff;
  text-align: left;
  margin-top: 0;
  margin-bottom: 2rem;
}
</style>
