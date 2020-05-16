import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { QuoteService } from '../../../service/quote-service.js';

@inject(EventAggregator, QuoteService)
export class QuoteHeader {
  constructor(ea, quoteService) {
    this.ea = ea;
    this.quoteService = quoteService;
    this.parties = this.quoteService.get("Party");
  }

  newQuote() {
    let quote = { quoteName: this.quote.quoteName, partyId: this.quote.partyId, issueDate: new Date().valueOf() };
    this.quoteService.createNewQuote(quote);
  };
}
