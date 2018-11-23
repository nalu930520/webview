<template>
  <footer class="footer">
    <ul class="footer-box">
      <li>
        <router-link to="/gameRecord" tag="div" class="router-class">
          <img src="@/assets/tab1_img.png" alt="">
          <div class="footer-box-title">
            <div class="footer-box-title-l">{{$t("lang.gg_button_record")}}</div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/rank" tag="div" class="router-class">
          <img src="@/assets/tab3_img.png" alt="">
          <div class="footer-box-title">
            <div class="footer-box-title-l">{{$t("lang.gg_button_rankingList")}}</div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/myInformation" tag="div" class="router-class">
          <img src="@/assets/tab2_img.png" alt="">
          <div class="footer-box-title">
            <div class="footer-box-title-l">{{$t("lang.gg_button_myProfile")}}</div>
          </div>
        </router-link>
      </li>
    </ul>
  </footer>
</template>
<script>
export default {}
</script>
<style scoped lang="less">
.footer {
    // position: fixed;
    // bottom: 0;
    // left: 0;
    // z-index: 1000;
    // width: 100%;
    height: 115px;
    .footer-box {
        display: flex;
        li {
            flex: 1;
            padding: 16px 0 16px 0;
            .router-class {
                cursor: pointer;
            }
            img {
                width: 50px;
                height: 50px;
            }
        }
        .footer-box-title {
          color: #FFF;
          font-size: 12px;
          .footer-box-title-l{
            margin: 0 auto;
            width: 68px;
            height: 25px;
            line-height: 25px;
            background: rgb(255, 233, 31);
            border: 2px solid #000;
            border-radius: 4px;
            color:#000;
            text-align: center;
          }
        }
    }
}
</style>
