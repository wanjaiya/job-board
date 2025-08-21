import Link from "next/link";
import Logo from "@/public/logo.png"
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";

export async function Navbar(){
    const session = await auth();
    return(
        <nav className="flex items-center justify-between py-5">
            <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Logo Jobify" width={40} height={40} />
            <h1 className="text-2xl font-bold">
                Jobify<span className="text-primary">Kenya</span>
                </h1>
            </Link>

            <div className="flex items-center gap-4">
             <ThemeToggle/>
              {session?.user ? (
                <form action={async () => {
                    "use server";
                    await signOut({redirectTo: "/"});
                }}>
                    <Button>Logout</Button>
                </form>
              ) : (

                <Link href="/login" className={buttonVariants({variant:'outline', size:'lg' })}>Login</Link>
              )}
            </div>
        </nav>
    )
}