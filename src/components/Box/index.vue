<template lang="html">
  <div v-if="show" class="box-container" :class="{[type]: true}" :style="{backgroundColor: bcolor}">
    <div class="div-relative" :class="{[direction]: true}" :style="{backgroundColor: fcolor}">
      <div :class="{[type]: true}">
        <div v-if="icon" class="icon_box">
          <span class="icon"></span>
          <span class="icon"></span>
          <span class="icon"></span>
          <span class="icon"></span>
          <slot></slot>
        </div>
        <div v-else>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="box-container" :class="{[type]: true}" :style="{backgroundColor: bcolor}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    fcolor: {
      type: String,
    },
    bcolor: {
      type: String,
    },
    type: {
      type: String,
    },
    icon: {
      type: Boolean,
    },
    direction: {
      type: String,
    },
    show:{
      default: true
    }
  },
  created(){
    console.log(this.show)
  }
}
</script>

<style lang="less">
.box-container{
  border: 2px solid #000;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  z-index: 1;
  &.title{
    &::before, &::after{
      content: ""!important;
      position: absolute;
      top:-10px;
      height: 10px;
      width: 8px;
      background-color: #fff;
      border-left: 2px solid #000;
      border-right: 2px solid #000;
      z-index: 0;
    }
    &::before{
      left: 25%;
      transform: translateX(-45%);
    }
    &::after{
      left: 75%;
      transform: translateX(-55%);
    }
  }
}
.div-relative{
  border-radius: 4px;
  border: 2px solid #000;
  position: relative;
  display: inline-block;
  width: 100%;
  z-index: 2;
  top: -4px;
  left: 4px;
  &.right{
    top: -4px;
    left: -8px;
  }
  .title{
    position: relative;
    width: 180px;
    height: 40px;
    line-height: 40px;
    &::before{
      content: ''!important;
      position: absolute;
      top: 6px;
      left: 20px;
      width: 4px;
      height: 3px;
      border-radius: 2px;
      background-color: #fff;
    }
    &::after{
      content: ''!important;
      position: absolute;
      top: 6px;
      left: 28px;
      width: 15px;
      height: 3px;
      border-radius: 2px;
      background-color: #fff;
    }
    .icon{
      height: 5px;
      width: 5px;
      &::after{
        height: 5px;
      }
      &:first-of-type{
        top: 5px;
        left: 5px;
      }
      &:nth-of-type(2){
        top: 5px;
        right: 5px;
      }
      &:nth-of-type(3){
        bottom: 5px;
        left: 5px;
      }
      &:last-of-type{
        bottom: 5px;
        right: 5px;
      }
    }
  }
  .icon_box{
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .icon{
      display: inline-block;
      height: 6px;
      width: 6px;
      border: 1px solid #000;
      border-radius: 6px;
      position: absolute;
      background-color: #fff;
      transform-origin:50% 50%;
      overflow: hidden;
      &::after{
        position: absolute;
        content: ''!important;
        left: 50%;
        transform: translateX(-50%);
        top:0;
        height: 7px;
        width: 1px;
        background-color: #000;
      }
      &:first-of-type{
        transform: rotate(45deg);
        top: 8px;
        left: 8px;
      }
      &:nth-of-type(2){
        transform: rotate(135deg);
        top: 8px;
        right: 8px;
      }
      &:nth-of-type(3){
        transform: rotate(135deg);
        bottom: 8px;
        left: 8px;
      }
      &:last-of-type{
        transform: rotate(45deg);
        bottom: 8px;
        right: 8px;
      }
    }
  &>.btn{
    line-height: 40px;
    height: 40px;
    font-size: 16px;
    position: relative;
    width: auto;
    padding: 0 20px;
    &::before, &::after{
      content: ''!important;
      position: absolute;
      top:4px;
      height: 2px;
      border-radius: 2px;
      background-color: #fff;
    }
    &::before {
      width: 4px;
      left: 14px;
    }
    &::after {
      width: 22px;
      left: 22px;
    }
  }
  .btn-small{
    height: 40px;
    padding: 5px 0 0 5px;
    position: relative;
    font-size: 12px;
  }
  &>div{
    position: relative;
    z-index: 2;
  }
}
.title1{
  position: relative;
  background:#FFE91F;
  &[disabled] {
    opacity: 0.3;
  }
    &::before{
    content: ''!important;
    position: absolute;
    top: 6px;
    left: 6px;
    width: 4px;
    height: 3px;
    border-radius: 2px;
    background-color: #fff;
  }
  &::after{
    content: ''!important;
    position: absolute;
    top: 6px;
    left: 15px;
    width: 15px;
    height: 3px;
    border-radius: 2px;
    background-color: #fff;
  }
}
</style>
