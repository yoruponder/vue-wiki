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
          <div class="item-wp">
            <span>是否推荐：</span>
            <select v-model="queryData.recommended" @change="linkr">
              <option value="">默认</option>
              <option value="0">否</option>
              <option value="1">是</option>
            </select>
          </div>
          <div class="item-wp">
            <span>状态：</span>
            <select v-model="queryData.status" @change="links">
              <option value="">默认</option>
              <option value="0">待回答</option>
              <option value="1">已回答</option>
              <option value="2">已关闭</option>
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
          <router-link :to="`/admin/question/${queryData.selnid}`" @click="resetInput" class="button button-orange" style="margin-left:36px;">清空筛选</router-link>
        </div>
      </div>
      <div class="que-list-table">
        <table>
          <tr>
            <th width="57">选择</th>
            <th width="588">标题</th>
            <th width="87">提问者</th>
            <th width="58">浏览</th>
            <th width="70">状态</th>
            <th width="223">提问时间</th>
            <th width="117">是否推荐</th>
          </tr>
          <tr v-if="!issues.length">
            <td colspan="7">暫無數據</td>
          </tr>
          <tr v-else v-for="(v,k) in issues" :key="`issue${k}`">
            <td><input type="checkbox" v-model="selIssues" :value="v.id"/></td>
            <td style="text-align:left;"><router-link target="_blank" :to="`/question/${v.id}`">{{v.issue_title}}</router-link></td>
            <td>{{v.issue_uid}}</td>
            <td>{{v.browse_num}}</td>
            <td>{{v.status}}</td>
            <td>{{v.issue_time}}</td>
            <td>{{v.recommended}}</td>
          </tr>
        </table>
      </div>
      <div class="fn-btn-area">
        <button class="button" @click="doRec">推薦</button>
        <button class="button button-orange" @click="doUnRec">取消推薦</button>
        <button class="button" @click="movePop">移動分類</button>
        <button class="button button-orange" @click="doRemove">刪除問題</button>
      </div>
      <pagination :total="pageNum" :now="queryData.currentPage"/>
    </div>
    <wiki-footer />
    <popbox :slotArr="['moveCat']">
      <div slot="moveCat" class="movecat-pop">
        <div class="line">
          <span>版塊:</span>
          <select v-model="popSrh.nid" @change="getPopNav">
            <option value="">請選擇</option>
            <option v-for="(v,k) in navArr" v-if="v.id != 4" :key="`pnid${k}`" :value="v.id">{{v.title}}</option>
          </select>
        </div>
        <div class="line">
          <span>一级分类:</span>
          <select v-model="popSrh.c1">
            <option value="">請選擇</option>
            <option v-for="(v,k) in popc1" :key="`p1${k}`" :value="v.id">{{v.category_name}}</option>
          </select>
        </div>
        <div class="line">
          <span>二级分类:</span>
          <select v-model="popSrh.c2">
            <option value="">請選擇</option>
            <option v-for="(v,k) in popc2" :key="`p2${k}`" :value="v.id">{{v.category_name}}</option>
          </select>
        </div>
      </div>
    </popbox>
    <shadow-component/>
  </div>
</template>

<script>
import adminHead from "_COMP_/admin/head";
import wikiFooter from "_COMP_/footer";
import pagination from "_COMP_/pagination";
import popbox from "_COMP_/popbox";
import shadowComponent from "_COMP_/shadow";
import { mapActions } from "vuex";

export default {
  name: "question",
  components: {
    adminHead,
    pagination,
    wikiFooter,
    popbox,
    shadowComponent
  },
  data() {
    return {
      navArr: [],
      categoryArr: [],
      issues: [],
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
        recommended: this.$route.query.r ? this.$route.query.r : '',
        status: this.$route.query.s ? this.$route.query.s : '',
        selc1: this.$route.query.c1 ? this.$route.query.c1 : '',
        selc2: this.$route.query.c2 ? this.$route.query.c2 : '',
        currentPage: this.$route.query.page ? this.$route.query.page : 1
      },
      popcat: [],
      popSrh: {
        nid: '',
        c1: '',
        c2: ''
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
    },
    popc1: function() {
      let arr = [];
      let data = this.popcat;
      if(data.length){
        for(let v of data){
          if(v.pid == 0){
            arr.push(v);
          }
        }
      }
      return arr;
    },
    popc2: function() {
      let arr = [];
      let c1 = this.popSrh.c1;
      let data = this.popcat;
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
    ...mapActions({
      sdshow: "shadow/show",
      sdhide: "shadow/hide",
      pbshow: "popbox/show",
      pbhide: "popbox/hide"
    }),
    closePopbox() {
      this.pbhide();
      this.sdhide();
    },
    getNav() {
      Api.admin.navigation().then(res => {
        this.navArr = res.data;
      });
    },
    getListData() {
      let data = {
        navigation_id: this.queryData.selnid,
        recommended: this.queryData.recommended,
        status: this.queryData.status,
        issue_title: this.inputDom.key,
        category_one: this.queryData.selc1,
        category_two: this.queryData.selc2,
        start_time: this.inputDom.start_time,
        end_time: this.inputDom.end_time,
        page: this.queryData.currentPage,
        pagesize: this.pagesize
      };
      
      Api.admin.issues(data).then(res => {
        this.issues = res.data.issues;
        this.count = res.data.count;
        this.categoryArr = res.data.nav;
      });
    },
    getPopNav() {
      let data = {
        navigation_id: this.popSrh.nid,
        recommended: '',
        status: '',
        issue_title: '',
        category_one: '',
        category_two: '',
        start_time: '',
        end_time: '',
        page: 1,
        pagesize: this.pagesize
      };
      Api.admin.issues(data).then(res => {
        this.popcat = res.data.nav;
        this.popSrh.c1 = '';
        this.popSrh.c2 = '';
      });
    },
    linkNid() {
      this.$router.push(`/admin/question/${this.queryData.selnid}`);
    },
    linkc1() {
      let data = Object.assign({}, this.$route.query, {c1: this.queryData.selc1, c2: '', page: 1});
      this.$router.push({query: data});
    },
    linkc2() {
      let data = Object.assign({}, this.$route.query, {c2: this.queryData.selc2, page: 1});
      this.$router.push({query: data});
    },
    linkr() {
      let data = Object.assign({}, this.$route.query, {r: this.queryData.recommended, page: 1});
      this.$router.push({query: data});
    },
    links() {
      let data = Object.assign({}, this.$route.query, {s: this.queryData.status, page: 1});
      this.$router.push({query: data});
    },
    inputSearch() {
      let data = Object.assign({}, this.$route.query, {
        k: this.inputDom.key,
        st: this.inputDom.start_time,
        et: this.inputDom.end_time,
        page: 1
      });
      this.$router.push({query: data});
    },
    setQuery() {
      this.queryData = {
        selnid: this.$route.params.nid ? this.$route.params.nid : 8591,
        recommended: this.$route.query.r ? this.$route.query.r : '',
        status: this.$route.query.s ? this.$route.query.s : '',
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
    doRec() {
      Api.admin.recommend({id: this.selIssues+''}).then(res => {
        if(res.status == 1){
          this.selIssues = [];
          this.getListData();
          this.closePopbox();
        }else{
          alert('失敗');
        }
      });
    },
    doUnRec() {
      Api.admin.unrecommend({id: this.selIssues+''}).then(res => {
        if(res.status == 1){
          this.selIssues = [];
          this.getListData();
          this.closePopbox();
        }else{
          alert('失敗');
        }
      })
    },
    movePop() {
      if(this.selIssues.length){
        this.sdshow({
          fn: () => this.closePopbox()
        });
        this.pbshow({
          type: 'slot',
          tle: "移動分類",
          slotName: 'moveCat',
          btn: [
            {
              txt: "確定",
              type: "ok",
              fn: () => this.doMovePop()
            }
          ]
        });
      }
    },
    doMovePop() {
      let data = {
        navigation_id: this.popSrh.nid,
        category_one: this.popSrh.c1,
        category_two: this.popSrh.c2,
        id: this.selIssues + ''
      };
      Api.admin.moveIssue(data).then(res => {
        if(res.status == 1){
          this.selIssues = [];
          this.getListData();
          this.closePopbox();
        }else{
          alert(res.info);
        }
      });
    },
    doRemove() {
      if(confirm('確認要刪除嗎？')){
        Api.admin.removeIssue({id: this.selIssues+''}).then(res => {
          if(res.status == 1){
            this.selIssues = [];
            this.getListData();
            this.closePopbox();
          }else{
            alert('失敗');
          }
        })
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
};
</script>