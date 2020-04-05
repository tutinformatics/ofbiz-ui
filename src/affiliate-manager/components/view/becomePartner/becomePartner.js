import "../../../styles/scss/becomePartner.scss"

export class BecomePartner {
  constructor(ea) {
  }

  async becomeAffPartner() {
    const response = await fetch("http://localhost:4567/api/product", {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(await response.json());
  }

}
