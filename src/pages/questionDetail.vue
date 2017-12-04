<style lang="scss">
@import "../assets/css/baseVal.scss";
.questionDetail-page {
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
            <span class="r"><span>加入最爱</span><b>|</b>{{issue.issue_time}}</span>
          </p>
          <div class="d-b-cnt editor-content">
            <div v-html="issue.issue_content"></div>
          </div>
          <div class="d-b-button">
            <router-link class="button" :to="'/'">点我编辑</router-link>
            <span class="hadClose">該問題已關閉</span>
            <button class="button button-orange">关闭提问</button>
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
                <span class="button button-orange">刪除回答</span>
                <router-link to="/" class="button">我要編輯</router-link>
              </div>
            </h4>
            <div class="reply-detail">
              <div class="editor-content clearfix" v-html="v.reply_content"></div>
            </div>
          </li>
        </ul>
        <ue-editor ueId="content" height="300"/>
      </div>
      <right-block v-if="state" :id="issue.navigation_id" />
    </div>
    <wiki-footer/>
</div>
</template>

<script>
import wikiHead from "_COMP_/header";
import breadCrumb from "_COMP_/breadCrumb";
import collectionBlock from "_COMP_/collectionBlock";
import ueEditor from "_COMP_/ueEditor";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";

export default {
  name: "questionDetail",
  components: {
    wikiHead,
    breadCrumb,
    rightBlock,
    ueEditor,
    wikiFooter
  },
  data() {
    return {
      state: 0,
      edit: 0,
      qid: this.$route.params.qid,
      issue: {},
      reply: []
    };
  },
  computed: {
    bread: function() {
      return this.fromLink();
    }
  },
  methods: {
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
            breadArray.push({ name: "8591寶物交易網", link: "/collection/1" });
            break;
          case "2":
            breadArray.push({ name: "100室內設計", link: "/collection/2" });
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
    getData() {
      let data = { c: "index", a: "issueInfo", issue_id: this.qid };
      ajax.post(Api, data).then(res => {
        this.state = 1;
        this.issue = res.data.issues;
        this.reply = res.data.reply;
      });
    }
  },
  beforeMount: function() {
    this.getData();
  }
};
</script>
