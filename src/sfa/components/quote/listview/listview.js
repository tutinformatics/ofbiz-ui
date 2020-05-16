import { inject } from 'aurelia-framework';
import { QuoteService } from '../../../service/quote-service';

@inject(QuoteService)
export class ListView {
  constructor(quoteService) {
    this.quoteService = quoteService;
  }

  attached() {
    this.quoteService.getQuotes()
      .then(
        data => this.quotes = data,
      );
  }
  deleteQuote(id, index) {
    this.quotes.splice(index, 1);
    this.quoteService.deleteQuoteById(id);
  }
}
