import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-lg-4', 'col-md-6', 'mb-4'],

  tipos: Ember.computed('grieta.{interna,externa}', function() {
    let tipos = [];

    if (this.get('grieta.interna')) {
      tipos.push('Interna');
    }

    if (this.get('grieta.externa')) {
      tipos.push('Externa');
    }

    return tipos.join(', ');
  }),
});
