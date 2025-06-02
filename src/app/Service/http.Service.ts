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
        return "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiI0NTU4ZjVlMS1kODI5LTQyZDQtODEwNS0wMTc4NTk2ZWYwYzEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hMWYxZTIxNC03ZGVkLTQ1YjYtODFhMS05ZThhZTM0NTk2NDEvIiwiaWF0IjoxNjQzNjMzNzYxLCJuYmYiOjE2NDM2MzM3NjEsImV4cCI6MTY0MzYzNzY2MSwiYWlvIjoiRTJZQWd1VzZuN1k4RUpPWFRuK3UrWmJQL3dNQSIsImFwcGlkIjoiNDU1OGY1ZTEtZDgyOS00MmQ0LTgxMDUtMDE3ODU5NmVmMGMxIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYTFmMWUyMTQtN2RlZC00NWI2LTgxYTEtOWU4YWUzNDU5NjQxLyIsIm9pZCI6ImEyYzI2YmJmLTg4NDQtNDNjNi05MWM2LThhZDliYTJmNTUzNiIsInJoIjoiMC5BUWdBRk9MeG9lMTl0a1dCb1o2SzQwV1dRZUgxV0VVcDJOUkNnUVVCZUZsdThNRUlBQUEuIiwic3ViIjoiYTJjMjZiYmYtODg0NC00M2M2LTkxYzYtOGFkOWJhMmY1NTM2IiwidGlkIjoiYTFmMWUyMTQtN2RlZC00NWI2LTgxYTEtOWU4YWUzNDU5NjQxIiwidXRpIjoiaG1WNVlsTkloMHVUaWY1bjhpTG5BQSIsInZlciI6IjEuMCJ9.ebgTVmjzHlKxTWHZdg1il5116JuD0W3tGwuDdNX30bxkS2PWO5JpWphSDwvb-DrDARKBuM20a0-exWrF0JJOxPiY6bIjVqEWsKO9uOEVVFSJQ0qvglonPkWxCps1hX7C04msXUJ9sK7udrMDrYBN7TznrlVYIdNOQz7KkIuf4L2Fj4BOm8cQwz7D6hiJkQJCnivzO_BokgA4ULYBd2K8C5zDap61UN-1D3zKTHai2zwTa3SJ-_eQRVmHQc_enNcZ-wT-B2WoGUOq21kcAJY0ITphABTbZryYz1P9Qaf7zd21YZB3qGAQNJggoNby2zyd72GMr_rV6rKIDB7_g7meoA"
        //return JSON.parse(localStorage.getItem("addetail") ?? '{}').accessToken;
    }

    private getTokenType = (): string | null => {
        return JSON.parse(localStorage.getItem("addetail") ?? '{}').tokenType;
    }
}