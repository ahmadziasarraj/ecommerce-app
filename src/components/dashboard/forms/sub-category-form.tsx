"use client";

import { Category, SubCategory } from '@/generated/prisma'
import { SubCategoryFormSchema } from '@/lib/schemas'
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
import { upsertCategory } from '@/queries/category';
import { v4 } from 'uuid';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useModal } from '@/providers/modal-provider';
import { upsertSubCategory } from '@/queries/sub-category';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

interface SubCategoryformProps {
  data?: SubCategory,
  categories: Category[]
}
const SubCategoryForm: FC<SubCategoryformProps> = ({ data, categories }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SubCategoryFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SubCategoryFormSchema),
    defaultValues: {
      name: data?.name ?? '',
      image: data?.image ? [{ url: data.image }] : [],
      isFeatured: data?.isFeatured ?? false,
      url: data?.url ?? '',
      categoryId: data?.categoryId ?? ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  // Reset form values when data is changed.
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        image: [{ url: data.image }],
        isFeatured: data.isFeatured,
        url: data.url,
        categoryId: data.categoryId
      });
    }
  }, [data, form]);

  // Handle Form Submission.
  const onSubmit = async (values: z.infer<typeof SubCategoryFormSchema>) => {

    try {
      // Upsert Sub Category into database.
      const res = await upsertSubCategory({
        id: data?.id ? data.id : v4(),
        name: values.name,
        isFeatured: values.isFeatured,
        url: values.url,
        image: values.image[0].url,
        categoryId: values.categoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      // Show the sooner
      toast(data?.id ? `The sub-Category with the name: ${data.name}` : 'Congratulations! New sub-category has been created.');

      if (data?.id) {
        router.refresh();
      } else {
        router.push('/dashboard/admin/subCategories')
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
          <CardTitle>Sub-Category Information</CardTitle>
          <CardDescription>{data?.id ? `Update ${data.name} information.` : 'Lets create a sub-category. You can edit sub-category later from the sub-category page.'}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='w-full'>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormControl>
                        <ImageUploader
                          onChange={(url) => field.onChange([{ url }])}
                          onRemove={(url) => {
                            field.onChange([...field.value.filter((current) => current.url !== url)])
                          }}
                          type='profile'
                          value={field.value.map((image) => image.url)}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full md:flex items-center justify-between gap-2 my-2'>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Sub-Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Sub-Category Name" {...field} />
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
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className=" w-full">
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
              </div>
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
                    ? 'Update Sub-Category'
                    : 'Create Sub-Category'
              }</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  )
}

export default SubCategoryForm;