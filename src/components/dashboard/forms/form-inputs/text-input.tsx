import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { FC } from 'react'

interface ZTextInputProps {
    type: string,
    fieldName: string
    formControl: any

}
export const ZTextInput: FC<ZTextInputProps> = ({ type, fieldName, formControl }) => {
    return (
        <FormField
            control={formControl}
            name={fieldName}
            render={({ field }) => (
                <FormItem className='w-full'>
                    <FormLabel>{fieldName}</FormLabel>
                    <FormControl>
                        {type === "textAria"
                            ? <Textarea placeholder={`${fieldName}...`} {...field} />
                            : <Input type={type} placeholder={`${fieldName}...`} {...field} />
                    }
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
