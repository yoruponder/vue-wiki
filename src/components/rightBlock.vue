<style lang="scss">
@import "../assets/css/baseVal.scss";
.favorite {
    margin-bottom: 40px;
}
.hotTag {
    margin-bottom: 40px;
}
.rank {
    margin-bottom: 40px;
}
.activeUser {
    margin-bottom: 40px;
}
</style>

<template>
  <div class="index-right">
    <favorite :id="id"/>
    <hot-tag :id="id"/>
    <rank/>
    <active-user/>
    <to-top target="window"/>
  </div>
</template>

<script>
import favorite from "_COMP_/favorite"
import hotTag from "_COMP_/hotTag"
import rank from "_COMP_/rank"
import activeUser from "_COMP_/activeUser"
import toTop from "_COMP_/toTop";

export default {
  name: 'rightBlock',
  components:{
    favorite,
    hotTag,
    rank,
    toTop,
    activeUser
  },
  props:['id']
}
</script>

