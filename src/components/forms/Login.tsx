"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { Loader } from "../shared";
import { Button, Input } from "../ui";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import {useLogin} from "@/src/hook/queries";
import { text_fields } from "@/src/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation } from "@/src/lib/validation";
import { LoginValues } from "@/src/lib/validation/defaultValues";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const Login = () => { 
    const router = useRouter();
    const { mutate, isPending } = useLogin();


    const form = useForm<z.infer<typeof LoginValidation>>({
        resolver: zodResolver(LoginValidation),
        defaultValues: LoginValues,
    })

    const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
        mutate({
            email: values.email,
            password: values.password,
        },
        {
            onSuccess: () => {
                toast.success("Your login success");
                form.reset();
                router.replace('/');
            }
        });
    }

    return (
        <Form {...form}>
            <div className="flex-col sm:w-420">
                <div className="flex-center flex-col ">
                    <Image alt="logo" src="/assets/images/logo.svg" width={200} height={200} />
                    <h2 className="h3-bold pt-5 md:h2-bold">Create a new account</h2>
                    <p className="text-light-3 small-medium md:base-regular">To use Snapgram, please enter your details</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-5">

                    {text_fields.map((item, i) => {
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
                            <Loader />Loading... </div> : "Login"}
                    </Button>

                    <p className="text-small-regular text-light-2 text-center mt-2">
                        I don&#39;t have an account? <Link href="/auth/register" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default Login;


