<style lang="scss">
@import "../assets/css/baseVal.scss";

.questionCollection {
  margin-top: 40px;
  .que-coll-box {
    padding: 20px 0;
    li {
      display: inline-block;
      vertical-align: top;
      width: 226px;
      margin: 0 12px 24px;
      border: 1px solid $mgray;
      border-radius: 4px;
      overflow: hidden;
      h3 {
        padding: 0 10px;
        background: $lgray;
        line-height: $comlh;
      }
      .fa {
        margin-left: 10px;
        color: $fc2;
      }
    }
    .que-link {
      padding: 10px 0;
      min-height: 150px;
      a,.nodata {
        display: inline-block;
        margin: 0 5px 10px;
        width: 100px;
        * {
          vertical-align: top;
          line-height: 20px;
        }
        span {
          display: inline-block;
        }
      }
      .ellipsis {
        max-width: 78px;
      }
    }
  }
}
</style>

<template>
<div class="questionCollection">
  <h3 class="com-title"><i class="fa fa-file-text"></i>
    <router-link :to="`/collection/${nid}`">问题分类<i class="fa fa-arrow-circle-right"></i></router-link>
  </h3>
  <ul v-if="data.length" class="que-coll-box">
    <li v-for="(v,k) in data" :key="'qtype' + k">
      <h3>
        <router-link :to="`/collection/${v.self.navigation_id}/${v.self.id}`">{{v.self.category_name}}<i class="fa fa-arrow-circle-right"></i></router-link>
      </h3>
      <div class="que-link">
        <span class="nodata" v-if="v.child == null">暫無數據</span>
        <router-link v-else v-for="(t,it) in v.child" :key="'qchild' + it" :to="`/collection/${v.self.navigation_id}/${v.self.id}/${t.id}`">
          <span class="ellipsis">{{t.category_name}}</span>
          <span>({{t.two}})</span>
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

