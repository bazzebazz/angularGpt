import { Injectable } from '@angular/core';
import { OrthographyUseCase, 
    ProsConsStreamUseCase, 
    ProsConsUseCase, 
    TranslateTextUseCase, 
    audioToTextUseCase, 
    textToAudioUseCase
} from '@use-cases/index';
import { from } from 'rxjs';

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
}