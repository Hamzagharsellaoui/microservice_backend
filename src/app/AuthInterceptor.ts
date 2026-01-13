// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
// import { from, switchMap } from 'rxjs';
// import {AuthService} from "../Services/auth.service";
//
// @Injectable()
// export class FirebaseTokenInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}
//
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     return from(this.authService.getIdToken()).pipe(
//       switchMap(token => {
//         if (!token) return next.handle(req);
//         return next.handle(req.clone({
//           setHeaders: { Authorization: `Bearer ${token}` }
//         }));
//       })
//     );
//   }
// }
