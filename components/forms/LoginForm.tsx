import { redirect } from "next/navigation";
import { GeneralSubmitButton } from "../general/SubmitButtons";
import GitHub from "../icons/github";
import Google from "../icons/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { auth, signIn } from "@/app/utils/auth";
import Email from "../icons/email";
import {buttonVariants } from "../ui/button";
import Link from "next/link";


export async function LoginForm() {
  const session = await auth();
  if (session?.user) {
    return redirect("/");
  }
  return (
    <>
      <div className="flex flex-col gap-6" id="social-div">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>
              Login with your Google, Github or Email account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">

                <form
                action={async () => {
                  "use server";
                  await signIn("nodemailer");
                }}
              >
                <Input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full mb-4"
                />
                <GeneralSubmitButton
                  text="Sign in with Email"
                  variant="outline"
                  width="w-full"
                 icon={<Email />}
                />
              </form>
               
            <div className="text-center text-sm font-medium text-muted-foreground">
                Or 
              </div>

              <form
                action={async () => {
                  "use server";
                  await signIn("github", {
                    redirectTo: "/onboarding",
                  });
                }}
              >
                <GeneralSubmitButton
                  text="Login with Github"
                  variant="outline"
                  width="w-full"
                  icon={<GitHub />}
                />
              </form>

              <form
                action={async () => {
                  "use server";
                  await signIn("google", {
                    redirectTo: "/onboarding",
                  });
                }}
              >
                <GeneralSubmitButton
                  text="Login with Google"
                  variant="outline"
                  width="w-full"
                  icon={<Google />}
                />
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="text-center text-xs text-muted-foreground text-balance">
        By clicking continue, you are agree to our terms and privacy policy.
      </div>
    </>
  );
}
