export const ENDPOINTS = {
  user: "/user",
  application: '/application',
  skill : '/skill',
  contact: '/contact',
  scraper: '/scraper/offer/extract',
  note: (applicationId: number) => `/application/${applicationId}/note`,
  todo: (applicationId: number) => `/application/${applicationId}/todo`,
  history: (applicationId: number) => `/application/${applicationId}/history`,
} as const;