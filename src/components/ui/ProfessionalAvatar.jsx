'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
export default function ProfessionalAvatar(_a) {
    var name = _a.name, gender = _a.gender, _b = _a.size, size = _b === void 0 ? 'md' : _b, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.showFallback, showFallback = _d === void 0 ? true : _d;
    var _e = useState(false), imageError = _e[0], setImageError = _e[1];
    var _f = useState(''), currentAvatar = _f[0], setCurrentAvatar = _f[1];
    var initials = name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase();
    var sizeClasses = {
        sm: 'w-12 h-12 text-sm',
        md: 'w-24 h-24 text-lg',
        lg: 'w-32 h-32 text-xl',
        xl: 'w-40 h-40 text-2xl'
    };
    // Couleurs professionnelles basées sur le nom pour la cohérence
    var getAvatarColor = function (name, gender) {
        var colors = gender === 'female'
            ? [
                'bg-gradient-to-br from-pink-500 to-rose-600',
                'bg-gradient-to-br from-purple-500 to-indigo-600',
                'bg-gradient-to-br from-blue-500 to-cyan-600',
                'bg-gradient-to-br from-emerald-500 to-teal-600'
            ]
            : [
                'bg-gradient-to-br from-blue-600 to-indigo-700',
                'bg-gradient-to-br from-slate-600 to-gray-700',
                'bg-gradient-to-br from-emerald-600 to-green-700',
                'bg-gradient-to-br from-orange-600 to-red-700'
            ];
        var index = name.length % colors.length;
        return colors[index];
    };
    // URLs d'avatars professionnels - d'abord chercher localement, puis fallback
    var getAvatarUrl = function (name) {
        // Convertir le nom en slug pour le fichier
        var slug = name.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        // D'abord essayer l'avatar local
        var localAvatar = "/images/formateurs/".concat(slug, ".svg");
        // Fallback vers avatar généré
        var seed = name.toLowerCase().replace(/\s+/g, '');
        var generatedAvatar = "https://api.dicebear.com/7.x/professional/svg?seed=".concat(seed, "&backgroundColor=1e40af,1e3a8a,3730a3&clothingColor=1f2937,374151,4b5563");
        return { localAvatar: localAvatar, generatedAvatar: generatedAvatar };
    };
    var colorClass = getAvatarColor(name, gender);
    var avatarUrls = getAvatarUrl(name);
    // Initialiser l'avatar au premier rendu
    useEffect(function () {
        setCurrentAvatar(avatarUrls.localAvatar);
    }, [avatarUrls.localAvatar]);
    var handleImageError = function () {
        if (currentAvatar === avatarUrls.localAvatar) {
            // Essayer l'avatar généré
            setCurrentAvatar(avatarUrls.generatedAvatar);
        }
        else {
            // Utiliser le fallback avec initiales
            setImageError(true);
        }
    };
    if (imageError || !showFallback) {
        return (<div className={"".concat(sizeClasses[size], " ").concat(colorClass, " rounded-2xl flex items-center justify-center text-white font-bold shadow-lg ").concat(className)}>
        {initials}
      </div>);
    }
    return (<div className={"".concat(sizeClasses[size], " rounded-2xl overflow-hidden shadow-lg ").concat(className)}>
      <Image src={currentAvatar} alt={"Avatar de ".concat(name)} width={size === 'xl' ? 160 : size === 'lg' ? 128 : size === 'md' ? 96 : 48} height={size === 'xl' ? 160 : size === 'lg' ? 128 : size === 'md' ? 96 : 48} className="w-full h-full object-cover" onError={handleImageError}/>
    </div>);
}
