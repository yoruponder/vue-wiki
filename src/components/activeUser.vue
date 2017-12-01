<style lang="scss">
@import "../assets/css/baseVal.scss";
.activeUser {
  .activeUser-box {
    padding: 25px 22px;
    a {
      display: inline-block;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 6px 12px;
    }
  }
}
</style>

<template>
<div class="activeUser">
    <h3 class="com-title"><i class="fa fa-rocket"></i>活跃用户</h3>
    <div class="activeUser-box">
        <a href="/" title="周杰伦"><img src='/static/timg.jpeg'/></a>
        <a href="/" title="周杰伦"><img src='/static/timg.jpeg'/></a>
        <a href="/" title="周杰伦"><img src='/static/timg.jpeg'/></a>
        <a href="/" title="周杰伦"><img src='/static/timg.jpeg'/></a>
        <a href="/" title="周杰伦"><img src='/static/timg.jpeg'/></a>
    </div>
</div>
</template>

<script>
export default {
  name: "activeUser",
  props: ["data"]
};
</script>

