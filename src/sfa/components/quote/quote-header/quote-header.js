import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { QuoteService } from '../../../service/quote-service.js';

@inject(EventAggregator, QuoteService)
export class QuoteHeader {
  constructor(ea, quoteService) {
    this.ea = ea;
    this.quoteService = quoteService;
  }

  newQuote() {
    let quote = { name: this.name, description: this.description, price: this.price, pipelineId: "SAMPLE_ID1", customerId: "SAMPLE_ID1", contactId: "SAMPLE_ID1", stage: this.stage };
    this.quoteService.createNewQuote(quote);
  };
}
