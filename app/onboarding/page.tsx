import { OnboardingForm } from "@/components/forms/onboarding/OnboardingForm";
import { requireUser } from "../utils/reqiureUser";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";


async function checkIfUserIsOnboarded(userId:string) {
 const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { onboarded: true },

 });

    if (user?.onboarded === true) {
      return redirect("/");
    }

    return user;

}

export default async function OnboardingPage() {
  const session = await requireUser();

  await checkIfUserIsOnboarded(session.id as string);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
        <OnboardingForm />
    </div>
  )
}