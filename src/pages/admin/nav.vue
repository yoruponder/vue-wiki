<style lang="scss">
@import "../../assets/css/baseVal.scss";
@import "../../assets/css/admin-common.scss";
</style>

<template>
  <div class="admin-page">
    <admin-head/>
    <div class="admin-cnt com-width">
      <p class="srh-p">说明：目前仅支持浏览,需要调整请联系工程师处理!</p>
      <div class="que-list-table">
        <table>
          <tr>
            <th>名称</th>
            <th>排序</th>
            <th>状态</th>
          </tr>
          <tr v-for="(v,k) in nav" :key="k">
            <td>{{v.title}}</td>
            <td>{{v.order_id}}</td>
            <td>线上</td>
          </tr>
        </table>
      </div>
    </div>
    <wiki-footer />
  </div>
</template>

<script>
import adminHead from "_COMP_/admin/head";
import wikiFooter from "_COMP_/footer";

export default {
  name: 'admin',
  components: {
    adminHead,
    wikiFooter
  },
  data() {
    return {
      nav: []
    }
  },
  methods: {
    getData() {
      Api.admin.navigation().then((res)=>{
        this.nav = res.data
      });
    },
  },
  beforeMount: function() {
    this.getData();
  }
}
</script>
