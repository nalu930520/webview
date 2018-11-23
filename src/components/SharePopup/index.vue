<template>
  <van-popup v-model="show" @click-overlay="$emit('close')" :lazy-render="false">
    <div class="share-wraper" id="share-wraper">
      <img class="share-wraper-img" :src="ShareBg">
      <div class="share-content-wraper" v-if="type === 1">
        <img class="icon-football" src="@/assets/icon_football@2x.png">
        <h1>{{$t('lang.game.game_button_prediction_me')}}</h1>
        <van-row class="result-container">
          <van-col span="12">
            <p class="result-title">{{$t('lang.game.worldcup_text_share_2_2')}}</p>
            <p class="result-win color-red">{{data.winNum}}</p>
          </van-col>
          <van-col span="1">
            <p class="mid-line"></p>
          </van-col>
          <van-col span="11">
            <p class="result-title">{{$t('lang.game.worldcup_text_share_2_3')}}</p>
            <p class="result-win color-blue">{{data.amount | formatBitsAmount}}</p>
          </van-col>
        </van-row>
        <div class="share-content-text">
          <p>{{$t('lang.game.worldcup_text_share_2_4')}}</p>
          <p>{{$t('lang.game.worldcup_text_share_2_5')}}</p>
        </div>
      </div>
      <div class="share-qrcode">
        <div class="share-people" v-if="type === 0" >
          <img src="@/assets/icon_people@2x.png">
        </div>
        <Qrcode :data="url"/>
        <div class="share-text" v-if="type === 0">
          {{$t('lang.game.worldcup_text_share_1_3')}}
        </div>
        <div class="share-text" v-if="type === 1">
          {{$t('lang.game.worldcup_text_share_2_6')}}
        </div>
      </div>
    </div>
  </van-popup>
</template>

<style scoped lang="less" >
  @import 'style.less';
</style>

<script>
import Vue from 'vue'
import { Popup, Row, Col, Icon } from 'vant'
import Qrcode from '@/components/Qrcode'
import html2canvas from 'html2canvas'
import domtoimage from 'dom-to-image'
import native from '@/utils/native'
import { getStore } from '@/utils/localstorge'
import { registerURL } from '@/utils/config'
import i18n from '../../locales'
import shareBg0 from '@/assets/image_share@2x.png'
import shareBg0EN from '@/assets/image_share_en@2x.png'
import shareBg1 from '@/assets/image_share_me@2x.png'
import shareBg1EN from '@/assets/image_share_me_en@2x.png'

Vue.use(Row).use(Col).use(Popup).use(Icon)
const showNativeShare = (base64Img) => {
  const baseContent = `base64://${base64Img.split(',')[1]}`
  const imageArray = []
  imageArray.push(baseContent)
  native.share(JSON.stringify({
    title: '',
    images: imageArray,
    text: ''
  }))
}
export default {
  name: 'SharePopup',
  props: ['show', 'type', 'data','close'],
  data () {
    return {
      url: registerURL,
      lang: 'cn',
      ShareBg: shareBg0,
    }
  },
  components: {
    Qrcode
  },
  created () {
    if (this.type === 0) {
      this.ShareBg = this.$i18n.locale === 'cn' ? shareBg0 : shareBg0EN
    } else {
      this.ShareBg = this.$i18n.locale === 'cn' ? shareBg1 : shareBg1EN
      this.amount = this.$route.query.amount
      this.winNum = this.$route.query.winNum
    }
    if (native) {
      this.lang = native.getLanguage().toLowerCase()
    }
    if (getStore('invite_code')){
      this.url = `${registerURL}?invite_code=${getStore('invite_code')}`
    }
  },
  watch: {
    '$route' (to, from) {
      this.$emit('close')
    }
  },
  updated() {
    if(this.show) {
      this.shareCanvas(document.getElementById('share-wraper'))
    }
  },
  methods: {
    shareCanvas (htmlBody) {
      if (native.platform() === 'android') {
        domtoimage.toPng(htmlBody)
          .then(function (dataUrl) {
            showNativeShare(dataUrl)
          })
          .catch(function (error) {
              console.error('dom to image error', error);
          });
      } else {
        html2canvas(htmlBody,
          {
            useCORS:true,
          }
        )
          .then(function (canvas) {
            const base64Img = canvas.toDataURL('image/png')
            showNativeShare(base64Img)
          })
      }
    },
    share() {
      this.shareCanvas(document.getElementById('share-wraper'))
    }
  }
}
</script>
