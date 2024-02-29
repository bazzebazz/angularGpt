import { QuestionResponse } from "@interfaces/question.response";
import { environment } from "environments/environment";

export const PostQuestionUseCase = async (threadId: string, question: string) => {
    try {
        const res = await fetch(`${environment.assistantApi}/user-question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({threadId, question}),
        });

        const replies = await res.json() as QuestionResponse[];
        console.log({replies});

        return replies;

    } catch (error) {
        throw new Error('Error al cread el thread');
    }
}