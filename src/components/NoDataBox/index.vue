
<template lang="html">
  <div class="no-data-contain">
    <div class="top-circle">
      <div></div>
    </div>
    <div class="no-data-box-width">
      <span>
        {{name}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props:['name'],
}
</script>

<style lang="less">
@yellow: rgb(255, 233, 31);
@black: rgb(0, 0, 0);
 .no-data-contain {
    width: 150px;
    margin:0 auto;
    position: relative;
    .no-data-box-width {
      width: 170px;
      height: 45px;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      border: 2px solid @black;
      background: rgb(214, 214, 214);
      position: absolute;
      top: 30px;
      left: -14px;
      z-index: 9;
      font-size: 14px;
      font-weight: 800;
      padding-left: 4px;
      &::before {
        content: '' !important;
        width: 174px;
        height: 45px;
        border-radius: 5px;
        border: 2px solid @black;
        background: rgb(214, 214, 214);
        position: absolute;
        top: -6px;
        left: 2px;
        z-index: -1;
      }
    }
    .top-circle ,.top-circle div{
      width: 10px;
      height: 10px;
      background: @yellow;
      border: 2px solid @black;
      border-radius: 10px;
      margin: 0 auto;
      position: relative;
    }
    .top-circle {
      div {
        position: absolute;
        top: -4px;
        left: 1px;
      }
      &::before {
        content: '' !important;
        width: 80px;
        height: 2px;
        background: @black;
        position: absolute;
        top: 18px;
        left: 1px;
        transform: rotate(25deg);
      }
      &::after {
        content: '' !important;
        width: 70px;
        height: 2px;
        background: @black;
        position: absolute;
        top: 20px;
        left: -67px;
        transform: rotate(155deg);
      }
    }
  }
</style>
