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
    }).array().length(1, { message: 'please select an image' }),
    url: z.string({
        invalid_type_error: 'URL name must be a string',
        required_error: 'URL name is required'
    })
        .min(3, { message: 'URL name must be at least 2 characters long.' })
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
    }).array().length(1, { message: 'please select an image' }),
    url: z.string({
        invalid_type_error: 'URL name must be a string',
        required_error: 'URL name is required'
    })
        .min(3, { message: 'URL name must be at least 2 characters long.' })
        .regex(/^(?!.*(?:[-_]){2,})[a-zA-Z0-9./_-]+$/, { message: 'Only letters, numbers, hyphen and underscore are alowed.' }),
    isFeatured: z.boolean(),
    categoryId: z.string()
});


// Store Form Schema
export const StoreFormSchema = z.object({
    name: z.string({
        invalid_type_error: 'SubCategory name must be a string',
        required_error: 'SubCategory name is required'
    })
        .min(3, { message: 'SubCategory name must be at least 2 characters long.' })
        .max(50, { message: 'SubCategory name cannot exceed 50 characters.' })
        .regex(/^[a-zA-Z0-9\s]+$/, { message: 'Only letters, numbers and space are alowed.' }),
    description: z.string({
        invalid_type_error: 'SubCategory description must be a string',
        required_error: 'SubCategory description is required'
    })
        .min(3, { message: 'SubCategory description must be at least 2 characters long.' }),
    email: z.string({
        required_error: 'email is required'
    }).email({
        message: 'please provide a valid email',
    }),
    phone: z.string({
        required_error: 'phone name is required'
    }).regex(/^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, { message: 'Please provide a valid phone number' }),
    logo: z.object({
        url: z.string()
    }).array().length(1, { message: 'please select a logo image' }),
    cover: z.object({
        url: z.string()
    }).array().length(1, { message: 'please select a cover image' }),
    url: z.string({
        invalid_type_error: 'URL name must be a string',
        required_error: 'URL name is required'
    })
        .min(3, { message: 'URL name must be at least 2 characters long.' })
        .regex(/^(?!.*(?:[-_]){2,})[a-zA-Z0-9./_-]+$/, { message: 'Only letters, numbers, hyphen and underscore are alowed.' }),
    isFeatured: z.boolean(),
});