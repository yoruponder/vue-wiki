<style lang="scss">
@import "../assets/css/baseVal.scss";
.hotpoint {
  ul {
    font-size: $nfs;
    min-height: 220px;
    margin-top: 20px;
    li {
      line-height: 28px;
      margin-top: 5px;
      a {
        color: $fc2;
      }
      * {
        vertical-align: top;
      }
      .fa {
        margin-right: 10px;
        vertical-align: baseline;
      }
      span {
        display: inline-block;
        margin-left: 14px;
        color: $baseColor;
      }
    }
  }
  .que-title {
    display: inline-block;
    max-width: 560px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .que-type {
    display: inline-block;
    color: $fc3;
    margin-left: 10px;
  }
}
</style>

<template>
<div class="hotpoint">
    <h3 class="com-title"><router-link :to="`/collection/${nid}?type=hot`">热点问题</router-link></h3>
    <ul>
      <li v-if="data == null || data.length == 0">暫無數據</li>
      <li v-else v-for="(val, key) in data" :key="key" class="clearfix">
        <router-link class="que-title" :to="`/question/${val.id}`">{{val.issue_title}}</router-link>
        <router-link class="que-type" v-if="val.category_info" :to="`/collection/${nid}/${val.category_info.id}`">[{{val.category_info.category_name}}]</router-link>
        <span>{{val.reply_total?val.reply_total:0}}回答</span>
      </li>
    </ul>
</div>
</template>

<script>
export default {
  name: "hotPoint",
  props: ["data","nid"]
};
</script>

