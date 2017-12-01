<style lang="scss">
@import "../assets/css/baseVal.scss";

</style>

<template>
<div class="collection-page">
    <wiki-head :id="navigation_id" :route="route" />
    <top-info :info="info" />
    <div class="com-width clearfix">
      <div class="index-left">
        
      </div>
      <right-block :id="navigation_id" />
    </div>
    <wiki-footer/>
</div>
</template>

<script>
import wikiHead from "_COMP_/header";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";

export default {
  name: 'collection',
  components: {
    wikiHead,
    rightBlock,
    wikiFooter
  },
  data () {
    return {
    }
  }
}
</script>