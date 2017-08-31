var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Member Model
 * =============
 */

var Member = new keystone.List('Member', {
  autokey: { from: 'name', path: 'slug', unique: true },
  sortable: true
});

Member.add({
  name: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  title: { type: String },
  image: { type: Types.CloudinaryImage, autoCleanup: true },
  isHighlight: { type: Boolean, label: 'Sur la page d\'accueil?', index: true },
});

Member.register();
