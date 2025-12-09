'use client';

import {editAnswer, postAnswer} from "@/lib/actions/question-actions";
import {answerSchema, AnswerSchema } from "@/lib/schemas/answerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {Controller, useForm} from "react-hook-form";
import {handleError} from "@/lib/util";
import {Button} from "@heroui/button";
import {useAnswerStore} from "@/lib/hooks/useAnswerStore";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import('@/components/rte/RichTextEditor'), {ssr: false});

type Props = {
    questionId: string;
}

export default function AnswerForm({questionId}: Props) {
    const [pending, startTransition] = useTransition();
    const editableAnswer = useAnswerStore(state => state.answer);
    const clearAnswer = useAnswerStore(state => state.clearAnswer);
    const {control, handleSubmit, reset, formState} = useForm<AnswerSchema>({
        mode: 'onTouched',
        resolver: zodResolver(answerSchema),
        values: {
            content: editableAnswer?.content
        }
    })

    const onSubmit = (data: AnswerSchema) => {
        startTransition(async () => {
            if (editableAnswer) {
                const {error} = await editAnswer(editableAnswer.id, editableAnswer.questionId, data);
                if (error) handleError(error);
                clearAnswer();
                reset();
            } else {
                const {error} = await postAnswer(data, questionId);
                if (error) handleError(error);
                reset();
            }
        })
    }

    return (
        <div id='answer-form' className='flex flex-col gap-3 items-start my-4 w-full px-6'>
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
                <div className='flex items-start gap-3 mb-6'>
                    <Button
                        isDisabled={!formState.isValid || pending}
                        isLoading={pending}
                        color='primary'
                        className='w-fit'
                        type='submit'
                    >
                        {editableAnswer ? 'Update' : 'Post'} your answer
                    </Button>
                    <Button
                        isDisabled={!editableAnswer}
                        onPress={() => {
                            clearAnswer();
                            reset();
                        }}
                        className='w-fit'
                        type='button'
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}