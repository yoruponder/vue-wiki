
<template>
  <div class="hotTag right-bk">
    <h3 class="com-title">热门标签</h3>
    <div class="hotTag-box item-box clearfix">
      <p v-if="data.length == 0">無數據</p>      
      <router-link v-else v-for="(val,key) in data" :to="`/collection/${id}?type=tag&tagid=${val.id}`" :key="key">{{val.content}}</router-link>
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
      Api.hotTag({c:'index',a:'hotTag',navigation_id:this.id}).then(res => {
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
