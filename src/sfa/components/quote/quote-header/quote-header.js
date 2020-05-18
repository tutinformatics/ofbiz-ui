import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { QuoteService } from '../../../service/quote-service.js';
import { Store } from 'aurelia-store';

@inject(EventAggregator, QuoteService, Store)
export class QuoteHeader {
  constructor(ea, quoteService, store) {
    this.ea = ea;
    this.quoteService = quoteService;
    this.store = store;
    this.parties = this.quoteService.get("Party");
  }

  newQuote() {
    let quote = { quoteName: this.quote.quoteName, partyId: this.quote.partyId, issueDate: new Date().valueOf() };
    this.quoteService.createNewQuote(quote);
  };
  search() {
    var quotes = [];
    var searchInput = this.searchInput;
    this.store.quotesCopy.forEach(function (quote) {
      if (quote.quoteId.toLowerCase().includes(searchInput.toLowerCase())
        || quote.quoteName.toLowerCase().includes(searchInput.toLowerCase())) {
        quotes.push(quote);
      }
    });
    this.store.quotes = quotes;
  }
}
