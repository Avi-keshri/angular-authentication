import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const HeaderInterceptor: HttpInterceptorFn = (req, next) => {
  let loggedUserData = JSON.parse(localStorage.getItem('JwtLoginToken'));
  if (loggedUserData.token) {
    const modifyRequest = req.clone({ setHeaders: { Authorization: "Bearer " + loggedUserData.token } });
    return next(modifyRequest);
  }
  return next(req);
};
