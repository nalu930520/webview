<template>
  <div class="qrcode-content">
    <div class="qrcode-wraper">
      <VueQrcode
        :value="data"
        tag="img"
        :options="{
          size: '110',
          level: 'H'
        }"
      />
      <img class="qrcode-icon" src="@/assets/mobi-icon.png" alt="">
    </div>
  </div>
</template>

<script>
import VueQrcode from '@xkeshi/vue-qrcode'
export default {
  name: 'qrcode',
  props: ['data'],
  components: {
    VueQrcode
  }
}
</script>
<style scoped lang="less" >
 .qrcode-content {
    .qrcode-wraper {
      width: 110px;
      height: 110px;
      margin: 0 auto;
      position: relative;
      z-index: 3;
      .qrcode-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 4;
        width: 22px;
      }
      img {
      }
    }
  }
  .bottom-button {
    width: 100%;
    font-size: 1.6rem;
    color: #FFF;
    font-weight: bold;
    background-color: #0231C6;
    padding: 1.5rem 0;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
