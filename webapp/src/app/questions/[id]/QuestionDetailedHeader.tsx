import {Question} from "@/lib/types";
import {Button} from "@heroui/button";
import {LinkComponent} from "@/components/LinkComponent";
import {fuzzyTimeAgo} from "@/lib/util";
import {getCurrentUser} from "@/lib/actions/auth-actions";
import DeleteQuestionButton from "@/app/questions/[id]/DeleteQuestionButton";

type Props = {
    question: Question;
}

export default async function QuestionDetailedHeader({question}: Props) {
    const currentUser = await getCurrentUser();
    
    return (
        <div className='flex flex-col w-full border-b gap-4 pb-4 px-6'>
            <div className='flex justify-between gap-4'>
                <div className='text-3xl font-semibold first-letter:uppercase'>{question.title}</div>
                <Button
                    as={LinkComponent}
                    href='/questions/ask'
                    className='w-[20%]'
                    color='secondary'
                >
                    Ask Question
                </Button>
            </div>
            
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-3'>
                        <span className='text-foreground/50'>Asked</span>
                        <span>{fuzzyTimeAgo(question.createdAt)}</span>
                    </div>
                    {question.updatedAt &&
                        <div className='flex items-center gap-3'>
                            <span className='text-foreground/50'>Modified</span>
                            <span>{fuzzyTimeAgo(question.updatedAt)}</span>
                        </div>}
                    <div className='flex items-center gap-3'>
                        <span className='text-foreground/50'>Viewed</span>
                        <span>{question.viewCount + 1} times</span>
                    </div>
                </div>

                {currentUser?.id === question.askerId &&
                <div className='flex items-center gap-3'>
                    <Button
                        as={LinkComponent}
                        href={`/questions/${question.id}/edit`}
                        size='sm'
                        variant='faded'
                        color='primary'
                    >
                        Edit
                    </Button>
                    <DeleteQuestionButton questionId={question.id} />

                </div>}
            </div>
            
            
        </div>
    )
}