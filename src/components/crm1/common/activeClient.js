import {clientQuickAction} from './complexViewClient/clientQuickAction';
import {clientContactOption} from './complexViewClient/clientContactOption';
import {clientSaleOption} from './complexViewClient/clientSaleOption';
import {clientDocumentOption} from './complexViewClient/clientDocumentOption';
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import $ from 'jquery';

@inject(EventAggregator, Router)
export class ActiveClient {
  constructor(ea, router) {
    this.ea = ea;
    this.displayClient = false;
    this.notes = new clientQuickAction('Notes');

    ea.subscribe('contactChosen', payload => {
      this.chosenContact = payload;
      this.firstName = this.chosenContact.firstName;
      this.lastName = this.chosenContact.lastName;
      this.companyName = this.chosenContact.companyName;
      this.positionType = this.chosenContact.roleTypeId;
    });
    ea.subscribe('displayClient', boolean => {
      this.displayClient = boolean;
    });

    this.router = router;
    this.simpleView = true;
    this.view = 'Card View';

    this.quickActionOptions = [
      new clientQuickAction('Edit')];

    this.contactOptions = [new clientContactOption('Call'),
      new clientContactOption('Email'),
      new clientContactOption('Meeting')];

    this.contactsListingOptions = [new clientContactOption('Calls'),
      new clientContactOption('Emails'),
      new clientContactOption('Meetings')];

    this.saleOptions = [new clientSaleOption('Leads'),
      new clientSaleOption('Opportunities'),
      new clientSaleOption('Proposals'),
      new clientSaleOption('Deals')];

    this.options = [new clientDocumentOption('Invoices'),
      new clientDocumentOption('Orders'),
      new clientDocumentOption('Claims'),
      new clientDocumentOption('Returned')];
  }

  quickAction(activity) {
    this.ea.publish('changeAction', activity);
    this.ea.publish('displayActivity', true);
  }

  closeActiveClient() {
    this.ea.publish('displayClient', false);
  }

  openModal(name) {
    this.ea.publish('openModal', true);
    event.stopPropagation();
  }
  preventPropagation(activity) {
    console.log(activity)
    switch (activity.name) {
      case "Leads":
        $('#create-lead').modal('show');
        break;
      default:
        break
    }
    event.stopPropagation();
  }
}

