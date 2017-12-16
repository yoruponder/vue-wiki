<template>
<div class="ask-page">
  <wiki-head :id="nid" />
  <div class="page-cnt page-cnt-pd clearfix">
    <bread-crumb :data="bread"/>
    <div class="com-width clearfix">
      <div class="index-left">
        <h3>标题：</h3>
        <input type="text" placeholder="请填写提问标题" />
        <h3>选择标签（可多选）</h3>
        <div class="select-tag clearfix">
          <!-- <span v-for="(v,k) in tag" :key="k" :class="selTagList.indexOf(v.id) > -1 ? 'choosen' : ''" @click="selTag(v.id)"><i class="fa fa-hashtag"></i>{{v.content}}</span> -->
        </div>
        <h3>问题描述</h3>
        <vue-ueditor @ready="editorReady"/>
        <button type="button" class="submit-ask button" >发布提问</button>
      </div>
      <right-block :id="nid" />
    </div>
  </div>
  <wiki-footer />
</div>
</template>

<script>
import wikiHead from "_COMP_/header";
import breadCrumb from "_COMP_/breadCrumb";
import vueUeditor from "_COMP_/UEditor";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";
import "_ASET_/css/ask.scss";

export default {
  name: 'ask',
  components:{
    wikiHead,
    breadCrumb,
    rightBlock,
    vueUeditor,
    wikiFooter
  },
  data () {
    return {
      nid: this.$route.params.nid,
      category:[],
      navTag:[],
      currentTag:[],
      editor: ''
    }
  },
  computed: {
    bread() {
      return this.fromLink();
    }
  },
  methods: {
    //編輯器狀態
    editorReady(ue) {
      this.editor = ue;
    },
    fromLink() {
      let breadArray = [];

      switch (this.nid) {
        case "8591":
          breadArray.push({ name: "8591寶物交易網", link: "/collection/8591" });
          break;
        case "100":
          breadArray.push({ name: "100室内设计", link: "/collection/100" });
          break;
        case "3":
          breadArray.push({ name: "客服充電站", link: "/life" });
          break;
        case "4":
          breadArray.push({ name: "通知事項", link: "/notification" });
      }
      breadArray.push({name: '發起提問'});
      return breadArray;
    },
  },
  beforeMount: function() {
    
  }
}
</script>
