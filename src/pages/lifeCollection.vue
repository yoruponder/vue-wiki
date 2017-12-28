<style lang="scss">
@import "../assets/css/baseVal.scss";

.lifeCollection {
  display: flex;
  width: 100%;
  height: auto;
  padding-bottom: 20px;
  background: $lgray;
  border-radius: 5px;
  a {
    color: $fc1;
    &:hover {
      color: $baseColor;
    }
    &.on {
      color: $baseColor;
    }
  }
  .lc-bk {
    flex: 1;
    text-align: center;
    h3 {
      font-size: $bfs;
      height: 72px;
      line-height: 72px;
      .fa {
        margin-right: 15px;
        font-size: 22px;
      }
      .fa-group {
        color: #f39800;
      }
      .fa-heartbeat {
        color: #f00;
      }
      .fa-forumbee {
        color: #87ccc7;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
.lifeList {
  margin: 20px 0;
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top: 1px dashed $mgray;
    padding: 10px 0;
    min-height: 142px;
    a {
      color: $fc1;
    }
    h3 {
      font-weight: 700;
      font-size: $mfs;
      line-height: 28px;
      margin-bottom: 10px;
      &:before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 16px;
        background: $fc1;
        margin-right: 10px;
        vertical-align: -2px;
      }
    }
    .desc {
      line-height: 20px;
      text-align: justify;
      color: $fc2;
    }
    .info {
      display: flex;
      justify-content: space-between;
      color: $fc3;
      line-height: 30px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
</style>

<template>
  <div class="life-collection-page">
    <wiki-head :id="nid" />
    <div class="com-width clearfix" style="margin-top:25px;">
      <div class="index-left">
        <div class="lifeCollection">
          <div v-for="(v,k) in category" :key="`c1${k}`" class="lc-bk">
            <h3>
              <span :class="`fa ${clsname[k]}`"></span>
              <router-link :to="`/life/collection/${v.self.id}`" active-class="on">{{v.self.category_name}}</router-link>
            </h3>
            <ul>
              <li v-for="(v,k) in v.child" :key="`c2${k}`">
                <router-link :to="`/life/collection/${v.pid}/${v.id}`" active-class="on">{{v.category_name}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="lifeList">
          <ul>
            <li v-if="!list.length">暫無數據</li>
            <li v-else v-for="(v,k) in list" :key="k">
              <div>
                <router-link :to="`/question/${v.id}`">
                  <h3>{{v.issue_title}}</h3>
                  <div class="desc" v-html="v.issue_content ? stringCut(v.issue_content, 50) : '暫無內容信息'"></div>
                </router-link>
              </div>
              <div class="info">
                <div>
                  <img :src="v.user.photo ? v.user.photo : `/static/img/timg.jpeg`"/>
                  <span>{{v.user.username}}</span>
                </div>
                <div>
                  <span>上傳時間：{{v.issue_time}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <pagination :total="pageNum" :now="currentPage"/>
      </div>
      <right-block :id="nid" />
    </div>
    <wiki-footer/>
  </div>
</template>

<script>
import wikiHead from "_COMP_/header";
import rightBlock from "_COMP_/rightBlock";
import pagination from "_COMP_/pagination";
import wikiFooter from "_COMP_/footer";
import { stringCut } from "_LIBS_/plugin";

export default {
  name: "lifeCollection",
  components: {
    wikiHead,
    rightBlock,
    pagination,
    wikiFooter
  },
  data() {
    return {
      nid: 3,
      c1: this.$route.params.cat1,
      c2: this.$route.params.cat2 ? this.$route.params.cat2 : '',
      category: [],
      list: [],
      clsname: ["fa-group", "fa-heartbeat", "fa-forumbee"],
      currentPage: this.$route.query.page ? this.$route.query.page : 1,
      count: 0, //条数,
      pageSize: 15
    };
  },
  computed: {
    pageNum: function() {
      return Math.ceil(this.count / this.pageSize);
    }
  },
  methods: {
    stringCut,
    getCategory() {
      Api.index({
        c: "index",
        a: "index",
        navigation_id: this.nid
      }).then(res => {
        if (res.status === 1) {
          this.category = res.data.category ? res.data.category : [];
        }
      });
    },
    getList() {
      let data = {
        c: "index",
        a: "chargeList",
        type: "",
        navigation_id: 3,
        page: this.currentPage,
        pagesize: this.pageSize,
        category_one: this.c1,
        category_two: this.c2
      };
      Api.lifeList(data).then(res => {
        if (res.status === 1) {
          (this.list = res.data.issue ? res.data.issue : []),
            (this.count = res.data.count);
        }
      });
    },
    catChange() {
      this.c1 = this.$route.params.cat1 ? this.$route.params.cat1 : "";
      this.c2 = this.$route.params.cat2 ? this.$route.params.cat2 : "";
    },
    pageChange() {
      this.currentPage = this.$route.query.page ? this.$route.query.page : 1;
    }
  },
  beforeMount: function() {
    this.getCategory();
    this.getList();
  },
  watch: {
    $route: function() {
      this.catChange();
      this.pageChange();
      this.getList();      
    }
  }
};
</script>
