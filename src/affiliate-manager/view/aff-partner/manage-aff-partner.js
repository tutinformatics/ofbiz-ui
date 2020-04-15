export class ManageAffPartner {
  email;

  activate(params) {
    this.email = params.email;
    console.log(params.email);
  }
}
