import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from "@angular/router";
import { SharedService } from './shared.service';
// import { address } from '../_constant';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { error } from 'protractor';
//export const address = 'https://tkct.azurewebsites.net/api/';
//export const address = 'https://localhost:44335/api/';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // helper = new JwtHelperService();
  constructor( public http: HttpClient,private router: Router,public sharedService: SharedService) { }

  getApiPath(address: any) {
    return address;
  }

  post(url: string, data: any) {
    if (!sessionStorage.getItem("token")) {
      sessionStorage.setItem("token","");
    }
 
    return new Promise((resolve, reject) => {
      return this.http.post(url, data, { headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") } }).subscribe(
        data => {
          resolve(data);
          // console.log(data,"double")
        },
        error => {
          reject(error);
        });
    });
  }

  fileUpload(url: string, data:any) {
    if (!sessionStorage.getItem("token")) {
      sessionStorage.setItem("token","");
    }

    return new Promise((resolve, reject) => {
      return this.http.post(url, data, { headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") } }).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        });
    });
  }

  get(url: any) {
    if (!sessionStorage.getItem("token")) {
      sessionStorage.setItem("token","");
    }

    return new Promise((resolve, reject) => {
      return this.http.get(url, { observe: 'response', headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") } }).subscribe(
        data => {
          // var isExpired = this.helper.isTokenExpired(sessionStorage.getItem("token"));
          if (data.body)
            resolve(data.body);
          else
            resolve(data);
        },
        error => {
          if (error && error.status == 401) {
            // var isExpired = this.helper.isTokenExpired(sessionStorage.getItem("token"));
          }
          reject(error)
        }
      )
    })
  }




  // refreshToken(requestType, url, data1) {
  //   var retVal;
  //   var tokenData = {
  //     "token": localStorage.token,
  //     "refreshToken": localStorage.refreshToken
  //   }
  //   $.ajax({
  //     type: "POST",
  //     async: false,
  //     url: address + 'common/refresh',
  //     data: JSON.stringify(tokenData),
  //     contentType: 'application/json; charset=utf-8',
  //     success: (response) => {
  //       retVal = response;

  //       console.log(response);
  //       if (response.ISERROR == false) {
  //         localStorage.token = response.token;
  //         localStorage.refreshToken = response.refreshToken;
  //         //window.location.reload();
  //         if (requestType == 'get')
  //           this.get(url);
  //         else if (requestType == 'post') this.post(url, data1);
  //       }
  //       else {
  //         localStorage.token = '';
  //         localStorage.refreshToken = '';
  //         this.router.navigate(['login']);
  //       }
  //     },
  //     error: (response) => {
  //       console.log(response);
  //       localStorage.token = '';
  //       localStorage.refreshToken = '';
  //       this.router.navigate(['login']);
  //     }
  //   });
  //   return retVal;
  // }

  // downloadZip(folderPath: string): Observable<Blob> {
  //   const headers = new HttpHeaders().set('Accept', 'application/zip');
  //   return this.http.post(`http://localhost:45232/api/Reports/DownloadFolderAsZip?folderPath=${encodeURIComponent(folderPath)}`, {
  //     headers: headers,
  //     responseType: 'blob' as 'json'
  //   });
  // }
  downloadZip(folderPath: string,data): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/zip');
   
 //   console.log('data',data);
    // Make sure to set responseType in the options, not in the request body
  //  return this.http.post<Blob>(`http://localhost:45232/api/Reports/DownloadFolderAsZip?folderPath=${encodeURIComponent(folderPath)}`, data, {
    return this.http.post<Blob>(this.sharedService.ApiUrl+`/api/Reports/DownloadFolderAsZip?folderPath=${encodeURIComponent(folderPath)}`, data, {
      headers: headers,
      responseType: 'blob'  as 'json'// Set the responseType here correctly
    });
  }
  delete(url: any) {
    return new Promise((resolve, reject) => {
      return this.http.delete(url, { headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") } }).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error)
        }
      )
    })
  }

  put(url: any,data: any) {
    return new Promise((resolve, reject) => {
      return this.http.put(url, data, { headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") } }).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error)
        }
      )
    })
  }

  // observableGet(url: any): Observable<any> {
  //   return (this.http.get(address + url, {}))
  // }

  // getSync(url: string) {
  //   var retVal;
  //   $.ajax({
  //     type: "GET",
  //     async: false,
  //     url: address + url,
  //     beforeSend: function (xhr) {
  //       xhr.setRequestHeader("Authorization", "Bearer " + localStorage.token);
  //     },
  //     dataType: "json",
  //     success: (response) => {
  //       retVal = response;
  //     },
  //     error: (response) => {
  //       console.log(response);
  //     }
  //   });
  //   return retVal;
  // }

  // getSyncPost(url: string,data) {
  //   var retVal;

  //   $.ajax({
  //     type: "POST",
  //     contentType: "application/json; charset=utf-8",
  //     async: false,
  //     url: address + url,
  //     beforeSend: function (xhr) {
  //       xhr.setRequestHeader("Authorization", "Bearer " + localStorage.token);
  //     },
  //     dataType: "json",
  //     data:data,
  //     success: (response) => {
  //       retVal = response;
  //     },
  //     error: (response) => {
  //       console.log(response);
  //     }
  //   });
  //   return retVal;
  // }

}
