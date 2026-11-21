import type { MetadataRoute } from "next";
import { indexableAssets, learnDocs, blogPosts } from "@/lib/content";
import { categories } from "@/lib/data";
import { abs } from "@/lib/site";

const time = (d: { updated?: string; date: string }) =>
  new Date(d.updated ?? d.date);

const latest = (docs: { updated?: string; date: string }[]) =>
  docs.length ? new Date(Math.max(...docs.map((d) => +time(d)))) : undefined;

export default function sitemap(): MetadataRoute.Sitemap {
  // Only real dates: a lastmod that changes on every build gets ignored by Google.
  const latestEditorial = latest([...learnDocs, ...blogPosts]);
  const latestLearn = latest(learnDocs);
  const latestBlog = latest(blogPosts);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified: latestEditorial, changeFrequency: "daily", priority: 1 },
    { url: abs("/browse"), changeFrequency: "daily", priority: 0.9 },
    { url: abs("/learn"), lastModified: latestLearn, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/blog"), lastModified: latestBlog, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: abs("/submit"), changeFrequency: "monthly", priority: 0.5 },
    { url: abs("/advertise"), changeFrequency: "monthly", priority: 0.4 },
    { url: abs("/contact"), changeFrequency: "yearly", priority: 0.3 },
    { url: abs("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/cookies"), changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/disclosure"), changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/license-policy"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: abs(c.href),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const assetRoutes: MetadataRoute.Sitemap = indexableAssets.map((a) => ({
    url: abs(a.url),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const learnRoutes: MetadataRoute.Sitemap = learnDocs.map((d) => ({
    url: abs(d.url),
    lastModified: time(d),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((d) => ({
    url: abs(d.url),
    lastModified: time(d),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...assetRoutes,
    ...learnRoutes,
    ...blogRoutes,
  ];
}
