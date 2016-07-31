var express = require('express');
var router = express.Router();
var alarm = require('../lib/alarm');
alarm.start();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req,res,next){
  alarm.list(function(alarms){
    res.send(alarms);
  })
});

router.post('/create', function(req, res, next){
  var name = req.body.name || 'alarm';
  var time = req.body.time;
  var script = req.body.script;
  alarm.create(name, time, script, function(){
    alarm.reload();
    res.send("ok");
  });
});

router.get('/stop', function(req, res, next){
  alarm.stop();
  res.send("ok");
});

router.delete('/:name', function(req, res, next){
  alarm.delete(req.params['name'], function(){
    alarm.reload();
    res.send('ok');
  })
})

module.exports = router;
