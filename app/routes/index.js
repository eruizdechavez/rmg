import Ember from 'ember';
import { isEmpty, reduce, pickBy } from 'lodash';

export default Ember.Route.extend({
  queryParams: {
    critica: {
      refreshModel: true,
    },
    externa: {
      refreshModel: true,
    },
    interna: {
      refreshModel: true,
    },
  },

  ajax: Ember.inject.service(),

  model(params) {
    let grietaParams = '';
    if (!isEmpty(params)) {
      grietaParams = reduce(
        pickBy(params, value => value),
        (result, value, key) => {
          result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
          return result;
        },
        []
      ).join('&');
      grietaParams = grietaParams ? `?${grietaParams}` : '';
    }

    const grieta = this.get('ajax').request(`/api/grieta${grietaParams}`);
    const revision = this.get('ajax').request(`/api/revision`);
    return Ember.RSVP.all([grieta, revision]).then(([grieta, revision]) => {
      return { grieta, revision };
    });
  },
});
