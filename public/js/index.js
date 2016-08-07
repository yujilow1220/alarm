var AlarmViewModel = function(){
  var self = this;

  self.alarms = ko.observableArray([]);
  self.name = ko.observable('');
  self.time = ko.observable('');
  self.script = ko.observable('');
  self.create = function(){
    console.log('create');
    var json = {
      name: self.name(),
      time: self.time(),
      script: self.script()
    }
    console.log(json);
    $.ajax({
      url: '/alarm/create',
      type:'post',
      contentType: 'application/json',
      data:JSON.stringify(json)
    }).done(function(){
      console.log("ok");
    });
  }

  self.edit = function(data){
    self.name(data.name);
    self.time(data.time);
    self.script(data.script);
  }

  $.ajax({
    url:'/alarm/list',
    type:'get'
  }).done(function(data){
    self.alarms(data);
  });

};

ko.applyBindings(new AlarmViewModel());
