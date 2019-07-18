import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
 
import { TokenStorageService } from './token-storage.service';
 
const TOKEN_HEADER_KEY = 'Authorization';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    constructor(private token: TokenStorageService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.token.getToken();
        console.log("boumchaka 1!", token);
        if (token != null) {
            console.log("boumchaka 2!");
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        return next.handle(authReq);
    }
}