import type { Schema, Attribute } from '@strapi/strapi';

export interface UiStatItem extends Schema.Component {
  collectionName: 'components_ui_stat_items';
  info: {
    displayName: 'Stat Item';
    description: '\u00C9l\u00E9ment de statistique avec chiffre et label';
  };
  attributes: {
    number: Attribute.Integer & Attribute.Required;
    label: Attribute.String & Attribute.Required;
    suffix: Attribute.String & Attribute.DefaultTo<''>;
    prefix: Attribute.String & Attribute.DefaultTo<''>;
    icon: Attribute.String;
    color: Attribute.String & Attribute.DefaultTo<'#3b82f6'>;
  };
}

export interface UiContactInfo extends Schema.Component {
  collectionName: 'components_ui_contact_infos';
  info: {
    displayName: 'Contact Info';
    description: 'Information de contact (t\u00E9l\u00E9phone, email, adresse)';
  };
  attributes: {
    type: Attribute.Enumeration<['phone', 'email', 'address', 'hours']> &
      Attribute.Required;
    label: Attribute.String & Attribute.Required;
    value: Attribute.String & Attribute.Required;
    icon: Attribute.String;
  };
}

export interface UiButton extends Schema.Component {
  collectionName: 'components_ui_buttons';
  info: {
    displayName: 'Button';
    description: "Bouton d'action";
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    style: Attribute.Enumeration<['primary', 'secondary', 'outline']> &
      Attribute.DefaultTo<'primary'>;
    openInNewTab: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface SectionsTextSection extends Schema.Component {
  collectionName: 'components_sections_text_sections';
  info: {
    displayName: 'Text Section';
    description: 'Section de texte riche avec titre';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.RichText & Attribute.Required;
    alignment: Attribute.Enumeration<['left', 'center', 'right']> &
      Attribute.DefaultTo<'left'>;
    backgroundColor: Attribute.String & Attribute.DefaultTo<'#ffffff'>;
  };
}

export interface SectionsTestimonialsSection extends Schema.Component {
  collectionName: 'components_sections_testimonials_sections';
  info: {
    displayName: 'Testimonials Section';
    description: 'Section t\u00E9moignages avec carousel';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.Text;
    testimonials: Attribute.Relation<
      'sections.testimonials-section',
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    layout: Attribute.Enumeration<['carousel', 'grid', 'list']> &
      Attribute.DefaultTo<'carousel'>;
    autoplay: Attribute.Boolean & Attribute.DefaultTo<true>;
    showRating: Attribute.Boolean & Attribute.DefaultTo<true>;
    backgroundColor: Attribute.String & Attribute.DefaultTo<'#ffffff'>;
  };
}

export interface SectionsStatsSection extends Schema.Component {
  collectionName: 'components_sections_stats_sections';
  info: {
    displayName: 'Stats Section';
    description: 'Section statistiques avec chiffres cl\u00E9s';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.Text;
    stats: Attribute.Component<'ui.stat-item', true>;
    layout: Attribute.Enumeration<['horizontal', 'grid']> &
      Attribute.DefaultTo<'horizontal'>;
    animationType: Attribute.Enumeration<['none', 'countUp', 'fadeIn']> &
      Attribute.DefaultTo<'countUp'>;
    backgroundColor: Attribute.String & Attribute.DefaultTo<'#f8fafc'>;
  };
}

export interface SectionsHeroSection extends Schema.Component {
  collectionName: 'components_sections_hero_sections';
  info: {
    displayName: 'Hero Section';
    description: 'Section h\u00E9ro avec titre, sous-titre et image de fond';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    subtitle: Attribute.Text;
    backgroundImage: Attribute.Media<'images'>;
    ctaButton: Attribute.Component<'ui.button'>;
    backgroundColor: Attribute.String & Attribute.DefaultTo<'#ffffff'>;
  };
}

export interface SectionsGallerySection extends Schema.Component {
  collectionName: 'components_sections_gallery_sections';
  info: {
    displayName: 'Gallery Section';
    description: "Section galerie d'images avec titre et l\u00E9gendes";
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.Text;
    images: Attribute.Media<'images', true> & Attribute.Required;
    layout: Attribute.Enumeration<['grid', 'carousel', 'masonry']> &
      Attribute.DefaultTo<'grid'>;
    columns: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 6;
        },
        number
      > &
      Attribute.DefaultTo<3>;
    showCaptions: Attribute.Boolean & Attribute.DefaultTo<true>;
    backgroundColor: Attribute.String & Attribute.DefaultTo<'#ffffff'>;
  };
}

export interface SectionsContactSection extends Schema.Component {
  collectionName: 'components_sections_contact_sections';
  info: {
    displayName: 'Contact Section';
    description: 'Section de contact avec formulaire et informations';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Contactez-nous'>;
    subtitle: Attribute.Text;
    showForm: Attribute.Boolean & Attribute.DefaultTo<true>;
    showMap: Attribute.Boolean & Attribute.DefaultTo<false>;
    contactInfo: Attribute.Component<'ui.contact-info', true>;
  };
}

export interface ContactTelephone extends Schema.Component {
  collectionName: 'components_contact_telephones';
  info: {
    displayName: 'T\u00E9l\u00E9phone';
    description: 'Num\u00E9ro de t\u00E9l\u00E9phone';
  };
  attributes: {
    numero: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['fixe', 'mobile', 'fax']> &
      Attribute.DefaultTo<'fixe'>;
    label: Attribute.String & Attribute.Required;
    principal: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ContactReseauSocial extends Schema.Component {
  collectionName: 'components_contact_reseaux_sociaux';
  info: {
    displayName: 'R\u00E9seau Social';
    description: 'R\u00E9seau social';
  };
  attributes: {
    nom: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    icon: Attribute.String;
    actif: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface ContactHoraire extends Schema.Component {
  collectionName: 'components_contact_horaires';
  info: {
    displayName: 'Horaire';
    description: "Horaire d'ouverture";
  };
  attributes: {
    jour: Attribute.Enumeration<
      ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
    > &
      Attribute.Required;
    ouverture: Attribute.Time;
    fermeture: Attribute.Time;
    ferme: Attribute.Boolean & Attribute.DefaultTo<false>;
    note: Attribute.String;
  };
}

export interface ContactEmail extends Schema.Component {
  collectionName: 'components_contact_emails';
  info: {
    displayName: 'Email';
    description: 'Adresse email';
  };
  attributes: {
    email: Attribute.Email & Attribute.Required;
    type: Attribute.Enumeration<
      ['contact', 'inscription', 'commercial', 'support', 'rh']
    > &
      Attribute.DefaultTo<'contact'>;
    label: Attribute.String & Attribute.Required;
    principal: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ContactCoordonneesGps extends Schema.Component {
  collectionName: 'components_contact_coordonnees_gps';
  info: {
    displayName: 'Coordonn\u00E9es GPS';
    description: 'Coordonn\u00E9es GPS';
  };
  attributes: {
    latitude: Attribute.Decimal & Attribute.Required;
    longitude: Attribute.Decimal & Attribute.Required;
    zoom: Attribute.Integer & Attribute.DefaultTo<15>;
  };
}

export interface ContactAdresse extends Schema.Component {
  collectionName: 'components_contact_adresses';
  info: {
    displayName: 'Adresse';
    description: 'Adresse compl\u00E8te';
  };
  attributes: {
    nom: Attribute.String & Attribute.Required;
    rue: Attribute.String & Attribute.Required;
    ville: Attribute.String & Attribute.Required;
    codePostal: Attribute.String & Attribute.Required;
    pays: Attribute.String & Attribute.DefaultTo<'France'>;
    complement: Attribute.String;
  };
}

export interface FormationAvantage extends Schema.Component {
  collectionName: 'components_formation_avantages';
  info: {
    displayName: 'Avantage';
    description: "Avantage d'une modalit\u00E9";
  };
  attributes: {
    titre: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    icon: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'ui.stat-item': UiStatItem;
      'ui.contact-info': UiContactInfo;
      'ui.button': UiButton;
      'sections.text-section': SectionsTextSection;
      'sections.testimonials-section': SectionsTestimonialsSection;
      'sections.stats-section': SectionsStatsSection;
      'sections.hero-section': SectionsHeroSection;
      'sections.gallery-section': SectionsGallerySection;
      'sections.contact-section': SectionsContactSection;
      'contact.telephone': ContactTelephone;
      'contact.reseau-social': ContactReseauSocial;
      'contact.horaire': ContactHoraire;
      'contact.email': ContactEmail;
      'contact.coordonnees-gps': ContactCoordonneesGps;
      'contact.adresse': ContactAdresse;
      'formation.avantage': FormationAvantage;
    }
  }
}
