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
            <select v-model="queryData.selcat" @change="linkCat">
              <option value="">全部通知</option>
              <option v-for="(v,k) in categoryArr" :key="k" :value="v.id">{{v.category_name}}</option>
            </select>
          </div>
          <button class="button" @click="addNotic">添加分類</button>          
        </div>
        <div class="line">
          <div class="item-wp">
            <input type="date" v-model="inputDom.start_time">&nbsp;&nbsp;到&nbsp;&nbsp;<input type="date" v-model="inputDom.end_time">
          </div>
          <div class="item-wp">
            <input type="text" placeholder="請輸入標籤名" v-model="inputDom.key" style="width:370px;" />
          </div>
          <button class="button" @click="inputSearch">搜索</button>
          <router-link :to="`/admin/notice/${queryData.selcat}`" @click="resetInput" class="button button-orange" style="margin-left:36px;">清空筛选</router-link>
        </div>
      </div>
      <div class="que-list-table">
        <table>
          <tr>
            <th width="60">选择</th>
            <th width="770">通知</th>
            <th width="90">發佈人</th>
            <th width="60">浏览</th>
            <th width="220">通知时间</th>
          </tr>
          <tr v-if="!notification.length">
            <td colspan="5">暫無數據</td>
          </tr>
          <tr v-else v-for="(v,k) in notification" :key="k">
            <td><input type="checkbox" v-model="selIssues" :value="v.id"/></td>
            <td>{{v.content}}</td>
            <td>{{v.add_uid}}</td>
            <td>{{v.browse_num}}</td>
            <td>{{v.add_time}}</td>
          </tr>
        </table>
      </div>
      <div class="fn-btn-area">
        <button class="button button-orange" @click="delNotic">刪除</button>
        <button class="button" @click="moveNotic">移動</button>
      </div>
      <pagination :total="pageNum" :now="queryData.currentPage"/>
      <popbox :slotArr="['moveCat','add']">
        <div slot="moveCat" class="movecat-pop">
          <div class="line">将通知移动至</div>
          <div class="line">
            <span>移至版塊:</span>
            <select v-model="selMove">
              <option value="">請選擇</option>
              <option v-for="(v,k) in categoryArr" :key="k" :value="v.id">{{v.category_name}}</option>              
            </select>
          </div>
        </div>
        <div slot="add">
          <p style="margin:30px 0 10px;font-size:16px;">添加分類：</p>
          <input v-model="newCatName" type="text" placeholder="请输入新分類" autofocus="autofocus"/>
        </div>
      </popbox>
      <shadow-component/>
    </div>
    <wiki-footer />
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
  name: "notification",
  components: {
    adminHead,
    pagination,
    wikiFooter,
    popbox,
    shadowComponent
  },
  data() {
    return {
      categoryArr: [],
      notification: [],
      selIssues: [],
      count: 0,
      pagesize: 15,
      inputDom: {
        key: this.$route.query.k ? this.$route.query.k : "",
        start_time: this.$route.query.st ? this.$route.query.st : "",
        end_time: this.$route.query.et ? this.$route.query.et : ""
      },
      queryData: {
        selcat: this.$route.params.cat ? this.$route.params.cat : '',
        currentPage: this.$route.query.page ? this.$route.query.page : 1
      },

      selMove: '',
      newCatName: ''
    };
  },
  computed: {
    pageNum: function() {
      return Math.ceil(this.count / this.pagesize);
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
    getCat() {
      Api.admin.notiCategory().then(res => {
        this.categoryArr = res.data.notiCategory;
      });
    },
    linkCat() {
      this.$router.push(`/admin/notice/${this.queryData.selcat}`);
    },
    inputSearch() {
      let data = Object.assign({}, this.$route.query, {
        k: this.inputDom.key,
        st: this.inputDom.start_time,
        et: this.inputDom.end_time
      });
      this.$router.push({ query: data });
    },
    setQuery() {
      this.queryData = {
        selcat: this.$route.params.cat ? this.$route.params.cat : "",
        currentPage: this.$route.query.page ? this.$route.query.page : 1
      };
      this.inputDom = {
        key: this.$route.query.k ? this.$route.query.k : "",
        start_time: this.$route.query.st ? this.$route.query.st : "",
        end_time: this.$route.query.et ? this.$route.query.et : ""
      };
    },
    resetInput() {
      this.inputDom = {
        key: "",
        start_time: "",
        end_time: ""
      };
    },
    getListData() {
      let data = {
        category_id: this.queryData.selcat,
        key: this.inputDom.key,
        start_time: this.inputDom.start_time,
        end_time: this.inputDom.end_time,
        page: this.queryData.currentPage,
        pagesize: this.pagesize
      };

      Api.admin.notification(data).then(res => {
        this.notification = res.data.notification;
        this.count = res.data.count;
      });
    },
    delNotic() {
      if (confirm("確認刪除嗎")) {
        Api.admin.removeNotice({ id: this.selIssues + "" }).then(res => {
          if (res.status == 1) {
            this.getListData();
            this.selIssues = [];
          } else {
            alert("失敗");
          }
        });
      }
    },
    moveNotic() {
      if(this.selIssues.length){
        this.sdshow({
          fn: () => this.closePopbox()
        });
        this.pbshow({
          type: 'slot',
          tle: "添加標籤",
          slotName: 'moveCat',
          btn: [
            {
              txt: "確定",
              type: "ok",
              fn: () => this.doMoveNotic()
            }
          ]
        });
      }
    },
    doMoveNotic() {
      let data = {
        id: this.selIssues + '',
        category_id: this.selMove
      };
      Api.admin.moveNotice(data).then(res => {
        if(res.status == 1){
          this.getListData();
          this.closePopbox();
          this.selIssues = [];
        }else{
          alert('失敗');
        }
      });
    },
    addNotic() {
      this.sdshow({
        fn: () => this.closePopbox()
      });
      this.pbshow({
        type: 'slot',
        tle: "添加分類",
        slotName: 'add',
        btn: [
          {
            txt: "確定",
            type: "ok",
            fn: () => this.doAdd()
          }
        ]
      });
    },
    doAdd() {
      if(this.newCatName){
        let data = {
          category_name: this.newCatName
        };
        Api.admin.addNotice(data).then(res => {
          if(res.status == 1){
            this.getCat();
            this.closePopbox();
            this.newCatName = '';
          }else{
            alert('失敗');
          }
        });
      }
    }
  },
  beforeMount: function() {
    this.getCat();
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
