/**
 * Utilitaires pour générer des dates dynamiques pour le dashboard
 */

/**
 * Génère les textes de période basés sur la date actuelle
 */
export function generatePeriodTexts(locale: 'fr' | 'en' = 'fr') {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-11
  const currentDay = now.getDate();
  
  const monthNames = {
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  
  const monthNamesCurrent = monthNames[locale][currentMonth];
  const monthNamesPrevious = monthNames[locale][currentMonth === 0 ? 11 : currentMonth - 1];
  
  // Jour
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const dayTexts = {
    current: locale === 'fr' 
      ? `${currentDay} ${monthNamesCurrent}`
      : `${monthNamesCurrent} ${currentDay}`,
    previous: locale === 'fr'
      ? `${yesterday.getDate()} ${monthNames[locale][yesterday.getMonth()]}`
      : `${monthNames[locale][yesterday.getMonth()]} ${yesterday.getDate()}`
  };
  
  // Semaine (derniers 7 jours)
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 6);
  
  const prevWeekStart = new Date(weekStart);
  prevWeekStart.setDate(prevWeekStart.getDate() - 7);
  const prevWeekEnd = new Date(weekStart);
  prevWeekEnd.setDate(prevWeekEnd.getDate() - 1);
  
  const weekTexts = {
    current: locale === 'fr'
      ? `${weekStart.getDate()}–${currentDay} ${monthNamesCurrent}`
      : `${monthNamesCurrent} ${weekStart.getDate()}–${currentDay}`,
    previous: locale === 'fr'
      ? `${prevWeekStart.getDate()}–${prevWeekEnd.getDate()} ${monthNames[locale][prevWeekStart.getMonth()]}`
      : `${monthNames[locale][prevWeekStart.getMonth()]} ${prevWeekStart.getDate()}–${prevWeekEnd.getDate()}`
  };
  
  // Mois
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  
  const monthTexts = {
    current: locale === 'fr'
      ? `1–${daysInMonth} ${monthNamesCurrent}`
      : `${monthNamesCurrent} 1–${daysInMonth}`,
    previous: locale === 'fr'
      ? `1–${daysInPrevMonth} ${monthNamesPrevious}`
      : `${monthNamesPrevious} 1–${daysInPrevMonth}`
  };
  
  // Personnalisé (30 derniers jours)
  const customStart = new Date(now);
  customStart.setDate(customStart.getDate() - 29);
  
  const prevCustomStart = new Date(customStart);
  prevCustomStart.setDate(prevCustomStart.getDate() - 30);
  const prevCustomEnd = new Date(customStart);
  prevCustomEnd.setDate(prevCustomEnd.getDate() - 1);
  
  const customTexts = {
    current: locale === 'fr'
      ? `${customStart.getDate()} ${monthNames[locale][customStart.getMonth()]}–${currentDay} ${monthNamesCurrent}`
      : `${monthNames[locale][customStart.getMonth()]} ${customStart.getDate()}–${monthNamesCurrent} ${currentDay}`,
    previous: locale === 'fr'
      ? `${prevCustomStart.getDate()} ${monthNames[locale][prevCustomStart.getMonth()]}–${prevCustomEnd.getDate()} ${monthNames[locale][prevCustomEnd.getMonth()]}`
      : `${monthNames[locale][prevCustomStart.getMonth()]} ${prevCustomStart.getDate()}–${monthNames[locale][prevCustomEnd.getMonth()]} ${prevCustomEnd.getDate()}`
  };
  
  return {
    day: dayTexts,
    week: weekTexts,
    month: monthTexts,
    custom: customTexts
  };
}
