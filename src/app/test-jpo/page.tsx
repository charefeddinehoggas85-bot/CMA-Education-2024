'use client'

export default function TestJPO() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Test du bouton JPO</h1>
        
        {/* Test du bouton JPO isolé */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Bouton JPO isolé :</h2>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="group relative px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium text-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Inscription JPO</span>
              </span>
            </button>
          </a>
        </div>

        {/* Test avec différentes classes de visibilité */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Tests de visibilité :</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Toujours visible :</p>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                JPO - Toujours visible
              </button>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">hidden sm:block (visible à partir de 640px) :</p>
              <button className="hidden sm:block px-4 py-2 bg-orange-500 text-white rounded-lg">
                JPO - sm:block
              </button>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">hidden md:block (visible à partir de 768px) :</p>
              <button className="hidden md:block px-4 py-2 bg-orange-500 text-white rounded-lg">
                JPO - md:block
              </button>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">hidden lg:block (visible à partir de 1024px) :</p>
              <button className="hidden lg:block px-4 py-2 bg-orange-500 text-white rounded-lg">
                JPO - lg:block
              </button>
            </div>
          </div>
        </div>

        {/* Informations de débogage */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Informations de débogage :</h2>
          <div className="space-y-2 text-sm">
            <p><strong>URL du formulaire :</strong> https://docs.google.com/forms/d/e/1FAIpQLSdHNGeoFvaaeknFrtrgIaUe7yDxS1fm0JiYo7q-bxetbfeOiQ/viewform?pli=1</p>
            <p><strong>Breakpoints Tailwind :</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>sm: 640px et plus</li>
              <li>md: 768px et plus</li>
              <li>lg: 1024px et plus</li>
              <li>xl: 1280px et plus</li>
            </ul>
            <p><strong>Largeur actuelle de l'écran :</strong> <span id="screen-width"></span></p>
          </div>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          function updateScreenWidth() {
            const element = document.getElementById('screen-width');
            if (element) {
              element.textContent = window.innerWidth + 'px';
            }
          }
          updateScreenWidth();
          window.addEventListener('resize', updateScreenWidth);
        `
      }} />
    </div>
  )
}