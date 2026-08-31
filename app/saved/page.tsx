import type { Metadata } from "next";
import { SavedHomesList } from "@/components/saved-homes-list";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui";
import { listings } from "@/lib/homes";

export const metadata: Metadata = {
  title: "Saved homes",
  description: "The homes you have shortlisted, side by side.",
  robots: { index: false, follow: true },
};

export default function SavedPage() {
  return (
    <>
      <PageHero
        photoKey="page/saved"
        index="01"
        eyebrow="Your shortlist"
        title="Saved homes"
        lede="Kept in this browser only — nothing is sent anywhere. Bring the list with you and we'll open exactly these."
        kind="living"
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/saved", label: "Saved" },
        ]}
      />
      <Container className="py-20 sm:py-24">
        <SavedHomesList listings={listings} />
      </Container>
    </>
  );
}
