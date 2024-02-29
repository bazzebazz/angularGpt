import { Injectable } from '@angular/core';
import { CreateThreadUseCase } from '@use-cases/assistant/create-thread.use-case';
import { OrthographyUseCase, 
    PostQuestionUseCase, 
    ProsConsStreamUseCase, 
    ProsConsUseCase, 
    TranslateTextUseCase, 
    audioToTextUseCase, 
    textToAudioUseCase
} from '@use-cases/index';
import { Observable, from, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    
    checkOrthography(prompt: string) {
        return from( OrthographyUseCase(prompt) );
    }
    prosConsDiscusser(prompt: string) {
        return from( ProsConsUseCase(prompt) );
    }
    prosConsDiscusserStream(prompt: string, abortSignal: AbortSignal) {
        return ProsConsStreamUseCase(prompt, abortSignal) ;
    }

    translateText( prompt: string, lang: string ) {
        return from(TranslateTextUseCase(prompt, lang));
    }

    textToAudio( prompt: string, voice: string ) {
        return from(textToAudioUseCase(prompt, voice));
    }

    audioToText( file: File, prompt?: string ) {
        return from(audioToTextUseCase(file, prompt));
    }

    createThread(): Observable<string> {
        if(localStorage.getItem('thread')){
            return of(localStorage.getItem('thread')!);
        }
        return from(CreateThreadUseCase())
            .pipe(
                tap((thread) => {
                    localStorage.setItem('thread', thread)
                })
            )
    }

    postQuestion( threadId: string, question: string ) {
        return from(PostQuestionUseCase(threadId, question));
    }

}