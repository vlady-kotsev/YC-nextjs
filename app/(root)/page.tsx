import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();
  console.log(session);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your Startup, <br /> Connect with people{" "}
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit ideas, Vote on Pitches and Get Noticed in virtual competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts && posts.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard post={post} key={post?._id} />
            ))
          ) : (
            <p>No Startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
};
export default Home;
