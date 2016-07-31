var AlarmViewModel = function(){
  var self = this;

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

};

ko.applyBindings(new AlarmViewModel());
