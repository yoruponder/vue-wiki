<style lang="scss">
@import "../assets/css/baseVal.scss";
@import "../assets/css/questionList.scss";

.uc-list {
  width: 930px;
  h3 {
    font-size: 16px;
    a {
      margin-left: 12px;
      &.on {
        color: $baseColor;
      }
    }
  }
  .fa-close {
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: #f00;
    color: #fff;
    border-radius: 50%;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>

<template>
  <div v-if="data.count >= 0" class="que-list-table uc-list">
    <h3>
      {{data.count}}條數據
      <template v-if="data.type == 'myFavorite'">
        <router-link to="/uc/myFavorite/8591" :class="this.$route.params.id == 8591 || !this.$route.params.id ? 'on' :''">8591寶物交易</router-link>
        <router-link to="/uc/myFavorite/100" active-class="on">100室內設計</router-link>
      </template>
    </h3>
    <table>
      <tr>
        <th class="q-l-tle">標題</th>
        <th class="q-l-view">瀏覽</th>
        <th class="q-l-time">時間</th>
      </tr>
      <tr v-if="!data.list.length">
        <td colspan="3" style="text-align:center;">暂无数据</td>
      </tr>
      <tr v-else v-for="(v,k) in data.list" :key="k">
        <td class="q-l-tle">
          <router-link :to="`/question/${data.type != 'myReply' ? v.id : v.issue_id}`">{{data.type != 'myReply' ? v.issue_title : '点击前往查看回复内容'}}</router-link>
        </td>
        <td class="q-l-view"><span>{{data.type != 'myReply' ? v.browse_num : '回答无浏览'}}</span></td>
        <td class="q-l-time">
          <span>{{data.type != 'myReply' ? v.issue_time : v.reply_time}}</span>
          <span v-if="data.type == 'myFavorite'" class="fa fa-close" @click="delFavorite(v.collection_id)"></span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "ucList",
  props: ['data'],
  methods: {
    delFavorite(id){
      if(confirm('確認要刪除該條記錄嗎')){
            // this.$emit('delDone');
        Api.delFavorite({c:'user',a:'unCollection',id:id}).then((res)=>{
          if(res.status == 1){
            this.$emit('delDone');
          }else{
            alert(res.info);
          }
        });
      }
    }
  }
};
</script>
