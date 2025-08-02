"use client";

import { Category } from '@/generated/prisma'
import { CategoryFormSchema } from '@/lib/schemas'
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

interface CategoryformProps {
  data?: Category
}
const CategoryForm: FC<CategoryformProps> = ({ data }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: data?.name ?? '',
      image: data?.image ? [{ url: data.image }] : [],
      isFeatured: data?.isFeatured ?? false,
      url: data?.url ?? ''
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
        url: data.url
      });
    }
  }, [data, form]);

  // Handle Form Submission.
  const onSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {

    try {
      // Upsert Category into database.
      const res = await upsertCategory({
        id: data?.id ? data.id : v4(),
        name: values.name,
        isFeatured: values.isFeatured,
        url: values.url,
        image: values.image[0].url,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      // Show the sooner
      toast(data?.id ? `The Category with the name: ${data.name}` : 'Congratulations! New category has been created.');

      if (data?.id) {
        router.refresh();
      } else {
        router.push('/dashboard/admin/categories')
      }
    } catch (error: any) {

      toast('Error',{
        description: error.toString(),
      });
      throw error;
    }

  }

  return (
    <AlertDialog>
      <Card>
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
          <CardDescription>{data?.id ? `Update ${data.name} information.` : 'Lets create a category. You can edit category later from the category page.'}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
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
              <div className='w-full flex gap-2 my-2'>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Category Name" {...field} />
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
                    ? 'Update Category'
                    : 'Create Category'
              }</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  )
}

export default CategoryForm;