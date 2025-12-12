import {Question} from "@/lib/types";
import VotingButtons from "@/app/questions/[id]/VotingButtons";
import QuestionFooter from "@/app/questions/[id]/QuestionFooter";
import {getCurrentUser} from "@/lib/actions/auth-actions";

export default async function QuestionContent({question}: { question: Question }) {
    const currentUser = await getCurrentUser(); 
    return (
        <div className='flex border-b pb-3 px-6'>
            <VotingButtons 
                target={question}
                askerId={question?.askerId}
                currentUserId={currentUser.id}
            />
            <div className='flex flex-col w-full'>
                <div
                    className='flex-1 mt-4 ml-6 prose max-w-none dark:prose-invert'
                    dangerouslySetInnerHTML={{__html: question.content}}
                />
                <QuestionFooter question={question} />
            </div>
            
        </div>
    );
}