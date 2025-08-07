import { string, z } from 'zod'

// Category Form Schema

export const CategoryFormSchema = z.object({
    name: z.string({
        invalid_type_error: 'Category name must be a string',
        required_error: 'Category name is required'
    })
        .min(3, { message: 'Category name must be at least 2 characters long.' })
        .max(50, { message: 'Category name cannot exceed 50 characters.' })
        .regex(/^[a-zA-Z0-9\s]+$/, { message: 'Only letters, numbers and space are alowed.' }),
    image: z.object({
        url: z.string()
    }).array().length(1, {message:'please select an image'}),
    url: z.string({
        invalid_type_error: 'URL name must be a string',
        required_error: 'URL name is required'
    })
        .min(3, { message: 'URL name must be at least 2 characters long.' })
        .max(50, { message: 'URL name cannot exceed 50 characters.' })
        .regex(/^(?!.*(?:[-_]){2,})[a-zA-Z0-9./_-]+$/, { message: 'Only letters, numbers, hyphen and underscore are alowed.' }),
    isFeatured: z.boolean()
});


// Category Form Schema

export const SubCategoryFormSchema = z.object({
    name: z.string({
        invalid_type_error: 'SubCategory name must be a string',
        required_error: 'SubCategory name is required'
    })
        .min(3, { message: 'SubCategory name must be at least 2 characters long.' })
        .max(50, { message: 'SubCategory name cannot exceed 50 characters.' })
        .regex(/^[a-zA-Z0-9\s]+$/, { message: 'Only letters, numbers and space are alowed.' }),
    image: z.object({
        url: z.string()
    }).array().length(1, {message:'please select an image'}),
    url: z.string({
        invalid_type_error: 'URL name must be a string',
        required_error: 'URL name is required'
    })
        .min(3, { message: 'URL name must be at least 2 characters long.' })
        .max(50, { message: 'URL name cannot exceed 50 characters.' })
        .regex(/^(?!.*(?:[-_]){2,})[a-zA-Z0-9./_-]+$/, { message: 'Only letters, numbers, hyphen and underscore are alowed.' }),
    isFeatured: z.boolean(),
    categoryId: z.string()
});