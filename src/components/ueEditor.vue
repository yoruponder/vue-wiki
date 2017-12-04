<style lang="scss">
.editor-block{
  position: relative;
  z-index: 5;
}
</style>

<template>
  <div class="editor-block" :id="ueId" name="content" type="text/plain"></div>
</template>

<script>
export default {
  name: 'ueEditor',
  props: ['ueId','height'],
  methods: {
    initEditor() {
      const ueId = this.ueId;
      console.log(UE)
      const ueEditor = UE.getEditor(ueId, {
        toolbars: [
          ['fullscreen', 'source', 'undo', 'redo','simpleupload','imageleft','imageright','imagecenter',
          '|','date','time','horizontal',
          '|','inserttable','deletetable','deletecaption','insertrow','insertcol','mergeright','mergedown','deleterow','deletecol','splittorows','splittocols','splittocells','mergecells','edittable','edittd',
          '|','lineheight','rowspacingtop','rowspacingbottom',
          ],
          ['fontfamily','customstyle','paragraph','fontsize', 'link','indent', 'bold','forecolor', 'backcolor','italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'blockquote', 'pasteplain','insertorderedlist', 'insertunorderedlist', 'cleardoc']
        ],
        initialFrameHeight: this.height,
        initialFrameWidth: '100%',
        enableAutoSave: false
      });
      const self = this;
      ueEditor.ready((ueditor) => {
        if (!ueditor) {
          UE.delEditor(ueId);
          self.initEditor();
        }
      });
    }
  },
  mounted: function () {
    this.initEditor();
  },
  beforeDestroy: function () {
    UE.delEditor(this.ueId);
  }
}
</script>
