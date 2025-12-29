'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ModernButton from '@/components/ui/ModernButton';
import AnimatedIcon from '@/components/ui/AnimatedIcon';
import { getSiteSettings } from '@/lib/strapi';
import emailjs from '@emailjs/browser';
var ContactSection = function () {
    var router = useRouter();
    var form = useRef(null);
    var _a = useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = useState({
        id: 1,
        siteName: 'Construction Management Academy',
        contactPhone: '01 89 70 60 52',
        contactEmail: 'contact.academy@construction-management-academy.fr',
        emailInscription: 'inscription.academy@construction-management-academy.fr',
        contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
        socialMedia: {},
        emailConfig: {
            emailjs: {
                serviceId: 'service_cma2026',
                templateId: 'template_n27932h',
                publicKey: 'tdRwM2nw_IxILeGS-'
            }
        }
    }), siteSettings = _b[0], setSiteSettings = _b[1];
    useEffect(function () {
        function loadSiteSettings() {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, getSiteSettings()];
                        case 1:
                            data = _a.sent();
                            if (data) {
                                setSiteSettings(data);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Strapi non disponible, utilisation des données statiques');
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        loadSiteSettings();
    }, []);
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var emailConfig, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!form.current)
                        return [2 /*return*/];
                    setIsLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    emailConfig = (_a = siteSettings.emailConfig) === null || _a === void 0 ? void 0 : _a.emailjs;
                    if (!emailConfig) return [3 /*break*/, 3];
                    return [4 /*yield*/, emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, form.current, emailConfig.publicKey)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3: 
                // Fallback configuration
                return [4 /*yield*/, emailjs.sendForm('service_cma2026', 'template_n27932h', form.current, 'tdRwM2nw_IxILeGS-')];
                case 4:
                    // Fallback configuration
                    _b.sent();
                    _b.label = 5;
                case 5:
                    alert('✅ Message envoyé avec succès ! Nous vous recontacterons rapidement.');
                    form.current.reset();
                    return [3 /*break*/, 8];
                case 6:
                    error_2 = _b.sent();
                    console.error('Erreur:', error_2);
                    alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
                    return [3 /*break*/, 8];
                case 7:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleCall = function () {
        window.open("tel:".concat(siteSettings.contactPhone.replace(/\s/g, '')), '_self');
    };
    return (<section className="relative py-20 bg-gradient-to-br from-primary-blue to-blue-800 text-white pt-32 overflow-hidden">
      <img src="/images/formations/conducteur-travaux-reconversion.jpg" alt="Contact Construction Management Academy" className="absolute inset-0 w-full h-full object-cover opacity-90"/>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
              Rejoignez {siteSettings.siteName} !
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Faites le premier pas vers une carrière concrète, utile et pleine d'avenir dans le BTP.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <AnimatedIcon variant="bounce" size="lg" background={true} backgroundVariant="circle" className="bg-primary-yellow">
                  <MapPin className="w-6 h-6 text-primary-blue"/>
                </AnimatedIcon>
                <div>
                  <p className="font-semibold">Adresse</p>
                  <p className="opacity-90">{siteSettings.contactAddress}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <AnimatedIcon variant="pulse" size="lg" background={true} backgroundVariant="circle" className="bg-primary-yellow">
                  <Phone className="w-6 h-6 text-primary-blue"/>
                </AnimatedIcon>
                <div>
                  <p className="font-semibold">Téléphone</p>
                  <p className="opacity-90">{siteSettings.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <AnimatedIcon variant="float" size="lg" background={true} backgroundVariant="circle" className="bg-primary-yellow">
                  <Mail className="w-6 h-6 text-primary-blue"/>
                </AnimatedIcon>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="opacity-90">{siteSettings.contactEmail}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ModernButton variant="secondary" size="md" icon={<AnimatedIcon variant="shake" size="sm"><Phone className="w-5 h-5"/></AnimatedIcon>} iconPosition="left" onClick={handleCall}>
                Nous appeler
              </ModernButton>
              
              <ModernButton variant="outline" size="md" icon={<AnimatedIcon variant="bounce" size="sm"><MessageCircle className="w-5 h-5"/></AnimatedIcon>} iconPosition="left" className="border-2 border-white text-white hover:bg-white hover:text-primary-blue">
                Chat en direct
              </ModernButton>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-montserrat font-bold mb-6">
              Candidater maintenant
            </h3>
            
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="to_email" value={siteSettings.emailInscription || siteSettings.contactEmail}/>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" name="prenom" placeholder="Prénom" required className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"/>
                <input type="text" name="nom" placeholder="Nom" required className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"/>
              </div>
              
              <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"/>
              
              <input type="tel" name="telephone" placeholder="Téléphone" required className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow"/>
              
              <select name="formation" required className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-primary-yellow">
                <option value="">Formation d'intérêt</option>
                <option value="charge-affaires-batiment-alternance">Chargé d'Affaires du Bâtiment</option>
                <option value="conducteur-travaux-batiment-alternance">Conducteur de Travaux Bâtiment</option>
                <option value="chef-chantier-vrd-alternance">Chef de Chantier VRD</option>
                <option value="double-parcours-bim-alternance">Double Parcours BIM</option>
                <option value="chef-projets-btp-alternance">Chef de Projets BTP</option>
              </select>
              
              <textarea name="message" placeholder="Votre message" rows={4} required className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-primary-yellow resize-none"></textarea>
              
              <a href="https://construction-management-academy.ymag.cloud/index.php/preinscription/" target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-primary-yellow to-yellow-500 text-primary-blue py-3 rounded-lg font-semibold hover:shadow-xl transition-all text-center">
                Accéder à la préinscription
              </a>
            </form>
          </motion.div>
        </div>
      </div>
    </section>);
};
export default ContactSection;
