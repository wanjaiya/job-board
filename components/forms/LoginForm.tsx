import GitHub from "../icons/github";
import Google from "../icons/google";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { signIn } from "@/app/utils/auth"

export function LoginForm() {
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
                            <Button className="w-full" variant="outline">
                                <GitHub className="size-4" />
                                Login with Github</Button>
                        </form>

                        <form >
                            <Button className="w-full" variant="outline">
                                <Google className="size-4" />
                                Login with Google</Button>
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