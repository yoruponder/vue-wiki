<style lang="scss">
@import "../assets/css/baseVal.scss";

.n-c-t {
  .tag-bk {
    margin: 0 0 20px;
    background: $lgray;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    a {
      margin: 8px 12px;
      color: $baseColor;
      border: 1px solid $baseColor;
      border-radius: 20px;
      padding: 6px 20px;
      &.on {
        background: $baseColor;
        color: #fff;
      }
    }
  }
}
</style>

<template>
  <div class="n-c-t">
    <div class="tag-bk">
    <router-link to="/notification" :class="cid ? '' : 'on'">全部類別</router-link>
    <template v-if="category.length">
      <router-link v-for="(v,k) in category" :key="k" :to="`/notification/${v.id}`" :class="cid == v.id ? 'on' : ''">{{v.category_name}}</router-link>
    </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notificationCat',
  props:['cid'],
  data: function() {
    return {
      category: []
    };
  },
  methods: {
    getCategory() {
      Api.notificationCategory().then(res => {
        if (res.status == 1) {
          this.category = res.data;
        }
      });
    },
  },
  beforeMount: function() {
    this.getCategory();
  }
}
</script>

