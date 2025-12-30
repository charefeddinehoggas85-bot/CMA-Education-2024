'use client';

import { Calendar, Briefcase, Linkedin, Award, CheckCircle } from 'lucide-react';

interface FormatorCardProps {
  formateur: {
    name: string;
    role: string;
    description: string;
    experience: string;
    gender?: 'male' | 'female';
    specialites?: string[];
    certifications?: string[];
    isDirector?: boolean;
    linkedin?: string;
    photoData?: any;
  };
  index: number;
  variant?: 'card' | 'hero';
}

export default function FormatorCard({ formateur, index, variant = 'card' }: FormatorCardProps) {
  const initials = formateur.name.split(' ').map(n => n[0]).join('').toUpperCase();

  if (variant === 'hero' && formateur.isDirector) {
    return (
      <div className="bg-gradient-to-r from-primary-blue to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-primary-yellow rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-blue font-bold text-2xl md:text-3xl">{initials}</span>
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <Award className="w-6 h-6 text-primary-yellow" />
              <span className="text-primary-yellow font-semibold">Direction</span>
            </div>
            <h3 className="text-3xl font-montserrat font-bold mb-2">{formateur.name}</h3>
            <p className="text-xl text-blue-200 mb-4">{formateur.role}</p>
            <p className="text-white/90 leading-relaxed mb-6 max-w-2xl">{formateur.description}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>{formateur.experience} d&apos;exp&eacute;rience</span>
              </div>
              {formateur.linkedin && (
                <a href={formateur.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-blue/20 h-full group">
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-primary-blue rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-primary-yellow font-bold text-lg">{initials}</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
        </div>
        <h4 className="text-xl font-montserrat font-bold text-gray-900 mb-2">{formateur.name}</h4>
        <p className="text-primary-blue font-semibold mb-3">{formateur.role}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{formateur.description}</p>
      </div>
      {formateur.specialites && formateur.specialites.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {formateur.specialites.slice(0, 3).map((spec, i) => (
              <span key={i} className="text-xs bg-blue-50 text-primary-blue px-2 py-1 rounded-full">{spec}</span>
            ))}
          </div>
        </div>
      )}
      {formateur.certifications && formateur.certifications.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {formateur.certifications.slice(0, 2).map((cert, i) => (
              <span key={i} className="text-xs flex items-center gap-1 text-green-700">
                <CheckCircle className="w-3 h-3" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary-blue" />
          <span className="text-sm font-semibold text-primary-blue">{formateur.experience} d&apos;exp&eacute;rience</span>
        </div>
        {formateur.linkedin && (
          <a href={formateur.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-blue transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}
