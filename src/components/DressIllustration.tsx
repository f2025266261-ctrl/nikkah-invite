import React from "react";

/**
 * Elegant Faceless SVG Figures:
 * About 8.5 heads tall, graceful proportions, light soft pastel colours,
 * 1px rose-gold accents, no facial features.
 */

export const BrideIllustration: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => {
  return (
    <svg
      viewBox="0 0 160 360"
      className={`${className} overflow-visible`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Faceless illustration of bride in pastel lehenga"
    >
      <defs>
        <linearGradient id="brideSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9ECE2" />
          <stop offset="100%" stopColor="#F2DACB" />
        </linearGradient>
        <linearGradient id="brideHairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3E2723" />
          <stop offset="100%" stopColor="#251614" />
        </linearGradient>
        <linearGradient id="brideLehengaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF7F2" />
          <stop offset="40%" stopColor="#FBF0E8" />
          <stop offset="100%" stopColor="#F5D8D4" />
        </linearGradient>
        <linearGradient id="brideCholiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9F5" />
          <stop offset="100%" stopColor="#F8E5DE" />
        </linearGradient>
        <linearGradient id="brideDupattaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDF4ED" stopOpacity="0.88" />
          <stop offset="50%" stopColor="#F9E2DD" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#F3D1CC" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="roseGoldLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8998A" />
          <stop offset="50%" stopColor="#E8CFC0" />
          <stop offset="100%" stopColor="#C8998A" />
        </linearGradient>
      </defs>

      {/* Shadow under feet */}
      <ellipse cx="80" cy="354" rx="38" ry="4" fill="#7A4455" opacity="0.12" />

      {/* Hair Bun / Styling (Rear) */}
      <ellipse cx="80" cy="42" rx="13" ry="14" fill="url(#brideHairGrad)" />
      <path
        d="M 68 44 C 67 36, 73 30, 80 30 C 87 30, 93 36, 92 44 C 91 50, 87 53, 80 53 C 73 53, 69 50, 68 44 Z"
        fill="url(#brideHairGrad)"
      />

      {/* Head / Face: Smooth faceless silhouette */}
      <path
        d="M 72 38 C 72 31, 88 31, 88 38 C 88 47, 85 55, 80 55 C 75 55, 72 47, 72 38 Z"
        fill="url(#brideSkinGrad)"
      />

      {/* Maang Tikka (Forehead Jewel & Hairline Chain) */}
      <line x1="80" y1="31" x2="80" y2="38" stroke="url(#roseGoldLine)" strokeWidth="0.8" />
      <circle cx="80" cy="38" r="1.5" fill="#C8998A" stroke="#FFF7F2" strokeWidth="0.4" />
      <circle cx="80" cy="40.2" r="0.8" fill="#E8CFC0" />

      {/* Jhumkas (Delicate hanging earrings) */}
      <g>
        {/* Left Jhumka */}
        <line x1="70" y1="46" x2="70" y2="48" stroke="#C8998A" strokeWidth="0.7" />
        <path d="M 68.5 49 C 68.5 48, 71.5 48, 71.5 49 L 72 51.5 L 68 51.5 Z" fill="#C8998A" />
        <circle cx="70" cy="53" r="0.6" fill="#E8CFC0" />
        
        {/* Right Jhumka */}
        <line x1="90" y1="46" x2="90" y2="48" stroke="#C8998A" strokeWidth="0.7" />
        <path d="M 88.5 49 C 88.5 48, 91.5 48, 91.5 49 L 92 51.5 L 88 51.5 Z" fill="#C8998A" />
        <circle cx="90" cy="53" r="0.6" fill="#E8CFC0" />
      </g>

      {/* Slender Neck & Shoulders */}
      <path
        d="M 77 53 L 77 64 L 64 68 C 60 70, 58 75, 59 80 L 61 112 C 61 116, 63 120, 67 120 L 70 120 L 69 86 L 75 84 L 75 110 L 85 110 L 85 84 L 91 86 L 90 120 L 93 120 C 97 120, 99 116, 99 112 L 101 80 C 102 75, 100 70, 96 68 L 83 64 L 83 53 Z"
        fill="url(#brideSkinGrad)"
      />

      {/* Royal Choker & Layered Necklace */}
      <path
        d="M 75 60 Q 80 63, 85 60"
        stroke="url(#roseGoldLine)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M 73 63 Q 80 68, 87 63"
        stroke="url(#roseGoldLine)"
        strokeWidth="0.8"
        strokeDasharray="1.2 1.2"
        fill="none"
      />
      <circle cx="80" cy="65.5" r="1" fill="#C8998A" />
      <circle cx="77" cy="64.5" r="0.7" fill="#C8998A" />
      <circle cx="83" cy="64.5" r="0.7" fill="#C8998A" />

      {/* Choli (Blouse) */}
      <path
        d="M 66 69 C 73 73, 87 73, 94 69 L 96 92 C 93 96, 88 98, 80 98 C 72 98, 67 96, 64 92 Z"
        fill="url(#brideCholiGrad)"
        stroke="url(#roseGoldLine)"
        strokeWidth="1"
      />
      {/* Neckline Rose-Gold Accent */}
      <path
        d="M 71 67 Q 80 75, 89 67"
        stroke="url(#roseGoldLine)"
        strokeWidth="1"
        fill="none"
      />
      {/* Waist Band */}
      <path
        d="M 64 94 Q 80 99, 96 94"
        stroke="url(#roseGoldLine)"
        strokeWidth="1"
        fill="none"
      />

      {/* Flared Lehenga Skirt (Graceful A-line Kalis) */}
      <path
        d="M 68 108 
           C 67 114, 52 180, 44 260 
           C 38 315, 36 345, 36 350
           C 48 354, 80 356, 124 350
           C 124 345, 122 315, 116 260
           C 108 180, 93 114, 92 108
           Q 80 113, 68 108 Z"
        fill="url(#brideLehengaGrad)"
        stroke="url(#roseGoldLine)"
        strokeWidth="1"
      />

      {/* Lehenga Pleats / Kali Seams (Fine 1px lines) */}
      <path
        d="M 74 110 C 72 170, 62 260, 58 352"
        stroke="#C8998A"
        strokeWidth="0.8"
        strokeOpacity="0.45"
      />
      <path
        d="M 80 112 C 80 170, 80 260, 80 354"
        stroke="#C8998A"
        strokeWidth="0.8"
        strokeOpacity="0.45"
      />
      <path
        d="M 86 110 C 88 170, 98 260, 102 352"
        stroke="#C8998A"
        strokeWidth="0.8"
        strokeOpacity="0.45"
      />

      {/* Lehenga Embroidered Border at Hem */}
      <path
        d="M 37 342 Q 80 348, 123 342"
        stroke="url(#roseGoldLine)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M 36 346 Q 80 352, 124 346"
        stroke="url(#roseGoldLine)"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        fill="none"
      />

      {/* Dupatta Drape: Soft translucent pastel veil cascading across shoulder */}
      <path
        d="M 68 40 C 65 34, 60 48, 56 68 C 50 96, 46 140, 48 180 C 50 215, 54 245, 56 268 C 57 268, 62 260, 64 240 C 66 215, 66 170, 68 128 L 74 80 L 78 68 Z"
        fill="url(#brideDupattaGrad)"
        stroke="url(#roseGoldLine)"
        strokeWidth="0.9"
      />
      <path
        d="M 78 68 C 84 76, 92 88, 98 108 C 104 130, 108 175, 114 235 C 117 268, 120 300, 122 315 C 120 315, 116 295, 112 260 C 108 215, 104 165, 96 122 C 90 92, 85 76, 80 68 Z"
        fill="url(#brideDupattaGrad)"
        stroke="url(#roseGoldLine)"
        strokeWidth="0.9"
      />

      {/* Delicate Bangle / Wrist Accents */}
      <ellipse cx="68" cy="118" rx="2.5" ry="1" fill="#C8998A" />
      <ellipse cx="92" cy="118" rx="2.5" ry="1" fill="#C8998A" />
    </svg>
  );
};

export const GroomIllustration: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => {
  return (
    <svg
      viewBox="0 0 160 360"
      className={`${className} overflow-visible`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Faceless illustration of groom in cream sherwani"
    >
      <defs>
        <linearGradient id="groomSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9ECE2" />
          <stop offset="100%" stopColor="#ECCFBD" />
        </linearGradient>
        <linearGradient id="groomSherwaniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="45%" stopColor="#FAF4EB" />
          <stop offset="100%" stopColor="#F3E9DA" />
        </linearGradient>
        <linearGradient id="groomStoleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCEFE3" />
          <stop offset="50%" stopColor="#F6DEC9" />
          <stop offset="100%" stopColor="#ECC8AC" />
        </linearGradient>
        <linearGradient id="groomKullaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAF1E6" />
          <stop offset="60%" stopColor="#F0DCC8" />
          <stop offset="100%" stopColor="#E2C4A7" />
        </linearGradient>
        <linearGradient id="groomPyjamaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAF5EE" />
          <stop offset="100%" stopColor="#ECE3D4" />
        </linearGradient>
        <linearGradient id="groomGoldLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8998A" />
          <stop offset="50%" stopColor="#E8CFC0" />
          <stop offset="100%" stopColor="#C8998A" />
        </linearGradient>
      </defs>

      {/* Shadow under feet */}
      <ellipse cx="80" cy="354" rx="34" ry="4" fill="#7A4455" opacity="0.12" />

      {/* Groom Kulla / Turban */}
      <path
        d="M 66 38 C 66 26, 74 20, 80 18 C 86 20, 94 26, 94 38 C 94 44, 88 47, 80 47 C 72 47, 66 44, 66 38 Z"
        fill="url(#groomKullaGrad)"
        stroke="url(#groomGoldLine)"
        strokeWidth="1"
      />
      {/* Turban Folds / Swirl */}
      <path
        d="M 68 34 Q 80 40, 92 32"
        stroke="url(#groomGoldLine)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M 70 28 Q 80 34, 90 26"
        stroke="url(#groomGoldLine)"
        strokeWidth="0.8"
        fill="none"
      />
      {/* Kalgi / Crest Jewel on Kulla */}
      <path
        d="M 80 12 L 82 17 L 80 19 L 78 17 Z"
        fill="#C8998A"
      />
      <path
        d="M 80 12 Q 78 6, 75 4"
        stroke="#C8998A"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* Head / Jawline: Smooth faceless silhouette */}
      <path
        d="M 72 42 C 72 41, 88 41, 88 42 C 88 51, 85 58, 80 58 C 75 58, 72 51, 72 42 Z"
        fill="url(#groomSkinGrad)"
      />

      {/* Slender Upright Neck */}
      <path
        d="M 76 56 L 76 66 L 84 66 L 84 56 Z"
        fill="url(#groomSkinGrad)"
      />

      {/* Churidar Trousers (Legs) */}
      <path
        d="M 70 250 L 67 340 L 73 342 L 77 250 Z"
        fill="url(#groomPyjamaGrad)"
        stroke="url(#groomGoldLine)"
        strokeWidth="0.7"
      />
      <path
        d="M 90 250 L 93 340 L 87 342 L 83 250 Z"
        fill="url(#groomPyjamaGrad)"
        stroke="url(#groomGoldLine)"
        strokeWidth="0.7"
      />

      {/* Churidar Gathers (Folds at ankles) */}
      <path d="M 68 318 Q 71 321, 73 318" stroke="#C8998A" strokeWidth="0.7" fill="none" opacity="0.6" />
      <path d="M 68 326 Q 71 329, 73 326" stroke="#C8998A" strokeWidth="0.7" fill="none" opacity="0.6" />
      <path d="M 87 318 Q 89 321, 92 318" stroke="#C8998A" strokeWidth="0.7" fill="none" opacity="0.6" />
      <path d="M 87 326 Q 89 329, 92 326" stroke="#C8998A" strokeWidth="0.7" fill="none" opacity="0.6" />

      {/* Traditional Jutti Shoes */}
      <path
        d="M 67 340 C 65 344, 63 349, 69 350 C 74 350, 75 345, 73 340 Z"
        fill="#C8998A"
      />
      <path
        d="M 93 340 C 95 344, 97 349, 91 350 C 86 350, 85 345, 87 340 Z"
        fill="#C8998A"
      />

      {/* Sherwani Body (Structured Royal Coat) */}
      <path
        d="M 64 68 
           L 57 74 C 55 80, 56 120, 58 136 C 59 140, 61 142, 65 142 L 67 142 L 66 100 L 68 96
           L 66 200 L 65 258 
           C 74 260, 86 260, 95 258 
           L 94 200 L 92 96 L 94 100 L 93 142 L 95 142 C 99 142, 101 140, 102 136 C 104 120, 105 80, 103 74 
           L 96 68 
           Z"
        fill="url(#groomSherwaniGrad)"
        stroke="url(#groomGoldLine)"
        strokeWidth="1"
      />

      {/* Mandarin Collar (Bandhgala) */}
      <path
        d="M 74 65 C 74 63, 86 63, 86 65 L 87 72 L 73 72 Z"
        fill="url(#groomSherwaniGrad)"
        stroke="url(#groomGoldLine)"
        strokeWidth="1"
      />

      {/* Sherwani Tone-on-Tone Embroidery Details */}
      <path
        d="M 68 84 Q 72 82, 75 86 Q 73 89, 70 88"
        stroke="#C8998A"
        strokeWidth="0.6"
        strokeOpacity="0.45"
        fill="none"
      />
      <path
        d="M 68 100 Q 72 98, 75 102 Q 73 105, 70 104"
        stroke="#C8998A"
        strokeWidth="0.6"
        strokeOpacity="0.45"
        fill="none"
      />
      <path
        d="M 85 86 Q 88 82, 92 84 Q 90 88, 87 89"
        stroke="#C8998A"
        strokeWidth="0.6"
        strokeOpacity="0.45"
        fill="none"
      />
      <path
        d="M 85 102 Q 88 98, 92 100 Q 90 104, 87 105"
        stroke="#C8998A"
        strokeWidth="0.6"
        strokeOpacity="0.45"
        fill="none"
      />
      {/* Hem border embroidery */}
      <path
        d="M 66 250 Q 80 252, 95 250"
        stroke="url(#groomGoldLine)"
        strokeWidth="0.9"
        fill="none"
      />
      <path
        d="M 66 254 Q 80 256, 95 254"
        stroke="url(#groomGoldLine)"
        strokeWidth="0.6"
        strokeDasharray="2 1.5"
        fill="none"
      />

      {/* Center Placket & Fine Rose-Gold Buttons */}
      <line x1="80" y1="72" x2="80" y2="210" stroke="url(#groomGoldLine)" strokeWidth="1" />
      <circle cx="80" cy="80" r="1.4" fill="#C8998A" />
      <circle cx="80" cy="92" r="1.4" fill="#C8998A" />
      <circle cx="80" cy="104" r="1.4" fill="#C8998A" />
      <circle cx="80" cy="116" r="1.4" fill="#C8998A" />
      <circle cx="80" cy="128" r="1.4" fill="#C8998A" />
      <circle cx="80" cy="140" r="1.4" fill="#C8998A" />
      <circle cx="80" cy="152" r="1.4" fill="#C8998A" />

      {/* Center Slit Below Waist */}
      <line x1="80" y1="210" x2="80" y2="258" stroke="url(#groomGoldLine)" strokeWidth="0.8" strokeDasharray="3 2" />

      {/* Champagne Doshala (Stole / Shawl) draped gracefully over left shoulder */}
      <path
        d="M 64 74 
           C 60 84, 59 110, 60 148 
           C 61 180, 62 215, 63 248 
           L 71 248 
           C 70 215, 69 180, 68 148 
           C 67 118, 68 96, 73 82 
           Z"
        fill="url(#groomStoleGrad)"
        stroke="url(#groomGoldLine)"
        strokeWidth="0.9"
      />
      {/* Stole Tassels / Fringe at Bottom */}
      <path
        d="M 63 248 L 63 254 M 65 248 L 65 254 M 67 248 L 67 254 M 69 248 L 69 254 M 71 248 L 71 254"
        stroke="#C8998A"
        strokeWidth="0.8"
      />

      {/* Right Hand / Cuff Accent */}
      <ellipse cx="94" cy="140" rx="2" ry="1.2" fill="#ECCFBD" />
      <line x1="91" y1="138" x2="95" y2="138" stroke="#C8998A" strokeWidth="0.8" />
    </svg>
  );
};
