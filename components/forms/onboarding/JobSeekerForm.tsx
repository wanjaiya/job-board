import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSeekerSchema } from "@/app/utils/zodSchemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { UploadDropzone } from "@/components/general/UploadThing";
import { useState } from "react";
import { createJobSeeker } from "@/app/actions";
import  pdfImage  from "@/public/pdf.png"

export function JobSeekerForm() {
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: "",
      about: "",
      resume: "",
      linkedIn: "",
      portfolio: "",
      github: "",
    },
  });

    async function onSubmit(data: z.infer<typeof jobSeekerSchema>){
          try{
              setPending(true);
              await createJobSeeker(data);
  
          }catch(error){
              if(error instanceof Error && error.message !== 'NEXT_REDIRECT'){
                  console.log("Error creating job seeker: ", error.message);
  
              }
          }finally{
              setPending(false);
          }
      }


  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn profile</FormLabel>
                <FormControl>
                  <Input placeholder="LinkedIn Profile" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio</FormLabel>
                <FormControl>
                  <Input placeholder="https://" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Profile</FormLabel>
                <FormControl>
                  <Input placeholder="https://" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload resume (PDF)</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src={pdfImage}
                        alt="pdf resume"
                        width={100}
                        height={100}
                        className="rounded-md"
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        className="absolute -top-2 -right-2"
                        onClick={() => field.onChange("")}
                      >
                        <XIcon className="size-2" />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="resumeUploader"
                      onClientUploadComplete={(res) => {
                        // console.log("Files: ", res);
                        if (res && res[0]) {
                          field.onChange(res[0].url);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        console.log(`ERROR! ${error.message}`);
                      }}
                      className="ut-button:bg-primary ut-button:text-white ut-button:p-5 ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground ut-allowed-content:mb-2 ut-upload-icon:w-12 border-primary rounded-md"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Submitting..." : "Continue"}
            </Button>
      </form>
    </Form>
  );
}
