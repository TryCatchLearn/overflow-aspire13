'use client';

import React, {useEffect, useTransition} from 'react'
import {Form} from "@heroui/form";
import {Input} from "@heroui/input";
import {Select, SelectItem} from "@heroui/select";
import {useTagStore} from "@/lib/hooks/useTagStore";
import {Button} from "@heroui/button";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {QuestionSchema, questionSchema} from "@/lib/schemas/questionSchema";
import {postQuestion, updateQuestion} from "@/lib/actions/question-actions";
import {handleError} from "@/lib/util";
import {useRouter} from "next/navigation";
import {Question} from "@/lib/types";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import('@/components/rte/RichTextEditor'), {ssr: false});

type Props = {
    questionToUpdate?: Question
}

export default function QuestionForm({questionToUpdate}: Props) {
    const [pending, startTransition] = useTransition();
    const tags = useTagStore(state => state.tags);
    const router = useRouter();
    const { register, control, reset, handleSubmit, formState: {isSubmitting, isValid, errors} } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(questionSchema)
    });

    useEffect(() => {
        if (questionToUpdate) reset({
            ...questionToUpdate,
            tags: questionToUpdate.tagSlugs
        })
    }, [questionToUpdate, reset])

    const onSubmit = (data: QuestionSchema) => {
        startTransition(async () => {
            if (questionToUpdate) {
                const {error} = await updateQuestion(data, questionToUpdate.id);
                if (error) handleError(error);
                router.push(`/questions/${questionToUpdate.id}`);
            } else {
                const {data: question, error} = await postQuestion(data);
                if (error) handleError(error);
                if (question) router.push(`/questions/${question.id}`);
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} 
            className='flex flex-col gap-3 p-6 shadow-xl bg-white dark:bg-black' >
            <div className="flex flex-col gap-3 w-full">
                <h3 className='text-2xl font-semibold'>Title</h3>
                <Input
                    {...register('title')}
                    type="text"
                    className="w-full"
                    label="Be specific and imagine you’re asking a question to another person"
                    labelPlacement='outside-top'
                    placeholder="e.g how would you truncate text in Tailwind?"
                    isInvalid={!!errors?.title}
                    errorMessage={errors.title?.message}
                />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <h3 className='text-2xl font-semibold'>Body</h3>
                <Controller
                    name='content'
                    control={control}
                    render={({field: {onChange, onBlur, value}, fieldState}) => (
                        <>
                            <p className={`text-sm ${fieldState.error?.message && 'text-danger'}`}>
                                Include all the information someone would need to answer your question
                            </p>
                            <RichTextEditor
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value || ''}
                                errorMessage={fieldState.error?.message}
                            />
                            {fieldState.error?.message && (
                                <span className='text-xs text-danger -mt-1'>
                                    {fieldState.error.message}
                                </span>)}
                        </>
                    )}
                />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <h3 className='text-2xl font-semibold'>Tags</h3>
                <p className="text-sm">Add up to 5 tags to describe what your question is about</p>
                <Controller
                    name="tags"
                    control={control}
                    render={({field, fieldState}) => (
                        <Select
                            className="w-full"
                            label="Select 1-5 tags"
                            selectionMode='multiple'
                            selectedKeys={new Set(field.value ?? [])}
                            onBlur={field.onBlur}
                            isInvalid={fieldState.isTouched && fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                            onSelectionChange={(keys) => field.onChange(Array.from(keys))}
                        >
                            {tags.map((tag) => (
                                <SelectItem key={tag.id}>{tag.name}</SelectItem>
                            ))}
                        </Select>
                    )}
                />
            </div>

            <Button
                isDisabled={pending || !isValid}
                isLoading={isSubmitting || pending}
                color='primary'
                type='submit'
                className='w-fit'>
                {questionToUpdate ? 'Update' : 'Post'} your question
            </Button>
        </Form>
    )
}