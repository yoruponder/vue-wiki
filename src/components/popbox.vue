<style lang="scss">
@import "../assets/css/baseVal.scss";

.popbox{
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1011;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  h3{
    font-size: $mfs;
    line-height: 40px;
    padding: 0 20px;
    span{
      float: right;
      color: $fc2;
      font-size: $nfs;
      cursor: pointer;
    }
  }
  .pb-cnt{
    padding: 0 20px;
    font-size: $nfs;
  }
  .pb-btn-area{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    text-align: right;
    padding: 0 20px 20px 0;
    button{
      height: 32px;
      line-height: 32px;
      border: 0;
      background: #fff;
      cursor: pointer;
      border-radius: 6px;
      margin-left: 15px;
      padding: 0 15px;
      &.pb-btn-ok{
        background: $baseColorLight;
        color: $baseColorDeep;
        &:hover{
          background:$baseColorDeep;
          color:#fff;
        }
      }
    }
  }
}
</style>

<template>
  <div v-if="popbox.show" :class="`popbox ${popbox.styleClass ? popbox.styleClass : ''}`" :style="popbox.style">
    <h3>{{popbox.tle}} <span v-if="popbox.closeBtn" @click="doclose">關閉</span></h3>
    <div class="pb-cnt" v-html="popbox.cnt"></div>
    <div class="pb-btn-area">
      <button v-for="(v,k) in popbox.btn" :key="k" :class="v.type == 'ok' ? 'pb-btn-ok' : 'pb-btn-cle'" @click="customFn(v.fn)">{{v.txt}}</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: 'popbox',
  computed:{
    ...mapState([
      'popbox'
    ]),
    popStyle: function(){
      this.popbox.style
      return 
    }
  },
  methods:{
    ...mapActions({
      pbhide: 'popbox/hide',
      sdhide: 'shadow/hide'
    }),
    customFn(fn){
      if(fn){
        fn();
      }else{
        this.doclose();
      }
    },
    doclose(){
      this.pbhide();
      this.sdhide();
    }
  },
  mounted:function(){
  }
}
</script>
