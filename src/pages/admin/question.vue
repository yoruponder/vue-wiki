<style lang="scss">
@import "../../assets/css/baseVal.scss";
@import "../../assets/css/admin-common.scss";
</style>

<template>
  <div class="admin-page">
    <admin-head/>
    <div class="admin-cnt com-width">
      <p class="srh-p">条件搜索</p>
      <div class="srh-area" style="display:block">
        <div class="line">
          <div class="item-wp">
            <select v-model="selnav">
              <option v-for="(v,k) in nav" :key="k" :value="v.id">{{v.title}}</option>
            </select>
          </div>
          <div class="item-wp">
            <span>一级分类：</span>
            <select>
              <option value="">默认</option>
            </select>
          </div>
          <div class="item-wp">
            <span>二级分类：</span>
            <select>
              <option value="">默认</option>
            </select>
          </div>
          <div class="item-wp">
            <span>是否推荐：</span>
            <select>
              <option value="">默认</option>
              <option value="0">否</option>
              <option value="1">是</option>
            </select>
          </div>
          <div class="item-wp">
            <span>状态：</span>
            <select>
              <option value="">默认</option>
              <option value="0">未回答</option>
              <option value="1">已完成</option>
              <option value="2">已关闭</option>
            </select>
          </div>
        </div>
        <div class="line">
          <div class="item-wp">
            <input type="date">&nbsp;&nbsp;到&nbsp;&nbsp;<input type="date">
          </div>
          <div class="item-wp">
            <input type="text" placeholder="請輸入标题" v-model="key" style="width:486px;" />
          </div>
          
          <button class="button">搜索</button>
        </div>
      </div>
      <div class="que-list-table">
        <table>
          <tr>
            <th>选择</th>
            <th>标题</th>
            <th>提问者</th>
            <th>浏览</th>
            <th>状态</th>
            <th>提问时间</th>
            <th>是否推荐</th>
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
      selnav: this.$route.query.nid ? this.$route.query.nid : 8591,
      nav: [],
      cid1: [],
      cid2: [],
      issues: [],
      key: '',
    }
  },
  methods: {
    getNav() {
      Api.admin.navigation().then((res)=>{
        this.nav = res.data;
      });
    },
  },
  beforeMount: function() {
    this.getNav();
  }
}
</script>