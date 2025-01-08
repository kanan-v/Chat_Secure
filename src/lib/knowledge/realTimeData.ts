import { format } from 'date-fns';

export const getRealTimeInfo = () => ({
  currentTime: format(new Date(), 'PPpp'),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  
  // Add weather info placeholder - in production, this would connect to a weather API
  weather: {
    temperature: "23°C",
    condition: "Sunny",
    location: "Based on user location"
  }
});