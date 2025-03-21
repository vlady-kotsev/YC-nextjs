import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/view";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const startup = await client.fetch(STARTUP_BY_ID, { id });
  if (!startup) {
    return notFound();
  }
  const parsedContent = md.render(startup?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(startup?._createdAt)}</p>
        <h1 className="heading">{startup.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup.description}</p>
      </section>
      <section className="section_container">
        <img
          src={startup.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              className="flex gap-2 items-center mb-3"
              href={`/user/${startup.author?._id}`}
            >
              <Image
                src={startup.author?.image}
                alt="author-image"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{startup.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{startup.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{startup.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans brake-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />
      </section>
      <Suspense fallback={<Skeleton className="view-skeleton"/>}>
          <View id={id}/>
      </Suspense>
    </>
  );
};

export default Page;
