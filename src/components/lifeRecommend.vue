<style lang="scss">
@import "../assets/css/baseVal.scss";

.life-recommed {
  h3 {
    font-size: $bfs;
  }
  .imgbox {
    position: relative;
    width: 100%;
    height: 320px;
    margin-top: 15px;
    ul {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
    li {
      border-radius: 8px;
      transition: all 0.2s ease-in;
      overflow: hidden;
      background: #fff;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
      .cover {
        width: 100%;
        height: 100%;
      }
      h4 {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 38px;
        line-height: 38px;
        background: rgba(0, 0, 0, 0.5);
        font-size: $nfs;
        padding: 0 12px;
        color: #fff;
      }
      .uico {
        position: absolute;
        top: 8px;
        left: 8px;
        z-index: 2;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      &:hover {
        transform: scale(1.02);
      }
      &:nth-child(1),&:nth-child(5) {
        position: absolute;
        top: 50%;
        z-index: 1;
        width: 322px;
        height: 190px;
        margin-top: -95px;
        .cover,h4,.uico {
          opacity: 0.5;
        }
      }
      &:nth-child(1) {
        left: 0;
      }
      &:nth-child(5) {
        right: 0;
      }
      &:nth-child(2),&:nth-child(4) {
        position: absolute;
        top: 50%;
        z-index: 2;
        width: 412px;
        height: 240px;
        margin-top: -120px;
        .cover,h4,.uico {
          opacity: 0.7;
        }
      }
      &:nth-child(2) {
        left: 54px;
      }
      &:nth-child(4) {
        right: 54px;
      }
      &:nth-child(3) {
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 3;
        width: 520px;
        height: 320px;
        margin-left: -260px;
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .go-prev,.go-next {
      position: absolute;
      top: 130px;
      z-index: 3;
      width: 30px;
      height: 52px;
      line-height: 52px;
      text-align: center;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
    .go-next {
      right: 170px;
    }
    .go-prev {
      left: 170px;
    }
  }
}
</style>

<template>
<div v-if="data.length" class="life-recommed">
  <h3 class="com-title">精彩推薦</h3>
  <div class="imgbox">
    <span class="go-prev" @click="goPrev"><i class="fa fa-chevron-left"></i></span>
    <span class="go-next" @click="goNext"><i class="fa fa-chevron-right"></i></span>
    <ul class="clearfix">
      <li v-for="(v,k) in rendData" :key="k">
        <router-link :to="`/question/${v.id}`">
          <img class="cover" :src="v.cover_img ? v.cover_img : `/static/img/timg.jpeg`"/>
          <h4>{{stringCut(v.issue_title,20)}}</h4>
        </router-link>
        <img class="uico" :src="v.user.photo ? v.user.photo : `/static/img/timg.jpeg`" :title="v.user.username" />
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { stringCut, shuffle} from '_LIBS_/plugin.js';

export default {
  name: "lifeRecommend",
  props: ["data"],
  data: function() {
    return {
      now:    0,
      maxLen: 10
    }
  },
  computed: {
    listData() {
      let newData = this.data;
      let len = this.data.length;

      if(len > this.maxLen){
        newData = newData.slice(0, this.maxLen);
      }
      return shuffle(newData);
    },
    rendData() {
      let data = this.listData;
      let rendData = [];
      for(let j = -2; j<=2; j++){
        let knum = (this.listLen + this.now + j) % this.listLen;
        rendData.push(data[knum]);
      }
      return rendData;
    },
    listLen() {
      let len = this.data.length;
      if(len > this.maxLen){
        len = this.maxLen;
      }
      return len;
    }
  },
  methods: {
    stringCut,
    shuffle,
    goNext() {
      this.now = this.now + 1 == this.listLen ? 0 : this.now + 1;
    },
    goPrev() {
      this.now = this.now - 1 < 0 ? this.listLen - 1 : this.now - 1;
    }
  }
};
</script>