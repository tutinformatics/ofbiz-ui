import "./login.scss"
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationControllerFactory, ValidationRules } from "aurelia-validation";
import { LoginService } from "./loginService";

@inject(Router, ValidationControllerFactory, LoginService)
export class Login {

  username = null;
  password = null;
  forgotPassword;
  errors;

  constructor(router, controllerFactory, loginService) {
    this.router = router;
    this.loginService = loginService;
    this.controller = controllerFactory.createForCurrentScope();
    ValidationRules
      .ensure('username').required()
      .ensure('password').required()
      .on(this);
  }

  setForgotPassword(value) {
    this.forgotPassword = value;
  }

  async login() {
    await this.controller.validate();
    if (this.controller.errors.length === 0) {
      const isSuccessful = await this.loginService.loginAttempt(this.username, this.password);
      if (isSuccessful) {
        this.router.navigate("/");
        return
      }
    }
    this.errors = true;
  }

}
