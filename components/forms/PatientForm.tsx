"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormDefaultValues } from "@/hook/values";
import { FormValidation } from "@/hook/validation";
import { useRouter } from "next/router";
import { useState } from "react";

const PatientForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormValidation>>({
        resolver: zodResolver(FormValidation),
        defaultValues: FormDefaultValues,
    })

    const onSubmit = async (values: z.infer<typeof FormValidation>) => {
        setIsLoading(true);

        try {
            const user = {
                name: values.name,
                email: values.email,
                phone: values.phone,
            }

            // const newUser = await createUser(user);
            const newUser = user;

            if(newUser) {
                // router.push(`/patients/${newUser.$id}/register`)
            }
        } catch (error) {
            console.log(error)
        }

        setIsLoading(false);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default PatientForm
