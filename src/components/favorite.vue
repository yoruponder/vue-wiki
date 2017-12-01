<style lang="scss">
@import "../assets/css/baseVal.scss";

.favorite {
  .fav-box {
    display: flex;
    padding: 10px 25px;
    justify-content: space-between;
    flex-wrap: wrap;
    a {
      display: flex;
      width: 140px;
      height: $comlh;
      margin: 6px 5px;
      padding: 0 8px;
      justify-content: space-between;
      border-radius: 4px;
      background: $baseColor;
      color: #fff;
      span{
        align-self: center;
      }
      .fa-close{
        display: none;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 8px;
        background: #fff;
        color: $baseColor;
      }
      .fa-close:hover{
        background: #f00;
        color: #fff;
      }
      &:hover .fa-close{
        display: block;
      }
    }
  }
}
</style>

<template>
<div class="favorite" v-if="data != null">
  <h3 class="com-title"><a href="javascript:;"><i class="fa fa-heart"></i>我的最爱</a></h3>
  <div class="fav-box clearfix">
    <a v-for="(val,key) in data" :key="key" href="javascript:;">
      <span>{{val.collection_name}}</span>
      <span class="fa fa-close" @click="delFavorite(val.id)"></span>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'favorite',
  props:['id'],
  data () {
    return {
      data: []
    }
  },
  methods: {
    getFavorite(){
      ajax.post(Api,{c:'user',a:'favorite',navigation_id:this.id}).then(res => {
        if(res.status){
          this.data = res.data;
        }
      })
    },
    delFavorite(id){
      console.log(id)
    }
  },
  beforeMount: function(){
    this.getFavorite();
  }

}
</script>