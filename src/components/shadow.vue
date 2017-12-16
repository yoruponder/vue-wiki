<style lang="scss">
.shadow{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1010;
  background: #000;
}
</style>

<template>
  <div v-if="shadow.show" class="shadow" :style="{opacity:shadow.opacity}" @click="customClick(shadow.fn)"></div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: 'shadowComponent',
  computed:{
    ...mapState(['shadow'])
  },
  methods:{
    ...mapActions({
      hide: 'shadow/hide'
    }),
    customClick(fn){
      if(fn){
        fn();
      }else{
        this.hide();
      }
    }
  }
}
</script>
