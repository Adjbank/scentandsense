import { notFound } from "next/navigation";
import Link from "next/link";
import { PLANTS, getPlant } from "@/data/plants";
import { PlantDetail } from "@/components/PlantBits";

export function generateStaticParams() {
  return PLANTS.map((p) => ({ slug: p.slug }));
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plant = getPlant(slug);
  if (!plant) return {};
  return { title: `${plant.thaiName} · ${plant.englishName} (${plant.scientificName})`, description: plant.scent.th };
}

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plant = getPlant(slug);
  if (!plant) notFound();
  return (
    <div>
      <Link href="/plants" className="mb-4 inline-block text-sm text-forest underline">
        ← พืชหอม · Catalogue
      </Link>
      <PlantDetail plant={plant} />
    </div>
  );
}
