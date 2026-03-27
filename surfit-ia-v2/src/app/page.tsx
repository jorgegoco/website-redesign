import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { Adventure } from "@/components/sections/adventure";
import { SurfSpots } from "@/components/sections/surf-spots";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeaturesGrid />
        <Adventure />
        <SurfSpots />
      </main>
      <SiteFooter />
    </>
  );
}
