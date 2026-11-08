import { notFound } from "next/navigation";
import { SESSIONS, getSession } from "@/data/mindful";
import { SessionPlayer } from "@/components/SessionPlayer";

export function generateStaticParams() {
  return SESSIONS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = getSession(id);
  return s ? { title: `${s.title.th} · ${s.title.en}` } : {};
}

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getSession(id)) notFound();
  return <SessionPlayer id={id} />;
}
