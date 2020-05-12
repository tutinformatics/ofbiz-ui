import { inject } from 'aurelia-framework';
import { QuoteService } from '../../../service/quote-service';

@inject(QuoteService)
export class QuoteEdit {
    constructor(quoteService) {
      this.quoteService = quoteService;
    }

    attached() {
      this.quotes = this.quoteService.getQuotes();
      this.parties = this.quoteService.get("Party");
    }

    activate(params, routeConfig, navigationInstruction) {
      this.quote = params.quote;
    }
    editQuote() {
      history.back();
    };
    back() {
      history.back();
    }
}
