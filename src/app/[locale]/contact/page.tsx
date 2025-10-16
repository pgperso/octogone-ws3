"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { 
  Phone, 
  Send, 
  CheckCircle,
  Users,
  MessageSquare,
  Calendar
} from "lucide-react";

export default function ContactPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    establishmentCount: '',
    subject: '',
    message: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pré-remplir le message depuis l'URL (venant du calculateur ROI)
  useEffect(() => {
    const messageFromUrl = searchParams?.get('message');
    if (messageFromUrl) {
      try {
        setFormData(prev => ({
          ...prev,
          message: messageFromUrl, // searchParams.get() décode déjà automatiquement
          subject: 'demo' // Pré-sélectionner "Demande de démonstration"
        }));
      } catch (error) {
        console.error('Erreur lors du décodage du message:', error);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Préparation des données pour l'envoi
      const emailData = {
        to: 'info@octogone.ai', // Email principal du footer
        cc: 'support@octogone.ai', // Email support du footer
        subject: `Nouveau message de contact - ${formData.subject || 'Demande générale'}`,
        from: formData.email,
        replyTo: formData.email,
        html: `
          <h2>Nouveau message de contact depuis le site web</h2>
          
          <h3>Informations du contact :</h3>
          <ul>
            <li><strong>Nom :</strong> ${formData.firstName} ${formData.lastName}</li>
            <li><strong>Email :</strong> ${formData.email}</li>
            <li><strong>Téléphone :</strong> ${formData.phone || 'Non fourni'}</li>
            <li><strong>Entreprise :</strong> ${formData.company}</li>
            <li><strong>Poste :</strong> ${formData.position || 'Non fourni'}</li>
            <li><strong>Nombre d'établissements :</strong> ${formData.establishmentCount || 'Non spécifié'}</li>
            <li><strong>Sujet :</strong> ${formData.subject}</li>
          </ul>
          
          <h3>Message :</h3>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${formData.message.replace(/\n/g, '<br>')}
          </p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Message envoyé depuis le formulaire de contact du site web Octogone.
            <br>Langue : ${locale === 'fr' ? 'Français' : 'Anglais'}
            <br>Date : ${new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}
          </p>
        `,
        text: `
Nouveau message de contact depuis le site web

Informations du contact :
- Nom : ${formData.firstName} ${formData.lastName}
- Email : ${formData.email}
- Téléphone : ${formData.phone || 'Non fourni'}
- Entreprise : ${formData.company}
- Poste : ${formData.position || 'Non fourni'}
- Nombre d'établissements : ${formData.establishmentCount || 'Non spécifié'}
- Sujet : ${formData.subject}

Message :
${formData.message}

---
Message envoyé depuis le formulaire de contact du site web Octogone.
Langue : ${locale === 'fr' ? 'Français' : 'Anglais'}
Date : ${new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}
        `
      };

      // TODO: Remplacer par votre service d'envoi d'email (ex: SendGrid, Nodemailer, etc.)
      console.log('Email data prepared:', emailData);
      
      // Simulation d'envoi pour le moment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Réinitialiser le formulaire après succès
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        establishmentCount: '',
        subject: '',
        message: '',
        consent: false
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      // TODO: Afficher un message d'erreur à l'utilisateur
      alert(locale === 'fr' 
        ? 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement au 581-874-5990.'
        : 'An error occurred while sending. Please try again or contact us directly at 581-874-5990.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (isSubmitted) {
    return (
      <ResponsiveSection spacing="xl" className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-marine-900 mb-4">
            {locale === "fr" ? "Message envoyé !" : "Message sent!"}
          </h1>
          <p className="text-xl text-marine-700 mb-8">
            {locale === "fr" 
              ? "Merci pour votre intérêt. Notre équipe vous contactera dans les plus brefs délais."
              : "Thank you for your interest. Our team will contact you as soon as possible."}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 bg-primary_color hover:bg-gold-600 text-black font-semibold rounded-lg transition-colors"
          >
            {locale === "fr" ? "Envoyer un autre message" : "Send another message"}
          </button>
        </div>
      </ResponsiveSection>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-marine-50 to-white">
      {/* Hero Section */}
      <ResponsiveSection spacing="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-marine-900/5 to-gold-500/5"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-marine-900 mb-6">
            {locale === "fr" ? "Contactez-nous" : "Contact us"}
          </h1>
          <p className="text-xl lg:text-2xl text-marine-700 max-w-3xl mx-auto mb-8">
            {locale === "fr" 
              ? "Transformez votre gestion avec Octogone. Découvrez comment notre plateforme peut optimiser vos opérations."
              : "Transform your management with Octogone. Discover how our platform can optimize your operations."}
          </p>
        </div>
      </ResponsiveSection>

      {/* Contact Content */}
      <ResponsiveSection spacing="xl">
        <div className="max-w-4xl mx-auto">
          
          {/* Section d'introduction colorée */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: '#B8E6D5' }}>
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                <MessageSquare className="w-8 h-8" style={{ color: 'var(--on-secondary-container)' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "Service humain et rapide" : "Human and fast service"}
              </h3>
              <p className="text-sm" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "Notre équipe vous accompagne et facilite votre quotidien" : "Our team supports you and simplifies your daily operations"}
              </p>
            </div>
            
            <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: '#BADFF6' }}>
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                <Calendar className="w-8 h-8" style={{ color: 'var(--on-secondary-container)' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "Démo sur mesure" : "Custom demo"}
              </h3>
              <p className="text-sm" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "Voyez Octogone en action" : "See Octogone in action"}
              </p>
            </div>
            
            <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: '#E2CDED' }}>
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                <Users className="w-8 h-8" style={{ color: 'var(--on-secondary-container)' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "À l'écoute de vos besoins" : "Listening to your needs"}
              </h3>
              <p className="text-sm" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "Nous comprenons votre réalité et nous adaptons à vos défis" : "We understand your reality and adapt to your challenges"}
              </p>
            </div>
          </div>

          {/* Numéro de téléphone en évidence */}
          <div className="mb-8">
            <div className="flex items-center justify-center bg-gradient-to-r from-primary_color to-gold-400 px-8 py-6 rounded-xl shadow-lg">
              <Phone className="w-8 h-8 text-marine-900 mr-4" />
              <div className="text-center">
                <p className="text-marine-900 text-sm font-medium mb-1">
                  {locale === "fr" ? "Appelez-nous directement" : "Call us directly"}
                </p>
                <a 
                  href="tel:+15818745990" 
                  className="text-marine-900 text-3xl font-bold hover:text-marine-700 transition-colors"
                >
                  581-874-5990
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <div className="rounded-2xl p-8 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-primary_color to-gold-400 p-3 rounded-lg mr-4">
                  <Send className="w-6 h-6 text-marine-900" />
                </div>
                <h2 className="text-2xl font-bold text-marine-900">
                  {locale === "fr" ? "Envoyez-nous un message" : "Send us a message"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom et Prénom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-marine-900 mb-2">
                      {locale === "fr" ? "Prénom *" : "First name *"}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white hover:border-gray-400"
                      style={{ borderColor: '#E5E5E5' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#BADFF6';
                        e.target.style.boxShadow = '0 0 0 2px rgba(186, 223, 246, 0.3)';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E5E5';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      placeholder={locale === "fr" ? "Votre prénom" : "Your first name"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-marine-900 mb-2">
                      {locale === "fr" ? "Nom *" : "Last name *"}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white hover:border-gray-400"
                      style={{ borderColor: '#E5E5E5' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#BADFF6';
                        e.target.style.boxShadow = '0 0 0 2px rgba(186, 223, 246, 0.3)';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E5E5';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      placeholder={locale === "fr" ? "Votre nom" : "Your last name"}
                    />
                  </div>
                </div>

                {/* Email et Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-marine-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white hover:border-gray-400"
                      style={{ borderColor: '#E5E5E5' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#BADFF6';
                        e.target.style.boxShadow = '0 0 0 2px rgba(186, 223, 246, 0.3)';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E5E5';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-marine-900 mb-2">
                      {locale === "fr" ? "Téléphone" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white hover:border-gray-400"
                      style={{ borderColor: '#E5E5E5' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#BADFF6';
                        e.target.style.boxShadow = '0 0 0 2px rgba(186, 223, 246, 0.3)';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E5E5';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      placeholder="+1 (418) 123-4567"
                    />
                  </div>
                </div>

                {/* Entreprise et Poste */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-marine-900 mb-2">
                      {locale === "fr" ? "Entreprise *" : "Company *"}
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white hover:border-gray-400"
                      style={{ borderColor: '#E5E5E5' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#BADFF6';
                        e.target.style.boxShadow = '0 0 0 2px rgba(186, 223, 246, 0.3)';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E5E5';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      placeholder={locale === "fr" ? "Nom de votre entreprise" : "Your company name"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-marine-900 mb-2">
                      {locale === "fr" ? "Poste" : "Position"}
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white hover:border-gray-400"
                      style={{ borderColor: '#E5E5E5' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#BADFF6';
                        e.target.style.boxShadow = '0 0 0 2px rgba(186, 223, 246, 0.3)';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E5E5';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      placeholder={locale === "fr" ? "Votre fonction" : "Your role"}
                    />
                  </div>
                </div>

                {/* Nombre d'établissements et Sujet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-marine-900 mb-2">
                      {locale === "fr" ? "Nombre d'établissements" : "Number of establishments"}
                    </label>
                    <div className="relative">
                    <select
                      name="establishmentCount"
                      value={formData.establishmentCount}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-10 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white hover:border-gray-400 appearance-none"
                      style={{ borderColor: '#E5E5E5' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#BADFF6';
                        e.target.style.boxShadow = '0 0 0 2px rgba(186, 223, 246, 0.3)';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E5E5';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                    >
                      <option value="">
                        {locale === "fr" ? "Sélectionnez" : "Select"}
                      </option>
                      <option value="1">1</option>
                      <option value="2-5">2-5</option>
                      <option value="6-10">6-10</option>
                      <option value="11-25">11-25</option>
                      <option value="26-50">26-50</option>
                      <option value="50+">50+</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-marine-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-marine-900 mb-2">
                      {locale === "fr" ? "Sujet *" : "Subject *"}
                    </label>
                    <div className="relative">
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-10 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white hover:border-gray-400 appearance-none"
                      style={{ borderColor: '#E5E5E5' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#BADFF6';
                        e.target.style.boxShadow = '0 0 0 2px rgba(186, 223, 246, 0.3)';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E5E5E5';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                      }}
                    >
                      <option value="">
                        {locale === "fr" ? "Choisissez un sujet" : "Choose a subject"}
                      </option>
                      <option value="demo">
                        {locale === "fr" ? "Demande de démonstration" : "Demo request"}
                      </option>
                      <option value="pricing">
                        {locale === "fr" ? "Informations tarifaires" : "Pricing information"}
                      </option>
                      <option value="support">
                        {locale === "fr" ? "Support technique" : "Technical support"}
                      </option>
                      <option value="partnership">
                        {locale === "fr" ? "Partenariat" : "Partnership"}
                      </option>
                      <option value="other">
                        {locale === "fr" ? "Autre" : "Other"}
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-marine-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-marine-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white hover:border-gray-400 resize-none"
                    style={{ borderColor: '#E5E5E5' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#BADFF6';
                      e.target.style.boxShadow = '0 0 0 2px rgba(186, 223, 246, 0.3)';
                      e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#E5E5E5';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transition = 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
                    }}
                    placeholder={locale === "fr" 
                      ? "Décrivez vos besoins et comment nous pouvons vous aider..."
                      : "Describe your needs and how we can help you..."}
                  />
                </div>

                {/* Consentement */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 rounded focus:ring-2"
                    style={{
                      accentColor: '#DCB26B',
                      borderColor: '#E5E5E5'
                    }}
                  />
                  <label className="text-sm text-marine-700">
                    {locale === "fr" ? (
                      <>
                        J&rsquo;accepte que mes données soient utilisées pour me recontacter concernant ma demande. 
                        <span className="text-marine-900 font-semibold">*</span>
                      </>
                    ) : (
                      <>
                        I agree that my data may be used to contact me regarding my request. 
                        <span className="text-marine-900 font-semibold">*</span>
                      </>
                    )}
                  </label>
                </div>

                {/* Bouton d'envoi */}
                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-8 py-4 hover:bg-gold-600 disabled:bg-gray-400 text-black font-semibold rounded-lg transition-all duration-300 ease-out transform hover:scale-105 disabled:transform-none"
                    style={{ backgroundColor: isSubmitting ? '#9CA3AF' : '#dcb26b' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        {locale === "fr" ? "Envoi en cours..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {locale === "fr" ? "Envoyer le message" : "Send message"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ResponsiveSection>

    </main>
  );
}
