'use client';

import { postAnswer } from "@/lib/actions/question-actions";
import {answerSchema, AnswerSchema } from "@/lib/schemas/answerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {Controller, useForm} from "react-hook-form";
import {handleError} from "@/lib/util";
import RichTextEditor from "@/components/rte/RichTextEditor";
import {Button} from "@heroui/button";

type Props = {
    questionId: string;
}

export default function AnswerForm({questionId}: Props) {
    const [pending, startTransition] = useTransition();
    const {control, handleSubmit, reset, formState} = useForm<AnswerSchema>({
        mode: 'onTouched',
        resolver: zodResolver(answerSchema)
    })

    const onSubmit = (data: AnswerSchema) => {
        startTransition(async () => {
            const {error} = await postAnswer(data, questionId);
            if (error) handleError(error)
            reset();
        })
    }

    return (
        <div className='flex flex-col gap-3 items-start my-4 w-full px-6'>
            <div className='text-2xl'>Your answer</div>
            <form className='w-full flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='content'
                    control={control}
                    render={({field: {onChange, onBlur, value}, fieldState}) => (
                        <>
                            <p className={`text-sm ${fieldState.error?.message && 'text-danger'}`}>Include all the information someone would need to answer your question</p>
                            <RichTextEditor
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value || ''}
                                errorMessage={fieldState.error?.message}
                            />
                            {fieldState.error?.message && (
                                <span className='text-xs text-danger -mt-1'>{fieldState.error.message}</span>
                            )}
                        </>
                    )}
                />
                <Button
                    type='submit'
                    isDisabled={!formState.isValid || pending}
                    isLoading={pending || formState.isSubmitting}
                    color='primary'
                    className='w-fit'
                >
                    Post Your Answer
                </Button>
            </form>
        </div>
    );
}