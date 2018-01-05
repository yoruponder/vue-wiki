<style lang="scss">
@import "../../assets/css/baseVal.scss";
@import "../../assets/css/admin-common.scss";
.cat-table {
  .button {
    font-size: $nfs;
  }
  .fa {
    font-size: 18px;
    vertical-align: middle;
    color: #fff;
    margin-right: 3px;
  }
}
</style>

<template>
  <div class="admin-page">
    <admin-head/>
    <div class="admin-cnt com-width">
      <p class="srh-p">功能區</p>
      <div class="srh-area" style="display:block">
        <div class="line">
          <div class="item-wp">
            <select v-model="queryData.selnid" @change="linkNid">
              <option v-for="(v,k) in navArr" v-if="v.id != 4" :key="`nid${k}`" :value="v.id">{{v.title}}</option>
            </select>
          </div>
          <button v-if="!isSecond" class="button" style="width:140px;" @click="addCat1">添加一級分類</button>
          <template v-else>
            <div class="item-wp">當前處於<strong>【{{cat1Name}}】</strong>分类</div>
            <button class="button button-orange" style="width:140px;" @click="addCat2">添加二級分類</button>
            <button class="button" style="width:140px;margin-left:20px;" @click="goback">返回上級</button>
          </template>
        </div>
      </div>
      <div class="que-list-table cat-table">
        <template v-if="!isSecond">
          <table>
            <tr>
              <th width="100">選擇</th>
              <th width="720">一級分類</th>
              <th width="100">二級數量</th>
              <th width="280">操作</th>
            </tr>
            <tr v-if="!categorys.length">
              <td colspan="4">暫無數據</td>
            </tr>
            <tr v-else v-for="(v,k) in categorys" :key="k">
              <td><input type="checkbox" v-model="selIssues" :value="v.self.id"/></td>
              <td style="text-align:left;">{{v.self.category_name}}</td>
              <td><strong style="color:#f00;">{{v.child.length || 0}}</strong></td>
              <td>
                <button class="button" @click="editCat1(v.self.id,v.self.category_name)">
                  <span class="fa fa-edit"></span>編輯
                </button>
                <button class="button button-orange" @click="goSecond(v.self.id,v.self.category_name)">
                  <span class="fa fa-random"></span>進入二級
                </button>
              </td>
            </tr>
          </table>
          <div class="fn-btn-area">
            <button class="button button-orange" @click="delCat1">刪除分類</button>
          </div>
        </template>
        <template v-else>
          <table>
            <tr>
              <th width="920">二級分類</th>
              <th width="280">操作</th>
            </tr>
            <tr v-if="!cat2List.length">
              <td colspan="2">暫無數據</td>
            </tr>
            <tr v-else v-for="(v,k) in cat2List" :key="k">
              <td style="padding-left:20px;text-align:left;">{{v.category_name}}</td>
              <td>
                <button class="button" @click="editCat2(v.id,v.category_name)">
                  <span class="fa fa-edit"></span>編輯
                </button>
                <button class="button button-orange" @click="delCat2(v.id)">
                  <span class="fa fa-trash-o"></span>刪除
                </button>
              </td>
            </tr>
          </table>
        </template>
      </div>
    </div>
    <wiki-footer />
    <popbox :slotArr="['edit','add']">
      <div slot="edit">
        <p style="margin:30px 0 10px;font-size:16px;">當前分類名：<strong>{{tmpName}}</strong></p>
        <input v-model="newCatName" type="text" placeholder="请输入新分類名" autofocus="autofocus"/>
        <p v-if="!isSecond" style="margin-top:10px;font-size:16px;">是否刷新時間：<input type="checkbox" v-model="reflush"></p>
      </div>
      <div slot="add">
        <p style="margin:30px 0 10px;font-size:16px;">添加分類：</p>
        <input v-model="newCatName" type="text" placeholder="请输入新分類名" autofocus="autofocus"/>
      </div>
    </popbox>
    <shadow-component/>
  </div>
</template>

<script>
import adminHead from "_COMP_/admin/head";
import wikiFooter from "_COMP_/footer";
import popbox from "_COMP_/popbox";
import shadowComponent from "_COMP_/shadow";
import { mapActions } from "vuex";

export default {
  name: "answer",
  components: {
    adminHead,
    wikiFooter,
    popbox,
    shadowComponent
  },
  data() {
    return {
      navArr: [],
      categorys: [],
      cat2List: [],
      selIssues: [],
      queryData: {
        selnid: this.$route.params.nid ? this.$route.params.nid : 8591
      },
      isSecond: 0,
      cat1Name: '',
      tmpName: "",
      tmpCid: '',
      newCatName: "",
      reflush: 0
    };
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
    linkNid() {
      this.$router.push(`/admin/category/${this.queryData.selnid}`);
    },
    getSecondList() {
      let arr = [];
      for (let v of this.categorys) {
        if (v.self.id == this.tmpCid) {
          this.cat2List = v.child;
          break;
        }
      }
    },
    getListData() {
      let data = {
        navigation_id: this.queryData.selnid
      };

      Api.admin.category(data).then(res => {
        this.categorys = res.data;
        this.getSecondList();
      });
    },
    navChange() {
      this.queryData.selnid = this.$route.params.nid || 8591;
    },
    delCat1() {
      if (this.selIssues.length && confirm("確認刪除嗎")) {
        Api.admin.removeCategory({ category_id: this.selIssues + "" }).then(res => {
          if (res.status == 1) {
            this.getListData();
            this.selIssues = [];
          } else {
            alert("失敗");
          }
        });
      }
    },
    addCat1() {
      this.sdshow({
        fn: () => this.closePopbox()
      });
      this.pbshow({
        type: 'slot',
        tle: "添加一級分類",
        slotName: 'add',
        btn: [
          {
            txt: "確定",
            type: "ok",
            fn: () => this.doAddCat1()
          }
        ]
      });
    },
    doAddCat1() {
      if(this.newCatName){
        let data = {
          navigation_id: this.queryData.selnid,
          category_name: this.newCatName
        };
        Api.admin.addCategoryOne(data).then(res => {
          if(res.status == 1){
            this.getListData();
            this.closePopbox();
            this.newCatName = '';
          }else{
            alert('失敗');
          }
        });
      }
    },
    editCat1(cid, name) {
      this.tmpName = name;
      this.sdshow({
        fn: () => this.closePopbox()
      });
      this.pbshow({
        type: "slot",
        tle: "編輯一級分類",
        slotName: "edit",
        btn: [
          {
            txt: "確定",
            type: "ok",
            fn: () => this.doEditCat1(cid)
          }
        ]
      });
    },
    doEditCat1(cid) {
      if (this.newCatName) {
        let data = {
          category_id: cid,
          category_name: this.newCatName,
          reflush_time: this.reflush == true ? 'on' : ''
        };
        Api.admin.editCategoryName(data).then(res => {
          if (res.status == 1) {
            this.getListData();
            this.closePopbox();
            this.newCatName = "";
            this.reflush = '';
          } else {
            alert("失敗");
          }
        });
      }
    },
    goSecond(cid,name) {
      this.tmpCid = cid;
      this.cat1Name = name;
      this.isSecond = 1;
      this.getSecondList();
    },
    editCat2(cid, name) {
      this.tmpName = name;
      this.sdshow({
        fn: () => this.closePopbox()
      });
      this.pbshow({
        type: "slot",
        tle: "編輯二級分類",
        slotName: "edit",
        btn: [
          {
            txt: "確定",
            type: "ok",
            fn: () => this.doEditCat2(cid)
          }
        ]
      });
    },
    doEditCat2(cid) {
      if (this.newCatName) {
        let data = {
          category_id: cid,
          category_name: this.newCatName,
          reflush_time: ''
        };
        Api.admin.editCategoryName(data).then(res => {
          if (res.status == 1) {
            this.getListData();
            this.closePopbox();
            this.newCatName = "";
          } else {
            alert("失敗");
          }
        });
      }
    },
    addCat2() {
      this.sdshow({
        fn: () => this.closePopbox()
      });
      this.pbshow({
        type: 'slot',
        tle: "添加二級分類",
        slotName: 'add',
        btn: [
          {
            txt: "確定",
            type: "ok",
            fn: () => this.doAddCat2()
          }
        ]
      });
    },
    doAddCat2() {
      if(this.newCatName){
        let data = {
          navigation_id: this.queryData.selnid,
          category_pid: this.tmpCid,
          category_name: this.newCatName
        };
        Api.admin.addCategoryTwo(data).then(res => {
          if(res.status == 1){
            this.getListData();
            this.closePopbox();
            this.newCatName = '';
          }else{
            alert('失敗');
          }
        });
      }
    },
    delCat2(cid) {
      if (confirm("確認刪除嗎")) {
        Api.admin.removeCategoryTwo({ category_id: cid }).then(res => {
          if (res.status == 1) {
            this.getListData();
          } else {
            alert("失敗");
          }
        });
      }
    },
    goback() {
      this.isSecond = 0;
    }
  },
  beforeMount: function() {
    this.getNav();
    this.getListData();
  },
  watch: {
    $route: function() {
      this.navChange();
      this.getListData();
    }
  }
};
</script>
