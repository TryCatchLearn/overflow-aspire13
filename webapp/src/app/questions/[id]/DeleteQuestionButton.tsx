'use client'
import {useRouter} from "next/navigation";
import {deleteQuestion} from "@/lib/actions/question-actions";
import {useTransition} from "react";
import {Button} from "@heroui/button";
import {handleError} from "@/lib/util";

type Props = {
    questionId: string;
}

export default function DeleteQuestionButton({ questionId }: Props) {
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = () => {
        startTransition(async () => {
            const {error} = await deleteQuestion(questionId);
            if (error) handleError(error);
            router.push('/questions');
        })
    }

    return (
        <Button
            color='danger'
            variant='faded'
            size='sm'
            isLoading={pending}
            onPress={handleDelete}
        >
            Delete
        </Button>
    );
}