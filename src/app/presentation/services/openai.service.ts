import { Injectable } from '@angular/core';
import { OrthographyUseCase, 
    ProsConsStreamUseCase, 
    ProsConsUseCase, 
    TranslateTextUseCase 
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
}