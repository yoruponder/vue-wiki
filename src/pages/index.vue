<template>
  <div class="idx-page">
    <wiki-head :id="nid" />
    <top-info :info="info" />
    <div class="com-width clearfix">
      <div class="index-left">
        <hot-point :data="hot_issue" :nid="nid"/>
        <question-collection :data="category" :nid="nid"/>
      </div>
      <right-block :id="nid" />
    </div>
    <wiki-footer/>
  </div>
</template>

<script>
import wikiHead from "_COMP_/header";
import topInfo from "_COMP_/topInfo";
import hotPoint from "_COMP_/hotpoint";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";
import questionCollection from "_COMP_/questionCollection";
import { mapState } from "vuex";

export default {
  name: "idx",
  components: {
    wikiHead,
    topInfo,
    hotPoint,
    rightBlock,
    questionCollection,
    wikiFooter
  },
  props:['nid'],
  data() {
    return {
      info: {
        solution: "N/A",
        wait: "N/A",
        online: "N/A"
      },
      hot_issue: [],
      category: []
    };
  },
  methods: {
    requestData() {
      Api.index({ c: "index", a: "index", navigation_id: this.nid }).then(res => {
          this.info = res.data.headinfo;
          this.hot_issue = res.data.hot_issue;
          this.category = res.data.category;
        });
    }
  },
  watch: {
    nid: function() {
      this.requestData();
    }
  },
  beforeMount: function() {
    this.requestData();
  }
};
</script>