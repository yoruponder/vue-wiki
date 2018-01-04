<style lang="scss">
@import "../../assets/css/baseVal.scss";
@import "../../assets/css/admin-common.scss";
.under-tag{
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
    <div class="admin-cnt com-width">
      <template v-if="!isUnderTag">
        <p class="srh-p">条件搜索</p>
        <div class="srh-area" style="display:block">
          <div class="line">
            <div class="item-wp">
              <select v-model="queryData.selnid" @change="linkNid">
                <option v-for="(v,k) in navArr" v-if="v.id != 4" :key="`nid${k}`" :value="v.id">{{v.title}}</option>
              </select>
            </div>
            <button class="button" @click="addTag">添加標籤</button>          
          </div>
          <div class="line">
            <div class="item-wp">
              <input type="date" v-model="inputDom.start_time">&nbsp;&nbsp;到&nbsp;&nbsp;<input type="date" v-model="inputDom.end_time">
            </div>
            <div class="item-wp">
              <input type="text" placeholder="請輸入標籤名" v-model="inputDom.key" style="width:370px;" />
            </div>
            <button class="button" @click="inputSearch">搜索</button>
            <router-link :to="`/admin/tag/${queryData.selnid}`" @click="resetInput" class="button button-orange" style="margin-left:36px;">清空筛选</router-link>
          </div>
        </div>
        <div class="que-list-table">
          <table>
            <tr>
              <th width="">选择</th>
              <th width="">標籤</th>
              <th width="">提問數</th>
              <th width="">添加人</th>
              <th width="">添加時間</th>
              <th width="">編輯</th>
            </tr>
            <tr v-if="!tags.length">
              <td colspan="5">暫無數據</td>
            </tr>
            <tr v-else v-for="(v,k) in tags" :key="k">
              <td><input type="checkbox" v-model="selIssues" :value="v.id"/></td>
              <td>{{v.content}}</td>
              <td>{{v.count}}<span @click="showUnderTag(v.id,v.content)" style="cursor:pointer;">【点击查看详情】</span></td>
              <td>{{v.add_uid}}</td>
              <td>{{v.add_time}}</td>
              <td><a href="javascript:;" @click="editTag(v.id,v.content)">點擊編輯</a></td>
            </tr>
          </table>
        </div>
        <div class="fn-btn-area">
          <button class="button button-orange" @click="delTag">刪除标签</button>
        </div>
        <pagination :total="pageNum" :now="queryData.currentPage"/>
      </template>
      <template v-else>
        <p class="srh-p">【{{tagName}}】下所有问题<span class="button" @click="goback" style="margin-left:20px;">回到上层页面</span></p>
        <div class="que-list-table under-tag">
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
            <tr v-if="!underTags.length">
              <td colspan="8">暫無數據</td>
            </tr>
            <tr v-else v-for="(v,k) in underTags" :key="k">
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
      </template>
      <popbox :slotArr="['moveCat','edit','add']">
        <div slot="moveCat" class="movecat-pop">
          <div class="line">将问题移动至</div>
          <div class="line">
            <span>移至版塊:</span>
            <select v-model="moveTag">
              <option value="">請選擇</option>
              <option v-for="(v,k) in tags" :key="k" :value="v.id">{{v.content}}</option>
            </select>
          </div>
        </div>
        <div slot="edit">
          <p style="margin:30px 0 10px;font-size:16px;">當前標籤名：<strong>{{tmpName}}</strong></p>
          <input v-model="newTagName" type="text" placeholder="请输入新標籤名" autofocus="autofocus"/>
        </div>
        <div slot="add">
          <p style="margin:30px 0 10px;font-size:16px;">添加新標籤：</p>
          <input v-model="newTagName" type="text" placeholder="请输入新標籤名" autofocus="autofocus"/>
        </div>
      </popbox>
      <shadow-component/>
    </div>
    <wiki-footer />
  </div>
</template>

<script>
import adminHead from "_COMP_/admin/head";
import wikiFooter from "_COMP_/footer";
import pagination from "_COMP_/pagination";
import popbox from "_COMP_/popbox";
import shadowComponent from "_COMP_/shadow";
import { mapActions } from "vuex";

export default {
  name: 'tags',
  components: {
    adminHead,
    pagination,
    wikiFooter,
    popbox,
    shadowComponent
  },
  data() {
    return {
      navArr: [],
      tags: [],
      selIssues: [],
      count: 0,
      pagesize: 15,
      inputDom: {
        key: this.$route.query.k ? this.$route.query.k : '',
        start_time: this.$route.query.st ? this.$route.query.st : '',
        end_time: this.$route.query.et ? this.$route.query.et : ''
      },
      queryData: {
        selnid: this.$route.params.nid ? this.$route.params.nid : 8591,
        currentPage: this.$route.query.page ? this.$route.query.page : 1
      },

      tmpTid: '',
      tmpName: '',
      isUnderTag: 0,
      tagName: '',
      underTags: [],
      moveTag: '',
      newTagName: ''
    };
  },
  computed: {
    pageNum: function() {
      return Math.ceil(this.count / this.pagesize);
    }
  },
  methods: {
    ...mapActions({
      sdshow: "shadow/show",
      sdhide: "shadow/hide",
      pbshow: "popbox/show",
      pbhide: "popbox/hide"
    }),
    closePopbox() {
      this.pbhide();
      this.sdhide();
    },
    getNav() {
      Api.admin.navigation().then(res => {
        this.navArr = res.data;
      });
    },
    linkNid() {
      this.$router.push(`/admin/tag/${this.queryData.selnid}`);
    },
    inputSearch() {
      let data = Object.assign({}, this.$route.query, {
        k: this.inputDom.key,
        st: this.inputDom.start_time,
        et: this.inputDom.end_time
      });
      this.$router.push({query: data});
    },
    setQuery() {
      this.queryData = {
        selnid: this.$route.params.nid ? this.$route.params.nid : 8591,
        currentPage: this.$route.query.page ? this.$route.query.page : 1
      };
      this.inputDom = {
        key: this.$route.query.k ? this.$route.query.k : '',
        start_time: this.$route.query.st ? this.$route.query.st : '',
        end_time: this.$route.query.et ? this.$route.query.et : ''
      };
    },
    resetInput(){
      this.inputDom = {
        key: '',
        start_time: '',
        end_time: ''
      };
    },
    getListData() {
      let data = {
        navigation_id: this.queryData.selnid,
        tag_title: this.inputDom.key,
        start_time: this.inputDom.start_time,
        end_time: this.inputDom.end_time,
        page: this.queryData.currentPage,
        pagesize: this.pagesize
      };
      
      Api.admin.fetchAllTag(data).then(res => {
        this.tags = res.data.tags;
        this.count = res.data.count;
      });
    },
    showUnderTag(tid,name){
      Api.admin.issueTag({id: tid}).then((res)=>{
        this.underTags = res.data;
        this.tagName = name;
        this.isUnderTag = 1;
        this.tmpTid = tid;
        this.tmpName = name;
      });
    },
    goback() {
      this.isUnderTag = 0;
      this.getListData();      
    },
    delIssue(id) {
      if(confirm('確認刪除嗎')){
        Api.admin.removeIssue({id: id}).then(res => {
          if(res.status == 1){
            this.showUnderTag(this.tmpTid,this.tmpName);            
          }else{
            alert('失敗')
          }
        });
      }
    },
    moveIssueId(id){
      this.sdshow({
        fn: () => this.closePopbox()
      });
      this.pbshow({
        type: 'slot',
        tle: "移動分類",
        slotName: 'moveCat',
        btn: [
          {
            txt: "確定",
            type: "ok",
            fn: () => this.doMovePop(id)
          }
        ]
      });
    },
    doMovePop(id) {
      let data = {
        id: this.moveTag,
        issue_id: id
      };
      Api.admin.moveTags(data).then(res => {
        if(res.status == 1){
          this.closePopbox();
          this.showUnderTag(this.tmpTid,this.tmpName);
        }else{
          alert(res.info);
        }
      });
    },
    delTag() {
      if(confirm('確認刪除嗎')){
        Api.admin.removeTag({id: this.selIssues + ''}).then((res)=>{
          this.getListData();
        });
      }
    },
    editTag(tid,name) {
      this.tmpName = name;
      this.sdshow({
        fn: () => this.closePopbox()
      });
      this.pbshow({
        type: 'slot',
        tle: "編輯標籤",
        slotName: 'edit',
        btn: [
          {
            txt: "確定",
            type: "ok",
            fn: () => this.doEdit(tid)
          }
        ]
      });
    },
    doEdit(tid) {
      if(this.newTagName){
        let data = {
          content: this.newTagName,
          id: tid
        };
        Api.admin.editTags(data).then(res => {
          if(res.status == 1){
            this.getListData();
            this.closePopbox();
            this.newTagName = '';
          }else{
            alert('失敗');
          }
        });
      }
    },
    addTag() {
      this.sdshow({
        fn: () => this.closePopbox()
      });
      this.pbshow({
        type: 'slot',
        tle: "添加標籤",
        slotName: 'add',
        btn: [
          {
            txt: "確定",
            type: "ok",
            fn: () => this.doAdd()
          }
        ]
      });
    },
    doAdd() {
      if(this.newTagName){
        let data = {
          content: this.newTagName,
          navigation_id: this.queryData.selnid
        };
        Api.admin.addTag(data).then(res => {
          if(res.status == 1){
            this.getListData();
            this.closePopbox();
            this.newTagName = '';
          }else{
            alert('失敗');
          }
        });
      }
    }
  },
  beforeMount: function() {
    this.getNav();
    this.getListData();
  },
  watch: {
    $route: function() {
      this.setQuery();
      this.getListData();
    }
  }
}
</script>
