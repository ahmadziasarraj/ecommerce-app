import StoreForm from '@/components/dashboard/forms/store-form';
import { getStore } from '@/queries/store'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function StoreSettingsPage({ params }: { params: Promise<{ storeUrl: string }> }) {

    const {storeUrl} = await params;
    const storUrl = storeUrl.startsWith('/') ? storeUrl : `/${storeUrl}`;
    const store = await getStore(storUrl);
    
    if (!store) return redirect('/dashboard/seller/stores');

    return (
        <div>
            <StoreForm data={store} />
        </div>
    )
}
