"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from "react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(7, { message: "Invalid phone number." }),
    company_name: z.string().min(2, { message: "Company name is too short." }),
    website_url: z.string().url({ message: "Invalid URL." }).optional().or(z.literal("")),
    help: z.string().min(5, { message: "Please provide more details." }),
});

export default function ContactForm() {
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')
    const [loading, setLoading] = React.useState(false) // 👈 loading state

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: '',
            phone: '',
            company_name: '',
            website_url: '',
            help: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError('')
        setSuccess('')
        setLoading(true) // 👈 start loading
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                setSuccess("✅ Message sent successfully!");
                form.reset();
            } else {
                setError("Failed to send message. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false) // 👈 stop loading
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-sans">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Your Name</FormLabel>
                            <FormControl>
                                <Input className="border-0 border-b rounded-none " {...field} />
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
                            <FormLabel className="text-lg">Your Email</FormLabel>
                            <FormControl>
                                <Input className="border-0 border-b rounded-none " {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Your Phone</FormLabel>
                            <FormControl>
                                <Input className="border-0 border-b rounded-none " {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Company Name</FormLabel>
                            <FormControl>
                                <Input className="border-0 border-b rounded-none " {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="website_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Website URL (if available)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://website.com" className="border-0 border-b rounded-none " {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="help"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Please give a summary of how we can help?</FormLabel>
                            <FormControl>
                                <Textarea className="border-0 border-b rounded-none " {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && <p className="text-base font-sans font-semibold text-red-700 text-center">{error}</p>}

                <Button
                    className="w-full py-7 bg-[#B49C52] hover:bg-[#CFCFC6] text-[#CFCFC6] hover:text-[#B49C52] transition-all duration-200 ease-in font-bold text-lg rounded-none"
                    type="submit"
                    disabled={loading} // 👈 disable while loading
                >
                    {loading ? "Sending..." : "Submit"} {/* 👈 change text */}
                </Button>

                {success && <p className="text-base font-sans font-semibold text-green-700 text-center">{success}</p>}
            </form>
        </Form>
    )
}
