import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema } from "@/app/utils/zodSchemas";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countryList } from "@/app/utils/countriesList";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton, UploadDropzone } from "@/components/general/UploadThing";
import { create } from "domain";
import { createCompany } from "@/app/actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { XIcon } from "lucide-react";

export default  function CompanyForm() {
    const [pending, setPending] = useState(false);

    // Initialize the form
    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues:{
            name: "",
            location: "",
            about: "",
            logo: "",
            website: "",
            xAccount: ""
        }
    })

    
   // Handle form submission
    async function onSubmit(data: z.infer<typeof companySchema>){
        try{
            setPending(true);
            await createCompany(data);

        }catch(error){
            if(error instanceof Error && error.message !== 'NEXT_REDIRECT'){
                console.log("Error creating company: ", error.message);

            }
        }finally{
            setPending(false);
        }

    }
  return (
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                    <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="location"
              render={({field}) => (
                <FormItem>
                    <FormLabel>Company Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                            <FormControl className="w-full">
                                <SelectTrigger>
                                     <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Worldwide</SelectLabel>
                                    <SelectItem value="worldwide"><span>🌍</span><span>Worldwide / Remote</span></SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Location</SelectLabel>
                                      {countryList.map((country) => (
                                        <SelectItem key={country.code} value={country.name}>
                                            {/* <span >{country.flagEmoji}</span> */}
                                            <span >{country.name}</span>
                                        </SelectItem>
                                      ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    <FormMessage/>
                </FormItem>
              )}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              control={form.control}
              name="website"
              render={({field}) => (
                <FormItem>
                    <FormLabel>Website</FormLabel>
                        <FormControl>
                            <Input placeholder="https://...." {...field} />
                        </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />

             <FormField 
              control={form.control}
              name="xAccount"
              render={({field}) => (
                <FormItem>
                    <FormLabel>X (Twitter) Account</FormLabel>
                        <FormControl>
                            <Input placeholder="@yourCompany" {...field} />
                        </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />
        </div>


        <FormField 
              control={form.control}
              name="about"
              render={({field}) => (
                <FormItem>
                    <FormLabel>About</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Tell us about your company ..." {...field} />
                        </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />

             <FormField 
              control={form.control}
              name="logo"
              render={({field}) => (
                <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                        <FormControl>
                         <div>
                            { field.value ? (
                                <div className="relative w-fit">
                                <Image src={field.value} alt="Company Logo" width={100} height={100} className="rounded-md"/>

                                <Button type="button" variant="destructive" className="absolute -top-2 -right-2" onClick={() => field.onChange("")}>

                                    <XIcon className="size-2"/>
                                </Button>
                                </div>
                            ):(
                           <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                // console.log("Files: ", res);
                                if(res && res[0]){
                                    field.onChange(res[0].url)
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
                    <FormMessage/>
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