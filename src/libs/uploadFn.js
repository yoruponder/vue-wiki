export let h5img = () => ({
    files:[],
    filter: function(files){
        var filterFiles = [];

        for(var i = 0, file; file = files[i]; i++){
            if((/^image\//.test(file.type)) && (/\.(?:jpg|png|gif|jpeg)$/.test(file.name.toLowerCase())) ){
            if (file.size >= 2048000) {
                    alert('您这张"'+ file.name +'"图片大小过大，应小于2M');	
                }else if(/.*[\u4e00-\u9fa5]+.*$/.test(file.name)){ 
                    alert("圖片名不能含有漢字！"); 
                    continue;
                }else {
                    filterFiles.push(file);	
                }
            }else{
                alert('文件"' + file.name + '"不是圖片');
            }
        }
        this.files = filterFiles;
        return filterFiles;
    },
    preview: function(files,fn){
        var i = 0;
        var previewDom 	= '';
        var filterFiles = this.filter(files);
        var loopPreview = function(){
            if(filterFiles && filterFiles[i]){
                var file  		= filterFiles[i];
                
                var reader = new FileReader();
                reader.onload = function(e) {
                    previewDom += '<img class="preview-img" src="'+e.target.result+'">';
                    i++;
                    loopPreview();
                };
                reader.readAsDataURL(file);
            }else{
                fn(previewDom)
            }
        }
        loopPreview();
    },
    upload: function(url,data,jindu,complete,fail){
        var _this = this;
        
        if(!_this.files.length){  //文件為空
            return;
        }

        for(var i = 0, file; file = _this.files[i]; i++) {
            (function(file) {
                // var readyFile = new FormData();//创建表单数据对象
                // readyFile.append("uploadFile",file);
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                for(var attr in data) {
                    formData.append(attr,data[attr]);
                }
                if (xhr.upload) {
                    // 上传中
                    xhr.upload.addEventListener("progress", function(e){
                        jindu && jindu(e.loaded,e.total);
                    }, false);
        
                    // 文件上传成功或是失败
                    xhr.onreadystatechange = function(e) {
                        if (xhr.readyState == 4) {
                            if(xhr.status == 200){
                                _this.funDeleteFile(file);
                                if (!_this.files.length) {
                                    complete && complete(JSON.parse(xhr.responseText));
                                }
                            }else{
                                faile && fail(JSON.parse(xhr.responseText));
                            }
                        }
                    };
                    formData.append('file',file);
                    // 开始上传
                    xhr.open("POST",url, true);
                    xhr.setRequestHeader("FILENAME",file.name);
                    xhr.send(formData);
                }
            })(file);
        }
    },
    funDeleteFile: function(fileDelete) {
        var arrFile = [];
        for (var i = 0, file; file = this.files[i]; i++) {
            if (file != fileDelete) {
                arrFile.push(file);
            }
        }
        this.files = arrFile;
        return this;
    }
});