import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['critica', 'interna', 'externa'],

  critica: null,
  externa: null,
  interna: null,
});
