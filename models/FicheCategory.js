var keystone = require('keystone');

/**
 * FicheCategory Model
 * ==================
 */

var FicheCategory = new keystone.List('FicheCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
});

FicheCategory.add({
  name: { type: String, required: true },
});

FicheCategory.relationship({ ref: 'Fiche', path: 'fiches', refPath: 'categories' });

FicheCategory.register();
