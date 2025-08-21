import { redirect } from "next/navigation";
import { GeneralSubmitButton } from "../general/SubmitButtons";
import GitHub from "../icons/github";
import Google from "../icons/google";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { auth, signIn } from "@/app/utils/auth"
import { RedirectType } from "next/navigation";

export async function LoginForm() {
    const session = await auth ();
    if (session?.user) {
        return redirect("/");
    }

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome Back</CardTitle>
                    <CardDescription>Login with your Google or Github account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <form action={async () => {
                            "use server"
                            await signIn("github",{
                                redirectTo: "/",
                            });

                        }}>
                            
                            <GeneralSubmitButton text="Login with Github" variant="outline" width="w-full" icon={<GitHub />}/>
                        </form>

                        <form >
                            <GeneralSubmitButton text="Login with Google" variant="outline" width="w-full" icon={<Google />}/>
                           
                        </form>

                    </div>
                </CardContent>
            </Card>

            <div className="text-center text-xs text-muted-foreground text-balance">
                By clicking continue, you are agree to our terms and privacy policy.
            </div>

        </div>
    )
}