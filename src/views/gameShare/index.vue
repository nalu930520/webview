<template>
  <div class="shareWraper" id="shareWraper">
    <div class="gameShare" >
      <template v-if="type !== 0" >
        <div class="topWraper">
          <img :src="imgData" alt="" class="recordImg">
        </div>
        <Box fcolor="#FFE91F" bcolor="#fff" type="btn" :icon="false" class="recordTitle myRecord">
          {{$t(type === 1 ? 'lang.gg_share1_view_scan' : 'lang.gg_share2_view_scan')}}
        </Box>
        <div class="shareInfo">
          <template v-if="type === 1">
            <div class="infoTop">
              <img src="@/assets/person-circle.png" alt="">
              <div>{{userInfo.customer_name}}</div>
            </div>
            <div class="infoBottom">
              <ul>
                <li>
                  <span>{{$t("lang.gg_myProfile_view_wins")}}</span>
                  <span>{{userInfo.win_count}} / {{userInfo.all_count}}</span>
                </li>
                <li>
                  <span>{{$t("lang.gg_myProfile_view_winRate")}}</span>
                  <span>{{getCorrectRate()}} %</span>
                </li>
                <li>
                  <span>{{$t("lang.gg_myProfile_view_earnings")}}</span>
                  <span>{{userInfo.all_reward | formatBitsAmount}} bits</span>
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <p>{{$t("lang.gg_share2_view_informations0")}}</p>
            <img :src="getStatusImg" class="statusImg"/>
            <p>{{$t("lang.gg_share2_view_informations1", { 0: $store.state.gameInfo.name })}}</p>
            <i18n path="lang.gg_share2_view_informations2" tag="p">
              <span place="0" :style="{ color: status === 1 ? '#0BBA7C' : '#FD5B76'}">{{this.amount}}</span>
              <span place="1" :style="{ color: status === 1 ? '#0BBA7C' : '#FD5B76'}">{{$t(status === 1 ? 'lang.gg_status_1': 'lang.gg_status_2')}}</span>
            </i18n>
            <p>{{$t("lang.gg_share2_view_informations3")}}</p>
          </template>
        </div>
      </template>
      <template v-else>
        <img class="middleImg" :src="imgData" alt="">
      </template>
      <div class="bottom" :style="{ background: this.type !== 0 ? 'none' : '' }">
        <template v-if="type === 0">
          <div class="title">{{$t('lang.gg_share2_view_scan')}}<img src="@/assets/topCoin.png" alt=""></div>
        </template>
        <div class="qrcodeWraper">
          <div class="qrcodeTop">
            <VueQrcode
              :value="getQrUrl"
              tag="img"
              :options="{
                size: '100',
                level: 'H'
              }"
            />
            <img class="qrcode-icon" src="@/assets/mobi-icon.png" alt="">
          </div>
          <div class="qrbottom" :style="{ height: this.type !== 0 ? '14px' : '' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import native from '@/utils/native'
import Box from '@/components/Box'
import html2canvas from 'html2canvas'
import VueQrcode from '@xkeshi/vue-qrcode'
import store from 'store'
import { registerURL } from '@/utils/config'
import bannerIndexEn from '@/assets/banner_index_en.png'
import bannerIndexCn from '@/assets/banner_index_cn.png'
import upStatusImgCn from '@/assets/shareUpCN.png'
import upStatusImgEN from '@/assets/shareUpEN.png'
import downStatusImgCn from '@/assets/shareDownCN.png'
import downStatusImgEN from '@/assets/shareDownEN.png'
import localstorage from 'store'
const showNativeShare = (base64Img) => {
  const baseContent = `base64://${base64Img.split(',')[1]}`
  const imageArray = []
  imageArray.push(baseContent)
  native.share(JSON.stringify({
    title: '',
    images: imageArray,
    text: `${window.location.origin}/gameindex?invite_code=${localstorage.get('invite_code')}`
  }))
}

const statusImg = {
  1: {
    'en': upStatusImgEN,
    'cn': upStatusImgCn,
  },
  2: {
    'en': downStatusImgEN,
    'cn': downStatusImgCn,
  }
}

export default {
  components: {
    Box,
    VueQrcode,
  },
  data() {
    return {
      type: 0,
      amount: 0,
      status: 1,
      userInfo: {
        all_count: 0,
        customer_name: '',
        all_reward: '',
      }
    }
  },
  computed: {
    getQrUrl() {
      return `${registerURL}?invite_code=${store.get('invite_code')}`
    },
    imgData() {
     return this.$i18n.locale === "en" ? bannerIndexEn : bannerIndexCn
    },
    getStatusImg() {
      return statusImg[this.status][this.$i18n.locale]
    }
  },
  methods: {
    getCorrectRate() {
      if (this.userInfo.all_count === 0) {
        return 0
      }
      return Math.floor(this.userInfo.win_count / this.userInfo.all_count * 100)
    }
  },
  created() {
    // type 1 是个人战绩
    // type 2 看涨跌
    // type 0 正常分享
    this.type = this.$route.params.type
    if (this.type === 1) {
      this.userInfo = JSON.parse(this.$route.query.data)
    }
    if (this.type === 2) {
      this.amount = this.$route.query.amount
      // status 1 涨
      // status 2 跌
      this.status = this.$route.query.status
    }
    this.$nextTick(() => {
      const htmlBody = document.getElementById('shareWraper')
      html2canvas(htmlBody,
        {
          useCORS: true,
          backgroundColor: '#000',
        }
      )
        .then(function (canvas) {
          const base64Img = canvas.toDataURL('image/png')
          showNativeShare(base64Img)
        })
    })
  }
}
</script>

<style scoped lang="less">
 @import './index.less';
</style>
