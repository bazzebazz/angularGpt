import { environment } from "environments/environment";

export const CreateThreadUseCase = async () => {
    try {
        const res = await fetch(`${environment.assistantApi}/create-thread`, {
            method: 'POST',
        });

        const {id   } = await res.json() as {id: string};

        return id;
    } catch (error) {
        throw new Error('Error al cread el thread');
    }
}