<style lang="scss">
@import "../assets/css/baseVal.scss";

.favorite {
  .fav-box {
    display: flex;
    padding: 10px 25px;
    justify-content: space-between;
    flex-wrap: wrap;
    a {
      display: flex;
      width: 140px;
      height: $comlh;
      margin: 6px 5px;
      padding: 0 8px;
      justify-content: space-between;
      border-radius: 4px;
      background: $baseColor;
      color: #fff;
      span {
        align-self: center;
      }
      .fa-close {
        display: none;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 8px;
        background: #fff;
        color: $baseColor;
      }
      .fa-close:hover {
        background: #f00;
        color: #fff;
      }
      &:hover .fa-close {
        display: block;
      }
    }
  }
}
</style>

<template>
<div class="favorite" v-if="data != null">
  <h3 class="com-title"><a href="javascript:;"><i class="fa fa-heart"></i>我的最爱</a></h3>
  <div class="fav-box clearfix">
    <span v-if="info">{{info}}</span>
    <span v-else-if="data.length == 0">暫無數據</span>
    <router-link v-else v-for="(val,key) in data" :key="key" :to="`/questionDetail/${val.issue_id}`">
      <span>{{val.collection_name}}</span>
      <span class="fa fa-close" @click.prevent="delFavorite(val.id)"></span>
    </router-link >
  </div>
</div>
</template>

<script>
export default {
  name: "favorite",
  props: ["id"],
  data() {
    return {
      data: [],
      info: ""
    };
  },
  methods: {
    getFavorite() {
      ajax.post(Api, { c: "user", a: "favorite", navigation_id: this.id }).then(res => {
          if (res.status) {
            this.data = res.data;
            return;
          }
          this.info = res.info;
        });
    },
    delFavorite(id) {
      if (confirm("確認要刪除該條記錄嗎")) {
        ajax.post(Api,{c:'user',a:'unCollection',id:id}).then(res => {
          if (res.status == 1) {
            this.getFavorite();
          } else {
            alert(res.info);
          }
        });
      }
    }
  },
  beforeMount: function() {
    this.getFavorite();
  }
};
</script>