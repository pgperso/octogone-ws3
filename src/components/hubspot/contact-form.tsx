"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface HubSpotContactFormProps {
  locale?: "fr" | "en";
}

/**
 * Formulaire de contact qui envoie les données à HubSpot
 * Utilise l'API HubSpot Forms pour créer des contacts
 */
export function HubSpotContactForm({ locale = "fr" }: HubSpotContactFormProps) {
  const [formData, setFormData] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const labels = {
    fr: {
      firstname: "Prénom",
      lastname: "Nom",
      email: "Email",
      phone: "Téléphone",
      company: "Entreprise",
      message: "Message",
      submit: "Envoyer",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !",
      successDesc: "Nous vous contacterons dans les plus brefs délais.",
      error: "Erreur lors de l'envoi",
      errorDesc: "Veuillez réessayer ou nous contacter directement.",
    },
    en: {
      firstname: "First Name",
      lastname: "Last Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      message: "Message",
      submit: "Send",
      sending: "Sending...",
      success: "Message sent successfully!",
      successDesc: "We will contact you as soon as possible.",
      error: "Error sending message",
      errorDesc: "Please try again or contact us directly.",
    },
  };

  const t = labels[locale];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // Envoyer à HubSpot via l'API Forms
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/46778577/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: [
              { name: "firstname", value: formData.firstname },
              { name: "lastname", value: formData.lastname },
              { name: "email", value: formData.email },
              { name: "phone", value: formData.phone },
              { name: "company", value: formData.company },
              { name: "message", value: formData.message },
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border-2 border-green-500"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">{t.success}</h3>
          <p className="text-green-700 dark:text-green-300">{t.successDesc}</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {locale === "fr" ? "Envoyer un autre message" : "Send another message"}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6"
    >
      {status === "error" && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 dark:text-red-100">{t.error}</p>
            <p className="text-sm text-red-700 dark:text-red-300">{t.errorDesc}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstname" className="block text-sm font-medium mb-2">
            {t.firstname} *
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="lastname" className="block text-sm font-medium mb-2">
            {t.lastname} *
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t.email} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          {t.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          {t.company}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t.message} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto px-8 py-4 bg-gold-500 text-white rounded-lg hover:bg-gold-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {t.sending}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t.submit}
          </>
        )}
      </button>
    </motion.form>
  );
}
