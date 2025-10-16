import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Interface pour l'état global de l'application
interface AppState {
  // UI State
  isLoading: boolean
  isMobileMenuOpen: boolean
  currentLocale: string
  theme: 'light' | 'dark' | 'system'
  
  // User preferences
  cookiesAccepted: boolean
  
  // Actions
  setLoading: (loading: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  setLocale: (locale: string) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setCookiesAccepted: (accepted: boolean) => void
}

// Store principal de l'application
export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // État initial
      isLoading: false,
      isMobileMenuOpen: false,
      currentLocale: 'fr',
      theme: 'system',
      cookiesAccepted: false,
      
      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      setLocale: (locale) => set({ currentLocale: locale }),
      setTheme: (theme) => set({ theme }),
      setCookiesAccepted: (accepted) => set({ cookiesAccepted: accepted }),
    }),
    {
      name: 'octogone-app-store',
    }
  )
)

// Store pour les données du calculateur ROI
interface ROICalculatorState {
  establishments: number
  avgRevenue: number
  foodCostPercentage: number
  laborCostPercentage: number
  results: {
    currentFoodCost: number
    projectedSavings: number
    roiPercentage: number
    paybackMonths: number
  } | null
  
  // Actions
  setEstablishments: (count: number) => void
  setAvgRevenue: (revenue: number) => void
  setFoodCostPercentage: (percentage: number) => void
  setLaborCostPercentage: (percentage: number) => void
  calculateROI: () => void
  resetCalculator: () => void
}

export const useROIStore = create<ROICalculatorState>()(
  devtools(
    (set, get) => ({
      // État initial
      establishments: 1,
      avgRevenue: 50000,
      foodCostPercentage: 30,
      laborCostPercentage: 35,
      results: null,
      
      // Actions
      setEstablishments: (count) => set({ establishments: count }),
      setAvgRevenue: (revenue) => set({ avgRevenue: revenue }),
      setFoodCostPercentage: (percentage) => set({ foodCostPercentage: percentage }),
      setLaborCostPercentage: (percentage) => set({ laborCostPercentage: percentage }),
      
      calculateROI: () => {
        const state = get()
        const monthlyRevenue = state.avgRevenue * state.establishments
        const currentFoodCost = monthlyRevenue * (state.foodCostPercentage / 100)
        const projectedSavings = currentFoodCost * 0.15 // 15% d'économies estimées
        const annualSavings = projectedSavings * 12
        const octogoneCost = state.establishments * 299 * 12 // 299$/mois par établissement
        const roiPercentage = ((annualSavings - octogoneCost) / octogoneCost) * 100
        const paybackMonths = octogoneCost / projectedSavings
        
        set({
          results: {
            currentFoodCost,
            projectedSavings,
            roiPercentage,
            paybackMonths
          }
        })
      },
      
      resetCalculator: () => set({
        establishments: 1,
        avgRevenue: 50000,
        foodCostPercentage: 30,
        laborCostPercentage: 35,
        results: null
      })
    }),
    {
      name: 'octogone-roi-store',
    }
  )
)
