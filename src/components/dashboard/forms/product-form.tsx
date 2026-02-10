"use client";

import { Category, Product, SubCategory } from '@/generated/prisma'
import { ProductFormSchema } from '@/lib/schemas'
import React, { FC, useEffect, useState } from 'react'
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
import { upsertProduct } from '@/queries/product';
import { cn } from '@/lib/utils';
import { ZTextInput } from './form-inputs/text-input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDownIcon, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ProductWithVariantType } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ProductformProps {
    data?: ProductWithVariantType,
    isModal?: boolean,
    storeUrl: string,
    categories: Category[],
    subCategories: SubCategory[]
}
const ProductForm: FC<ProductformProps> = ({ data, isModal = false, storeUrl, categories, subCategories }) => {
    const router = useRouter();
    const [subCategoryes, setSubCategoryes] = useState<SubCategory[]>([]);

    const form = useForm<z.infer<typeof ProductFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: data?.name,
            description: data?.description,
            brand: data?.brand,
            categoryId: data?.categoryId,
            subCategoryId: data?.subCategoryId,
            variantName: data?.variantName,
            variantDescription: data?.variantDescription,
            isSale: data?.isSale,
            sku: data?.sku,
            kewords: data?.kewords,
            colors: data?.colors || [{ color: "" }],
            images: data?.images || [],
            sizes: data?.sizes
        }
    });

    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        form.setValue('subCategoryId', '');
        setSubCategoryes(subCategories.filter((subCat) => subCat.categoryId === form.watch().categoryId));
    }, [form.watch().categoryId]);

    // Reset form values when data is changed.
    useEffect(() => {
        if (data) {
            form.reset(data);
            // {
            //     name: data?.name,
            //     description: data?.description,
            //     brand: data?.brand,
            //     categoryId: data?.categoryId,
            //     subCategoryId: data?.subCategoryId,
            //     variantName: data?.variantName,
            //     variantDescription: data?.variantDescription,
            //     isSale: data?.isSale,
            //     sku: data?.sku,
            //     kewords: data?.kewords,
            //     colors: data?.colors || [{ color: "" }],
            //     images: data?.images || [],
            //     sizes: data?.sizes
            // }
        }
    }, [data, form]);

    // Handle Form Submission.
    const onSubmit = async (values: z.infer<typeof ProductFormSchema>) => {
        try {
            // Upsert Product into database.
            const res = await upsertProduct({
                id: data?.productId ? data.productId : v4(),
                name: values.name,
                description: values.description,
                brand: values.brand,
                storeId: storeUrl,
                categoryId: values.categoryId,
                subCategoryId: values.subCategoryId,

                updatedAt: new Date(),
                createdAt: new Date(),
            })

            // Show the sooner
            toast(data?.productId ? `The Product with the name: ${data.name} updated` : 'Congratulations! New Product has been created.');

            if (data?.productId) {
                router.refresh();
            } else {
                router.push(`/dashboard/seller/stores/${storeUrl}/products/`);
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
                    <CardTitle>Product Information</CardTitle>
                    <CardDescription>{data?.productId && data.variantId ? `Update ${data.name} information.` : 'Lets create a Product. You can edit Product later from the Product page.'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Collapsible defaultOpen={true} className="data-[state=open]:bg-muted rounded-md border">
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" className="group w-full">
                                        Product details
                                        <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="p-2.5 bg-card">
                                    <div className={cn('w-full flex flex-col md:flex-row gap-2 my-2', {
                                        'md:flex-col': isModal
                                    })}>
                                        <ZTextInput type='text' fieldName='name' formControl={form.control} />
                                        <ZTextInput type='text' fieldName='brand' formControl={form.control} />
                                    </div>
                                    <div className={cn('w-full flex flex-col md:flex-row gap-2 my-2', {
                                        'md:flex-col': isModal
                                    })}>
                                        <FormField
                                            control={form.control}
                                            name="categoryId"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel>Category</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? categories.find(
                                                                            (category) => category.id === field.value
                                                                        )?.name
                                                                        : "Select category"}
                                                                    <ChevronsUpDown className="opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className=" p-0">
                                                            <Command>
                                                                <CommandInput
                                                                    placeholder="Search categories..."
                                                                    className="h-9"
                                                                />
                                                                <CommandList>
                                                                    <CommandEmpty>No category found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {categories.map((category) => (
                                                                            <CommandItem
                                                                                value={category.id}
                                                                                key={category.id}
                                                                                onSelect={() => {
                                                                                    form.setValue("categoryId", category.id)
                                                                                }}
                                                                            >
                                                                                {category.name}
                                                                                <Check
                                                                                    className={cn(
                                                                                        "ml-auto",
                                                                                        category.id === field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {subCategoryes.length > 0 && <FormField
                                            control={form.control}
                                            name="subCategoryId"
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel>Sub Category</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? subCategoryes.find(
                                                                            (subCategory) => subCategory.id === field.value
                                                                        )?.name
                                                                        : "Select Sub Category"}
                                                                    <ChevronsUpDown className="opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className=" p-0">
                                                            <Command>
                                                                <CommandInput
                                                                    placeholder="Search sub-categories..."
                                                                    className="h-9"
                                                                />
                                                                <CommandList>
                                                                    <CommandEmpty>No sub-category found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {subCategoryes.map((subCategory) => (
                                                                            <CommandItem
                                                                                value={subCategory.id}
                                                                                key={subCategory.id}
                                                                                onSelect={() => {
                                                                                    form.setValue("subCategoryId", subCategory.id)
                                                                                }}
                                                                            >
                                                                                {subCategory.name}
                                                                                <Check
                                                                                    className={cn(
                                                                                        "ml-auto",
                                                                                        subCategory.id === field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />}

                                    </div>
                                    <ZTextInput type='textAria' fieldName='description' formControl={form.control} />
                                </CollapsibleContent>
                            </Collapsible>

                            <Separator className='my-7' />

                            <Collapsible className="data-[state=open]:bg-muted rounded-md border">
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" className="group w-full">
                                        Product details
                                        <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 text-sm bg-card">
                                    <div>
                                        This panel can be expanded or collapsed to reveal additional
                                        content.
                                    </div>
                                    <Button size="sm">Learn More</Button>
                                </CollapsibleContent>
                            </Collapsible>



                            <Button className='mt-4' type="submit" disabled={isLoading}>{
                                isLoading
                                    ? 'Loading...'
                                    : data?.id
                                        ? 'Update Product'
                                        : 'Create Product'
                            }</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </AlertDialog>
    )
}

export default ProductForm;