import { Injectable } from '@angular/core';
import { OrthographyUseCase, ProsConsStreamUseCase } from '@use-cases/index';
import { ProsConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
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
}