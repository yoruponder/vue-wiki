<template>
<div class="right-bk" v-if="data != null">
  <h3 class="com-title"><a href="javascript:;">我的最爱</a></h3>
  <div class="item-box clearfix">
    <span v-if="info">{{info}}</span>
    <span v-else-if="data.length == 0">暫無數據</span>
    <router-link v-else v-for="(val,key) in data" :key="key" :to="`/question/${val.issue_id}`">
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
      Api.favorite({ c: "user", a: "favorite", navigation_id: this.id }).then(res => {
          if (res.status) {
            this.data = res.data;
            return;
          }
          this.info = res.info;
        });
    },
    delFavorite(id) {
      if (confirm("確認要刪除該條記錄嗎")) {
        Api.delFavorite({c:'user',a:'unCollection',id:id}).then(res => {
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