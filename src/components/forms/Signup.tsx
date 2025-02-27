"use client";

import z from "zod";
import Link from "next/link";
import Image from "next/image";
import { Loader } from "../shared";
import { Button, Input } from "../ui";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { text_fields_register } from "@/src/constants";
import { SignupValidation } from "@/src/lib/validation";
import { SignupValues } from "@/src/lib/validation/defaultValues";
import useRegistration from "@/src/hook/queries/auth/useRegister";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const Signup = () => {
    const router = useRouter();
    const { mutate, isPending } = useRegistration();

    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: SignupValues,
    })

    const onSubmit = async (values: z.infer<typeof SignupValidation>) => {
        mutate({
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
        });
        toast.success("Your sign-up success");
        form.reset();
        router.replace('/');
    }

    return (
        <Form {...form}>
            <div className="flex-col sm:w-420">
                <div className="flex-center flex-col">
                    <Image src="/assets/images/logo.svg" alt="logo" width={200} height={200} />
                    <h2 className="h3-bold pt-5 md:h2-bold">Create a new account</h2>
                    <p className="text-light-3 small-medium md:base-regular">To use Snapgram, please enter your details</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full  mt-5">

                    {text_fields_register.map((item, i) => {
                        const { name, title, type } = item;

                        return (
                            <div key={i}>
                                <FormField
                                    control={form.control}
                                    name={name as "email" | "password"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{title}</FormLabel>
                                            <FormControl>
                                                <Input type={type} className="shad-input"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )
                    })}
                    <Button type="submit" className="shad_button_primary">
                        {isPending ? <div className="flex gap-2">
                            <Loader /> Loading...
                        </div> : "Sign up"}
                    </Button>

                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Already have an account? <Link href="/auth/login" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}
export default Signup;

