<style lang="scss">
@import "../assets/css/baseVal.scss";
.top-breadcrumb {
  height: 20px;
  margin: 10px 0 40px;
  font-size: $nfs;
  color: $fc2;
  .t-b-icon {
    color: $baseColor;
  }
  span {
    margin-left: 8px;
    .fa {
      font-size: $mfs;
      margin-left: 8px;
    }
  }
}
</style>

<template>
<div className="top-breadcrumb">
    <i className="fa fa-map-marker t-b-icon"></i>
    <span v-for="(v,k) in data" :key="k">
      <router-link :to="v.link">{{v.name}}</router-link>
      <i className="fa fa-angle-double-right"></i>
    </span>
    <span key={'nav' + i}>{v['name']}</span>
</div>
</template>

<script>
export default {
  name: "breadCrumb",
  props: ['data'],
  data() {
    return {

    };
  }
};
</script>

