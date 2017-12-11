<template>
  <div class="idx-page">
    <wiki-head :id="navigation_id" />
    <top-info :info="info" />
    <div class="com-width clearfix">
      <div class="index-left">
        <hot-point :data="hot_issue"/>
        <question-collection :data="category" :nid="navigation_id"/>
      </div>
      <right-block :id="navigation_id" />
    </div>
    <wiki-footer/>
  </div>
</template>

<script>
import wikiHead from "_COMP_/header";
import topInfo from "_COMP_/topInfo";
import hotPoint from "_COMP_/hotPoint";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";
import questionCollection from "_COMP_/questionCollection";

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
      category: [],
      navigation_id: this.nid
    };
  },
  methods: {
    requestData() {
      ajax.post(Api, { c: "index", a: "index", navigation_id: this.nid }).then(res => {
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