/**
 * Logo typographique d'Alliance Auto 80 (le garage n'a pas de logo dessiné connu) :
 * deux clés plates croisées au trait, prises dans un anneau (l'« alliance »), et « ALLIANCE AUTO 80 » en capitales.
 * Clés en couleur du texte (currentColor), anneau orange, sauf `mono`.
 * Pour le remplacer : changer ce composant, public/logo.svg et app/icon.svg (même dessin).
 */
export const WRENCH_A = "M40.42 11.63A5 5 0 1 1 36.37 7.58M31.96 16.04 16.04 31.96M11.63 40.42A5 5 0 1 1 7.58 36.37";
export const WRENCH_B = "M7.58 11.63A5 5 0 1 0 11.63 7.58M16.04 16.04 31.96 31.96M36.37 40.42A5 5 0 1 0 40.42 36.37";

export function Emblem({ className = "", mono = false, ringClass = "", aClass = "", bClass = "" }: { className?: string; mono?: boolean; ringClass?: string; aClass?: string; bClass?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="21.5" strokeWidth="2.4" stroke={mono ? "currentColor" : "var(--color-orange, #E07A1F)"} pathLength={1} className={ringClass} transform="rotate(-90 24 24)" />
      <g transform="translate(24 24) scale(0.74) translate(-24 -24)" strokeWidth="3">
        <path d={WRENCH_A} className={aClass} />
        <path d={WRENCH_B} className={bClass} />
      </g>
    </svg>
  );
}

export function Logo({ className = "", title, mono = false }: { className?: string; title?: string; mono?: boolean }) {
  return (
    <svg viewBox="0 0 336 48" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <circle cx="24" cy="24" r="21.5" fill="none" strokeWidth="2.4" stroke={mono ? "currentColor" : "var(--color-orange, #E07A1F)"} />
      <g transform="translate(24 24) scale(0.74) translate(-24 -24)" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d={WRENCH_A} />
        <path d={WRENCH_B} />
      </g>
      <text x="58" y="32.5" fill="currentColor" style={{ fontFamily: "var(--font-archivo), 'Arial Black', Arial, sans-serif", fontWeight: 800, fontStretch: "112%", fontSize: 23, letterSpacing: "0.02em" }}>
        ALLIANCE AUTO 80
      </text>
    </svg>
  );
}
