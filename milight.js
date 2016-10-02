var Milight = require('node-milight-promise').MilightController;
var commands = require('node-milight-promise').commands2;

var light = new Milight({
        ip: "192.168.0.200",
        delayBetweenCommands: 75,
        commandRepeat: 2
    }),
zone = 2;
var i = 0;
light.sendCommands(commands.white.on(zone));
for(var ii = 0; ii < 10; ii++){
  light.sendCommands(commands.white.brightDown());
  light.sendCommands(commands.white.cooler());
}
setInterval(function(){
  console.log('now brightness = ' + i);
  light.sendCommands(commands.white.brightUp());
  if(i == 10){
    light.close();
    process.exit(0);
  }
  i++;
}, 1000 * 60 * 5);
