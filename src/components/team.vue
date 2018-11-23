<!--  -->
<template>
  <van-row>
    <van-col span="6"  v-for="(item, index) in teamList" :key="item.id">
      <div class="team-item" :class="{'team-item-bg': curIndex === index + 1}" @click="chooseTeamHandle(item)">
        <div class="team-flag">
          <img :src="item.icon" alt="">
        </div>
        <p class="team-name">{{item[`name_${$i18n.locale}`]}}</p>
      </div>
    </van-col>
  </van-row>
</template>

<script>
import Vue from 'vue'
import { Row, Col} from 'vant'
import { countries } from '@/utils/countries'
import i18n from '../locales/index'

Vue.use(Row).use(Col)
export default {
  name: 'teamItem',
  prop: ['data', 'locale'],
  data () {
    return {
      curIndex: -1,
      teamList: []
    }
  },
  mounted() {
    this.teamList = countries
  },
  methods: {
    chooseTeamHandle(curTeam) {
      this.curIndex = curTeam.id
      this.$emit('choosedTeam', curTeam)
    }
  }
}

</script>
<style  scoped lang="less">
  .team-item {
  padding: 2rem 0;
  margin-right: 1px;
  margin-bottom: 1px;
  display: flex;
  flex-direction: column;
  .team-flag {
    margin: 0 auto;
    img {
      width: 4.4rem;
      height: 4.4rem;
    }
  }
  .team-name {
    font-size: 1.4rem;
    color: #ffffff;
    padding: .5rem 0;
  }
}
.team-item-bg {
  background-color: rgba(0,0,0,0.4);
}
</style>
