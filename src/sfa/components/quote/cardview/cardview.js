import { inject } from 'aurelia-framework';
import { QuoteService } from '../../../service/quote-service';

@inject(QuoteService)
export class CardView {
  constructor(quoteService) {
    this.quoteService = quoteService;
  }

  attached() {
    this.quoteService.getQuotes()
      .then(
        data => this.quotes = data
      );
  }
}
