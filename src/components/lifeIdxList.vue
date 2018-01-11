<style lang="scss">
@import "../assets/css/baseVal.scss";

.lifeIdxList {
  .com-title {
    font-size: $bfs;
    color: $fc1;
    border-bottom: 1px solid #e5e5e5;
    height: 36px;
    line-height: 36px;
    margin: 30px 0 25px;
    .bigName {
      display: block;
      float: left;
      min-width: 100px;
    }
    ul {
      float: left;
      width: 400px;
      margin-left: 20px;
      font-size: $nfs;
      li {
        float: left;
        margin-right: 12px;
        a {
          color: #6e7988;
        }
      }
    }
  }
  .lil-cnt {
    .cnt {
      float: left;
      width: 50%;
      height: 100px;
      overflow: hidden;
    }
    .cat-img {
      float: left;
      position: relative;
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 6px;
      overflow: hidden;
      img {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 1;
        width: 100%;
        height: 100%;
      }
      p {
        position: absolute;
        bottom: 0px;
        left: 0px;
        z-index: 2;
        width: 100%;
        height: 24px;
        line-height: 24px;
        background: rgba(0, 0, 0, 0.4);
        padding: 0 4px;
        color: #fff;
        text-align: center;
        font-size: $nfs;
      }
    }
    ul {
      float: left;
      width: 280px;
      margin-left: 20px;
      li {
        margin-bottom: 10px;
      }
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: $fc1;
      }
    }
  }
}
</style>

<template>
<div class="lifeIdxList">
  <h3 class="com-title clearfix">
    <router-link class="bigName" :to="`/life/collection/${self.id}`">{{self.category_name}}</router-link>
    <ul>
      <li v-for="(v,k) in child" :key="`a${k}`">
        <router-link :to="`/life/collection/${self.id}/${v.id}`">{{v.category_name}}</router-link>
      </li>
    </ul>
  </h3>
  <div class="lil-cnt clearfix">
    <template v-for="(v,k) in child" v-if="k<2">
      <div class="cnt clearfix" :key="`b${k}`">
        <router-link class="cat-img" :to="`/life/collection/${v.pid}/${v.id}`">
          <img :src="v.cover_img ? v.cover_img : `/static/timg.jpeg`" />
          <p>{{v.category_name}}</p>
        </router-link>
        <ul>
          <li v-if="!v.issue">暫無數據</li>
          <li v-else v-for="(v,k) in v.issue" :key="`i${k}`">
            <router-link :to="`/question/${v.id}`">{{v.issue_title}}</router-link>
          </li>
        </ul>
      </div>
    </template>
  </div>
</div>
</template>

<script>
export default {
  name: "lifeIdxList",
  props: ["data"],
  computed: {
    self() {
      return this.data.self;
    },
    child() {
      return this.data.child;
    }
  }
};
</script>

