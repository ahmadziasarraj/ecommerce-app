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

// Product Form Schema

export const ProductFormSchema = z.object({
    name: z.string({
        invalid_type_error: 'Product name must be a string',
        required_error: 'Product name is required'
    })
        .min(3, { message: 'Product name must be at least 2 characters long.' })
        .max(50, { message: 'Product name cannot exceed 50 characters.' })
        .regex(/^[a-zA-Z0-9\s]+$/, { message: 'Only letters, numbers and space are alowed.' }),
    description: z.string({
        invalid_type_error: 'Product description must be a string',
        required_error: 'Product description is required'
    }),
    brand: z.string({
        invalid_type_error: 'Brand must be a string',
        required_error: 'Brand is required'
    })
        .min(3, { message: 'Brand must be at least 2 characters long.' })
        .max(50, { message: 'Brand cannot exceed 50 characters.' })
        .regex(/^[a-zA-Z0-9\s]+$/, { message: 'Only letters, numbers and space are alowed.' }),
    categoryId: z.string(),
    subCategoryId: z.string(),


    variantName: z.string({
        invalid_type_error: 'Variant name must be a string',
        required_error: 'Variant name is required'
    }).min(3, { message: 'Variant name must be at least 2 characters long.' })
        .max(50, { message: 'Variant name cannot exceed 50 characters.' })
        .regex(/^[a-zA-Z0-9\s]+$/, { message: 'Only letters, numbers and space are alowed.' }),
    variantDescription: z.string({
        invalid_type_error: 'Variant description must be a string',
        required_error: 'Variant description is required'
    })
        .min(5, { message: 'Variant description must be at least 5 characters long.' })
        .max(500, { message: 'Variant description cannot exceed 500 characters.' }),
    images: z.object({ url: z.string() })
        .array()
        .min(3, { message: 'Please upload at least 3 images for product.' })
        .max(6, { message: 'Please upload less than 6 images for a product.' }),
    isSale: z.boolean().default(false),
    sku: z.string({
        invalid_type_error: 'SKU must be a string',
        required_error: 'SKU is required'
    })
        .min(3, { message: 'SKU must be at least 3 characters long.' })
        .max(50, { message: 'SKU cannot exceed 50 characters.' }),
    kewords: z.string({
        invalid_type_error: 'kewords must be a string',
        required_error: 'kewords is required'
    })
        .array()
        .min(3, { message: 'Please provide at least 3 keywords' })
        .max(20, { message: 'Please provide maximam 20 keywords.' }),


    colors: z.object({ color: z.string()})
        .array()
        .min(1, {message: 'Please provide at least 1 color.'})
        .refine((colors) => colors.every((col) => col.color.length > 0), {
            message: 'All Color inputs must be filled.'
        }),


    sizes: z.object({
        size: z.string(),
        quantity: z.number().min(1, {message: 'Quantity must be greater than 0.'}),
        price: z.number().min(0.01, {message: 'Price should be greater than 0.'}),
        discount: z.number().min(0).default(0)
    })
        .array()
        .min(1, {message: 'Please provide at least one size.'})
        .refine((sizes) => sizes.every((s) => s.quantity > 1 && s.price > 0.01 && s.size.length > 0), {
            message: 'All Size inputs must be filled correctly.'
        })

})