'use client';
import { useState } from 'react';
import { GraduationCap, Users, RotateCcw, CreditCard, BookOpen } from 'lucide-react';
import { blogCategories } from '@/lib/blog-data';
var BlogCategories = function (_a) {
    var _b, _c, _d, _e, _f;
    var onCategoryChange = _a.onCategoryChange;
    var _g = useState('tous'), activeCategory = _g[0], setActiveCategory = _g[1];
    var handleCategoryClick = function (categoryId) {
        setActiveCategory(categoryId);
        onCategoryChange === null || onCategoryChange === void 0 ? void 0 : onCategoryChange(categoryId);
    };
    var categories = [
        { id: 'tous', name: 'Tous les articles', icon: BookOpen, count: ((_b = blogCategories.find(function (c) { return c.id === 'tous'; })) === null || _b === void 0 ? void 0 : _b.count) || 0 },
        { id: 'formations', name: 'Formations', icon: GraduationCap, count: ((_c = blogCategories.find(function (c) { return c.id === 'formations'; })) === null || _c === void 0 ? void 0 : _c.count) || 0 },
        { id: 'alternance', name: 'Alternance', icon: Users, count: ((_d = blogCategories.find(function (c) { return c.id === 'alternance'; })) === null || _d === void 0 ? void 0 : _d.count) || 0 },
        { id: 'reconversion', name: 'Reconversion', icon: RotateCcw, count: ((_e = blogCategories.find(function (c) { return c.id === 'reconversion'; })) === null || _e === void 0 ? void 0 : _e.count) || 0 },
        { id: 'financement', name: 'Financement', icon: CreditCard, count: ((_f = blogCategories.find(function (c) { return c.id === 'financement'; })) === null || _f === void 0 ? void 0 : _f.count) || 0 }
    ];
    return (<section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explorez nos <span className="text-primary-blue">catégories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les articles qui vous intéressent
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(function (category) {
            var Icon = category.icon;
            var isActive = activeCategory === category.id;
            return (<button key={category.id} onClick={function () { return handleCategoryClick(category.id); }} className={"group p-6 rounded-2xl transition-all duration-300 text-center hover:scale-105 ".concat(isActive
                    ? 'bg-primary-blue text-white shadow-xl'
                    : 'bg-white text-gray-700 hover:bg-primary-blue hover:text-white shadow-lg')}>
                <Icon className={"w-8 h-8 mx-auto mb-3 ".concat(isActive ? 'text-primary-yellow' : 'text-primary-blue group-hover:text-primary-yellow')}/>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <span className={"text-xs px-2 py-1 rounded-full ".concat(isActive
                    ? 'bg-primary-yellow text-primary-blue'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-primary-yellow group-hover:text-primary-blue')}>
                  {category.count} articles
                </span>
              </button>);
        })}
        </div>
      </div>
    </section>);
};
export default BlogCategories;
