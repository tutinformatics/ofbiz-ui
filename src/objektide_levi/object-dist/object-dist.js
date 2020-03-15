export class ObjectDist {
  constructor() {
    this.type = '';
    this.variables = [["Puldiauto", "Mängukaru", "Tuulelohe"], ["Arved", "Kasum", "Käive"], ["Püsiklient", "Tavaklient", "Partner"]];
    this.one = "Puldiauto";
    this.two = "Mängukaru";
    this.three = "Tuulelohe";
  }
  changeVariables() {
    if (this.type) {
      this.one = this.variables[this.type][0];
      this.two = this.variables[this.type][1];
      this.three = this.variables[this.type][2];
    }
  }

  generateKey() {
    console.log("Key Generated");  // TODO: ADD KEY GENERATION FOR PUBLISHER
  }
}
