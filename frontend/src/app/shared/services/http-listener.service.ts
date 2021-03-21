import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class HttpListenerService implements HttpInterceptor {

  constructor(
    private notificationService: NotificationService,
    private tokenService: TokenService,
    @Inject('API_URL') private apiUrl: string
  ) {
  }

  private excludedRoutesForAuthHeader = [
    'login'
  ];

  private static getResponseAsJson(responseBody: any): any {
    let jsonResponse = responseBody;
    if (!responseBody) {
      return null;
    }
    if (typeof responseBody === 'string') {
      jsonResponse = JSON.parse(responseBody);
    }
    return jsonResponse;
  }

  private static extractData(event: HttpEvent<any>): HttpEvent<any> {
    if (event instanceof HttpResponse) {
      const jsonResponse = HttpListenerService.getResponseAsJson(event.body);
      let data: string = null;
      if (!!jsonResponse) {
        data = jsonResponse.data;
      }
      return event.clone({ body: data });
    }
    return event;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ url: this.apiUrl + req.url });

    if (!this.excludedRoutesForAuthHeader.includes(req.url.split('/').pop())) {
      req = this.addAuthHeader(req);
    }

    return this.handleRequest(req, next);
  }

  private handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => HttpListenerService.extractData(event)),
      catchError((errorResponse: HttpErrorResponse) => {
        try {
          const jsonResponse = HttpListenerService.getResponseAsJson(errorResponse.error);
          if ('errors' in jsonResponse && jsonResponse.errors.length > 0) {
            this.notificationService.backEndError(jsonResponse.errors[0]);
          } else {
            throw false;
          }
        } catch (e) {
          this.notificationService.backEndError('Une erreur inconnue est survenue.');
        }
        return throwError(errorResponse);
      }));
  }

  private addAuthHeader = (request: HttpRequest<any>): HttpRequest<any> => {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });
    return request;
  }
}
