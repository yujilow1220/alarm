var alarm = require('./lib/alarm');
var async = require('async');
// alarm.create("aa", "* * * * * *", "echo aaa", function(){
//   alarm.start();
// });
alarm.list(function(alarms){
  console.log(alarms);
});
