"use client"

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormDefaultValues } from "@/hook/values";
import { FormValidation } from "@/hook/validation";
import { useRouter } from "next/router";
import CustomForm, { FormFieldEnum } from "../CustomForm";
import SubmitButton from "../SubmitButton";

const PatientForm = () => {
    // const router = useRouter();
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

            if (newUser) {
                // router.push(`/patients/${newUser.$id}/register`)
            }
        } catch (error) {
            console.log(error)
        }

        setIsLoading(false);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">Get started with appointments.</p>
                </section>

                <CustomForm
                    fieldType={FormFieldEnum.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="Somaya Adel"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                <CustomForm
                    fieldType={FormFieldEnum.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="somayaAdel@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />

                <CustomForm
                    fieldType={FormFieldEnum.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder="03 3358798"
                />
                <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm;
