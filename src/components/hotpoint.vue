<style lang="scss">
@import "../assets/css/baseVal.scss";
.hotpoint {
  ul {
    padding: 10px;
    font-size: $nfs;
    border-bottom: 1px solid $fc3;
    min-height: 220px;
    li {
      line-height: 28px;
      * {
        vertical-align: top;
      }
      .fa {
        margin-right: 10px;
        vertical-align: baseline;
      }
      span {
        display: inline-block;
        float: right;
        color: $fc3;
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
    <h3 class="com-title"><a href="javascript:;"><i className="fa fa-rocket"></i>热点问题</a></h3>
    <ul>
      <li v-if="data == null || data.length == 0">暫無數據</li>
      <li v-else v-for="(val, key) in data" :key="key" class="clearfix">
        <i class="fa fa-angle-right"></i>
        <router-link class="que-title" :to="`/question/${val.id}`">{{val.issue_title}}</router-link>
        <a class="que-type" v-if="val.category_info" href="javascript:;">[{{val.category_info.category_name}}]</a>
        <span>{{val.reply_total?val.reply_total:0}}回答</span>
      </li>
    </ul>
</div>
</template>

<script>
export default {
  name: "hotPoint",
  props: ["data"],
  updated: function(){
  }
};
</script>

