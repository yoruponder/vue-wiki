<style lang="scss">
@import "../assets/css/baseVal.scss";
.uc-banner {
  display: flex;
  background: $lgray;
  min-height: 260px;
  justify-content: space-between;
  padding: 0 200px;
  .avatar {
    text-align: center;
    align-self: center;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    p {
      position: relative;
      margin-top: 10px;
      color: $baseColor;
      input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: block;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      &:hover {
        color: $orange;
      }
    }
  }
  .user-info {
    width: 400px;
    height: 180px;
    align-self: center;
    text-align: center;
    h4 {
      font-size: 36px;
    }
    p {
      text-align: center;
      margin-top: 90px;
    }
  }
}
.uc-upimg {
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .up-progress {
    margin-left: 20px;
  }
}
.uc-menu {
  width: 200px;
  border-top: 1px solid $mgray;
  border-bottom: 1px solid $mgray;
  padding: 10px 0;
  li {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: $mfs;
    cursor: pointer;
    &.on {
      background: $baseColorLight;
      color: $baseColor;
    }
  }
}
.uc-page {
  .uc-cnt {
    display: flex;
    margin-top: 30px;
    justify-content: space-between;
  }
}
</style>

<template>
  <div class="uc-page">
    <wiki-head :id="nid" />
    <div class="com-width clearfix">
      <div class="uc-banner">
        <div class="avatar">
          <img :src="photo ? photo : `/static/timg.jpeg`"/>
          <p>修改头像<input type="file" @change="uploadBtn"/></p>
        </div>
        <div class="user-info">
          <h4>{{username}}</h4>
          <p><span>最后登入：2017-09-11 10:20:20</span></p>
        </div>
      </div>
      <div class="uc-cnt">
        <div class="uc-menu">
          <ul>
            <router-link tag="li" to="/uc/myFavorite" :class="!type || type == 'myFavorite' ? 'on' :''">我的最爱</router-link>
            <router-link tag="li" to="/uc/myIssue" active-class="on">我的提问</router-link>
            <router-link tag="li" to="/uc/myReply" active-class="on">我的回答</router-link>
            <router-link tag="li" to="/uc/myIssueClose" active-class="on">关闭的问题</router-link>
            <router-link tag="li" to="/uc/myIssueNoAnswer" active-class="on">未回答问题</router-link>
          </ul>
        </div>
        <uc-list :data="listData" @delDone="delDone"/>
        <pagination :total="pageNum" :now="currentPage"/>
      </div>
    </div>
    <popbox/>
    <shadow-component/>
    <wiki-footer/>
  </div>
</template>

<script>
import wikiHead from "_COMP_/header";
import pagination from "_COMP_/pagination";
import wikiFooter from "_COMP_/footer";
import popbox from "_COMP_/popbox";
import shadowComponent from "_COMP_/shadow";
import ucList from "_COMP_/ucList";
import { h5img } from "_LIBS_/uploadFn.js";

import { mapActions } from "vuex";

export default {
  name: "usercenter",
  components: {
    wikiHead,
    pagination,
    wikiFooter,
    ucList,
    popbox,
    shadowComponent
  },
  data: function() {
    return {
      nid: 8591,
      type: this.$route.params.type ? this.$route.params.type : "myFavorite",
      id: this.$route.params.id ? this.$route.params.id : 8591,
      h5img: new h5img(),
      username: this.$store.state.user.username,
      listData: {},
      count: 0,
      currentPage: this.$route.query.page ? this.$route.query.page : 1,
      pageSize: 15
    };
  },
  computed: {
    photo() {
      return this.$store.state.user.photo;
    },
    pageNum: function() {
      return Math.ceil(this.count / this.pageSize);
    }
  },
  methods: {
    ...mapActions({
      sdshow: "shadow/show",
      sdhide: "shadow/hide",
      pbshow: "popbox/show",
      pbhide: "popbox/hide",
      changeData: "user/changeData"
    }),
    closePopbox() {
      this.pbhide();
      this.sdhide();
    },
    uploadBtn(e) {
      this.h5img.preview(e.target.files, img => {
        if (img) {
          this.pbshow({
            tle: "確定要上傳頭像",
            styleClass: "uc-upimg",
            cnt: `<div style="margin-top:20px;">${img}<span class="up-progress">等待上傳</span></div>`,
            btn: [
              {
                type: "ok",
                txt: "確定",
                fn: () => {
                  this.confirmUpImg();
                }
              },
              {
                type: "cle",
                txt: "取消"
              }
            ]
          });
          this.sdshow();
        }
      });
    },
    confirmUpImg() {
      this.h5img.upload(
        requestUrl,
        { c: "user", a: "uploadHeadImg" },
        (loaded, total) => {
          $(".up-progress").html((loaded / total * 100).toFixed(2) + "%");
        },
        res => {
          if (res.status === 1) {
            this.changeData({ photo: res.data.head_img });
            this.closePopbox();
          } else {
            alert(res.info);
          }
        },
        err => {
          alert("後端出錯，請聯繫我的兒子10614");
        }
      );
    },
    pageChange() {
      this.currentPage = this.$route.query.page ? this.$route.query.page : 1;
    },
    typeChange() {
      this.type = this.$route.params.type ? this.$route.params.type : "";
    },
    idChange() {
      this.id = this.$route.params.id ? this.$route.params.id : "";
    },
    getListData() {
      if (this.type == "myFavorite") {
        let data = {
          c: "index",
          a: "issue",
          type: 'my',
          page: this.currentPage,
          pagesize: this.pageSize,
          navigation_id: this.id,
          category_one: '',
          category_two: '',
          key: '',
          tag: ''
        };
        Api.ucList(data).then(res => {
          this.listData = {
            type: this.type,
            list: res.data.issue ? res.data.issue : [],
            count: res.data.count ? res.data.count : 0
          }
        });
      }else{
        Api[this.type]().then(res => {
          let resList = res.data.issue ? res.data.issue : [];
          if (this.type == 'myReply'){
              resList = res.data.reply ? res.data.reply : [];
          }
          this.listData = {
            type: this.type,
            list: resList,
            count: res.data.count ? res.data.count : 0
          }
        });
      }
    },
    delDone() {
      this.getListData();
    }
  },
  beforeMount: function() {
    this.getListData();
  },
  watch: {
    $route: function() {
      this.pageChange();
      this.idChange();
      this.typeChange();
      this.getListData();
    }
  }
};
</script>
