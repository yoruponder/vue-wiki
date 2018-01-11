<style lang="scss">
@import "../assets/css/baseVal.scss";

.notification-detail {
  .fa {
    margin-right: 10px;
  }
  .back {
    font-size: $bfs;
  }
  .cnt {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid $mgray;
    min-height: 300px;
    margin-top: 10px;
    border-radius: 4px;
    h3 {
      text-align: center;
      font-size: $bfs;
      font-weight: 700;
      height: 40px;
      line-height: 40px;
    }
    .real-cnt {
      padding: 20px;
      img {
        vertical-align: bottom;
      }
    }
    .u-fn {
      display: flex;
      height: 100px;
      flex-direction: column;
      justify-content: space-between;
      .btn-area {
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        .button {
          height: 24px;
          line-height: 24px;
          font-size: $nfs;
          &:hover {
            color: #fff;
          }
        }
      }
      .u-info {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        background: $lgray;
        height: 50px;
        line-height: 50px;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

<template>
<div class="notification-detail">
  <wiki-head :id="nid" />
  <div class="page-cnt clearfix" style="margin-top:25px;">
    <div class="index-left" v-if="data.category_id">
      <notification-cat :cid="data.category_id" />
      <a href="javascript:history.go(-1);" class="back"><span class="fa fa-arrow-circle-o-left"></span>返回</a>
      <div class="cnt">
        <div>
          <h3>{{data.title}}</h3>
          <div class="real-cnt" v-html="data.content"></div>
        </div>
        <div class="u-fn">
          <div class="btn-area">
            <router-link class="button" :to="`/notification/publish?type=edit&id=${data.id}`">點我編輯</router-link>
          </div>
          <div class="u-info">
            <div>
              <img :src="data.user.photo ? data.user.photo : '/static/timg.jpeg'"/>
              <span>{{data.user.username}}</span>
            </div>
            <span>通知于：{{data.add_time}}</span>
          </div>
        </div>
      </div>
    </div>
    <right-block :id="nid" />
  </div>
  <wiki-footer />
</div>
</template>

<script>
import wikiHead from "_COMP_/header";
import rightBlock from "_COMP_/rightBlock";
import notificationCat from "_COMP_/notificationCat";
import wikiFooter from "_COMP_/footer";

export default {
  name: "notificationDetail",
  components: {
    wikiHead,
    rightBlock,
    notificationCat,
    wikiFooter
  },
  data() {
    return {
      id: this.$route.params.id,
      nid: 4,
      category: [],
      data: {}
    }
  },
  methods: {
    getDetail() {
      Api.notificationDetail({c: 'notification',a: 'notification',id: this.id}).then((res)=>{
        if(res.status === 1){
          this.data = res.data;
        }
      });
    }
  },
  beforeMount: function() {
    this.getDetail();
  }
};
</script>