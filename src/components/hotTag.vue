<style lang="scss">
@import "../assets/css/baseVal.scss";
.hotTag {
  .hotTag-box {
    padding: 10px 25px;
    a {
      display: block;
      float: left;
      border: 1px solid $baseColor;
      color: $baseColor;
      width: 140px;
      height: $comlh;
      line-height: $comlh;
      text-align: center;
      border-radius: 4px;
      margin: 6px 5px;
      transition: all 0.2s;
    }
    a:hover {
      background: $baseColor;
      color: #fff;
    }
  }
}
</style>

<template>
  <div class="hotTag">
    <h3 class="com-title"><i class="fa fa-tags"></i>热门标签</h3>
    <div class="hotTag-box clearfix">
      <p v-if="data.length == 0">無數據</p>      
      <a v-else v-for="(val,key) in data" href="javascript:;" :key="key"><i class="fa fa-hashtag"></i>{{val.content}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hotTag',
  props: ['id'],
  data: function () {
    return {
      data: []
    };
  },
  methods: {
    getTag(){
      ajax.post(Api,{c:'index',a:'hotTag',navigation_id:this.id}).then(res => {
        if(res.status){
          this.data = res.data;
        }
      });
    }
  },
  beforeMount: function () {
    this.getTag();
  }
};
</script>
