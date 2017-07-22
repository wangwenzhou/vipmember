var express = require('express');
var router = express.Router();
var Picture = require('../models/Picture');
/* GET home page. */
router.get('/', function(req, res) {
  Picture.find({},function(err, pictures){
    Board.find({},function(err, boards){
      Slice.find({},function(err, slices){
        res.render('index', { pictures:pictures, boards:boards, slices:slices});
      })
    })
  })  
});

router.get('/manager',(req,res)=>{res.redirect('/manager/pictures');})

//图片部分
router.get('/manager/pictures', function(req, res){
  Picture.find({},function(err, pictures){
    res.render('picture-show', {pictures: pictures});
  })
})

router.get('/manager/pictures/:id/edit', function(req, res){
  if(req.params.id == 0){
    var picture = new Picture();
    res.render('picture-edit', {picture: picture});
  }else{
    Picture.findOne({pid: req.params.id}, function(err, picture){
      res.render('picture-edit', {picture: picture});
    })}
})

router.get('/manager/pictures/:id/delete', function(req, res){
  Picture.remove({pid: req.params.id}, function(err){if(err){console.log(err);}});
  res.redirect('/manager/pictures');
})

router.post('/manager/pictures/:id/save', function(req, res){
  Picture.findOne({pid: req.params.id}, function(err, picture){
    if(picture){
      Picture.update({pid: req.params.id}, {$set:{
        title:req.body.title, desc:req.body.desc, img:req.body.img
      }}, function(err){}, true, false);
    }else{
      var _picture = new Picture({
        title:req.body.title, desc:req.body.desc, img:req.body.img
      })
      _picture.save(function(err, picture){});
    }})
  res.redirect('/manager/pictures');
})

// 公告部分
var Board = require('../models/Board'); 
router.get('/manager/boards', function(req, res){
  Board.find({},function(err, boards){
    res.render('board-show', {boards: boards});
  })
})

router.get('/manager/boards/:id/edit', function(req, res){
  if(req.params.id == 0){
    var board = new Board();
    res.render('board-edit', {board: board});
  }else{
    Board.findOne({bid: req.params.id}, function(err, board){
      res.render('board-edit', {board: board});
    })}
})

router.get('/manager/boards/:id/delete', function(req, res){
  Board.remove({bid: req.params.id}, function(err){if(err){console.log(err);}});
  res.redirect('/manager/boards');
})

router.post('/manager/boards/:id/save', function(req, res){
  Board.findOne({bid: req.params.id}, function(err, board){
    if(board){
      Board.update({bid: req.params.id}, {$set:{
        title:req.body.title, position:req.body.position, content:req.body.content
      }}, function(err){}, true, false);
    }else{
      var _board = new Board({
        title:req.body.title, position:req.body.position, content:req.body.content
      })
      _board.save(function(err, board){});
    }})
  res.redirect('/manager/boards');
})

router.get('/manager/boards/:id/content', function(req, res){
  Board.findOne({'bid':req.params.id}, function(err, board){
    if(board){
      res.write(board.content);
      res.end();
    }
  });
})

//滑动图片部分
var Slice = require('../models/Slice'); 
router.get('/manager/slices', function(req, res){
  Slice.find({},function(err, slices){
    res.render('slice-show', {slices: slices});
  })
})

router.get('/manager/slices/:id/edit', function(req, res){
  if(req.params.id == 0){
    var slice = new Slice();
    res.render('slice-edit', {slice: slice});
  }else{
    Slice.findOne({sid: req.params.id}, function(err, slice){
      res.render('slice-edit', {slice: slice});
    })}
})

router.get('/manager/slices/:id/delete', function(req, res){
  Slice.remove({sid: req.params.id}, function(err){if(err){console.log(err);}});
  res.redirect('/manager/slices');
})

router.post('/manager/slices/:id/save', function(req, res){
  Slice.findOne({pid: req.params.id}, function(err, slice){
    if(slice){
      Slice.update({sid: req.params.id}, {$set:{
        isValuable:req.body.isValuable, img:req.body.img
      }}, function(err){}, true, false);
    }else{
      var _slice = new Slice({
        isValuable:req.body.isValuable, img:req.body.img
      })
      _slice.save(function(err, slice){});
    }})
  res.redirect('/manager/slices');
})

module.exports = router;
