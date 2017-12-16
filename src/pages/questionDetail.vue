<style lang="scss">
@import "../assets/css/baseVal.scss";
.questionDetail-page {
  .index-left {
    .button {
      width: 88px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      margin-left: 20px;
      &:hover {
        color: #fff;
      }
    }
  }
  .detail-box {
    padding: 20px;
    border: $comborder;
    border-radius: 4px;
    background: $lgray;
    h3 {
      font-size: $mfs;
      margin-bottom: 10px;
    }
  }
  .d-b-menu {
    margin-bottom: 25px;
    font-size: $nfs;
    color: $afc;
    b {
      display: inline-block;
      font-weight: normal;
      margin: 0 10px;
    }
    .r {
      float: right;
    }
  }
  .d-b-cnt {
    margin-bottom: 20px;
    font-size: $nfs;
  }
  .d-b-button {
    text-align: right;
    .hadClose {
      margin-left: 20px;
    }
  }
  .hr-line {
    height: 1px;
    background: #ddd;
    margin: 40px 0;
  }
  .submit-ask {
    display: block;
    margin: 32px auto 0;
  }
  .reply-list {
    margin: 20px 0 10px;
    overflow: hidden;
    .reply-item {
      margin-bottom: 20px;
      border: $comborder;
      h4 {
        display: flex;
        justify-content: space-between;
        height: 70px;
        line-height: 70px;
        background: #fff9f9;
        border-bottom: $comborder;
        padding: 0 20px;
        font-size: $nfs;
        color: $afc;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .user {
          margin: 0 20px 0 30px;
        }
        .time {
          margin: 0 0 0 20px;
        }
        .button {
          align-self: center;
        }
      }
      .reply-detail {
        padding: 20px;
        background: $lgray;
        .d-b-button {
          margin-top: 20px;
        }
      }
    }
  }
  .more-answer {
    font-size: $bfs;
    margin-bottom: 5px;
  }
  .editor-content {
    table {
      border: 1px solid #ddd;
      td,
      th {
        border: 1px solid #ddd;
        padding: 2px 8px;
        line-height: 2;
      }
    }
    img {
      max-width: 100%;
      vertical-align: text-bottom;
    }
  }
  .edit-btn {
    text-align: center;
    margin-top: 20px;
    .edit-cancle {
      background: $dgray;
    }
  }
}
</style>

<template>
<div class="questionDetail-page">
  <wiki-head :id="issue.navigation_id" />
  <bread-crumb :data="bread"/>
  <div class="com-width clearfix">
    <div class="index-left">
      <div class="detail-box">
        <h3>{{issue.issue_title}}</h3>
        <p class="clearfix d-b-menu">
          <span class="l">{{state ? issue.userinfo.username : '加載中...'}}<b>|</b>浏览{{issue.browse_num}}次</span>
          <span class="r"><span @click="addFavorite">加入最爱</span><b>|</b>{{issue.issue_time}}</span>
        </p>
        <div class="d-b-cnt editor-content">
          <div v-html="issue.issue_content"></div>
        </div>
        <div class="d-b-button">
          <router-link class="button" :to="`/edit/${issue.navigation_id}/${qid}`">点我编辑</router-link>
          <span v-if="issue.status == 2" class="hadClose">該問題已關閉</span>
          <button v-else class="button button-orange" @click="closeIssue">关闭提问</button>
        </div>
      </div>
      <div class="hr-line"></div>
      <ul class="reply-list" v-if="!edit">
        <li class="reply-item" v-for="(v,k) in reply" :key="k">
          <h4>
            <div>
              <img :src="v.userinfo.photo ? v.userinfo.photo : '/static/timg.jpeg'"/>
              <span class="user">{{v.userinfo.username}}</span>|<span class="time">回答于{{v.reply_time}}</span>
            </div>
            <div>
              <span class="button button-orange" @click="delAnswer(v.id)">刪除回答</span>
              <span class="button" @click="getEditAnswer(v.id)">我要編輯</span>
            </div>
          </h4>
          <div class="reply-detail">
            <div class="editor-content clearfix" v-html="v.reply_content"></div>
          </div>
        </li>
      </ul>
      <h3 class="more-answer">{{edit ? '編輯回答':'我要補充'}}</h3>
      <div>
        <vue-ueditor @ready="editorReady"/>
        <div class="edit-btn" v-if="edit">
          <button type="button" class="button edit-answer" @click="submitEditAnswer">编辑完成</button>
          <button class="button edit-cancle" @click="cancleEditAnswer">取消编辑</button>
        </div>
        <button v-else type="button" class="submit-ask button" @click="replyIssue">提交回答</button>
      </div>
    </div>
    <right-block v-if="state" :id="issue.navigation_id" />
  </div>
  <popbox/>
  <shadow-component/>
  <wiki-footer/>
</div>
</template>

<script>
import wikiHead from "_COMP_/header";
import breadCrumb from "_COMP_/breadCrumb";
import collectionBlock from "_COMP_/collectionBlock";
import vueUeditor from "_COMP_/UEditor";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";
import popbox from "_COMP_/popbox";
import shadowComponent from "_COMP_/shadow";
import { mapActions } from "vuex";

export default {
  name: "questionDetail",
  components: {
    wikiHead,
    breadCrumb,
    rightBlock,
    vueUeditor,
    wikiFooter,
    popbox,
    shadowComponent
  },
  data() {
    return {
      state: 0,
      edit: 0,
      qid: this.$route.params.qid,
      issue: {},
      reply: [],
      editId: "",
      editor: ""
    };
  },
  computed: {
    bread: function() {
      return this.fromLink();
    }
  },
  methods: {
    ...mapActions({
      sdshow: "shadow/show",
      sdhide: "shadow/hide",
      pbshow: "popbox/show",
      pbhide: "popbox/hide"
    }),
    fromLink() {
      if (this.state) {
        let data = this.issue;
        let breadArray = [];
        let nid = data.navigation_id;
        let c1name = data.category_one_bread;
        let c2name = data.category_two_bread;
        let l1 = "";
        let l2 = "";
        let c1id = data.category_one;
        let c2id = data.category_two;

        switch (nid) {
          case "1":
            breadArray.push({ name: "8591寶物交易網", link: "/collection/8591" });
            break;
          case "2":
            breadArray.push({ name: "100室內設計", link: "/collection/100" });
            break;
          case "3":
            breadArray.push({ name: "客服充電站", link: "/life" });
            break;
          case "4":
            breadArray.push({ name: "通知事項", link: "/notification" });
        }

        if (nid != 3 && nid != 4) {
          l1 = `/collection/${nid}/${c1id}`;
          l2 = `/collection/${nid}/${c1id}/${c2id}`;
        } else {
          l1 = `/life/collection/${c1id}`;
          l2 = `/life/collection/${c1id}/${c2id}`;
        }
        breadArray.push({
          name: c1name,
          link: l1
        });
        breadArray.push({
          name: c2name,
          link: l2
        });
        breadArray.push({ name: "问题详情" });
        return breadArray;
      } else {
        return [{ name: "數據加載中...", link: "/" }, { name: "問題詳情" }];
      }
    },
    //详情数据
    getData() {
      let data = { c: "index", a: "issueInfo", issue_id: this.qid };
      Api.detail(data).then(res => {
        this.state = 1;
        this.issue = res.data.issues;
        this.reply = res.data.reply;
      });
    },
    //編輯器狀態
    editorReady(ue) {
      this.editor = ue;
    },
    //获取编辑回答数据
    getEditAnswer(id) {
      Api.getEditAnswer({
        c: "user",
        a: "fetchEditReply",
        reply_id: id
      }).then(res => {
        if (res.status == 1) {
          this.editId = id;
          this.edit = 1;
          this.editor.setContent(res.data.reply_content);
        } else {
          alert(res.info);
          router.push({ path: `/questionDetail/${qid}` });
        }
      });
    },
    //提交回答编辑
    submitEditAnswer() {
      let data = {
        c: "user",
        a: "editReply",
        reply_id: this.editId,
        reply_content: this.editor.getContent()
      };
      if (data.reply_content) {
        Api.submitEditAnswer(data).then(res => {
          if (res.status == 1) {
            this.cancleEditAnswer();
            this.getData();
          } else {
            alert(res.info);
          }
        });
      } else {
        alert("编辑内容不能为空");
      }
    },
    //取消编辑回答
    cancleEditAnswer() {
      this.edit = 0;
      this.editor.setContent("");
    },
    //刪除回答
    delAnswer(id) {
      if (confirm("要刪除這條回答嗎，只有管理員可以刪除")) {
        Api.delAnswer({ c: "user", a: "removeReply", id: id }).then(res => {
          if (res.status === 1) {
            this.getData();
          } else {
            alert(res.info);
          }
        });
      }
    },
    // 回复问题接口
    replyIssue() {
      let data = {
        c: "user",
        a: "replyIssue",
        issue_id: this.qid,
        reply_content: this.editor.getContent()
      };
      if (data.reply_content) {
        Api.replyIssue(data).then(res => {
          if (res.status == 1) {
            this.getData();
            this.editor.setContent("");
          } else {
            alert(res.info);
          }
        });
      } else {
        alert("内容不能为空");
      }
    },
    //關閉問題
    closeIssue() {
      let data = {
        c: "user",
        a: "closeIssue",
        issue_id: this.qid
      };
      if (confirm("你確定要關閉問題嗎，關閉后不能回答和補充")) {
        Api.closeIssue(data).then(res => {
          if (res.status == 1) {
            this.getData();
          } else {
            alert(res.info);
          }
        });
      }
    },
    addFavorite() {
      this.sdshow({
        fn: () => this.closePopbox()
      });
      this.pbshow({
        tle: "加入我的最愛",
        cnt: `<p style="margin:30px 0 10px;font-size:16px;">将该问题加入我的最爱。</p>
        <input class="j-fav-name" type="text" placeholder="请输入名称" autofocus="autofocus"/>`,
        btn: [
          {
            txt: "確定",
            type: "ok",
            fn: () => {
              this.doAddFavorite(this.issue.navigation_id);
            }
          }
        ]
      });
    },
    doAddFavorite(navigation_id) {
      let data = {
        c: "user",
        a: "collection",
        issue_id: this.qid,
        collection_name: document.getElementsByClassName("j-fav-name")[0].value,
        navigation_id: navigation_id
      };

      if (data.collection_name) {
        Api.addFavorite(data).then(res => {
          if (res.status === 1) {
            this.closePopbox();
            alert("添加成功");
            window.location.reload();
          } else {
            alert(res.info);
          }
        });
      } else {
        alert("请填入名称");
      }
    },
    closePopbox() {
      this.pbhide();
      this.sdhide();
    }
  },
  beforeMount: function() {
    this.getData();
  }
};
</script>
