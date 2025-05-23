'use client'

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileValidation } from "@/lib/validation";
import { Loader } from "@/components/shared";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ProfileUploader from "@/components/shared/ProfileUploader";
import { Button, Input, Textarea } from "@/components/ui";
import { useParams, useRouter } from 'next/navigation';
import { useGetProfile, usePutProfile } from "@/hook/queries";
import { useEffect } from "react";
import { toast } from 'react-toastify';


const UpdateUserForm = () => {
  const route = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const userIdPromise = id && Promise.resolve({ userId: id });
  const { data: profile } = useGetProfile(id)
  const { mutate, isPending } = usePutProfile()

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      bio: profile?.bio || "",
      name: profile?.name || '',
      email: profile?.email || '',
      username: profile?.username || '',
      imageUrl: profile?.imageUrl || '',
    },
  });

  const handleUpdate = async (values: z.infer<typeof ProfileValidation>) => {
    mutate({
      id: id,
      bio: values.bio,
      name: values.name,
      email: values.email,
      imageUrl: values?.imageUrl as string,
      username: values.username,
    });
    toast.success("Your updated profile success");
    route.replace(`/auth/profile/${id}`);
  }


  useEffect(() => {
    if (profile) {
      form.setValue("bio", profile.bio || "");
      form.setValue("name", profile.name || "");
      form.setValue("email", profile.email || "");
      form.setValue("imageUrl", profile.imageUrl || "");
      form.setValue("username", profile.username || "");
    }
  }, [profile, form]);
  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdate)}
        className="flex flex-col gap-7 w-full mt-4 max-w-5xl">

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex">
              <FormControl>
                <ProfileUploader field={field}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => route.replace("/")}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap">
            {isPending ? <Loader /> : "Update Profile"}

          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateUserForm;




{/* {user_fields.map(el => {
          const {name, label, type} = el;

          return (
            <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">{label}</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          )
        })} */}