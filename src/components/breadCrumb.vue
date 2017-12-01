<style lang="scss">
@import "../assets/css/baseVal.scss";
.top-breadcrumb {
  height: 20px;
  margin-top: 10px;
  margin-bottom:40px;
  font-size: $nfs;
  color: $fc2;
  .t-b-icon {
    color: $baseColor;
  }
  a {
    margin-left: 8px;
    .fa {
      font-size: $mfs;
      margin-left: 8px;
    }
  }
  strong{
    margin-left: 8px;
  }
}
</style>

<template>
<div class="top-breadcrumb page-cnt">
    <i class="fa fa-map-marker t-b-icon"></i>
    <span v-for="(v,k) in data" :key="k">
      <router-link v-if="k+1 < data.length" :to="v.link">{{v.name}}<i class="fa fa-angle-double-right"></i></router-link>
      <strong v-else>{{v.name}}</strong>
    </span>
</div>
</template>

<script>
export default {
  name: "breadCrumb",
  props: ['data'],
  data() {
    return {

    };
  },
  beforeMount: function() {
    console.log(this.$route)
  }
};
</script>

