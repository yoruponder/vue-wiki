<style lang="scss">
.to-top {
  display: none;
  position: fixed;
  bottom: 150px;
  z-index: 5;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
<template>
  <img class="to-top" :src="topicon" />
</template>
<script>
import topicon from "_ASET_/image/totop.png";
export default {
  name: 'toTop',
  props:['target'],
  data() {
    return {
      topicon: topicon
    };
  },
  mounted: function() {
    let $top = $('.to-top');
    let $target = this.target == 'window' ? $(window) : $(this.target);
    $target.scroll(()=>{
      if($target.scrollTop() >=500){
          $top.fadeIn(200);
      }else{
          $top.fadeOut(200);
      }
    });
    $top.click(()=>{
      if(this.target == 'window'){
        $('html,body').animate({
          scrollTop: 0
        },400);
      }else{
        $target.animate({
          scrollTop: 0
        },400);
      }
    })
  },
  beforeDestroy: function() {
    let $target     = this.target == 'window' ? $(window) : $(this.target);
    $target.off('scroll');
    $('.to-top').off('click');
  }
}
</script>

