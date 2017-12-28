<style lang="scss">
@import "../assets/css/baseVal.scss";
@import "../assets/css/questionList.scss";

.notification-page {
  .q-l-view {
    width: 120px;
  }
  .q-l-tle {
    width: 580px;
  }
  .q-l-time {
    width: 150px;
  }
  .que-list-table table td {
    color: $fc1;
  }
  .n-tag {
    background: $baseColor;
    color: #fff;
    border-radius: 5px;
    display: inline-block;
    width: 100px;
    height: 24px;
    line-height: 24px;
    text-align: center;
  }
  .que-list-table table td.n-time {
    text-align: center;
    color: $fc3;
  }
}
</style>

<template>
  <div class="notification-page">
    <wiki-head :id="nid" />
    <div class="com-width clearfix" style="margin-top:25px;">
      <div class="index-left">
        <notification-cat :cid="cid" />
        <div class="questionList">
          <div class="que-nav">
            <span v-if="key" class="now">搜索結果</span>
            <router-link to="/notification" :class="!key && !type ? 'now' :''">全部通知</router-link>
            <router-link :to="{query:{type:'month'}}" :class="type=='month' ? 'now' :''">近一個月通知</router-link>
          </div>
          <div class="que-list-table">
            <table>
              <tr>
                <th class="q-l-view">類別</th>
                <th class="q-l-tle">標題</th>
                <th class="q-l-time">時間</th>
              </tr>
              <tr v-if="!list.length">
                <td colspan="3">暫無數據</td>
              </tr>
              <tr v-else v-for="(v,k) in list" :key="k">
                <td><router-link class="n-tag" :to="`/notification/${v.category_id}`">{{v.category_name}}</router-link></td>
                <td><router-link :to="`/notification/detail/${v.id}`">{{v.title}}</router-link></td>
                <td class="n-time">{{v.add_time}}</td>
              </tr>
            </table>
          </div>
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
import notificationCat from "_COMP_/notificationCat";
import wikiFooter from "_COMP_/footer";

export default {
  name: "notification",
  components: {
    wikiHead,
    rightBlock,
    notificationCat,
    pagination,
    wikiFooter
  },
  data() {
    return {
      nid: 4,
      list: [],
      category: [],
      cid: this.$route.params.id ? this.$route.params.id : "",
      type: this.$route.query.type ? this.$route.query.type : "",
      key: this.$route.query.key ? this.$route.query.key : "",
      currentPage: this.$route.query.page ? this.$route.query.page : 1,
      count: 0,
      pageSize: 15
    };
  },
  computed: {
    pageNum: function() {
      return Math.ceil(this.count / this.pageSize);
    }
  },
  methods: {
    getList() {
      let data = {
        c: "notification",
        a: "notificationAll",
        category: this.cid,
        type: this.type,
        page: this.currentPage,
        pagesize: this.pageSize
      };
      Api.notificationList(data).then(res => {
        if (res.status == 1) {
          this.list = res.data.notification ? res.data.notification : [];
          this.count = res.data.count;
        }
      });
    },
    catChange() {
      this.cid = this.$route.params.id ? this.$route.params.id : "";
    },
    pageChange() {
      this.currentPage = this.$route.query.page ? this.$route.query.page : 1;
    },
    typeChange() {
      this.type = this.$route.query.type ? this.$route.query.type : "";
    }
  },
  beforeMount: function() {
    this.getList();
  },
  watch: {
    $route: function() {
      this.catChange();
      this.pageChange();
      this.typeChange();
      this.getList();
    }
  }
};
</script>
