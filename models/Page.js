var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * =============
 */

var Page = new keystone.List('Page', {
  autokey: { from: 'name', path: 'slug', unique: true },
  sortable: true
});

Page.add({
  name: { type: String, required: true },

  type: { type: Types.Select, options: 'home, perso, clinique, equipe, fiche, contact, service' },

  phone: { type: Types.Text, label: 'Téléphone', dependsOn: { type: 'home' } },
  email: { type: Types.Text, dependsOn: { type: 'home' } },
  homeHeroImage: { type: Types.CloudinaryImage, autoCleanup: true, dependsOn: { type: 'home' } },
  homeRdvText: { type: Types.Textarea, height: 200, label: 'Sur rendez-vous', dependsOn: { type: 'home' } },
  homeText1: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: { type: 'home' } },
  homeImage1: { type: Types.CloudinaryImage, autoCleanup: true, dependsOn: { type: 'home' } },
  homeText2: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: { type: 'home' } },
  homeImage2: { type: Types.CloudinaryImage, autoCleanup: true, dependsOn: { type: 'home' } },

  pageHeader: { type: Types.Text, label: 'Titre', dependsOn: { type: ['clinique', 'equipe', 'fiche', 'contact', 'service'] } },
  pageIntro: { type: Types.Textarea, height: 200, label: 'Introduction', dependsOn: { type: ['clinique', 'equipe', 'fiche', 'contact', 'service'] } },
  pageContent: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: { type: ['perso'] } },
  pageImage: { type: Types.CloudinaryImage, autoCleanup: true, dependsOn: { type: 'perso' } },

  pageText1: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: { type: ['clinique', 'service'] } },
  pageImage1: { type: Types.CloudinaryImage, autoCleanup: true, dependsOn: { type: ['clinique', 'service'] } },
  pageText2: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: { type: ['clinique', 'service'] } },
  pageImage2: { type: Types.CloudinaryImage, autoCleanup: true, dependsOn: { type: ['clinique', 'service'] } },
  pageText3: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: { type: ['clinique', 'service'] } },
  pageImage3: { type: Types.CloudinaryImage, autoCleanup: true, dependsOn: { type: ['clinique', 'service'] } },
  pageText4: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: { type: ['clinique', 'service'] } },
  pageImage4: { type: Types.CloudinaryImage, autoCleanup: true, dependsOn: { type: ['clinique', 'service'] } }
});

Page.register();
