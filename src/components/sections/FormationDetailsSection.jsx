var FormationDetailsSection = function (_a) {
    var formation = _a.formation, siteSettings = _a.siteSettings;
    return (<section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* En-tête formation */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {formation.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                {formation.level}
              </span>
              {formation.rncp && (<span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  {formation.rncp}
                </span>)}
              {formation.duration && (<span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                  {formation.duration}
                </span>)}
            </div>
            {formation.description && (<p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {formation.description}
              </p>)}
          </div>

          {/* Grille d'informations */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Débouchés */}
            {formation.debouches && formation.debouches.length > 0 && (<div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🎯 Débouchés
                </h3>
                <ul className="space-y-2">
                  {formation.debouches.map(function (debouche, index) { return (<li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{debouche}</span>
                    </li>); })}
                </ul>
              </div>)}

            {/* Compétences */}
            {formation.competences && formation.competences.length > 0 && (<div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  💡 Compétences acquises
                </h3>
                <ul className="space-y-2">
                  {formation.competences.map(function (competence, index) { return (<li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">{competence}</span>
                    </li>); })}
                </ul>
              </div>)}

            {/* Programme */}
            {formation.programme && formation.programme.length > 0 && (<div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  📚 Programme
                </h3>
                <ul className="space-y-2">
                  {formation.programme.map(function (module, index) { return (<li key={index} className="flex items-start">
                      <span className="text-purple-600 mr-2">▶</span>
                      <span className="text-gray-700">{module}</span>
                    </li>); })}
                </ul>
              </div>)}

            {/* Modalités */}
            {formation.modalites && formation.modalites.length > 0 && (<div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  ⚙️ Modalités
                </h3>
                <ul className="space-y-2">
                  {formation.modalites.map(function (modalite, index) { return (<li key={index} className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span className="text-gray-700">{modalite}</span>
                    </li>); })}
                </ul>
              </div>)}
          </div>

          {/* Prérequis */}
          {formation.prerequis && formation.prerequis.length > 0 && (<div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                ⚠️ Prérequis
              </h3>
              <ul className="space-y-2">
                {formation.prerequis.map(function (prerequis, index) { return (<li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">!</span>
                    <span className="text-gray-700">{prerequis}</span>
                  </li>); })}
              </ul>
            </div>)}
        </div>
      </div>
    </section>);
};
export default FormationDetailsSection;
