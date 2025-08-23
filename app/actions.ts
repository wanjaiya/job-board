"use server"

import z from "zod";
import { requireUser } from "./utils/reqiureUser"
import { companySchema, jobSeekerSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { de } from "zod/v4/locales";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
    shield({
        mode: "LIVE",
    })
).withRule(
   detectBot({
    mode: "LIVE",
    allow:[]
   })
)

export async function createCompany(data: z.infer<typeof companySchema>) {
    // Check if user is logged in
    const session = await requireUser();

    const req = await request();

    // If bot detected, block the request
    const ajRes = await aj.protect(req);

    if(ajRes.isDenied()){
        throw new Error("Forbidden");
    }

    

    // Server side validation here
     const validateData = companySchema.safeParse(data);

     await prisma.user.update({
         where: { id: session.id },
         data:{
            onboarded: true,
            userType: "COMPANY",
            Company: {
                create: {
                    ...validateData.success ? validateData.data : data
                }
            }
         }

     });

     return redirect('/')

}


export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {

    // Check if user is logged in
    const session = await requireUser();
    
      const req = await request();

    // If bot detected, block the request
    const ajRes = await aj.protect(req);

    if(ajRes.isDenied()){
        throw new Error("Forbidden");
    }
    // Server side validation here
     const validateData = jobSeekerSchema.safeParse(data);

     await prisma.user.update({
            where: { id: session.id },
            data:{
                onboarded: true,
                userType: "JOBSEEKER",
                JobSeeker: {
                    create: {
                        ...validateData.success ? validateData.data : data
                    }
                }
            }
     });

     return redirect('/')

     
}