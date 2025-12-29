'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getStrapiMediaURL } from '@/lib/strapi';
export function FeaturedFormationsClient(_a) {
    var formations = _a.formations;
    return (<div className="grid md:grid-cols-3 gap-8 mb-12">
      {formations.length > 0 ? (formations.map(function (formation, index) {
            var _a, _b, _c;
            return (<motion.div key={formation.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-blue to-blue-600">
              {formation.image && getStrapiMediaURL(formation.image) ? (<img src={getStrapiMediaURL(formation.image) || ''} alt={formation.title || formation.titre || 'Formation'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>) : (<div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🏗️</div>
                    <p className="text-sm font-semibold">{formation.categorie || ((_a = formation.category) === null || _a === void 0 ? void 0 : _a.name) || 'Formation BTP'}</p>
                  </div>
                </div>)}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-primary-yellow text-primary-blue px-3 py-1 rounded-full text-xs font-bold">
                Populaire
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-full">
              {/* Badges Section */}
              <div className="mb-4 flex flex-wrap gap-2 min-h-[32px]">
                {(formation.niveauRNCP || formation.level) && (<span className="inline-block bg-blue-100 text-primary-blue text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {formation.niveauRNCP || formation.level}
                  </span>)}
                {(formation.categorie || ((_b = formation.category) === null || _b === void 0 ? void 0 : _b.name)) && (<span className="inline-block bg-yellow-100 text-primary-yellow text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {formation.categorie || ((_c = formation.category) === null || _c === void 0 ? void 0 : _c.name)}
                  </span>)}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-6 line-clamp-3 group-hover:text-primary-blue transition-colors flex-grow">
                {formation.title || formation.titre}
              </h3>

              {/* CTA Button */}
              <Link href={"/formations/".concat(formation.slug)} className="inline-flex items-center gap-2 text-primary-blue font-semibold hover:text-primary-yellow transition-colors group/btn mt-auto">
                Découvrir
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"/>
              </Link>
            </div>
          </motion.div>);
        })) : (<div className="col-span-3 text-center py-12">
          <p className="text-gray-500">Aucune formation disponible pour le moment</p>
        </div>)}
    </div>);
}
