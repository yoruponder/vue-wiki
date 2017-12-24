
<style lang="scss">
@import "../assets/css/baseVal.scss";
.index-info {
  height: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 15px;
  color: $fc2;
  span {
    margin-right: 10px;
    b {
      font-weight: normal;
      color: $afc;
    }
  }
}
</style>

<template>
<p class="com-width index-info">
  <span>已解决问题：{{info.solution}}</span>
  <span>待回答问题：{{info.wait}}</span>
  <span>当前在线人数：{{info.online}}</span>
</p>
</template>

<script>
export default {
  name: "topInfo",
  props: ["info"]
};
</script>

