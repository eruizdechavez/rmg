import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model(params) {
    const grieta = this.get('ajax').request(`/api/grieta/${params.id}`);
    const revision = this.get('ajax').request(`/api/grieta/${params.id}/revision`);
    return Ember.RSVP.all([grieta, revision]).then(([grieta, revision]) => {
      return { grieta, revision };
    });
  },
});
