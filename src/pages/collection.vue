<template>
<div class="collection-page">
    <wiki-head :id="navigation_id" />
    <bread-crumb :data="bread"/>
    <div class="com-width clearfix">
      <div class="index-left">
        <collection-block/>
      </div>
      <right-block :id="navigation_id" />
    </div>
    <wiki-footer/>
</div>
</template>

<script>
import wikiHead from "_COMP_/header";
import breadCrumb from "_COMP_/breadCrumb";
import collectionBlock from "_COMP_/collectionBlock";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";

export default {
  name: "collection",
  components: {
    wikiHead,
    rightBlock,
    wikiFooter,
    breadCrumb,
    collectionBlock
  },
  data() {
    return {
      navigation_id: this.$route.params.nid,
    };
  },
  computed: {
    bread: function(){
      return [this.fromLink(),{name: '全部分类'}];
    }
  },
  methods: {
    fromLink() {
      switch (this.navigation_id) {
        case "8591":
          return { name: "8591寶物交易網", link: "/collection/8591" };
        case "100":
          return { name: "100室內設計", link: "/collection/100" };
        case "3":
          return { name: "客服充電站", link: "/life" };
        case "4":
          return { name: "通知事項", link: "/notification" };
      }
    }
  }
};
</script>