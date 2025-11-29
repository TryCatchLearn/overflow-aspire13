import {Question} from "@/lib/types";
import VotingButtons from "@/app/questions/[id]/VotingButtons";
import QuestionFooter from "@/app/questions/[id]/QuestionFooter";

export default function QuestionContent({question}: { question: Question }) {
    return (
        <div className='flex border-b pb-3 px-6'>
            <VotingButtons />
            <div className='flex flex-col'>
                <div
                    className='flex-1 mt-4 ml-6 prose max-w-none dark:prose-invert'
                    dangerouslySetInnerHTML={{__html: question.content}}
                />
                <QuestionFooter question={question} />
            </div>
            
        </div>
    );
}