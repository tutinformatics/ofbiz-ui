import "./login.scss"
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationControllerFactory, ValidationRules } from "aurelia-validation";
import { AuthService } from "./authService";

@inject(Router, ValidationControllerFactory, AuthService)
export class Login {

  username = null;
  password = null;
  recovery = '';
  showFeedback = false;
  forgotPassword;
  errors;

  constructor(router, controllerFactory, authService) {
    this.router = router;
    this.authService = authService;
    this.controller = controllerFactory.createForCurrentScope();
    ValidationRules
      .ensure('username').required()
      .ensure('password').required()
      .on(this);
    ValidationRules
      .ensure('recovery')
      .email()
      .required()
  }

  setForgotPassword(value) {
    this.forgotPassword = value;
  }

  navigateTO(path) {
    this.router.navigate(path)
  }

  async login() {
    await this.controller.validate();
    if (this.controller.errors.length === 0) {
      const isSuccessful = await this.authService.loginAttempt(this.username, this.password);
      if (isSuccessful) {
        this.router.navigate("/");
        return
      }
    }
    this.errors = true;
  }

  async sendForgotPasswordRequest() {
    this.showFeedback = true;
  }

}
