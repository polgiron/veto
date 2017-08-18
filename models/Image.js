var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Image Model
 * ==================
*/

var Image = new keystone.List('Image', {
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true
});

Image.add({
  name: { type: String, required: true },
  image: { type: Types.CloudinaryImage, autoCleanup: true, required: true, initial: true },
  description: { type: Types.Textarea, height: 200 },
});

Image.register();
