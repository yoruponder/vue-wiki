<style lang="scss">
@import "../assets/css/baseVal.scss";
@import "../assets/css/questionList.scss";
.typeCollection {
  border: $comborder;
  border-radius: 4px;
  padding: 20px;
  overflow: hidden;
  margin-bottom: 40px;
  h3 {
    line-height: 24px;
  }
  .fa {
    margin-right: 10px;
  }
  .type-col-box {
    margin-top: 30px;
    li {
      display: inline-block;
      width: 150px;
      margin: 0 26px 20px 0;
      color: $fc3;
      a.active {
        color: $orange;
      }
      span {
        margin-left: 5px;
      }
    }
  }
}

</style>

<template>
  <div class="collection-block">
    <div class="typeCollection">
      <h3><i class="fa fa-map"></i>{{bigName}}</h3>
      <ul class="type-col-box">
        <li v-if="subCat.length == 0">
          <a href="javascript:;">無數據</a>
        </li>
        <li v-else v-for="(v,k) in subCat" :key="k">
          <router-link :to="'/collection/' + nid + (cat1 ? '/' + cat1 : '') + '/'+v.id" :class="[v.id == cat2 ? 'active' : '']">{{v.category_name}}</router-link>
          <span>({{cat1 ? v.two : v.one}})</span>
        </li>
      </ul>
    </div>

    <div class="questionList">
      <div class="que-nav">
        <span v-if="type == 'tag'">标签筛选结果</span>
        <span v-if="key">搜索结果</span>
        <router-link :to="{query:{type:'all'}}" :class="allQuestionCls">全部問題</router-link>
        <router-link :to="{query:{type:'hot'}}" active-class="now" exact>熱點問題</router-link>
        <router-link :to="{query:{type:'my'}}" active-class="now" exact>我的最愛</router-link>
        <router-link :to="{query:{type:'wait'}}" active-class="now" exact>待回答</router-link>
      </div>
      <div class="que-list-table">
        <table>
          <tr>
            <th class="q-l-tle">標題</th>
            <th class="q-l-view">瀏覽</th>
            <th class="q-l-time">時間</th>
          </tr>
          <tr v-if="!issue || issue.length == 0">
            <td colspan="3" style="text-align:center;">暂无数据</td>
          </tr>
          <tr v-else v-for="(v,k) in issue" :key="k">
            <td class="q-l-tle">
              <router-link :to="`/question/${v.id}`">
                {{v.issue_title}}
                <span>{{v.tag_info ? `[${v.tag_info.content}]` : ''}}</span>
              </router-link>
            </td>
            <td class="q-l-view">{{v.browse_num}}</td>
            <td class="q-l-time">{{v.issue_time}}</td>
          </tr>
        </table>
        <pagination :total="pageNum" :now="currentPage"/>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "_COMP_/pagination";

export default {
  name: "collectionBlock",
  props: [],
  components: { pagination },
  data() {
    return {
      category: [],
      bigName: "全部分類",
      nid: this.$route.params.nid ? this.$route.params.nid : 1,
      cat1: this.$route.params.cat1 ? this.$route.params.cat1 : "",
      cat2: this.$route.params.cat2 ? this.$route.params.cat2 : "",
      currentPage: this.$route.query.page ? this.$route.query.page : 1,
      type: this.$route.query.type ? this.$route.query.type : "all",
      key: this.$route.query.key ? this.$route.query.key : "",
      tagid: this.$route.query.tagid ? this.$route.query.tagid : "",
      count: 0, //条数,
      pageSize: 15,
      issue: []
    };
  },
  computed: {
    allQuestionCls: function() {
      return this.type == "all" ? "now" : "";
    },
    pageNum: function() {
      return Math.ceil(this.count / this.pageSize);
    },
    subCat: function() {
      let catArray = [];
      let catData = this.category;
      if (this.cat1) {
        //有一級分類
        for (let i in catData) {
          if (this.cat1 == catData[i].self.id) {
            this.bigName = catData[i].self.category_name;
            catArray = catData[i].child;
            break;
          }
        }
      } else if (this.nid) {
        this.bigName = "全部分類";
        for (let i in catData) {
          catArray.push(catData[i].self);
        }
      }
      return catArray;
    }
  },
  methods: {
    getCategory() {
      Api.index({
        c: "index",
        a: "index",
        navigation_id: this.nid
      }).then(res => {
        this.category = res.data.category;
      });
    },
    catChange() {
      this.cat1 = this.$route.params.cat1 ? this.$route.params.cat1 : "";
      this.cat2 = this.$route.params.cat2 ? this.$route.params.cat2 : "";
    },
    typeChange() {
      this.type = this.$route.query.type ? this.$route.query.type : "all";
    },
    pageChange() {
      this.currentPage = this.$route.query.page ? this.$route.query.page : 1;
    },
    keyChange() {},
    tagIdChange() {},
    getQuestion() {
      let data = {
        c: "index",
        a: "issue",
        type: this.type,
        page: this.currentPage,
        pagesize: this.pageSize,
        category_one: this.cat1,
        category_two: this.cat2,
        navigation_id: this.nid,
        key: this.key,
        tag: this.tagid
      };

      Api.issue(data).then(res => {
        this.issue = res.data.issue;
        this.count = res.data.count;
      });
    }
  },
  beforeMount: function() {
    this.getCategory();
    this.getQuestion();
  },
  watch: {
    $route: function() {
      this.catChange();
      this.typeChange();
      this.pageChange();

      this.getQuestion();
    }
  }
};
</script>
