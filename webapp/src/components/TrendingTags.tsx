import {getTrendingTags} from "@/lib/actions/tag-actions";
import {Chip} from "@heroui/chip";
import Link from "next/link";
import {handleError} from "@/lib/util";
import {LinkComponent} from "@/components/LinkComponent";

export default async function TrendingTags() {
    const {data: tags, error} = await getTrendingTags();
    
    return (
        <div className='bg-primary-50 p-6 rounded-2xl'>
            <h3 className='text-2xl text-secondary mb-5 text-center'>Trending tags this week</h3>
            <div className='grid grid-cols-2 px-6 gap-3'>
                {error ? (
                    <div>Unavailable</div>
                ) : (
                    <>
                        {tags && tags.map((tag) => (
                            <Chip
                                as={LinkComponent}
                                href={`/questions?tag=${tag.tag}`}
                                key={tag.tag}
                                variant='solid'
                                color='primary'
                            >
                                {tag.tag} ({tag.count})
                            </Chip>
                        ))}
                    </>
                )}
                
            </div>
        </div>
    );
}