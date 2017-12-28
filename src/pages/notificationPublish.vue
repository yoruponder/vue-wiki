<template>
<div class="ask-page">
  <wiki-head :id="nid" />
  <div class="page-cnt page-cnt-pd clearfix">
    <bread-crumb :data="bread"/>
    <div class="com-width clearfix">
      <div class="index-left">
        <h3>标题：</h3>
        <input class="title" type="text" placeholder="请填写提问标题" v-model="title" />
        <h3>选择分类：</h3>
        <div class="select-type">
          <select v-model="cid">
            <option value="0">请选择</option>
            <template v-if="category">
              <option v-for="(v,k) in category" :key="k" :value="v.id">{{v.category_name}}</option>
            </template>
          </select>
        </div>
        <h3>通知詳情</h3>
        <vue-ueditor @ready="editorReady"/>
        <button v-if="type == 'edit'" type="button" class="submit-ask button" @click="finishEdit">完成編輯</button>
        <button v-else type="button" class="submit-ask button" @click="submitNotification">发布通知</button>
      </div>
      <right-block :id="nid" />
    </div>
  </div>
  <wiki-footer />
</div>
</template>

<script>
import wikiHead from "_COMP_/header";
import breadCrumb from "_COMP_/breadCrumb";
import vueUeditor from "_COMP_/UEditor";
import rightBlock from "_COMP_/rightBlock";
import wikiFooter from "_COMP_/footer";
import "_ASET_/css/ask.scss";

export default {
  name: "notificationPublish",
  components: {
    wikiHead,
    breadCrumb,
    rightBlock,
    vueUeditor,
    wikiFooter
  },
  data() {
    return {
      nid: 4,
      id: this.$route.query.id ? this.$route.query.id : "",
      type: this.$route.query.type ? this.$route.query.type : "",
      title: "",
      category: [],
      cid: 0,
      editor: "",
      denyRepeat: 0,
      content: ""
    };
  },
  computed: {
    bread() {
      let arr = [{ name: '通知事項', link: '/notification' }];
      if (this.type == "edit") {
        arr.push({ name: '編輯通知' });
      }else{
        arr.push({ name: '發佈通知' });
      }
      return arr;
    }
  },
  methods: {
    editorReady(ue) {
      this.editor = ue;
    },
    getCategory() {
      Api.notificationCategory().then(res => {
        if (res.status === 1) {
          this.category = res.data;
        }
      });
    },
    getNotification() {
      let data = { c: "notification", a: "notification", id: this.id };
      Api.notificationDetail(data).then(res => {
        if (res.status === 1) {
          this.title = res.data.title;
          this.cid = res.data.category_id;
          this.content = res.data.content;
        }
      });
    },
    submitNotification() {
      let data = {
        c: "user",
        a: "publishNotification",
        category: this.cid,
        title: this.title,
        content: this.editor.getContent()
      };

      if (!data.title) {
        alert("請填寫標題");
        return false;
      }
      if (!data.category) {
        alert("請選擇類別");
        return false;
      }
      if (!data.content) {
        alert("請填寫內容");
        return false;
      }
      //console.log(data);
      Api.notificationPublish(data).then(res => {
        if (res.status === 1) {
          alert("發佈成功");
          this.$router.replace(`/notification/detail/${res.data.id}`);
        } else {
          alert(res.info);
        }
      });
    },
    finishEdit() {
      let data = {
        c: "user",
        a: "editNotification",
        category: this.cid,
        id: this.id,
        title: this.title,
        content: this.editor.getContent()
      };

      if (!data.title) {
        alert("請填寫標題");
        return false;
      }
      if (!data.category) {
        alert("請選擇類別");
        return false;
      }
      if (!data.content) {
        alert("請填寫內容");
        return false;
      }
      Api.notificationEdit(data).then(res => {
        if (res.status === 1) {
          alert("編輯成功");
          this.$router.replace(`/notification/detail/${this.id}`);
        } else {
          alert(res.info);
        }
      });
    }
  },
  beforeMount: function() {
    this.getCategory();
    
    if (this.type == "edit") {
      this.getNotification(this.id);
    }
  },
  watch: {
    editor: function() {
      if (this.content && this.type == "edit") {
        this.editor.setContent(this.content);
      }
    },
    content: function() {
      if (this.editor && this.type == "edit") {
        this.editor.setContent(this.content);
      }
    }
  }
};
</script>