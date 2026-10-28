import { lazy, Suspense } from "react";
import { PageShell } from "./components/PageShell";
import { useLenisScroll } from "./hooks/useLenisScroll";
import { useRevealSafetyNet } from "./hooks/useRevealSafetyNet";
import { ScrollGate } from "./components/ScrollGate";
import { MusicProvider } from "./components/MusicProvider";
import { MusicToggle } from "./components/MusicToggle";
import { InvitationSection } from "./sections/InvitationSection";

// Lazy-load below-the-fold sections for instant initial load and minimal initial JS
const NamesSection = lazy(() =>
  import("./sections/NamesSection").then((m) => ({ default: m.NamesSection }))
);
const DateTimeSection = lazy(() =>
  import("./sections/DateTimeSection").then((m) => ({ default: m.DateTimeSection }))
);
const CountdownSection = lazy(() =>
  import("./sections/CountdownSection").then((m) => ({ default: m.CountdownSection }))
);
const VenueSection = lazy(() =>
  import("./sections/VenueSection").then((m) => ({ default: m.VenueSection }))
);
const DressCodeSection = lazy(() =>
  import("./sections/DressCodeSection").then((m) => ({ default: m.DressCodeSection }))
);
const ClosingSection = lazy(() =>
  import("./sections/ClosingSection").then((m) => ({ default: m.ClosingSection }))
);

function SectionFallback() {
  return (
    <div className="w-full py-16 flex items-center justify-center opacity-40">
      <div className="w-6 h-6 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function InvitationContent() {
  // Enable Lenis smooth scroll and its GSAP ScrollTrigger sync
  useLenisScroll();
  // Enable reveal safety net for all sections
  useRevealSafetyNet();

  return (
    <>
      {/* Floating music toggle */}
      <MusicToggle />

      {/* Main Invitation Page Shell */}
      <PageShell>
        {/* 1. Scroll-driven Gate holding pinned stage and revealing Hero (Blush band) */}
        <ScrollGate />

        {/* 2. Invitation Section (Deeper blush band with top rose-gold diamond divider) */}
        <InvitationSection />

        {/* 3. Names Section (Blush band with top rose-gold diamond divider) */}
        <Suspense fallback={<SectionFallback />}>
          <NamesSection />
        </Suspense>

        {/* 4. Date & Time Section (Deeper blush band with top rose-gold diamond divider) */}
        <Suspense fallback={<SectionFallback />}>
          <DateTimeSection />
        </Suspense>

        {/* 5. Countdown Anticipation Section (Blush band with top rose-gold diamond divider) */}
        <Suspense fallback={<SectionFallback />}>
          <CountdownSection />
        </Suspense>

        {/* 6. Venue Section (Deeper blush band with top rose-gold diamond divider) */}
        <Suspense fallback={<SectionFallback />}>
          <VenueSection />
        </Suspense>

        {/* 7. Dress Code Section */}
        <Suspense fallback={<SectionFallback />}>
          <DressCodeSection />
        </Suspense>

        {/* 8. Closing Section (Blush band with top rose-gold diamond divider) */}
        <Suspense fallback={<SectionFallback />}>
          <ClosingSection />
        </Suspense>
      </PageShell>
    </>
  );
}

export function App() {
  return (
    <MusicProvider>
      <InvitationContent />
    </MusicProvider>
  );
}

export default App;
