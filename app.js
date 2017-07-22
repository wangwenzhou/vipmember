var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/xiaowei',{useMongoClient:true});
var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);
app.post('/picture-imgupload', function(req, res){
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = './public/images/upload/tmp';
	form.maxFieldsSize = 2 * 1024 * 1024;
	form.keepExtensions =true;
	var upload = 'images/upload/';

	form.parse(req, function(err, fields, files){
		var extName = '';
		switch (files.upload_file.type) {
	    	case 'image/pjpeg': extName = 'jpg'; break;
	    	case 'image/jpeg': extName = 'jpg'; break;		 
	    	case 'image/png': extName = 'png'; break;
	    	case 'image/x-png': extName = 'png'; break;		 
	    }
    var filename = Math.random() + '.' + extName;
    	console.log(files.upload_file.path);
		var newPath  = upload + filename;
		  console.log(req.headers.host);
		fs.rename(files.upload_file.path, "public/"+newPath, function(err){			
			if(err){console.log(err);}
		})
		res.json({code:200, msg: {url: newPath}});
	})
	// res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename }});
})

var ueditor = require("ueditor");
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    //客户端上传文件设置
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = '/ueditor/upload/image/';//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/ueditor/upload/file/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/ueditor/upload/video/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/ueditor/upload/image/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));
  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// // production error handler
// // no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
