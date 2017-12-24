<style lang="scss">
@import "../assets/css/baseVal.scss";
.rank {
  .rank-page {
    height: 60px;
    line-height: 60px;
    font-size: $bfs;
    margin-bottom: 20px;
    text-align: center;
    background: $lgray;
    border-radius: 5px;
  }
  ul {
    padding: 0 20px;
  }
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dotted $mgray;
    line-height: 50px;
    .flag {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 30px;
      background: #476472;
      vertical-align: middle;
      margin-right: 12px;
      color: #fff;
      text-align: center;
      line-height: 20px;
      font-size: $nfs;
      font-style: normal;
      &:after {
        content: "";
        position: absolute;
        bottom: -4px;
        left: -4px;
        border: 14px solid transparent;
        border-bottom-color: #fff;
      }
    }
    &:nth-child(1) .flag {
      background: #fb6757;
    }
    &:nth-child(2) .flag {
      background: #fac525;
    }
    &:nth-child(3) .flag {
      background: #00a9fb;
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 12px;
    }
  }
}
</style>

<template>
  <div class="right-bk rank">
      <h3 class="com-title"><a href="javascript:;">冠軍排行榜</a></h3>
      <ul>
        <li v-if="data.length == 0">暫無數據</li>
        <template v-else> 
        <li v-if="key < 10" v-for="(val, key) in data" :key="key">
          <div>
            <span class="number">{{key+1}}</span>
              <img :src="val.photo ? val.photo : '/static/timg.jpeg'" />
              <span>{{val.username}}</span>
          </div>
          <span class="score">{{val.score}}分</span>
        </li>
        </template>
      </ul>
  </div>
</template>

<script>
export default {
  name: "rank",
  data: function() {
    return {
      data: []
    };
  },
  methods: {
    getRank() {
      Api.rank({ c: "index", a: "rank" }).then(res => {
        if (res.status) {
          this.data = res.data;
        }
      });
    }
  },
  beforeMount: function() {
    this.getRank();
  }
};
</script>
