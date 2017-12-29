<style lang="scss">
@import "../../assets/css/baseVal.scss";
@import "../../assets/css/admin-common.scss";
</style>

<template>
  <div class="admin-page">
    <admin-head/>
    <div class="admin-cnt com-width">
      <p class="srh-p">條件搜索</p>
      <div class="srh-area">
        <input type="text" placeholder="請輸入搜索關鍵字" v-model="key" />
        <button class="button" style="margin-left:20px;" @click="getData">搜索</button>
      </div>
      <div class="que-list-table">
        <table>
          <tr>
            <th>選擇</th>
            <th>用戶編號</th>
            <th>英文名</th>
            <th>姓名</th>
            <th>積分</th>
            <th>上次登錄</th>
            <th>身份</th>
          </tr>
          <tr v-for="(v,k) in users" :key="k">
            <td><input type="checkbox" v-model="selUser" :value="v.uid" /></td>
            <td>{{v.uid}}</td>
            <td>{{v.english_name ? v.english_name : '無記錄' }}</td>
            <td>{{v.username}}</td>
            <td>{{v.score}}</td>
            <td>{{v.add_time}}</td>
            <td>{{v.super}}</td>
          </tr>
        </table>
      </div>
      <div>
        <button class="button" @click="setAdmin('root')">設置管理員</button>
        <button class="button button-orange" style="margin-left:20px;" @click="setAdmin('user')">取消管理員</button>
      </div>
      <pagination :total="pageNum" :now="currentPage"/>
    </div>
    <wiki-footer />
  </div>
</template>

<script>
import adminHead from "_COMP_/admin/head";
import pagination from "_COMP_/pagination";
import wikiFooter from "_COMP_/footer";

export default {
  name: 'admin',
  components: {
    adminHead,
    pagination,
    wikiFooter
  },
  data() {
    return {
      users: [],
      currentPage: this.$route.query.page ? this.$route.query.page : 1,
      pagesize: 15,
      key: '',
      selUser: [],
      count: 0
    }
  },
  computed: {
    pageNum: function() {
      return Math.ceil(this.count / this.pageSize);
    }
  },
  methods: {
    getData() {
      let data = {
        key: this.key,
        page: this.currentPage,
        pagesize: this.pagesize
      };
      Api.admin.users(data).then(res => {
        this.users = res.data.users;
      });
    },
    pageChange() {
      this.currentPage = this.$route.query.page ? this.$route.query.page : 1;
    },
    setAdmin(opt){
      let data = {
        operate: opt,
        uid: this.selUser + ''
      };
      Api.admin.editUser(data).then((res)=>{
        alert(res.info);
        this.selUser = [];
        this.getData();
      });
    }
  },
  beforeMount: function() {
    this.getData();
  }
}
</script>
