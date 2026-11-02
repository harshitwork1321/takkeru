/**
 * TAKKERU location configuration — single source of truth for FIND YOUR TAKKERU.
 *
 * Status values: 'open' | 'closed' | 'coming-soon' | 'unconfirmed'
 * Owner TODO (verify before publishing):
 *  - Satya Niketan: exact street address, current status, hours, verified map URL.
 *    (No verified address exists in this repository yet — leave `address` null
 *    and the UI will honestly omit it instead of inventing one.)
 *  - Dehradun / Nagpur: confirm operating status. Default 'coming-soon' is used
 *    until confirmed open.
 */
export const LOCATIONS = [
  {
    id: 'satya-niketan',
    name: 'TAKKERU — SATYA NIKETAN',
    city: 'Delhi, India',
    address: null,
    status: 'unconfirmed',
    hours: null,
    directionsUrl: null,
    video: null,
    poster: '/images/takkeru-cart.jpg',
    alt: 'The TAKKERU cart set up for street-side service',
    headline: 'TAKKERU IN DELHI',
    sub: 'Satya Niketan — full location details are being confirmed.',
  },
  {
    id: 'dehradun',
    name: 'TAKKERU — DEHRADUN',
    city: 'Dehradun, Uttarakhand, India',
    address: null,
    status: 'coming-soon',
    hours: null,
    directionsUrl: null,
    video: '/videos/dehradun.mp4',
    poster: '/media/posters/takkeru-dehradun.jpg',
    alt: 'TAKKERU boba tea pour — Dehradun location video',
    headline: 'TAKKERU IS COMING TO DEHRADUN',
    sub: 'Discover the TAKKERU experience.',
  },
  {
    id: 'nagpur',
    name: 'TAKKERU — NAGPUR',
    city: 'Nagpur, Maharashtra, India',
    address: null,
    status: 'coming-soon',
    hours: null,
    directionsUrl: null,
    video: '/videos/nagpur.mp4',
    poster: '/media/posters/takkeru-nagpur.jpg',
    alt: 'TAKKERU pink boba tea — Nagpur location video',
    headline: 'MEET TAKKERU NAGPUR',
    sub: 'Your next TAKKERU experience starts here.',
  },
];

export const STATUS_LABELS = {
  open: 'OPEN',
  closed: 'CLOSED',
  'coming-soon': 'COMING SOON',
  unconfirmed: 'DETAILS SOON',
};
