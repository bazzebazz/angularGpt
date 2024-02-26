import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { OpenAiService } from 'app/presentation/services/openai.service';

import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default  class ProsConsStreamPageComponent { 

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public abortSignal = new AbortController();

  async handleMessage(prompt: string) {

    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.messages.update( prev => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      },
      {
        isGpt: true,
        text: '...'
      }
    ]);



    this.isLoading.set(true);

    const stream = this.openAiService.prosConsDiscusserStream(prompt, this.abortSignal.signal);

    this.isLoading.set(false);

    for await(const text of stream){
      this.handleStreamResponse(text);
    }
  }

  handleStreamResponse( message: string ) {
    this.messages().pop();
    const streamMessages = this.messages();

    this.messages.set([...streamMessages, {isGpt: true, text: message}]);
  }

}
