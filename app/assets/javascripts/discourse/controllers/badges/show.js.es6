/**
  Controller for showing a particular badge.

  @class BadgesShowController
  @extends Discourse.ObjectController
  @namespace Discourse
  @module Discourse
**/
export default Discourse.ObjectController.extend({

  actions: {
    loadMore: function() {
      var self = this;
      var userBadges = this.get('userBadges');

      Discourse.UserBadge.findByBadgeId(this.get('model.id'), {
        offset: userBadges.length
      }).then(function(userBadges) {
        self.get('userBadges').pushObjects(userBadges);
        if(userBadges.length === 0){
          self.set('noMoreBadges', true);
        }
      });
    }
  },

  layoutClass: function(){
    var ub = this.get("userBadges");
    if(ub && ub[0] && ub[0].post_id){
      return "user-badge-with-posts";
    } else {
      return "user-badge-no-posts";
    }
  }.property("userBadges"),

  canLoadMore: function() {
    if(this.get('noMoreBadges')) {
      return false;
    }

    if (this.get('userBadges')) {
      return this.get('model.grant_count') > this.get('userBadges.length');
    } else {
      return false;
    }
  }.property('noMoreBadges', 'model.grant_count', 'userBadges.length')
});
