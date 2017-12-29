<style lang="scss">
@import "../../assets/css/baseVal.scss";
@import "../../assets/css/head.scss";
.admin-hd{
  ul{
    display: flex;
    display: -webkit-flex;
    height: 40px;
    line-height: 40px;
    font-size: $mfs;
    margin-top: 40px;
    background: #F0F8FF;
    color: $fc1;
    li{
      flex: 1;
      text-align: center;
      cursor: pointer;
      &.on,&:hover{
        background: $dgray;
      }
    }
  }
}
</style>

<template>
  <div class="admin-hd">
    <div class="head-info">
      <p class="page-cnt">
        您好，管理員，欢迎来到知识库後台管理
        <router-link to="/">返回前台</router-link>
      </p>
    </div>
    <ul class="com-width">
      <router-link tag="li" to="/admin/score" active-class="on">用戶積分管理</router-link>
      <router-link tag="li" to="/admin/nav" active-class="on">導航管理</router-link>
      <router-link tag="li" to="/admin/question" active-class="on">問題管理</router-link>
      <router-link tag="li" to="/admin/answer" active-class="on">回答管理</router-link>
      <router-link tag="li" to="/admin/type" active-class="on">分類管理</router-link>
      <router-link tag="li" to="/admin/tag" active-class="on">標籤管理</router-link>
      <router-link tag="li" to="/admin/notice" active-class="on">通知管理</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'adminHead',
  data() {
    return {
      type: this.$route.params.type ? this.$route.params.type : 'score'
    }
  }
}
</script>
