import StartupForm from "@/app/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const Page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit your Startup idea</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default Page;
