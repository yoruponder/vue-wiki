<style lang="scss">
@import "../assets/css/baseVal.scss";
$comMargin: 12px 0 32px;

.ask-page {
  .index-left input {
    margin: $comMargin;
  }
  .select-type {
    margin: $comMargin;
    select {
      width: 250px;
      height: 32px;
    }
  }
  .select-tag {
    margin: $comMargin;
    .choosen {
      background: $baseColor;
      color: #fff;
    }
    a {
      cursor: pointer;
      display: block;
      float: left;
      border: 1px solid $baseColor;
      color: $baseColor;
      width: 140px;
      height: $comlh;
      line-height: $comlh;
      text-align: center;
      border-radius: 4px;
      margin: 6px 5px;
      transition: all 0.2s;
      i {
        pointer-events: none;
      }
    }
    a:hover {
      background: $baseColor;
      color: #fff;
    }
  }
  .wiki-editor {
    margin: $comMargin;
  }
  .submit-ask {
    display: block;
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>


<template>
<div class="ask-page">
  <wiki-head :id="qid" />
  <div class="page-cnt page-cnt-pd clearfix">
    <bread-crumb :data="bread"/>
    <div class="com-width clearfix">
      <div class="index-left">
        <h3>标题：</h3>
        <input type="text" placeholder="请填写提问标题" :value="title" />
        <h3>选择标签（可多选）</h3>
        <div class="select-tag clearfix"></div>
        <h3>问题描述</h3>
        <vue-ueditor @ready="editorReady"/>
        <button type="button" class="submit-ask button" @click="finishEdit">发布提问</button>
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

export default {
  name: "edit",
  components: {
    wikiHead,
    breadCrumb,
    rightBlock,
    vueUeditor,
    wikiFooter
  },
  data() {
    return {
      title: "",
      nid: this.$route.params.nid,
      qid: this.$route.params.qid,
      tag: [],
      selTagList: [],
      editor: ""
    };
  },
  computed: {
    bread() {
      return this.fromLink();
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
      breadArray.push({name: '编辑问题'});
      return breadArray;
    },
    getData() {
      Api.editIssue({
        c: "user",
        a: "fetchEditIssue",
        issue_id: this.qid
      }).then(res => {
        if (res.status === 1) {
          let selTagList = [];

          if (res.data.tag) {
            for (let i = 0; i < res.data.tag.length; i++) {
              if (res.data.tag[i]["check"] === 1) {
                selTagList.push(res.data.tag[i]["id"]);
              }
            }
          }
          this.title = res.data.issue_title;
          this.tag = res.data.tag ? res.data.tag : [];
          this.selTagList = selTagList;
        } else {
          alert(res.info);
          router.push({ path: `/questionDetail/${this.qid}` });
        }
      });
    },
    finishEdit() {
      let data = {
        c: "user",
        a: "editIssue",
        issue_id: this.qid,
        issue_title: this.state.title,
        issue_content: UE.getEditor("content").getContent(),
        issue_tag: this.selTagList.join(",")
      };

      Api.finishEdit(data).then(res => {
        if (res.status == 1) {
          alert("編輯成功");
        } else {
          alert(res.info);
        }
        router.push({ path: `/questionDetail/${this.qid}` });
      });
    },
    selTag(id) {
      let idx = this.selTagList.indexOf(id);
      let newArr = this.selTagList;
      if (idx > -1) {
        newArr.splice(idx, 1);
      } else {
        newArr.push(id);
      }
      this.selTagList = newArr;
    }
  }
};
</script>
