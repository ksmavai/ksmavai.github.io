import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "notes",
  };
}

export default async function Home() {
  redirect("/notes/about-me");
}