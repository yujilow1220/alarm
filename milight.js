var Milight = require("milight");

var milight = new Milight({
    host: "192.168.0.107",
    broadcast: true
});
var i = 0;
// All zones on
milight.zone(1).on();
milight.zone(1).brightness(i);
setInterval(function(){
  console.log('now brightness = ' + i);
  milight.zone(1).brightness(i, function(err){

    i ++;
    if(i === 100)process.exit(0);
  });
}, 1000 * 60);
