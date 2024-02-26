import { environment } from "environments/environment";

export async function* ProsConsStreamUseCase (prompt: string, abortSignal: AbortSignal) {
    try {
        const res = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt}),
            signal: abortSignal,
        });

        if(!res.ok) throw new Error('No se pudo realizar la comparación');

        const reader = res.body?.getReader();
        if(!reader) {
            console.log('No se pudo generar el reader');
            throw new Error('No se pudo generar el reader');
        }

        const decoder = new TextDecoder();
        let text = '';

        while(true) {
            const  { value, done } = await reader.read();
            if(done) break;

            const decoderChunk = decoder.decode(value, {stream: true});
            text += decoderChunk;
            yield text;
        }

        return text;

    } catch (error) {
        return null;
    }
}