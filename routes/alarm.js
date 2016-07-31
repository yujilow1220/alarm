var express = require('express');
var router = express.Router();
var alarm = require('../lib/alarm');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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

module.exports = router;
