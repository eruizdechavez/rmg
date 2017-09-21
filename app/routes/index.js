import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model() {
    const grieta = this.get('ajax').request(`/api/grieta`);
    const revision = this.get('ajax').request(`/api/revision`);
    return Ember.RSVP.all([grieta, revision]).then(([grieta, revision]) => {
      return { grieta, revision };
    });
  },
});
