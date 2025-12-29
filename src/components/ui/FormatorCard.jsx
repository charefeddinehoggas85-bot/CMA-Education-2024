'use client';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Star, Award, Linkedin } from 'lucide-react';
import ProfessionalAvatar from './ProfessionalAvatar';
import { getImageURL } from '@/lib/strapi';
export default function FormatorCard(_a) {
    var _b, _c;
    var formateur = _a.formateur, index = _a.index, _d = _a.variant, variant = _d === void 0 ? 'card' : _d;
    // Récupérer l'URL de la photo si disponible
    var photoUrl = formateur.photoData ? getImageURL(formateur.photoData) : null;
    var hasPhoto = photoUrl && !photoUrl.includes('formations-hero');
    if (variant === 'hero') {
        return (<div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-primary-blue to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo du directeur */}
            <div className="relative">
              <div className="border-4 border-primary-yellow rounded-full p-1">
                {hasPhoto ? (<img src={photoUrl} alt={formateur.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"/>) : (<ProfessionalAvatar name={formateur.name} gender={formateur.gender} size="xl" className="rounded-full"/>)}
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary-yellow rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary-blue"/>
              </div>
            </div>
            
            {/* Informations */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-montserrat font-bold mb-2">{formateur.name}</h3>
              <p className="text-primary-yellow text-xl font-semibold mb-4">{formateur.role}</p>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">{formateur.description}</p>
              
              {/* Badges d'expertise */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {(_b = formateur.specialites) === null || _b === void 0 ? void 0 : _b.map(function (specialite, idx) { return (<span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {specialite}
                  </span>); })}
              </div>
              
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-yellow"/>
                  <span className="font-semibold">{formateur.experience}</span>
                </div>
                <div className="flex items-center gap-1">
                  {__spreadArray([], Array(5), true).map(function (_, i) { return (<Star key={i} className="w-4 h-4 fill-primary-yellow text-primary-yellow"/>); })}
                </div>
                {formateur.linkedin && (<a href={formateur.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <Linkedin className="w-5 h-5"/>
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>)}
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    return (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * index }} className="group">
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-blue/20 h-full">
        {/* Photo et infos principales */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            {hasPhoto ? (<img src={photoUrl} alt={formateur.name} className="w-24 h-24 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"/>) : (<ProfessionalAvatar name={formateur.name} gender={formateur.gender} size="md" className="group-hover:scale-110 transition-transform duration-300"/>)}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white"/>
            </div>
          </div>
          
          <h4 className="text-xl font-montserrat font-bold text-gray-900 mb-2">
            {formateur.name}
          </h4>
          <p className="text-primary-blue font-semibold mb-3">
            {formateur.role}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {formateur.description}
          </p>
        </div>

        {/* Spécialités */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {(_c = formateur.specialites) === null || _c === void 0 ? void 0 : _c.slice(0, 3).map(function (specialite, idx) { return (<span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                {specialite}
              </span>); })}
          </div>
        </div>

        {/* Expérience et LinkedIn */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-blue"/>
            <span className="text-sm font-semibold text-primary-blue">
              {formateur.experience} d'expérience
            </span>
          </div>
          {formateur.linkedin && (<a href={formateur.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" title="Voir le profil LinkedIn">
              <Linkedin className="w-4 h-4"/>
            </a>)}
        </div>
      </div>
    </motion.div>);
}
