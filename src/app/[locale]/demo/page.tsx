"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { 
  CheckCircle2, 
  Calendar,
  Mail,
  Building2,
  User,
  Phone,
  ArrowRight
} from "lucide-react";

export default function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params);
  const [activeVersion, setActiveVersion] = useState<'octogone' | 'octogone-ai'>('octogone');

  // Style pour l'animation de bordure lumineuse
  const glowBorderStyle = `
    @keyframes rotateBorder {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  
  // Messages de développement qui changent
  const [devMessageIndex, setDevMessageIndex] = useState(0);
  const devMessages = locale === "fr" ? [
    "Intégration de Cortex pour la création de recettes",
    "Intégration de Cortex pour le calcul du food cost",
    "Intégration de Cortex pour l'automatisation de la facturation",
    "Intégration de Cortex pour la génération de recommandations",
    "Intégration de Cortex pour l'optimisation des inventaires",
    "Intégration de Cortex pour la prédiction de la demande",
    "Intégration de Cortex pour l'analyse de rentabilité"
  ] : [
    "Integrating Cortex for recipe creation",
    "Integrating Cortex for food cost calculation",
    "Integrating Cortex for invoice automation",
    "Integrating Cortex for recommendation generation",
    "Integrating Cortex for inventory optimization",
    "Integrating Cortex for demand forecasting",
    "Integrating Cortex for profitability analysis"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDevMessageIndex((prev) => (prev + 1) % devMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [devMessages.length]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const submissionData = {
        ...formData,
        requestedVersion: activeVersion,
      };

      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }

      setIsSubmitted(true);
      // Réinitialiser le formulaire
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitError(
        locale === 'fr' 
          ? 'Une erreur est survenue. Veuillez réessayer.' 
          : 'An error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Features pour Octogone classique
  const featuresOctogone = locale === "fr" ? [
    "Gestion complète des inventaires en temps réel",
    "Calcul automatique du food cost",
    "Facturation automatisée",
    "Tableaux de bord personnalisables",
    "Support multi-établissements",
    "Gestion des recettes et production"
  ] : [
    "Complete real-time inventory management",
    "Automatic food cost calculation",
    "Automated invoicing",
    "Customizable dashboards",
    "Multi-location support",
    "Recipe and production management"
  ];

  // Features pour Octogone.ai
  const featuresOctogoneAI = locale === "fr" ? [
    "Tout ce qu'Octogone offre, optimisé par l'IA",
    "Cortex IA - Votre assistant intelligent",
    "Prédictions de demande et recommandations",
    "Optimisation automatique des commandes",
    "Détection d'anomalies en temps réel",
    "Insights stratégiques personnalisés"
  ] : [
    "Everything Octogone offers, AI-powered",
    "Cortex AI - Your intelligent assistant",
    "Demand predictions and recommendations",
    "Automatic order optimization",
    "Real-time anomaly detection",
    "Personalized strategic insights"
  ];

  const features = activeVersion === 'octogone' ? featuresOctogone : featuresOctogoneAI;

  return (
    <main className="flex min-h-screen flex-col">
      <style>{glowBorderStyle}</style>
      {/* Hero Section */}
      <ResponsiveSection
        as="section"
        bgColor="bg-gradient-to-br from-marine-50 via-white to-gold-50"
        spacing="lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-bold mb-6"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
            >
              {locale === "fr" 
                ? "Découvrez Octogone en action" 
                : "Discover Octogone in action"}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-marine-600 mb-8"
              style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)' }}
            >
              {locale === "fr"
                ? "Voyez comment Octogone transforme la gestion de votre restaurant"
                : "See how Octogone transforms your restaurant management"}
            </motion.p>

            {/* Toggle Switch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex gap-2 bg-white rounded-lg p-1 shadow-md"
            >
              <button
                onClick={() => setActiveVersion('octogone')}
                className="px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300 cursor-pointer hover:bg-opacity-80"
                style={{
                  backgroundColor: activeVersion === 'octogone' ? '#dcb26b' : 'transparent',
                  color: activeVersion === 'octogone' ? 'black' : 'black'
                }}
                onMouseEnter={(e) => {
                  if (activeVersion !== 'octogone') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeVersion !== 'octogone') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                Octogone
              </button>
              <button
                onClick={() => setActiveVersion('octogone-ai')}
                className="px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300 cursor-pointer hover:bg-opacity-80 relative overflow-visible"
                style={{
                  background: activeVersion === 'octogone-ai' 
                    ? 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)' 
                    : 'transparent',
                  color: 'black'
                }}
                onMouseEnter={(e) => {
                  if (activeVersion !== 'octogone-ai') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeVersion !== 'octogone-ai') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-md" style={{ 
                  background: activeVersion === 'octogone-ai' 
                    ? '#dcb26b' 
                    : 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)',
                  boxShadow: '0 0 8px rgba(0, 0, 0, 0.15)'
                }}>
                  <NextImage 
                    src="/cortex.svg" 
                    alt="Cortex AI" 
                    width={20} 
                    height={20}
                    className="w-5 h-5"
                    style={{ filter: 'brightness(0)' }}
                  />
                </span>
                Octogone.ai
              </button>
            </motion.div>

            {/* Description de la version sélectionnée */}
            <motion.div
              key={`desc-${activeVersion}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 max-w-5xl mx-auto"
            >
              {activeVersion === 'octogone-ai' ? (
                <div 
                  className="p-8 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)' }}
                >
                  <motion.div 
                    key={devMessageIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-marine-900 text-white text-sm font-semibold rounded-full mb-4"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                    </span>
                    <span>
                      {devMessages[devMessageIndex]}
                    </span>
                    <span className="inline-flex gap-0.5">
                      <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                    </span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {locale === "fr" 
                      ? "La nouvelle version d'Octogone bientôt disponible" 
                      : "The new version of Octogone coming soon"}
                  </h3>
                  <p className="text-black text-lg leading-relaxed">
                    {locale === "fr" 
                      ? "La prochaine évolution d'Octogone intégrera Cortex, notre agent d'intelligence artificielle. Cette nouvelle version automatisera vos processus opérationnels et vous aidera à prendre de meilleures décisions grâce à des analyses en temps réel et des recommandations stratégiques personnalisées." 
                      : "The next evolution of Octogone will integrate Cortex, our artificial intelligence agent. This new version will automate your operational processes and help you make better decisions through real-time analysis and personalized strategic recommendations."}
                  </p>
                </div>
              ) : (
                <div 
                  className="p-8 rounded-xl"
                  style={{ backgroundColor: '#002236' }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 text-black text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: '#dcb26b' }}>
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#002236' }}></span>
                    </span>
                    <span>
                      {locale === "fr" ? "Disponible maintenant" : "Available now"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {locale === "fr" 
                      ? "La plateforme de gestion complète pour restaurants" 
                      : "The complete management platform for restaurants"}
                  </h3>
                  <p className="text-white text-lg leading-relaxed">
                    {locale === "fr" 
                      ? "Octogone centralise tous vos processus opérationnels dans une seule plateforme intuitive. Gestion des inventaires, calcul du food cost, facturation automatisée, suivi des recettes et bien plus. Déjà utilisée par des centaines de restaurants pour optimiser leur gestion au quotidien." 
                      : "Octogone centralizes all your operational processes in a single intuitive platform. Inventory management, food cost calculation, automated invoicing, recipe tracking and more. Already used by hundreds of restaurants to optimize their daily operations."}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </ResponsiveSection>

      {/* Video Section */}
      <ResponsiveSection
        as="section"
        bgColor="bg-white"
        spacing="lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video bg-marine-900 rounded-2xl overflow-hidden shadow-2xl"
            >
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                poster="/images/video-poster.jpg"
              >
                <source src="https://cdn.pixabay.com/video/2015/08/08/90-135735293_large.mp4" type="video/mp4" />
                {locale === "fr" 
                  ? "Votre navigateur ne supporte pas la lecture de vidéos." 
                  : "Your browser does not support video playback."}
              </video>
              
              {activeVersion === 'octogone-ai' && (
                <div className="absolute top-4 right-4 px-4 py-2 bg-gold-500 rounded-lg">
                  <p className="text-white text-sm font-bold">
                    {locale === "fr" ? "AVANT-PREMIÈRE" : "PREVIEW"}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Features Grid */}
            <motion.div
              key={activeVersion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-12"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-marine-900">
                  {activeVersion === 'octogone' 
                    ? (locale === "fr" ? "Fonctionnalités principales" : "Key Features")
                    : (locale === "fr" ? "Fonctionnalités IA avancées" : "Advanced AI Features")}
                </h3>
                {activeVersion === 'octogone-ai' && (
                  <p className="text-marine-600 mt-2">
                    {locale === "fr" 
                      ? "Toutes les fonctionnalités d'Octogone + l'intelligence artificielle" 
                      : "All Octogone features + artificial intelligence"}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={`${activeVersion}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-marine-50 rounded-lg hover:bg-marine-100 transition-colors"
                  >
                    <CheckCircle2 className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
                    <p className="text-marine-800 font-medium">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </ResponsiveSection>

      {/* Demo Request Form */}
      <ResponsiveSection
        as="section"
        bgColor="bg-marine-50"
        spacing="lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 
                className="font-bold text-marine-900 mb-4"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
              >
                {locale === "fr" 
                  ? "Réservez votre démo personnalisée" 
                  : "Book your personalized demo"}
              </h2>
              <p className="text-marine-600 text-lg">
                {locale === "fr"
                  ? "Un expert Octogone vous contactera pour planifier une démonstration adaptée à vos besoins"
                  : "An Octogone expert will contact you to schedule a demo tailored to your needs"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-marine-900 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        {locale === "fr" ? "Prénom" : "First Name"}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-marine-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                        placeholder={locale === "fr" ? "Jean" : "John"}
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-marine-900 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        {locale === "fr" ? "Nom" : "Last Name"}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-marine-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                        placeholder={locale === "fr" ? "Dupont" : "Doe"}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-marine-900 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      {locale === "fr" ? "Email professionnel" : "Professional Email"}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-marine-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      placeholder={locale === "fr" ? "jean.dupont@restaurant.com" : "john.doe@restaurant.com"}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-marine-900 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      {locale === "fr" ? "Téléphone" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-marine-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      placeholder={locale === "fr" ? "+33 6 12 34 56 78" : "+1 (555) 123-4567"}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-marine-900 mb-2">
                      <Building2 className="w-4 h-4 inline mr-2" />
                      {locale === "fr" ? "Nom du restaurant / établissement" : "Restaurant / Establishment Name"}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-marine-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      placeholder={locale === "fr" ? "Restaurant Le Gourmet" : "The Gourmet Restaurant"}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-marine-900 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      {locale === "fr" ? "Message (optionnel)" : "Message (optional)"}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-marine-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
                      placeholder={locale === "fr" 
                        ? "Parlez-nous de vos besoins spécifiques..." 
                        : "Tell us about your specific needs..."}
                    />
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{submitError}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full btn-gold text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? (locale === "fr" ? "Envoi en cours..." : "Sending...")
                      : (locale === "fr" ? "Réserver ma démo gratuite" : "Book my free demo")}
                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>

                  <p className="text-sm text-marine-500 text-center mt-4">
                    {locale === "fr"
                      ? "Vos données sont protégées et ne seront jamais partagées."
                      : "Your data is protected and will never be shared."}
                  </p>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-marine-900 mb-4">
                    {locale === "fr" ? "Merci !" : "Thank you!"}
                  </h3>
                  <p className="text-marine-600 text-lg mb-6">
                    {locale === "fr"
                      ? "Votre demande a été envoyée avec succès. Un expert Octogone vous contactera sous 24h."
                      : "Your request has been sent successfully. An Octogone expert will contact you within 24 hours."}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="mx-auto"
                  >
                    {locale === "fr" ? "Envoyer une autre demande" : "Submit another request"}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </ResponsiveSection>
    </main>
  );
}
