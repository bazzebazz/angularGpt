import type { TranslateResponse } from "@interfaces/index";
import { environment } from "environments/environment";

export const TranslateTextUseCase = async (prompt: string, lang: string) => {
    try {
        const res = await fetch(`${environment.backendApi}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, lang })
        });

        if(!res.ok) throw new Error('No se pudo realizar la traducción');

        const {message} = await res.json() as TranslateResponse;

        return {
            ok: true,
            message,
        }

    } catch (error) {
        console.log({error});
        return {
            ok: false,
            message: 'No se pudo realizar la traducción',
        }
    }
}