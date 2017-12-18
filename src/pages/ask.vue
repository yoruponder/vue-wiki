<template>
<div class="ask-page">
  <wiki-head :id="nid" />
  <div class="page-cnt page-cnt-pd clearfix">
    <bread-crumb :data="bread"/>
    <div class="com-width clearfix">
      <div class="index-left">
        <h3>标题：</h3>
        <input class="title" type="text" placeholder="请填写提问标题"/>
        <h3>选择分类：</h3>
        <div class="select-type">
          <span>一级分类：</span>
          <select @change="selc1">
            <option value="0">请选择</option>
            <template v-if="category">
              <option v-for="(v,k) in category" :key="k" :value="v.self.id">{{v.self.category_name}}</option>
            </template>
          </select>
          <span :style="{marginLeft: '108px'}">二级分类：</span>
          <select @change="selc2">
            <option value="0">请选择</option>
            <template v-if="c1">
              <option v-for="(v,k) in c2List" :key="k" :value="v.id">{{v.category_name}}</option>
            </template>
          </select>
        </div>
        <template v-if="nid != 3 && nid != 4">
          <h3>选择标签（可多选）</h3>
          <div class="select-tag clearfix">
            <span v-for="(v,k) in navTag" :key="k" :class="currentTag.indexOf(v.id) > -1 ? 'choosen' : ''" @click="selTag(v.id)"><i class="fa fa-hashtag"></i>{{v.content}}</span>
          </div>
        </template>
        <h3>问题描述</h3>
        <vue-ueditor @ready="editorReady"/>
        <button type="button" class="submit-ask button" @click="submitInfo">发布提问</button>
      </div>
      <right-block :id="nid" />
    </div>
  </div>
  <wiki-footer />
</div>
</template>

<script>
import wikiHead from "_COMP_/header";
import breadCrumb from "_COMP_/breadCrumb";
import vueUeditor from "_COMP_/UEditor";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";
import "_ASET_/css/ask.scss";

export default {
  name: "ask",
  components: {
    wikiHead,
    breadCrumb,
    rightBlock,
    vueUeditor,
    wikiFooter
  },
  data() {
    return {
      nid: this.$route.params.nid,
      category: [],
      navTag: [],
      currentTag: [],
      c1: 0,
      c2: 0,
      editor: "",
      denyRepeat: 0
    };
  },
  computed: {
    bread() {
      return this.fromLink();
    },
    c2List() {
      let c2arr = [];
      for (let i in this.category) {
        if (this.category[i].self.id == this.c1) {
          c2arr = this.category[i].child;
          break;
        }
      }
      return c2arr;
    }
  },
  methods: {
    //編輯器狀態
    editorReady(ue) {
      this.editor = ue;
    },
    fromLink() {
      let breadArray = [];

      switch (this.nid) {
        case "8591":
          breadArray.push({ name: "8591寶物交易網", link: "/collection/8591" });
          break;
        case "100":
          breadArray.push({ name: "100室内设计", link: "/collection/100" });
          break;
        case "3":
          breadArray.push({ name: "客服充電站", link: "/life" });
          break;
        case "4":
          breadArray.push({ name: "通知事項", link: "/notification" });
      }
      breadArray.push({ name: "發起提問" });
      return breadArray;
    },
    getCategory() {
      let data = { c: "index", a: "category", navigation_id: this.nid };
      Api.category(data).then(res => {
        this.category = res.data;
      });
    },
    getTagList() {
      if (this.nid != 3 && this.nid != 4) {
        let data = { c: "index", a: "navTag", navigation_id: this.nid };
        Api.category(data).then(res => {
          this.navTag = res.data;
        });
      }
    },
    selTag(id) {
      let idx = this.currentTag.indexOf(id);
      let newArr = this.currentTag;
      if (idx > -1) {
        newArr.splice(idx, 1);
      } else {
        newArr.push(id);
      }
      this.currentTag = newArr;
    },
    selc1(e) {
      let id = e.target.value * 1;
      this.c1 = id;
    },
    selc2(e) {
      let id = e.target.value * 1;
      this.c2 = id;
    },
    submitInfo() {
      let data = {
        c: "user",
        a: "publishIssue",
        navigation_id: this.nid,
        issue_title: document.getElementsByClassName("title")[0].value,
        issue_content: this.editor.getContent(),
        category_one: this.c1,
        category_two: this.c2,
        tag: this.currentTag + ""
      };
      if(!data.issue_title){
        alert('請填寫標題');
        return;
      }
      if(!data.category_one || !data.category_two){
        alert('請選擇分類');
        return;
      }
      if(!data.issue_content){
        alert('請填寫內容');
        return;
      }
      if(!this.denyRepeat){
        this.denyRepeat = 1;
        Api.submitIssue(data).then(res => {
          if (res.info == "ok") {
            alert("發佈成功");
            this.$router.push({ path: `/question/${res.data.id}` });
          } else {
            alert(res.info);
          }
          this.denyRepeat = 0;
        });
      }
    }
  },
  beforeMount: function() {
    this.getCategory();
    this.getTagList();
  }
};
</script>
