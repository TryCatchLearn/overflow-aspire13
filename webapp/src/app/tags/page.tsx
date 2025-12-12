import React from 'react'
import {getTags} from "@/lib/actions/tag-actions";
import TagCard from "@/app/tags/TagCard";
import TagHeader from "@/app/tags/TagHeader";

type SearchParams = Promise<{sort?: string}>

export default async function TagsPage({searchParams}: {searchParams: SearchParams}) {
    const {sort} = await searchParams;
    
    const {data: tags, error} = await getTags(sort);

    if (error) throw error;

    return (
        <div className='w-full px-6'>
            <TagHeader />
            <div className='grid grid-cols-3 gap-4'>
                {tags?.map(tag => (
                    <TagCard key={tag.id} tag={tag}/>
                ))}
            </div>
        </div>
    )
}