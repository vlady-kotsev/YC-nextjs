import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR, { id });
  return (
    <>
      {startups.length > 0 ? (
        startups.map((s: StartupCardType) => (
          <StartupCard key={s._id} post={s} />
        ))
      ) : (
        <p className="no-result">No startups created</p>
      )}
    </>
  );
};

export default UserStartups;
