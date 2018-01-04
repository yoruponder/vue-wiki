<style lang="scss">
@import "../../assets/css/baseVal.scss";
@import "../../assets/css/admin-common.scss";
.under-tag{
  .srh-p{
    .button{
      margin-left: 20px;
    }
  }
  .fa{
    font-size: $bfs;
    color: $baseColor;
    cursor: pointer;
  }
  .fa-times-circle{
    color: #f00;
  }
}
</style>

<template>
  <div class="admin-page">
    <admin-head/>
    <div class="admin-cnt com-width under-tag">
      <p class="srh-p">【{{tagName}}】下所有问题<span class="button" @click="goback">回到上层页面</span></p>
      <div class="que-list-table">
        <table>
          <tr>
            <th width="660">标题</th>
            <th width="80">提问人</th>
            <th width="80">浏览</th>
            <th width="80">状态</th>
            <th width="80">提问时间</th>
            <th width="80">是否推荐</th>
            <th width="80">删除</th>
            <th width="80">移动</th>
          </tr>
          <tr v-if="!tags.length">
            <td colspan="8">暫無數據</td>
          </tr>
          <tr v-else v-for="(v,k) in tags" :key="k">
            <td style="text-align:left;padding-left:20px;">{{v.issue_title}}</td>
            <td>{{v.issue_uid}}</td>
            <td>{{v.browse_num}}</td>
            <td>{{v.status}}</td>
            <td>{{v.issue_time}}</td>
            <td>{{v.recommended}}</td>
            <td @click="delIssue(v.id)"><i class="fa fa-times-circle"></i></td>
            <td @click="moveIssueId(v.id)"><i class="fa fa-arrow-circle-right"></i></td>
          </tr>
        </table>
      </div>
    </div>
    <wiki-footer />
  </div>
</template>

<script>
import adminHead from "_COMP_/admin/head";
import wikiFooter from "_COMP_/footer";
import pagination from "_COMP_/pagination";

export default {
  name: 'tags',
  components: {
    adminHead,
    wikiFooter
  },
  data() {
    return {
      tags: [],
      selIssues: [],
      tagId: this.$route.params.tid,
      tagName: this.$route.params.name
    };
  },
  methods: {
    getListData() {
      console.log(this.tagId)
      Api.admin.issueTag({id: this.tagId}).then((res)=>{
        this.tags = res.data;
      });
    },
    delReply() {
      if(confirm('確認刪除嗎')){
        Api.admin.removeReply({id: this.selIssues + ''}).then(res => {
          if(res.status == 1){
            this.getListData();
          }else{
            alert('失敗');
          }
        });
      }
    },
    goback() {
      this.$router.go(-1);
    }
  },
  beforeMount: function() {
    this.getListData();
  }
}
</script>
