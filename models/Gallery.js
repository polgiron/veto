var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
  autokey: { from: 'name', path: 'slug', unique: true },
  sortable: true
});

Gallery.add({
  name: { type: String, required: true },
  description: { type: Types.Textarea, height: 200 },
  images: { type: Types.Relationship, ref: 'Image', many: true },
  private: { type: Types.Boolean, label: "Is it a private gallery?" },
  client: { type: Types.Relationship, ref: 'User', dependsOn: { private: true }, index: true },
});

Gallery.register();
