import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from './user.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        const isRefresh = confirm("Your Session is Expired. Do you want to Continue");
        if (isRefresh) {
          userService.$refreshToken.next(true);
        }
      }
      return throwError(error);
    })
  );;
};
