import Ember from 'ember';
import pretender from 'rmg/pretender/pretender';

export default Ember.Route.extend({
  quryParams: {
    pretender: {
      refreshModel: true,
    },
  },

  model(_, transition) {
    if (Ember.get(transition, 'queryParams.pretender') === 'true') {
      pretender();
    }
  },
});
