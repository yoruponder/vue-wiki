<style lang="scss">
@import "../assets/css/baseVal.scss";

.questionCollection {
  margin-top: 40px;
  .que-coll-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 800px;
    padding: 20px 0;
    a{
      color: $fc2;
    }
    .item{
      display: block;
      vertical-align: top;
      width: 252px;
      margin-bottom: 24px;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      overflow: hidden;
      h3 {
        padding: 0 10px;
        color: $fc3;
        background: #f5f5f5;
        line-height: $comlh;
        .fa{
          margin-left: 10px;
        }
      }
    }
    .que-link {
      padding: 10px;
      padding-bottom: 0;
      min-height: 130px;
      a {
        display: inline-block;
        margin-bottom: 10px;
        width: 102px;
        * {
          vertical-align: top;
          line-height: 20px;
        }
      }
      .ellipsis {
        color: $fc2;
        max-width: 78px;
      }
      .num{
        display: inline-block;
        margin-left: 6px;
        color: $baseColor;
      }
    }
  }
}
</style>

<template>
<div class="questionCollection">
  <h3 class="com-title">
    <router-link :to="`/collection/${nid}`">问题分类</router-link>
  </h3>
  <ul v-if="data.length" class="que-coll-box">
    <li class="item" v-for="(v,k) in data" :key="'qtype' + k">
      <h3>
        <router-link :to="`/collection/${v.self.navigation_id}/${v.self.id}`">{{v.self.category_name}}<i class="fa fa-angle-double-right"></i></router-link>
      </h3>
      <div class="que-link">
        <span class="nodata" v-if="v.child == null">暫無數據</span>
        <router-link v-else v-for="(t,it) in v.child" :key="'qchild' + it" :to="`/collection/${v.self.navigation_id}/${v.self.id}/${t.id}`">
          <span class="ellipsis">{{t.category_name}}</span>
          <span class="num">({{t.two}})</span>
        </router-link>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "questionCollection",
  props: ["data","nid"]
};
</script>

