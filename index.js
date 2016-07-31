var alarm = require('./lib/alarm');
// alarm.create("aa", "* * * * * *", "echo aaa", function(){
//   alarm.start();
// });
alarm.list(function(alarms){
  console.log(alarms);
});
