<style lang="scss">
@import "../assets/css/baseVal.scss";
.head-info {
  line-height: $comlh;
  background: #f5f5f5;
  font-size: $nfs;
  color: $fc1;
  text-align: right;
  a {
    margin-left: 20px;
  }
}
.head-search {
  margin-top: 22px;
  img {
    float: left;
  }
  .srh-box {
    float: left;
    margin: 22px 0 0 106px;
    .srh-input {
      float: left;
      width: 460px;
      height: 38px;
      line-height: 38px;
      border: 2px solid #37a508;
      border-radius: 4px 0 0 4px;
    }
    button,
    a {
      float: left;
      height: 38px;
      line-height: 36px;
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
  margin-top: 20px;
  background: #37a508;
  ul {
    color: #fff;
    font-size: $mfs;
    line-height: 36px;
    a {
      display: block;
      height: 100%;
      padding: 0 20px;
      color: #fff;
    }
    li {
      float: left;
    }
    li:hover,.active {
      background: #279005;
    }
  }
}
</style>

<template>
<div class="wiki-hd">
    <div class="head-info"><p class="page-cnt">您好，欢迎来到8591客服知识库</p></div>
    <div class="page-cnt head-search clearfix">
        <a to="/"><img src="/static/logo.png"/></a>
        <div class="srh-box">
            <input ref="srhInput" type="text" class="srh-input" placeholder="请输入搜索内容"/>
            <button type="button" class="button srh-btn" >搜索</button>
            <router-link :to="`/ask/${id}`" class="button button-orange ask-btn">我要提问</router-link>
        </div>
    </div>
    <div class="head-nav">
        <ul class="page-cnt clearfix">
            <router-link tag="li" to="/" exact-active-class="active"><a>8591宝物交易网</a></router-link>
            <router-link tag="li" to="/100" exact-active-class="active"><a>100室內設計</a></router-link>
            <router-link tag="li" to="/life" exact-active-class="active"><a>客服充电站</a></router-link>
            <router-link tag="li" to="/notification" exact-active-class="active"><a>通知事项</a></router-link>
        </ul>
    </div>
</div>
</template>

<script>
export default {
  name: "wikiHead",
  props:['id'],
  data() {
    return {};
  }
};
</script>
