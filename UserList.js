module.exports = function(chatter) {

  //Listen for when the plugin gets enabled
  this.onEnable = function() {
    //Listen for UserConnectEvent and send all users connected and toggle connected user
    chatter.pluginManager.registerEvent(this, "UserConnectEvent", function(event) {
      this.sendAll(event.user);
      this.toggle(event.user, true);
    });
    //Listen for disconnect and toggle them off
    chatter.pluginManager.registerEvent(this, "UserDisconnectEvent", function(event) {
      this.toggle(event.user, false);
    });

  };
  //Send all users current status of people logged in
  this.sendAll = function() {
    //keep plugin context
    var self = this;
    chatter.getUsers().forEach(function(name) {
      var user = chatter.getUser(name);
      //Send status update of current user
      self.toggle(user, user.isOnline());
    });
  };
  //toggle user status
  this.toggle = function(user, online) {
    chatter.send("userUpdate", {user: user.name, online: online});
  };

};
