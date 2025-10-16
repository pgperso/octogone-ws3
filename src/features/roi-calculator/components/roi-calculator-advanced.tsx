"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { 
  Warehouse, 
  ChefHat, 
  Thermometer,
  DollarSign,
  TrendingUp,
  Check,
  Info,
  Package
} from 'lucide-react';
import { AVAILABLE_MODULES, CALCULATION_CONFIG, INVENTORY_SAVINGS } from '../config';
import { calculateROI, formatCurrency, formatHours } from '../utils/roi-calculations';

// Map des icônes (5 forfaits)
const ICON_MAP: Record<string, React.ComponentType> = {
  Warehouse,    // Inventaire
  ChefHat,      // Foodcost
  Thermometer,  // Thermomètre
  DollarSign,   // Pourboire
  Package       // PRO (tous les modules)
};

interface ROICalculatorAdvancedProps {
  onSavingsCalculated?: (savings: number) => void;
}

export default function ROICalculatorAdvanced({ onSavingsCalculated }: ROICalculatorAdvancedProps) {
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  // État
  const [numberOfLocations, setNumberOfLocations] = useState(1);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [hourlyCost, setHourlyCost] = useState(CALCULATION_CONFIG.defaultHourlyCost);
  const [inventoriesPerMonth, setInventoriesPerMonth] = useState(INVENTORY_SAVINGS.defaultInventoriesPerMonth);
  const [employeesPerInventory, setEmployeesPerInventory] = useState(INVENTORY_SAVINGS.defaultEmployeesPerInventory);
  const [manualTasksHours, setManualTasksHours] = useState(CALCULATION_CONFIG.defaultManualTasksHoursPerWeek);
  const [periodView, setPeriodView] = useState<'month' | 'year'>('month'); // Toggle mois/année - Mois par défaut
  const [roiResult, setRoiResult] = useState(calculateROI(1, [], CALCULATION_CONFIG.defaultHourlyCost, INVENTORY_SAVINGS.defaultInventoriesPerMonth, INVENTORY_SAVINGS.defaultEmployeesPerInventory, CALCULATION_CONFIG.defaultManualTasksHoursPerWeek));
  
  // Recalculer le ROI quand les paramètres changent
  useEffect(() => {
    const result = calculateROI(numberOfLocations, selectedModules, hourlyCost, inventoriesPerMonth, employeesPerInventory, manualTasksHours);
    setRoiResult(result);
    
    // Notifier le parent si callback fourni
    if (onSavingsCalculated && selectedModules.length > 0) {
      onSavingsCalculated(result.netYearlySavings);
    }
  }, [numberOfLocations, selectedModules, hourlyCost, inventoriesPerMonth, employeesPerInventory, manualTasksHours, onSavingsCalculated]);
  
  // Toggle module avec logique exclusive pour PRO
  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev => {
      // Si on clique sur PRO
      if (moduleId === 'pro') {
        // Si PRO est déjà sélectionné, on le désélectionne
        if (prev.includes('pro')) {
          return [];
        }
        // Sinon, on sélectionne uniquement PRO (désélectionne tout le reste)
        return ['pro'];
      }
      
      // Si on clique sur un module individuel
      // On retire PRO si présent, puis on toggle le module
      const withoutPro = prev.filter(id => id !== 'pro');
      
      if (withoutPro.includes(moduleId)) {
        // Désélectionner le module
        return withoutPro.filter(id => id !== moduleId);
      } else {
        // Ajouter le module
        return [...withoutPro, moduleId];
      }
    });
  };
  
  // Vérifier si le module Inventaire est sélectionné (ou PRO qui inclut tout)
  const isInventorySelected = selectedModules.includes('inventory') || selectedModules.includes('pro');
  
  // Calculer le prix à la carte (somme des modules individuels)
  const calculateIndividualPrice = () => {
    const prices: Record<string, number> = {
      'inventory': 69,
      'foodcost': 79,
      'thermometer': 59,
      'tips': 89
    };
    
    let total = 0;
    selectedModules.forEach(moduleId => {
      if (moduleId !== 'pro' && prices[moduleId]) {
        total += prices[moduleId];
      }
    });
    
    return total * numberOfLocations;
  };
  
  return (
    <div className="py-4" style={{ backgroundColor: 'var(--background)' }}>
      {/* En-tête */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--on-background)' }}>
          {locale === "fr" ? "Calculez votre retour sur investissement" : "Calculate your return on investment"}
        </h2>
        <p className="text-sm sm:text-base mb-6" style={{ color: 'var(--on-surface-variant)' }}>
          {locale === "fr" 
            ? "Découvrez combien vous pourriez économiser avec Octogone"
            : "Discover how much you could save with Octogone"
          }
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Colonne gauche - Configuration */}
          <div className="space-y-4">
            {/* Paramètres de base */}
            <div className="rounded-xl p-4 border-2" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--on-surface)' }}>
                {locale === "fr" ? "Configuration" : "Configuration"}
              </h3>
              
              <div className="space-y-3">
                {/* Nombre d'établissements - Input */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                    {locale === "fr" ? "Nombre d'établissements" : "Number of locations"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={numberOfLocations}
                    onChange={(e) => setNumberOfLocations(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: 'var(--surface-variant)',
                      borderColor: 'var(--outline)',
                      color: 'var(--on-surface)',
                      '--tw-ring-color': 'var(--primary-container)'
                    } as React.CSSProperties}
                    placeholder={locale === "fr" ? "Ex: 5" : "Ex: 5"}
                  />
                </div>

                {/* Coût horaire */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                    {locale === "fr" ? "Coût horaire moyen d'un employé (avec charges)" : "Average hourly cost per employee (with benefits)"}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="15"
                      max="50"
                      value={hourlyCost}
                      onChange={(e) => setHourlyCost(Number(e.target.value))}
                      className="flex-1 px-4 py-2 rounded-lg border-2"
                      style={{
                        backgroundColor: 'var(--surface-variant)',
                        borderColor: 'var(--outline)',
                        color: 'var(--on-surface)'
                      }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>$/h</span>
                  </div>
                </div>

                {/* Heures de tâches manuelles - TOUJOURS EN MOIS */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                    {locale === "fr" 
                      ? "Heures par mois consacrées aux tâches manuelles et factures"
                      : "Hours per month spent on manual tasks and invoices"
                    }
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="4"
                      max="175"
                      value={Math.round(manualTasksHours * 4.33)}
                      onChange={(e) => {
                        const inputValue = Number(e.target.value);
                        const weeklyHours = inputValue / 4.33;
                        setManualTasksHours(Math.max(1, Math.round(weeklyHours * 10) / 10));
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border-2"
                      style={{
                        backgroundColor: 'var(--surface-variant)',
                        borderColor: 'var(--outline)',
                        color: 'var(--on-surface)'
                      }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                      {locale === "fr" ? "h/mois" : "h/month"}
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>
                    {locale === "fr" 
                      ? "Temps consacré aux inventaires, calculs manuels, gestion des pourboires, etc."
                      : "Time spent on inventories, manual calculations, tip management, etc."
                    }
                  </p>
                </div>

                {/* Inventaires (seulement si module Inventaire sélectionné) */}
                {isInventorySelected && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                        {locale === "fr" ? "Nombre d'inventaires par mois" : "Number of inventories per month"}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={inventoriesPerMonth}
                          onChange={(e) => setInventoriesPerMonth(Number(e.target.value))}
                          className="flex-1 px-4 py-2 rounded-lg border-2"
                          style={{
                            backgroundColor: 'var(--surface-variant)',
                            borderColor: 'var(--outline)',
                            color: 'var(--on-surface)'
                          }}
                        />
                        <span className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                          {locale === "fr" ? "/mois" : "/mo"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                        {locale === "fr" ? "Nombre d'employés par inventaire" : "Number of employees per inventory"}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={employeesPerInventory}
                          onChange={(e) => setEmployeesPerInventory(Number(e.target.value))}
                          className="flex-1 px-4 py-2 rounded-lg border-2"
                          style={{
                            backgroundColor: 'var(--surface-variant)',
                            borderColor: 'var(--outline)',
                            color: 'var(--on-surface)'
                          }}
                        />
                        <span className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                          {locale === "fr" ? "personnes" : "people"}
                        </span>
                      </div>
                      <div className="mt-2 flex items-start gap-2">
                        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--on-surface-variant)' }} />
                        <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                          {locale === "fr" 
                            ? `Économies par inventaire par personne : ${formatHours(INVENTORY_SAVINGS.timeSavedPerInventoryPerPersonHours, locale)} + ${formatCurrency(INVENTORY_SAVINGS.moneySavedPerInventory / employeesPerInventory, locale)}`
                            : `Savings per inventory per person: ${formatHours(INVENTORY_SAVINGS.timeSavedPerInventoryPerPersonHours, locale)} + ${formatCurrency(INVENTORY_SAVINGS.moneySavedPerInventory / employeesPerInventory, locale)}`
                          }
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sélection des forfaits */}
            <div className="rounded-xl p-4 border-2" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold" style={{ color: 'var(--on-surface)' }}>
                  {locale === "fr" ? "Choisir votre forfait" : "Choose your plan"}
                </h3>
                {selectedModules.length > 0 && !selectedModules.includes('pro') && (
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-lg text-sm font-bold" style={{ backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)' }}>
                      {formatCurrency(periodView === 'month' ? calculateIndividualPrice() : calculateIndividualPrice() * 12, locale)}/
                      {locale === "fr" ? (periodView === 'month' ? "mois" : "an") : (periodView === 'month' ? "mo" : "yr")}
                    </span>
                    <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>
                      {locale === "fr" ? "À la carte" : "Individual"}
                    </p>
                  </div>
                )}
                {selectedModules.includes('pro') && (
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-lg text-sm font-bold" style={{ backgroundColor: '#BFD495', color: '#1F1F1F' }}>
                      {formatCurrency(periodView === 'month' ? roiResult.monthlySubscriptionCost : roiResult.monthlySubscriptionCost * 12, locale)}/
                      {locale === "fr" ? (periodView === 'month' ? "mois" : "an") : (periodView === 'month' ? "mo" : "yr")}
                    </span>
                    <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>
                      {locale === "fr" ? "Forfait PRO" : "PRO Plan"}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {AVAILABLE_MODULES.map((module) => {
                  const Icon = ICON_MAP[module.icon];
                  const isSelected = selectedModules.includes(module.id);
                  const isPro = module.id === 'pro';
                  const isProSelected = selectedModules.includes('pro');
                  const isIncludedInPro = isProSelected && !isPro; // Modules inclus dans PRO
                  
                  return (
                    <div
                      key={module.id}
                      onClick={() => toggleModule(module.id)}
                      className="p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                      style={{
                        backgroundColor: isSelected 
                          ? (isPro ? '#BFD495' : 'var(--secondary-container)')
                          : 'var(--surface)',
                        borderColor: isSelected 
                          ? (isPro ? '#BFD495' : 'var(--secondary-container)')
                          : 'var(--outline)'
                      }}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                             style={{ backgroundColor: isSelected ? 'var(--surface)' : 'var(--secondary-container)' }}>
                          {Icon && <Icon className="w-4 h-4" style={{ color: isSelected ? 'var(--on-surface)' : 'var(--on-secondary-container)' }} />}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm" style={{ 
                              color: isSelected ? (isPro ? '#1F1F1F' : 'var(--on-secondary-container)') : 'var(--on-surface)'
                            }}>
                              {locale === "fr" ? module.nameFr : module.nameEn}
                            </span>
                            {isIncludedInPro && (
                              <span className="text-xs" style={{ color: 'var(--on-surface-variant)', opacity: 0.8 }}>
                                {locale === "fr" ? "(inclus)" : "(included)"}
                              </span>
                            )}
                          </div>
                        </div>
                        {isPro && isSelected && (
                          <span className="text-xs mr-2" style={{ color: '#1F1F1F', opacity: 0.8 }}>
                            {locale === "fr" ? "✓ Le meilleur choix" : "✓ Best choice"}
                          </span>
                        )}
                        {(isSelected || isIncludedInPro) && (
                          <Check className="w-5 h-5 flex-shrink-0" style={{ 
                            color: isPro ? '#1F1F1F' : 'var(--on-secondary-container)' 
                          }} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Colonne droite - Résultats */}
          <div className="space-y-4">
            {/* Inclus dans votre forfait */}
            {selectedModules.length > 0 && (
              <div className="rounded-xl p-4 border-2" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--on-surface)' }}>
                  {locale === "fr" ? "Inclus dans votre forfait" : "Included in your plan"}
                </h3>
                <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
                  {selectedModules.includes('pro') ? (
                    // Si PRO est sélectionné, afficher tous les modules avec détails
                    AVAILABLE_MODULES.filter(m => m.id !== 'pro').map(moduleData => {
                      const Icon = ICON_MAP[moduleData.icon];
                      const features = locale === "fr" ? moduleData.featuresFr : moduleData.featuresEn;
                      return (
                        <div key={moduleData.id} className="pb-3 border-b last:border-b-0" style={{ borderColor: 'var(--outline)' }}>
                          <div className="flex items-center gap-2 mb-2">
                            {Icon && <Icon className="w-5 h-5" style={{ color: 'var(--on-surface)' }} />}
                            <span className="font-bold text-sm" style={{ color: 'var(--on-surface)' }}>
                              {locale === "fr" ? moduleData.nameFr : moduleData.nameEn}
                            </span>
                          </div>
                          <ul className="space-y-1 ml-7">
                            {features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs">
                                <Check className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#BFD495' }} />
                                <span style={{ color: 'var(--on-surface-variant)' }}>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })
                  ) : (
                    // Sinon, afficher les modules sélectionnés avec détails
                    selectedModules.map(moduleId => {
                      const moduleData = AVAILABLE_MODULES.find(m => m.id === moduleId);
                      if (!moduleData) return null;
                      const Icon = ICON_MAP[moduleData.icon];
                      const features = locale === "fr" ? moduleData.featuresFr : moduleData.featuresEn;
                      return (
                        <div key={moduleId} className="pb-3 border-b last:border-b-0" style={{ borderColor: 'var(--outline)' }}>
                          <div className="flex items-center gap-2 mb-2">
                            {Icon && <Icon className="w-5 h-5" style={{ color: 'var(--on-surface)' }} />}
                            <span className="font-bold text-sm" style={{ color: 'var(--on-surface)' }}>
                              {locale === "fr" ? moduleData.nameFr : moduleData.nameEn}
                            </span>
                          </div>
                          <ul className="space-y-1 ml-7">
                            {features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs">
                                <Check className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                                <span style={{ color: 'var(--on-surface-variant)' }}>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Résumé des gains */}
            <div className="rounded-xl p-4 border-2" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--on-surface)' }}>
                  {locale === "fr" ? "Vos gains estimés" : "Your estimated savings"}
                </h3>
                
                {/* Toggle Mois/Année pour les résultats */}
                {selectedModules.length > 0 && (
                  <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: 'var(--surface-variant)' }}>
                    <button
                      onClick={() => setPeriodView('month')}
                      className="px-3 py-1 rounded text-xs font-semibold transition-all duration-200"
                      style={{
                        backgroundColor: periodView === 'month' ? 'var(--secondary-container)' : 'transparent',
                        color: periodView === 'month' ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)'
                      }}
                    >
                      {locale === "fr" ? "Mois" : "Month"}
                    </button>
                    <button
                      onClick={() => setPeriodView('year')}
                      className="px-3 py-1 rounded text-xs font-semibold transition-all duration-200"
                      style={{
                        backgroundColor: periodView === 'year' ? 'var(--secondary-container)' : 'transparent',
                        color: periodView === 'year' ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)'
                      }}
                    >
                      {locale === "fr" ? "Année" : "Year"}
                    </button>
                  </div>
                )}
              </div>
              
              {selectedModules.length === 0 ? (
                <p className="text-center py-6 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  {locale === "fr" 
                    ? "Sélectionnez des modules pour voir vos gains estimés"
                    : "Select modules to see your estimated savings"
                  }
                </p>
              ) : (
                <div className="space-y-3">
                  {/* Détails du calcul - EN PREMIER */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium mb-3" style={{ color: 'var(--on-surface-variant)' }}>
                      {locale === "fr" ? "Détail du calcul :" : "Calculation details:"}
                    </p>
                    
                    {/* Gains totaux (inclut les tâches manuelles mais ne les affiche pas séparément) */}
                    <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: 'var(--surface-variant)' }}>
                      <span className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                        {locale === "fr" ? "Gains totaux" : "Total savings"}
                      </span>
                      <span className="text-base font-bold" style={{ color: 'var(--on-surface)' }}>
                        + {formatCurrency(
                          periodView === 'month' 
                            ? (roiResult.monthlyMoneySavings + roiResult.monthlyTimeSavings * hourlyCost + roiResult.manualTasksValueSaved / 12)
                            : (roiResult.yearlyMoneySavings + roiResult.timeSavingsValue + roiResult.manualTasksValueSaved), 
                          locale
                        )}
                      </span>
                    </div>

                    {/* Coût */}
                    <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: 'var(--surface-variant)' }}>
                      <span className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                        {locale === "fr" ? "Coût Octogone" : "Octogone cost"}
                      </span>
                      <span className="text-base font-bold" style={{ color: 'var(--on-surface)' }}>
                        - {formatCurrency(periodView === 'month' ? roiResult.monthlySubscriptionCost : roiResult.yearlySubscriptionCost, locale)}
                      </span>
                    </div>

                    {/* Ligne séparatrice */}
                    <div className="border-t-2 my-2" style={{ borderColor: 'var(--outline)' }}></div>
                  </div>

                  {/* RÉSULTATS FINAUX - EN DERNIER */}
                  <div className="space-y-3 pt-4">
                    <p className="text-sm font-bold" style={{ color: 'var(--on-surface)' }}>
                      {locale === "fr" ? "Vos résultats :" : "Your results:"}
                    </p>

                    {/* ROI et Gains nets - Côte à côte */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* ROI % */}
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--secondary-container)' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                               style={{ backgroundColor: 'var(--surface)' }}>
                            <TrendingUp className="w-4 h-4" style={{ color: 'var(--inverse-surface)' }} />
                          </div>
                          <p className="text-xs font-medium" style={{ color: 'var(--on-secondary-container)' }}>
                            {locale === "fr" ? "ROI" : "ROI"}
                          </p>
                        </div>
                        <p className="text-3xl font-bold mb-1" style={{ color: 'var(--on-secondary-container)' }}>
                          {Math.round(roiResult.roiPercentage)}%
                        </p>
                        <p className="text-xs" style={{ color: 'var(--on-secondary-container)', opacity: 0.8 }}>
                          {locale === "fr" ? "Rentabilisé en " : "Payback in "}
                          {Math.ceil(roiResult.paybackPeriodMonths)}
                          {locale === "fr" ? " mois" : " months"}
                        </p>
                      </div>

                      {/* Gains nets */}
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--secondary-container)' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                               style={{ backgroundColor: 'var(--surface)' }}>
                            <DollarSign className="w-4 h-4" style={{ color: 'var(--inverse-surface)' }} />
                          </div>
                          <p className="text-xs font-medium" style={{ color: 'var(--on-secondary-container)' }}>
                            {locale === "fr" ? "Gains nets" : "Net profit"}
                          </p>
                        </div>
                        <p className="text-3xl font-bold mb-1" style={{ color: 'var(--on-secondary-container)' }}>
                          {formatCurrency(periodView === 'month' ? roiResult.netYearlySavings / 12 : roiResult.netYearlySavings, locale).replace(/\s/g, '')}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--on-secondary-container)', opacity: 0.8 }}>
                          {locale === "fr" 
                            ? (periodView === 'month' ? "par mois" : "par année")
                            : (periodView === 'month' ? "per month" : "per year")
                          }
                        </p>
                      </div>
                    </div>

                    {/* Note frais de démarrage */}
                    <div className="flex items-start gap-2 p-2 rounded-lg" style={{ backgroundColor: 'var(--surface-variant)' }}>
                      <Info className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--on-surface-variant)' }} />
                      <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                        {locale === "fr" 
                          ? "Les frais de démarrage sont inclus dans ce calcul. Contactez-nous pour connaître les détails."
                          : "Setup fees are included in this calculation. Contact us for details."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            {selectedModules.length > 0 && (
              <div className="text-center pt-2">
                <OctogoneButton
                  href={`/${locale}/contact?message=${encodeURIComponent(
                    locale === "fr" 
                      ? `Bonjour,

Je suis intéressé par Octogone et j'ai utilisé votre calculateur ROI. Voici mes résultats :

RÉSULTATS DU CALCULATEUR ROI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre d'établissements : ${numberOfLocations}
Forfait sélectionné : ${selectedModules.includes('pro') ? 'PRO (tous les modules)' : selectedModules.map(id => {
  const moduleData = AVAILABLE_MODULES.find(m => m.id === id);
  return moduleData?.nameFr || id;
}).join(', ')}

RÉSULTATS FINANCIERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Coût mensuel : ${formatCurrency(roiResult.monthlySubscriptionCost, locale)}
• Gains nets annuels : ${formatCurrency(roiResult.netYearlySavings, locale)}
• ROI : ${Math.round(roiResult.roiPercentage)}%
• Période de retour : ${Math.ceil(roiResult.paybackPeriodMonths)} mois

ÉCONOMIES DE TEMPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Temps économisé par an : ${formatHours(roiResult.yearlyTimeSavings, locale)}
• Valeur du temps économisé : ${formatCurrency(roiResult.timeSavingsValue, locale)}

J'aimerais discuter de la mise en place d'Octogone pour mon/mes établissement(s).

Merci !`
                      : `Hello,

I'm interested in Octogone and used your ROI calculator. Here are my results:

ROI CALCULATOR RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Number of locations: ${numberOfLocations}
Selected plan: ${selectedModules.includes('pro') ? 'PRO (all modules)' : selectedModules.map(id => {
  const moduleData = AVAILABLE_MODULES.find(m => m.id === id);
  return moduleData?.nameEn || id;
}).join(', ')}

FINANCIAL RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Monthly cost: ${formatCurrency(roiResult.monthlySubscriptionCost, locale)}
• Net annual savings: ${formatCurrency(roiResult.netYearlySavings, locale)}
• ROI: ${Math.round(roiResult.roiPercentage)}%
• Payback period: ${Math.ceil(roiResult.paybackPeriodMonths)} months

TIME SAVINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Time saved per year: ${formatHours(roiResult.yearlyTimeSavings, locale)}
• Value of time saved: ${formatCurrency(roiResult.timeSavingsValue, locale)}

I would like to discuss implementing Octogone for my location(s).

Thank you!`
                  )}`}
                  variant="primary"
                  size="md"
                  onClick={() => {
                    // Fermer le popup si on est dans un modal
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('closeROIModal'));
                    }
                  }}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                >
                  {locale === "fr" ? "Discuter de mon projet" : "Discuss my project"}
                </OctogoneButton>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
