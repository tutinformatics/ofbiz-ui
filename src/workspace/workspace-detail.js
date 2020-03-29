import {EventAggregator} from 'aurelia-event-aggregator';
import {ContactUpdated,ContactViewed} from './messages';
import {areEqual} from '../commons/util/utility';
import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-dependency-injection';
import { WebAPI } from "./web-api";

@inject(WebAPI, EventAggregator)
export class WorkspaceDetail {

  baseUrl = 'workspace/control/createWorkspaceEvent';

  constructor(api, ea){
    this.api = api;
    this.ea = ea;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getContactDetails(params.id).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.url);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactViewed(this.contact));
    });
  }

  get canSave() {
    return this.contact.url && this.contact.code && !this.api.isRequesting;
  }

  save() {
    this.api.saveContact(this.contact).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.url);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactUpdated(this.contact));
      this.createWorkspace(contact);
    });

  }

  createWorkspace(contact) {
    let httpClient = new HttpClient(); // FIXME: should be injected
    httpClient.createRequest(this.baseUrl)
      .asPost()
      .withParams({
        workspaceGroupId: contact.workspace_group_id,
        name: contact.name,
        url: contact.url})
      .send()
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  canDeactivate() {
    if(!areEqual(this.originalContact, this.contact)){
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if(!result) {
        this.ea.publish(new ContactViewed(this.contact));
      }

      return result;
    }

    return true;
  }
}
