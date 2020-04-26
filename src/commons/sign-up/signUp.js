import "../assets/scss/general-login.scss"
import { inject } from "aurelia-framework";
import { LoginService } from "../login/loginService";

inject(LoginService);

export class SignUp {

  userLoginId = '';
  password = '';
  repeatPassword = '';
  formError = false;

  constructor(loginService) {
    this.loginService = loginService;
  }

  async singUp() {
    if (this.password !== '' && this.password === this.repeatPassword && this.userLoginId !== '') {
      const response = this.loginService.signUpRequest(this.userLoginId, this.password);
      if (response) {
        console.log("ok")
      } else {
        console.log("error occurred")
      }
    } else {
      this.formError = true;
    }
  }

}
