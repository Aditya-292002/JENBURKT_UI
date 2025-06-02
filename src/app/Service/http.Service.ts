import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class HttpService {
    
    constructor(private http: HttpClient,
        private AuthService : AuthService) {
    }

    get<T>(url: string, headers?: HttpHeaders) {
        if (!headers)
            headers = new HttpHeaders();

        headers = headers.set("Authorization", `${this.getTokenType()} ${this.getToken()}`);

        return this.http.get<T>(url, { headers: headers });
    }

    getnew<T>(url: string, headers?: HttpHeaders) {
        if (!headers)
            headers = new HttpHeaders();

        headers = headers.set("Authorization", `${this.getTokenType()} ${this.getToken()}`);

        return new Promise((resolve, reject) => {
            
            this.http.get<T>(url, { headers: headers }).subscribe({
                next: (res: any) => {
                    resolve(res);
                    
                  },
                  error: error => {
                    this.AuthService.callerror(error);   
                    reject(error);             
                  }
            });              
          });
    }

    getnew_accesstoken<T>(url: string, headers?: HttpHeaders) {
        if (!headers)
            headers = new HttpHeaders();

        headers = headers.set("Authorization", `Bearer ${this.getAccessToken()}`);

        return new Promise((resolve, reject) => {
            
            this.http.get<T>(url, { headers: headers }).subscribe({
                next: (res: any) => {
                    resolve(res);
                    
                  },
                  error: error => {
                    //this.AuthService.callerror(error);   
                    reject(error);             
                  }
            });              
          });
    }
    getnew_login<T>(url: string, headers?: HttpHeaders) {
        if (!headers)
            headers = new HttpHeaders();

        headers = headers.set("Authorization", `${this.getTokenType()} ${this.getToken()}`);

        return new Promise((resolve, reject) => {
            
            this.http.get<T>(url, { headers: headers }).subscribe({
                next: (res: any) => {
                    resolve(res);
                    
                  },
                  error: error => {
                    this.AuthService.callerror_(error);   
                    reject(error);             
                  }
            });              
          });
    }

    getwithbuffer(url: string, headers?: HttpHeaders) {
        if (!headers)
            headers = new HttpHeaders();

            headers = headers.set("Authorization", `${this.getTokenType()} ${this.getToken()}`);

        return this.http.get(url, {headers: headers, responseType: 'arraybuffer'});
    }

   

    
    post(uri: string, inputData: any, headers?: HttpHeaders): Observable<any> {
        if (!headers)
            headers = new HttpHeaders();

        //headers = headers.set("Authorization", `Bearer ${this.getToken()}`);
        headers = headers.set("Authorization", `${this.getTokenType()} ${this.getToken()}`);

        return this.http.post(uri, inputData, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    
    postnew(uri: string, inputData: any, headers?: HttpHeaders) {
        if (!headers)
            headers = new HttpHeaders();

        headers = headers.set("Authorization", ``);
        // ${this.getTokenType()} ${this.getToken()}

        return new Promise((resolve, reject) => {
            
            this.http.post(uri, inputData, { headers: headers }).pipe(
                catchError(this.handleError)
            ).subscribe({
                next: (res: any) => {
                    resolve(res);
                    
                  },
                  error: error => {
                    this.AuthService.callerror(error);   
                    reject(error);             
                  }
            });
                         
          });
        
    }
    
    private handleError(error: HttpErrorResponse) {
        if (error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            // this.logger.error(error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // this.logger.error(`Backend returned code ${error.status}, ` +
            //   `body was: ${error.message}`);
        }
        // return an ErrorObservable with a user-facing error message
        //return ErrorObservable.create(error);
        return throwError(error);
    }

    private getToken = (): string | null => {
        return JSON.parse(localStorage.getItem("addetail") ?? '{}').idToken;
    }

    private getAccessToken = (): string | null => {
        return ""
        //return JSON.parse(localStorage.getItem("addetail") ?? '{}').accessToken;
    }

    private getTokenType = (): string | null => {
        return JSON.parse(localStorage.getItem("addetail") ?? '{}').tokenType;
    }
}