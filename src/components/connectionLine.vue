<template>
  <van-row type="flex">
    <van-col span="3">
      <div class="line line-left">
        <div>
          <span></span>
        </div>
        <div>
          <span></span>
        </div>
      </div>
    </van-col>
    <van-col span="17">
    </van-col>
    <van-col span="3">
      <div class="line line-right">
        <div>
          <span></span>
        </div>
        <div>
          <span></span>
        </div>
      </div>
    </van-col>
  </van-row>
</template> 
<script>
export default {}
</script>
<style lang="less">
  .line{
    height: auto;
    width: 30px;
    div {
      border: 2px solid #000;
      border-radius: 4px;
      display: inline-block;
      width: 11px;
      height: 11px;
      display: inline-block;
      background: rgb(39, 55, 140);
      position: relative;
      box-sizing: border-box;
      span {
        width: 7px;
        height: 40px;
        position: absolute;
        bottom: 2px;
        left: 0px;
        display: inline-block;
        background: #FFF;
        border-radius: 0 0 10px 10px;
        border: 2px solid #000;
        box-sizing: border-box;
      }
    }
  }
  .line-left{
    float:left;
    margin-left: 20px;
  }
  .line-right{
    float:right;
  }
</style>