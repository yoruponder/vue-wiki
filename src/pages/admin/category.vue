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
            <select v-model="queryData.selnid" @change="linkNid">
              <option v-for="(v,k) in navArr" v-if="v.id != 4" :key="`nid${k}`" :value="v.id">{{v.title}}</option>
            </select>
          </div>
          <div class="item-wp">
            <span>一级分类：</span>
            <select v-model="queryData.selc1" @change="linkc1">
              <option value="">默认</option>
              <option v-for="(v,k) in c1Arr" :key="`c1${k}`" :value="v.id">{{v.category_name}}</option>
            </select>
          </div>
          <div class="item-wp">
            <span>二级分类：</span>
            <select v-model="queryData.selc2" @change="linkc2">
              <option value="">默认</option>
              <option v-for="(v,k) in c2Arr" :key="`c2${k}`" :value="v.id">{{v.category_name}}</option>
            </select>
          </div>
        </div>
        <div class="line">
          <div class="item-wp">
            <input type="date" v-model="inputDom.start_time">&nbsp;&nbsp;到&nbsp;&nbsp;<input type="date" v-model="inputDom.end_time">
          </div>
          <div class="item-wp">
            <input type="text" placeholder="請輸入标题" v-model="inputDom.key" style="width:370px;" />
          </div>
          <button class="button" @click="inputSearch">搜索</button>
          <router-link :to="`/admin/answer/${queryData.selnid}`" @click="resetInput" class="button button-orange" style="margin-left:36px;">清空筛选</router-link>
        </div>
      </div>
      <div class="que-list-table">
        <table>
          <tr>
            <th width="60">选择</th>
            <th width="770">回答內容</th>
            <th width="90">回答者</th>
            <th width="60">浏览</th>
            <th width="220">提问时间</th>
          </tr>
          <tr v-if="!replys.length">
            <td colspan="5">暫無數據</td>
          </tr>
          <tr v-else v-for="(v,k) in replys" :key="`issue${k}`">
            <td><input type="checkbox" v-model="selIssues" :value="v.id"/></td>
            <td style="text-align:left;">
              <router-link tag="strong" target="_blank" :to="`/question/${v.issue_id}`">{{v.issue_title}}</router-link>
              <p v-html="v.reply_content"></p>
            </td>
            <td>{{v.reply_uid}}</td>
            <td>{{v.browse_num}}</td>
            <td>{{v.reply_time}}</td>
          </tr>
        </table>
      </div>
      <div class="fn-btn-area">
        <button class="button button-orange" @click="delReply">刪除回答</button>
      </div>
      <pagination :total="pageNum" :now="queryData.currentPage"/>
    </div>
    <wiki-footer />
  </div>
</template>

<script>
import adminHead from "_COMP_/admin/head";
import wikiFooter from "_COMP_/footer";
import pagination from "_COMP_/pagination";

export default {
  name: 'answer',
  components: {
    adminHead,
    pagination,
    wikiFooter
  },
  data() {
    return {
      navArr: [],
      categoryArr: [],
      replys: [],
      selIssues: [],
      count: 0,
      pagesize: 15,
      inputDom: {
        key: this.$route.query.k ? this.$route.query.k : '',
        start_time: this.$route.query.st ? this.$route.query.st : '',
        end_time: this.$route.query.et ? this.$route.query.et : ''
      },
      queryData: {
        selnid: this.$route.params.nid ? this.$route.params.nid : 8591,
        selc1: this.$route.query.c1 ? this.$route.query.c1 : '',
        selc2: this.$route.query.c2 ? this.$route.query.c2 : '',
        currentPage: this.$route.query.page ? this.$route.query.page : 1
      }
    };
  },
  computed: {
    pageNum: function() {
      return Math.ceil(this.count / this.pagesize);
    },
    c1Arr: function() {
      let arr = [];
      let data = this.categoryArr;
      if(data.length){
        for(let v of data){
          if(v.pid == 0){
            arr.push(v);
          }
        }
      }
      return arr;
    },
    c2Arr: function() {
      let arr = [];
      let c1 = this.queryData.selc1;
      let data = this.categoryArr;
      if(data.length && c1){
        for(let v of data){
          if(v.pid == c1){
            arr.push(v);
          }
        }
      }
      return arr;
    }
  },
  methods: {
    getNav() {
      Api.admin.navigation().then(res => {
        this.navArr = res.data;
      });
    },
    linkNid() {
      this.$router.push(`/admin/answer/${this.queryData.selnid}`);
    },
    linkc1() {
      let data = Object.assign({}, this.$route.query, {c1: this.queryData.selc1, c2: '', page: 1});
      this.$router.push({query: data});
    },
    linkc2() {
      let data = Object.assign({}, this.$route.query, {c2: this.queryData.selc2, page: 1});
      this.$router.push({query: data});
    },
    inputSearch() {
      let data = Object.assign({}, this.$route.query, {
        k: this.inputDom.key,
        st: this.inputDom.start_time,
        et: this.inputDom.end_time
      });
      this.$router.push({query: data});
    },
    setQuery() {
      this.queryData = {
        selnid: this.$route.params.nid ? this.$route.params.nid : 8591,
        selc1: this.$route.query.c1 ? this.$route.query.c1 : '',
        selc2: this.$route.query.c2 ? this.$route.query.c2 : '',
        currentPage: this.$route.query.page ? this.$route.query.page : 1
      };
      this.inputDom = {
        key: this.$route.query.k ? this.$route.query.k : '',
        start_time: this.$route.query.st ? this.$route.query.st : '',
        end_time: this.$route.query.et ? this.$route.query.et : ''
      };
    },
    resetInput(){
      this.inputDom = {
        key: '',
        start_time: '',
        end_time: ''
      };
    },
    getListData() {
      let data = {
        navigation_id: this.queryData.selnid,
        issue_title: this.inputDom.key,
        category_one: this.queryData.selc1,
        category_two: this.queryData.selc2,
        start_time: this.inputDom.start_time,
        end_time: this.inputDom.end_time,
        page: this.queryData.currentPage,
        pagesize: this.pagesize
      };
      
      Api.admin.replyIssue(data).then(res => {
        this.replys = res.data.replys;
        this.count = res.data.count;
        this.categoryArr = res.data.nav;
      });
    },
    delReply() {
      if(confirm('確認刪除嗎')){
        Api.admin.removeReply({id: this.selIssues + ''}).then(res => {
          if(res.status == 1){
            this.getListData();
          }else{
            alert('失敗');
          }
        });
      }
    }
  },
  beforeMount: function() {
    this.getNav();
    this.getListData();
  },
  watch: {
    $route: function() {
      this.setQuery();
      this.getListData();
    }
  }
}
</script>
