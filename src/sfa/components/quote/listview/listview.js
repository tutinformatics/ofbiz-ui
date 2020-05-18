import { inject } from 'aurelia-framework';
import { QuoteService } from '../../../service/quote-service';
import { Store } from 'aurelia-store';

@inject(QuoteService, Store)
export class ListView {
  constructor(quoteService, store) {
    this.quoteService = quoteService;
    this.store = store;
  }

  attached() {
    this.quoteService.getQuotes()
      .then(
        data => this.store.quotes = data,
      );
    this.quoteService.getQuotes()
      .then(
        data => this.store.quotesCopy = data,
      );
  }
  deleteQuote(id, index) {
    this.store.quotes.splice(index, 1);
    this.quoteService.deleteQuoteById(id);
  }
}
