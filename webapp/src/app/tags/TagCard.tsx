import React from 'react'
import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Tag} from "@/lib/types";
import {Chip} from "@heroui/chip";
import {LinkComponent} from "@/components/LinkComponent";

type Props = {
    tag: Tag;
}

export default function TagCard({ tag }: Props) {
    return (
        <Card as={LinkComponent} href={`/questions?tag=${tag.slug}`} className='card' isHoverable isPressable>
            <CardHeader>
                <Chip variant='bordered'>
                    {tag.slug}
                </Chip>
            </CardHeader>
            <CardBody>
                <p className='line-clamp-3'>{tag.description}</p>
            </CardBody>
            <CardFooter className='text-foreground/50'>
                42 questions
            </CardFooter>
        </Card>
    )
}