import { Injectable } from '@angular/core';
import { Headers, Http,Response } from '@angular/http'; 
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { LoginService } from '../login/login.service'; 
import { URLSearchParams, ResponseContentType } from '@angular/http';  
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class WorkHourHttpService {

    actionButtonLabel = 'x';
    action = true;
 

  constructor(private http: Http, private loginService: LoginService, private snackBar: SnackBarService) { 
    }

  httpGet(url: string, params: URLSearchParams, headers: Headers, successFunc: Function, errorFunc: Function, successMessage = true) {
        if (params == null) {
            params = new URLSearchParams();
        }
    if (headers == null) {
      headers = new Headers();
    }
    var context = this.loginService.getAuthContext();
    if (context != null) {
            headers.append('Content-Type', 'application/json');
            headers.append('Auth_UserId', context.UserId.toString());
            headers.append('Auth_Token', context.Token.toString());
        }
    
    this.http
      .get(url, { headers: headers, params: params })
      .map(response => response.json())
            .subscribe(
              data => {
                console.log(data);
                successFunc(data);
            },
              error => console.log(error));
    console.log("Error") 
    }



    httpPost(url: string, body: any, headers: Headers, successFunc: Function, errorFunc: Function, successMessage = true) {
        if (headers == null) {
            headers = new Headers();
        }

      var context = this.loginService.getAuthContext();
        if (context != null) {
            headers.append('Auth_UserId', context.UserId.toString());
            headers.append('Auth_Token', context.Token.toString());
            headers.append('Content-Type', 'application/json');
        } 
        this.http
          .post(url, body, { headers: headers })
          .map(response => response.json())
            .subscribe(
              (data: any) => {
                if (data.responseType == 1) {
                    if (successFunc != null) {
                      successFunc(data);
                      if (successMessage) {
                        this.snackBar.open('Isleminiz basariyla gerceklestirildi');
                      }
                    }
                }
                else if (data.responseType == 2) {
                  this.loginService.setLogout();
                }
                else if (data.responseType == 3 || data.type == 4) {
            
                    this.snackBar.open(data.message);
                    if (errorFunc != null) {
                        errorFunc(data);
                    }
                }
            },
            error => {
                console.log(error)
            });
    }

    httpPostFormData(url: string, body: any, headers: Headers, successFunc: Function, errorFunc: Function, successMessage = true) {
      if (headers == null) {
        headers = new Headers();
      }

      var context = this.loginService.getAuthContext();
      if (context != null) {
        headers.append('Auth_UserId', context.UserId.toString());
        headers.append('Auth_Token', context.Token.toString());
      }
      this.http
        .post(url, body, { headers: headers }) 
        .subscribe(
        (data : any) => {
          if (data.ResponseType == 1) {
            if (successFunc != null) {
              successFunc(data);
              if (successMessage) {
                this.snackBar.open('Isleminiz basariyla gerceklestirildi');
              }
            }
          }
          else if (data.ResponseType == 2) {
            this.loginService.setLogout();
          }
          else if (data.ResponseType == 3 || data.ResponseType == 4) {
            this.snackBar.open(data.Message);
            if (errorFunc != null) {
              errorFunc(data);
            }
          }
        },
        error => console.log(error));
    } 

    downloadFile(data, item) {
      var blob = new Blob([data]);
      var url = window.URL.createObjectURL(blob);

      var link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", item.OriginalFileName);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    process(data: any) {
        if (data.ResponseType == 1) {
            return data.Item;
        }
        else if (data.ResponseType == 2) {
          this.loginService.setLogout();
        }
        else if (data.ResponseType == 3 || data.ResponseType == 4) {
            console.log(data.Message);
        }
    }
}
