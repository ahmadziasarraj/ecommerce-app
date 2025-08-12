"use client";

import { Store } from '@/generated/prisma'
import { StoreFormSchema } from '@/lib/schemas'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ImageUploader from '../shared/image-uploader';
import { v4 } from 'uuid';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useModal } from '@/providers/modal-provider';
import { upsertStore } from '@/queries/store';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface StoreformProps {
    data?: Store,
    isModal?: boolean
}
const StoreForm: FC<StoreformProps> = ({ data, isModal= false }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof StoreFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(StoreFormSchema),
        defaultValues: {
            name: data?.name ?? '',
            description: data?.description ?? '',
            email: data?.email ?? '',
            phone: data?.phone ?? '',
            url: data?.url ?? '',
            logo: data?.logo ? [{ url: data.logo }] : [],
            cover: data?.cover ? [{ url: data.cover }] : [],
            isFeatured: data?.isFeatured ?? false,
        }
    });

    const isLoading = form.formState.isSubmitting;

    // Reset form values when data is changed.
    useEffect(() => {
        if (data) {
            form.reset({
                name: data.name,
                description: data.description,
                email: data.email,
                phone: data.phone,
                url: data.url,
                logo: [{ url: data.logo }],
                cover: [{ url: data.cover }],
                isFeatured: data.isFeatured,
            });
        }
    }, [data, form]);

    // Handle Form Submission.
    const onSubmit = async (values: z.infer<typeof StoreFormSchema>) => {

        try {
            // Upsert Store into database.
            const res = await upsertStore({
                id: data?.id ? data.id : v4(),
                name: values.name,
                email: values.email,
                description: values.description,
                phone: values.phone,
                url: values.url,
                logo: values.logo[0].url,
                cover: values.cover[0].url,
                isFeatured: values.isFeatured,

                updatedAt: new Date(),
                createdAt: new Date(),
            })

            // Show the sooner
            toast(data?.id ? `The Store with the name: ${data.name}` : 'Congratulations! New Store has been created.');

            if (data?.id) {
                router.refresh();
            } else {
                router.push(`/dashboard/seller/stores/${res.url}`);
            }

        } catch (error: any) {

            toast('Error', {
                description: error.toString(),
            });
            throw error;
        }

    }

    return (
        <AlertDialog>
            <Card>
                <CardHeader>
                    <CardTitle>Store Information</CardTitle>
                    <CardDescription>{data?.id ? `Update ${data.name} information.` : 'Lets create a Store. You can edit Store later from the Store page.'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='relative mb-32'>
                                <FormField
                                    control={form.control}
                                    name="cover"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormControl>
                                                <ImageUploader
                                                    onChange={(url) => field.onChange([{ url }])}
                                                    onRemove={(url) => {
                                                        field.onChange([...field.value.filter((current) => current.url !== url)])
                                                    }}
                                                    type='cover'
                                                    value={field.value.map((cover) => cover.url)}
                                                    disabled={isLoading}
                                                    btnText='Upload Cover'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="logo"
                                    render={({ field }) => (
                                        <FormItem className='absolute -bottom-20 left-5 md:left-32 z-10'>
                                            <FormControl>
                                                <ImageUploader
                                                    onChange={(url) => field.onChange([{ url }])}
                                                    onRemove={(url) => {
                                                        field.onChange([...field.value.filter((current) => current.url !== url)])
                                                    }}
                                                    type='profile'
                                                    value={field.value.map((cover) => cover.url)}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className={cn('w-full flex flex-col md:flex-row gap-2 my-2', {
                                'md:flex-col' : isModal
                            })}>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Store Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Store Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="url" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="phone #" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="description..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isFeatured"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="hover:bg-accent/50 my-2 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="grid gap-1.5 font-normal">
                                                <p className="text-sm leading-none font-medium">
                                                    Is Featured
                                                </p>
                                                <p className="text-muted-foreground text-sm">
                                                    This will appear on the Home page.
                                                </p>
                                            </div>
                                        </Label>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isLoading}>{
                                isLoading
                                    ? 'Loading...'
                                    : data?.id
                                        ? 'Update Store'
                                        : 'Create Store'
                            }</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </AlertDialog>
    )
}

export default StoreForm;