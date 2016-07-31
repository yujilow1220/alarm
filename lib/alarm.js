var SCRIPT_DIR = __dirname + '/../files';
var CronJob = require('cron').CronJob;
var fs = require('fs');
var exec = require('child_process').exec;
var crons = [];
var alarm = require('./alarm');
var async = require('async');
var mkdirp = require('mkdirp');
mkdirp(SCRIPT_DIR);

function list(callback){
  fs.readdir(SCRIPT_DIR, function(err, files){
      if (err) throw err;
      var fileList = files.filter(function(file){
          return /.*\.sh$/.test(file);
      }).map(function(e){
        return e.split('.')[0];
      });
      callback(fileList);
  });
}


function listv2(callback){
  list(function(alarms){
    var funcs = alarms.map(function(e){
      return function(cb){
        fs.readFile(SCRIPT_DIR + "/" + e + '.sh', 'utf8', function(err, text){
          cb(null, {
            name: e,
            time: require(SCRIPT_DIR + "/" + e + '.json').cron,
            script: text
          });
        });
      }
    });
    async.parallel(funcs, function(err, results){
      callback(results);
    });
  });
}

function start(){
  list(function(alarms){
    crons = alarms.map(function(alarm){
      var cron = require(SCRIPT_DIR + "/" + alarm + '.json');
      console.log(cron);
      return new CronJob(cron.cron, function() {
        exec('bash ' + SCRIPT_DIR + "/" + alarm + '.sh', function(err, stdout, stderr){
          console.log(stdout);
          console.log(stderr);
        });
      }, null, true, 'Asia/Tokyo');
    });
  });
}

function reload(){
  crons.forEach(function(cron){
    cron.stop();
  });
  crons = [];
  start();
}

function create(alarm_name, cron_time, script_str, callback){
  fs.writeFile(SCRIPT_DIR + "/" + alarm_name + ".sh", script_str, function(err){
    fs.writeFile(SCRIPT_DIR + "/" + alarm_name + ".json", JSON.stringify({cron:cron_time}), function(err){
      callback(alarm_name);
    });
  });
}

function del(alarm_name, callback){
  fs.unlink(SCRIPT_DIR + "/" + alarm_name + ".sh", function(err){
    fs.unlink(SCRIPT_DIR + "/" + alarm_name + ".json", function(err){
      if(callback)callback();
    });
  });
}

function stop(){
  crons.forEach(function(cron){
    cron.stop();
  });
  crons = [];
}


module.exports.list = listv2;
module.exports.start = start;
module.exports.create = create;
module.exports.delete = del;
module.exports.stop = stop;
module.exports.reload = reload;


module.exports.test = function(){
  var alarm = require('../files/aa.json');
  console.log(alarm);
}
