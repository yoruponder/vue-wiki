<style lang="scss">
@import "../assets/css/baseVal.scss";

.wiki-pagination {
  text-align: center;
  user-select: none;
  a {
    display: inline-block;
    width: 26px;
    height: 26px;
    line-height: 24px;
    font-size: $nfs;
    text-align: center;
    border: $comborder;
    border-radius: 4px;
    margin: 0 2px;
    cursor: pointer;
    color: $fc2;
    overflow: hidden;
  }
  a:hover {
    border: 1px solid $baseColor;
    color: $baseColor;
  }
  em {
    display: inline-block;
    height: 26px;
    width: 26px;
    line-height: 26px;
    vertical-align: top;
  }
  .disabled, .disabled:hover {
    color: $fc3;
    cursor: not-allowed;
    border: $comborder;
    pointer-events: none;
  }
  .current, .current:hover {
    color: #fff;
    background: $baseColor;
    border-color: $baseColor;
  }
}
</style>

<template>
  <div v-if="total > 1" class="wiki-pagination">
    
    <router-link :to="queryPage(prevPage)" :class="prevCls" @click.native="goPrev"><i class="fa fa-angle-left"></i></router-link>
    <template v-if="total <= 5">
      <router-link v-for="i in total" :key="i" :to="queryPage(i)" :class="[now == i ? 'current' : '']" @click.native="clickPage(i)">{{i}}</router-link>
    </template>
    <template v-else>
      
      <template v-if="now < 5">
        <router-link v-for="i in 5" :key="i" :to="queryPage(i)" :class="[now == i ? 'current' : '']" @click.native="clickPage(i)">{{i}}</router-link>
        <em>···</em>
        <router-link :to="queryPage(total)" @click.native="clickPage(total)">{{total}}</router-link>
      </template>

      <template v-else-if="now >= 5 && now <= total - 4">
        <router-link  :to="queryPage(1)" @click.native="clickPage(1)">1</router-link>
        <em>···</em>
        <router-link v-for="i in 5" :key="now + (i-3)" :to="queryPage(now + (i-3))" :class="[now == now + (i-3) ? 'current' : '']" @click.native="clickPage(now + (i-3))">{{now + (i-3)}}</router-link>
        <em>···</em>
        <router-link :to="queryPage(total)" @click.native="clickPage(total)">{{total}}</router-link>        
      </template>

      <template v-else-if="now > total - 4">
        <router-link  :to="queryPage(1)" @click.native="clickPage(1)">1</router-link>
        <em>···</em>
        <router-link v-for="i in 5" :key="total-(5-i)" :to="queryPage(total-(5-i))" :class="[now == total-(5-i) ? 'current' : '']" @click.native="clickPage(total-(5-i))">{{total-(5-i)}}</router-link>
      </template>

    </template>
    <router-link :to="queryPage(nextPage)" :class="nextCls" @click.native="goNext"><i class="fa fa-angle-right"></i></router-link>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props:['total','now'],
  computed:{
    prevCls: function () {
      return this.now == 1 ? 'disabled' : '';
    },
    nextCls: function () {
      return this.now == this.total ? 'disabled' : '';
    },
    prevPage: function () {
      return this.now > 1 ? this.now - 1 : 1;
    },
    nextPage: function () {
      return this.now < this.total ? this.now + 1 : this.total;
    }
  },
  methods: {
    changePage: function (now) {
      this.$emit('changePage',now);
    },
    goPrev: function () {
      //this.now = this.prevPage;
      this.changePage(this.now);
    },
    goNext: function () {
      //this.now = this.nextPage;
      this.changePage(this.now);
    },
    clickPage: function (i) {
      //this.now = i;
      //this.changePage(this.now);
    },
    queryPage: function(page) {
      let data = {};
      data = Object.assign({},this.$route.query,{page: page});
      return ({query:data});
    }
  }
}
</script>
