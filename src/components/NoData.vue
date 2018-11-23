<template>
  <div class="no_data">
    <img src="@/assets/icon_nodata@2x.png" alt="">
    <p>{{$t('lang.game.worldcup_text_prediction_me_no')}}</p>
  </div>
</template>
<style scoped lang="less">
  .no_data{
    text-align: center;
    background-color: #fff;
    padding: 2rem;
    img{
      width: 80px;
    }
    p {
      color:rgb(153, 153, 153);
    }
  }
</style>
<script>
export default {}
</script>
