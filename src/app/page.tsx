import { flavours } from "@/data/flavours";
import Navbar from "@/components/layout/Navbar";
import CanJourney from "@/components/journey/CanJourney";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Lineup from "@/components/sections/Lineup";

export default function HomePage() {
  const featured = flavours.find((flavour) => flavour.featured) ?? flavours[0];

  return (
    <>
      <Navbar />

      <main>
        <CanJourney flavour={featured}>
          <Hero />
          <Story />
          <Lineup flavours={flavours} featuredId={featured.id} />
        </CanJourney>
      </main>
    </>
  );
}
