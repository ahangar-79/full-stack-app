import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();
  console.log(session)

  return (
    <div>
      <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={144} height={30} />
          </Link>

          <div className="flex items-center gap-5 text-black">
            {session && session?.user ? (
              <>
                <Link href="/startup/create">
                  <span>Create</span>
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button className="cursor-pointer" type="submit">
                    <span>Logout</span>
                  </button>
                </form>

                <Link href={`/user/${session?.user?.name}`}>
                  <span>{session?.user?.name}</span>
                </Link>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";

                  await signIn("github");
                }}
              >
                <button type="submit">Login</button>
              </form>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
