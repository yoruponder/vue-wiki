<style lang="scss">
@import "../assets/css/baseVal.scss";

.lifeCollection {
  display: flex;
  width: 100%;
  height: auto;
  padding-bottom: 20px;
  background: $lgray;
  border-radius: 5px;
  a {
    color: $fc1;
    &:hover {
      color: $baseColor;
    }
    &.on {
      color: $baseColor;
    }
  }
  .lc-bk {
    flex: 1;
    text-align: center;
    h3 {
      font-size: $bfs;
      height: 72px;
      line-height: 72px;
      .fa {
        margin-right: 15px;
        font-size: 22px;
      }
      .fa-group {
        color: #f39800;
      }
      .fa-heartbeat {
        color: #f00;
      }
      .fa-forumbee {
        color: #87ccc7;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
</style>

<template>
  <div class="life-collection-page">
    <wiki-head :id="nid" />
    <div class="com-width clearfix" style="margin-top:25px;">
      <div class="index-left">
        <div class="lifeCollection">
          <div v-for="(v,k) in category" :key="`c1${k}`" class="lc-bk">
            <h3>
              <span :class="`fa ${clsname[k]}`"></span>
              <router-link :to="`/life/collection/${v.self.id}`" exact-active-class="on">{{v.self.category_name}}</router-link>
            </h3>
            <ul>
              <li v-for="(v,k) in v.child" :key="`c2${k}`">
                <router-link :to="`/life/collection/${v.pid}/${v.id}`" exact-active-class="on">{{v.category_name}}</router-link>
              </li>
            </ul>
          </div>
        </div>


      </div>
      <right-block :id="nid" />
    </div>
    <wiki-footer/>
  </div>
</template>

<script>
import wikiHead from "_COMP_/header";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";

export default {
  name: "lifeCollection",
  components: {
    wikiHead,
    rightBlock,
    wikiFooter
  },
  data() {
    return {
      nid: 3,
      c1: this.$route.params.cat1,
      c2: this.$route.params.cat2,
      category: [],
      list: [],
      clsname: ['fa-group','fa-heartbeat','fa-forumbee']
    };
  },
  methods: {
    getCategory() {
      Api.index({ c: "index", a: "index", navigation_id: this.nid }).then((res)=>{
        if(res.status === 1){
          this.category = res.data.category ? res.data.category :[];
        }
      });
    }
  },
  beforeMount: function() {
    this.getCategory();
  }
};
</script>
