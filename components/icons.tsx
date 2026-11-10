// Icônes au trait (1,5 px, bouts arrondis), dessinées pour le site.
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const PhoneIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 4h3.2l1.6 4-2 1.3a10 10 0 0 0 6.9 6.9l1.3-2 4 1.6V19a1.8 1.8 0 0 1-1.9 1.8C10.4 20.3 3.7 13.6 3.2 5.9A1.8 1.8 0 0 1 5 4Z" />
  </svg>
);
export const ArrowIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 12h15M14 7l5 5-5 5" />
  </svg>
);
export const CloseIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const MenuIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const PinIcon = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);
export const StarIcon = ({ className = "size-3.5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="m12 3.2 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7Z" />
  </svg>
);
export const CameraIcon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.5-2h5.6l1.5 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" />
    <circle cx="12" cy="12.8" r="3.4" />
  </svg>
);

// Prestations
export const OilIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M3 10h4l2-2h5l6-2v3l-5 7H5a2 2 0 0 1-2-2Z" />
    <path d="M9 8V6M7.5 6h3M20.5 14.5c0 1-.7 1.8-1.5 1.8s-1.5-.8-1.5-1.8.8-2 1.5-3c.7 1 1.5 2 1.5 3Z" />
  </svg>
);
export const ClutchIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2.2" />
    <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M6 18l1.6-1.6M16.4 7.6 18 6" />
  </svg>
);
export const BrakeIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="10.5" cy="13" r="7.5" />
    <circle cx="10.5" cy="13" r="2" />
    <path d="M14 5.2c3 .8 5.4 3.3 6 6.4l-2.6.6a5.8 5.8 0 0 0-4.2-4.4Z" />
  </svg>
);
export const BeltIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="7" cy="7" r="3.5" />
    <circle cx="17" cy="16" r="4" />
    <circle cx="7" cy="7" r="0.8" />
    <circle cx="17" cy="16" r="0.8" />
    <path d="M4.2 9.1 14 19.4M9.6 4.6l10.5 8.5" />
  </svg>
);
export const DiagIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 16a8 8 0 1 1 16 0" />
    <path d="M12 16l4-5M3 19h18M7.2 10.6l1 .8M12 8v1.3M16.8 10.6l-1 .8" />
  </svg>
);
export const TyreIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 3.5v1.6M12 18.9v1.6M3.5 12h1.6M18.9 12h1.6M6 6l1.1 1.1M16.9 16.9 18 18M6 18l1.1-1.1M16.9 7.1 18 6" />
  </svg>
);

// Engagements
export const QuoteIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 3h8.5L19 7.5V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5M8.5 12.5h7M8.5 16h4" />
  </svg>
);
export const TagIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M3.5 12.6V4.5a1 1 0 0 1 1-1h8.1l8 8a1.4 1.4 0 0 1 0 2l-7.1 7.1a1.4 1.4 0 0 1-2 0Z" />
    <circle cx="8" cy="8" r="1.4" />
  </svg>
);
export const CarIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M3 16.5v-3.2c0-.9.6-1.6 1.4-1.8L6.5 11l2-3.6c.3-.6 1-.9 1.6-.9h4.2c.7 0 1.3.4 1.6 1l1.7 3.5 2.1.4c.8.2 1.3.9 1.3 1.7v3.4h-2" />
    <path d="M9.5 16.5h5M6.5 11h11" />
    <circle cx="7.5" cy="16.5" r="2" />
    <circle cx="16.5" cy="16.5" r="2" />
  </svg>
);
export const WrenchIcon = ({ className = "size-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M14.7 6.3a4 4 0 0 0 5.2 5.2L19 12.4l-1.4.3-8.2 8.2a2.1 2.1 0 0 1-3-3l8.2-8.2.3-1.4Z" />
    <path d="M14.7 6.3 17 4a4 4 0 0 1 3 3l-2.3 2.3" />
  </svg>
);
