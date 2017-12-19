<template>
  <div class="life-page">
    <wiki-head :id="nid" />
    <div class="com-width clearfix">
      <div class="index-left">
        <div :style="{marginBottom:'40px'}">
          <life-recommend :data="recommend"/>
        </div>
        <template v-if="category.length">
          <life-idx-list v-for="(v,k) in category" :key="k" :data="v"/>
        </template>
      </div>
      <right-block :id="nid" />
    </div>
    <wiki-footer/>
  </div>
</template>

<script>
import wikiHead from "_COMP_/header";
import lifeRecommend from "_COMP_/LifeRecommend";
import lifeIdxList from "_COMP_/lifeIdxList";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";
import { mapState } from "vuex";

export default {
  name: "life",
  components: {
    wikiHead,
    lifeRecommend,
    lifeIdxList,
    rightBlock,
    wikiFooter
  },
  data() {
    return {
      nid: 3,
      recommend: [],
      category: []
    };
  },
  methods: {
    requestData() {
      Api.life({c:'index',a:'charge'}).then(res => {
        this.recommend = res.data.head ? res.data.head : [];
        this.category = res.data.category ? res.data.category : []
      });
    }
  },
  beforeMount: function() {
    this.requestData();
  }
};
</script>