<style lang="scss">
@import "../assets/css/baseVal.scss";
.typeCollection {
  border: $comborder;
  border-radius: 4px;
  padding: 20px;
  overflow: hidden;
  margin-bottom: 40px;
  h3{
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
      a.active{
        color:$orange;
      }
      span {
        margin-left: 5px;
      }
    }
  }
}
.questionList {
    .que-nav {
        font-size: $mfs;
        color: $fc2;
        border-bottom: $comborder;
        a,
        span {
            display: inline-block;
            height: $comlh;
            line-height: $comlh;
            margin-right: 40px;
            cursor: pointer;
            padding: 0 20px;
        }
        .now,
        span:hover {
            color: $baseColor;
            border-bottom: 2px solid $baseColor;
        }
    }
    .wiki-pagination {
        margin-top: 30px;
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
          <router-link :to="'/collection/' + nid + (cat1 ? '/' + cat1 : '') + '/'+v.id">{{v.category_name}}</router-link>
          <span>({{cat1 ? v.two : v.one}})</span>
        </li>
      </ul>
    </div>

    <div class="questionList">
      <div class="que-nav">
        <span v-if="type == 'tag'">标签筛选结果</span>
        <span v-if="key">搜索结果</span>
        <router-link :to="{query:{type:'all'}}" :class="allQuestionCls">全部問題</router-link>
        <router-link :to="{query:{type:'hot'}}" active-class="now">熱點問題</router-link>
        <router-link :to="{query:{type:'my'}}" active-class="now">我的最愛</router-link>
        <router-link :to="{query:{type:'wait'}}" active-class="now">待回答</router-link>
      </div>
      <div class="que-list-table">
        <table>
          <tr>
            <th class="q-l-tle">標題</th>
            <th class="q-l-view">瀏覽</th>
            <th class="q-l-time">時間</th>
          </tr>
          {list}
        </table>
        <pagination :total="30" :current="currentPage" @changePage="pageChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '_COMP_/pagination';

export default {
  name: 'collectionBlock',
  props: [],
  components:{pagination},
  data() {
    return {
      category: [],
      bigName: '全部分類',
      nid: this.$route.params.nid ? this.$route.params.nid : 1,
      cat1: this.$route.params.cat1 ? this.$route.params.cat1 : '',
      cat2: this.$route.params.cat2 ? this.$route.params.cat2 : '',
      currentPage: this.$route.query.page ? this.$route.query.page : 1,
      type: this.$route.query.type ? this.$route.query.type : 'all',
      key: this.$route.query.key ? this.$route.query.key : '',
    };
  },
  computed: {
    allQuestionCls: function () {
      return this.type == 'all' ? 'now' : '';
    },
    subCat: function () {
      let catArray  = [];
      let catData   = this.category;
      if(this.cat1){
        for(let i in catData){
          if(this.cat1 == catData[i].self.id){
            this.bigName = catData[i].self.category_name;

            catArray = catData[i].child;
            break;
          }
        }
      }else if(this.nid){
        this.bigName = '全部分類';

        for(let i in catData){
          catArray.push(catData[i].self);
        }
      }
      return catArray;
    }
  },
  methods: {
    getCategory() {
      ajax.post(Api,{c: "index", a: "index", navigation_id: this.nid}).then(res => {
        this.category = res.data.category;
      });
    },
    catChange() {
      this.cat1 = this.$route.params.cat1 ? this.$route.params.cat1 : '';
      this.cat2 = this.$route.params.cat2 ? this.$route.params.cat2 : '';
    },
    typeChange() {

    },
    pageChange(now) {
      console.log(now)
    },
    getQuestion() {

    },
  },
  beforeMount: function () {
    this.getCategory();
  },
  watch: {
    $route: function() {
      this.catChange();
    }
  }
}
</script>
