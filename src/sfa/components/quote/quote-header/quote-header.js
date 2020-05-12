import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { QuoteService } from '../../../service/quote-service.js';

@inject(EventAggregator, QuoteService)
export class QuoteHeader {
  constructor(ea, quoteService) {
    this.ea = ea;
    this.quoteService = quoteService;
    console.log(this.quoteService.getQuotes());
    this.parties = this.quoteService.get("Party");
  }

  newQuote() {
    let quote = { quoteName: this.quote.quoteName, partyId: this.quote.partyId, quoteTypeId: "CQ0001", productStoreId: "9000", statusId: "QUO_CREATED" };
    this.quoteService.createNewQuote(quote);
  };
}
