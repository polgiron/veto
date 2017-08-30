var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Fiche Model
 * =============
 */

var Fiche = new keystone.List('Fiche', {
  autokey: { from: 'name', path: 'slug', unique: true },
  sortable: true
});

Fiche.add({
  name: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  brief: { type: Types.Textarea, height: 200 },
  content: { type: Types.Html, wysiwyg: true, height: 400 },
  categories: { type: Types.Relationship, ref: 'FicheCategory', many: true },
});

Fiche.register();
