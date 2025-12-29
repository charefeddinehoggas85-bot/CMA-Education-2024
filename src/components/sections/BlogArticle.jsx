'use client';
import { Calendar, Clock, User, Share2, ArrowLeft, GraduationCap, RotateCcw, Award, Target, Phone, CreditCard, Building2 } from 'lucide-react';
import Link from 'next/link';
import OptimizedButton from '@/components/ui/OptimizedButton';
var BlogArticle = function (_a) {
    var article = _a.article;
    return (<article className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Fil d'Ariane">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary-blue transition-colors">
                Accueil
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/blog" className="hover:text-primary-blue transition-colors">
                Blog
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium truncate">
              {article.category}
            </li>
          </ol>
          <Link href="/blog" className="inline-flex items-center text-primary-blue hover:text-primary-yellow transition-colors mt-4">
            <ArrowLeft className="w-4 h-4 mr-2"/>
            Retour au blog
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-primary-blue text-white px-4 py-2 rounded-full text-sm font-semibold">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between border-b border-gray-200 pb-8">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5"/>
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5"/>
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5"/>
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 group">
              <Share2 className="w-4 h-4"/>
              <span>Partager</span>
            </button>
          </div>
        </header>

        {/* Image principale */}
        <div className="mb-12">
          <div className="w-full h-96 bg-gradient-to-br from-primary-blue via-primary-blue/90 to-primary-yellow/20 rounded-2xl shadow-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-12 h-12 text-white"/>
              </div>
              <h3 className="text-2xl font-bold mb-2">Formation BTP</h3>
              <p className="text-lg opacity-90">{article.category}</p>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="max-w-none">
          <div className="prose prose-lg prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-blue prose-a:no-underline hover:prose-a:text-primary-yellow prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700" dangerouslySetInnerHTML={{ __html: article.content || '' }}/>
        </div>

        {/* CTA */}
        <div className="mt-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue via-primary-blue/90 to-primary-yellow/20 rounded-3xl"></div>
          <div className="relative p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mr-4">
                  <GraduationCap className="w-8 h-8 text-primary-blue"/>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Prêt à Transformer Votre Carrière ?
                </h3>
              </div>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Rejoignez les <strong>98% de nos diplômés</strong> qui ont trouvé un emploi dans les 6 mois. 
                Formations certifiées Qualiopi, prise en charge OPCO à 100%.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="w-12 h-12 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-primary-blue"/>
                  </div>
                  <div className="text-2xl font-bold text-primary-yellow mb-1">98%</div>
                  <div className="text-white/90 text-sm">Taux d'insertion</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="w-12 h-12 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-6 h-6 text-primary-blue"/>
                  </div>
                  <div className="text-2xl font-bold text-primary-yellow mb-1">100%</div>
                  <div className="text-white/90 text-sm">Prise en charge</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="w-12 h-12 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-6 h-6 text-primary-blue"/>
                  </div>
                  <div className="text-2xl font-bold text-primary-yellow mb-1">300+</div>
                  <div className="text-white/90 text-sm">Entreprises partenaires</div>
                </div>
              </div>
              
              {/* Boutons formations spécifiques */}
              {article.relatedFormations && article.relatedFormations.length > 0 && (<div className="mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary-yellow mr-3"/>
                    <h4 className="text-xl font-semibold text-white">
                      Formations en lien avec cet article
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center mb-6">
                    {article.relatedFormations.map(function (formation, index) { return (<Link key={index} href={formation.url}>
                        <button className="bg-primary-yellow text-primary-blue px-4 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition-colors shadow-lg flex items-center space-x-2">
                          {formation.type === 'alternance' && <GraduationCap className="w-4 h-4"/>}
                          {formation.type === 'reconversion' && <RotateCcw className="w-4 h-4"/>}
                          {formation.type === 'vae' && <Award className="w-4 h-4"/>}
                          <span>{formation.title}</span>
                        </button>
                      </Link>); })}
                  </div>
                </div>)}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/formations">
                  <OptimizedButton variant="secondary" size="lg" className="shadow-xl flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5"/>
                    <span>Découvrir Toutes nos Formations</span>
                  </OptimizedButton>
                </Link>
                <Link href="/contact">
                  <button className="border-2 border-white text-white hover:bg-white hover:text-primary-blue shadow-xl px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2">
                    <Phone className="w-5 h-5"/>
                    <span>Nous Contacter</span>
                  </button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center text-white/70 text-sm mt-6">
                <Phone className="w-4 h-4 mr-2"/>
                <span><strong>01 89 70 60 52</strong> | Conseils gratuits et sans engagement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>);
};
export default BlogArticle;
