<style lang="scss">
@import "../assets/css/baseVal.scss";
.head-info {
  line-height: $comlh;
  background: #f5f5f5;
  font-size: $nfs;
  color: $fc3;
  a {
    margin-left: 20px;
    color: $fc1
  }
}

.head-search {
  margin-top: 22px;
  img {
    float: left;
  }
  .srh-box {
    float: left;
    margin: 20px 0 0 20px;
    .srh-input {
      float: left;
      width: 260px;
      height: 38px;
      line-height: 38px;
      border: 2px solid #37a508;
      border-radius: 4px 0 0 4px;
    }
    button, a {
      float: left;
      width: 80px;
      height: 38px;
      line-height: 36px;
      font-size: $mfs;
      color: #fff;
    }
    .srh-btn {
      border-radius: 0 4px 4px 0;
    }
    .ask-btn {
      margin-left: 10px;
    }
  }
}
.head-nav {
  float: left;
  margin: 20px 0 0 60px;
  color: #fff;
  font-size: $mfs;
  line-height: 36px;
  a {
    display: block;
    height: 100%;
    color: $fc1;
  }
  li {
    position: relative;
    float: left;
    margin-right: 35px;
  }
  li:hover,.active {
    a{
      color: $baseColor;
    }
    &:after{
      display: block;
      content: '';
      height: 3px;
      width: 100%;
      background: $baseColor;
    }
  }
}
.head-pic{
  width: 100%;
  height: 90px;
  margin-top: 20px;
  background: url(/static/banner.png) center top no-repeat;
}
</style>

<template>
<div class="wiki-hd">
  <div class="head-info">
    <p class="page-cnt">您好，欢迎来到8591客服知识库</p>
  </div>
  <div class="page-cnt head-search clearfix">
    <router-link to="/"><img src="/static/logo.png"/></router-link>
    <ul class="head-nav clearfix">
      <router-link tag="li" to="/" :class="id == 8591 ? 'active': ''"><a>8591宝物交易网</a></router-link>
      <router-link tag="li" to="/100" :class="id == 100 ? 'active': ''"><a>100室內設計</a></router-link>
      <router-link tag="li" to="/life" :class="id == 3 ? 'active': ''"><a>客服充电站</a></router-link>
      <router-link tag="li" to="/notification" :class="id == 4 ? 'active': ''"><a>通知事项</a></router-link>
    </ul>
    <div class="srh-box">
      <input ref="srhInput" type="text" class="srh-input" placeholder="请输入搜索内容"/>
      <button type="button" class="button srh-btn">搜索</button>
      <router-link :to="id == 4 ? '/notification/publish/' : `/ask/${id}`" class="button button-orange ask-btn">
      {{
        id == 8591 || id == 100
        ? '提問'
        : '發佈'
      }}
      </router-link>
    </div>
  </div>
  <div class="head-pic"></div>
</div>
</template>

<script>
export default {
  name: "wikiHead",
  props:['id']
};
</script>
