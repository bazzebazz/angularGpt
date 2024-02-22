import type { OrthographyResponse } from "@interfaces/orthography.response";
import { environment } from "environments/environment";

export const OrthographyUseCase = async (prompt: string) => {
    try {
        const res = await fetch(`${environment.backendApi}/orthography-check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        });

        if(!res.ok) throw new Error('No se pudo realizar la correción');

        const data = await res.json() as OrthographyResponse;

        return {
            ok: true,
            ...data,
        }

    } catch (error) {
        console.log({error});
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: 'No se pudo realizar la corrección'
        }
    }
}