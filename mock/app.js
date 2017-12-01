var express = require('express');
var app = express();

// 设置跨域访问，方便开发
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5050');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// 具体接口设置
app.get('/api/test', function(req, res) {
    res.cookie('cs',1,{domain:'localhost'});
    res.send({ code: 200, data: 'bbb' });
});

// 具体接口设置
app.get('/api/test2', function(req, res) {
    res.send({
    	code: 200,
    	data: [
    		{
    			src: 	'http://ws.dev.8591.com.tw/img/1.png',
    			txt: 	'石器時代1',
    			link: 	'/user-login'
    		},
    		{
    			src: 	'http://ws.dev.8591.com.tw/img/2.png',
    			txt: 	'石器時代2',
    			link: 	'/user-login'
    		},
    		{
    			src: 	'http://ws.dev.8591.com.tw/img/3.png',
    			txt: 	'石器時代3',
    			link: 	'/user-login'
    		},
    		{
    			src: 	'http://ws.dev.8591.com.tw/img/4.png',
    			txt: 	'石器時代4',
    			link: 	'/user-login'
    		}
    	] 
    });
});
// 具体接口设置
app.get('/api/game', function(req, res) {
    res.send({
        code: 200,
        data: {
            gameName:'',
            serverName:'',
            data:[
                {id: 123,name:'石器時代1'},
                {id: 23,name:'阿萨德'},
                {id: 45,name:'的方式地方'},
                {id: 234,name:'阿萨额外德'},
                {id: 15,name:'去玩儿'},
                {id: 456,name:'上线从委屈'},
                {id: 2341,name:'受到委屈呃'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'},
                {id: 5776,name:'持续'}
            ]
        }
    });
});
// 具体接口设置
app.get('/api/game/23', function(req, res) {
    res.send({
        code: 200,
        data: {
            gameName:'阿萨德',
            serverName:'',
            data:[
                {id: 123,name:'伺服器1'},
                {id: 44,name:'伺服器2'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'},
                {id: 45,name:'伺服器3'}
            ]
        }
    });
});
// 具体接口设置
app.get('/api/game/23/44', function(req, res) {
    res.send({
        code: 200,
        data: {
            gameName:'阿萨德',
            serverName:'伺服器2',
            data:[
                {id: 123,name:'类型1'},
                {id: 23,name:'类型2'},
                {id: 45,name:'类型3'}
            ]
        }
    });
});
app.get('/api/game/23/45', function(req, res) {
    res.send({
        code: 200,
        data: [] 
    });
});

var server = app.listen(3000, function() {
    var host = 'localhost'//server.address().address;
    var port = server.address().port;
    console.log(server.address().address);
    console.log('Mock server listening at http://%s:%s', host, port);
});