import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js/';
import { Product } from '../models';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {

  constructor(private http: HttpClient) { }

  base = 'http://54.174.38.130/wp-json/wc/v3/';
  consumer_key: string = 'ck_551aa20c28e61a871252d432b4424ca54ee4ec39';
  consumer_secret: string = 'cs_92323db100f8e666a952398bebb40d5f627c828b';

  Auth(url, method, char): string {
    const hashFunction = (baseString, key) => {
      return CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64)
    }

    const oauth = new OAuth({
      consumer: {
        key: this.consumer_key,
        secret: this.consumer_secret
      },
      signature_method: 'HMAC-SHA1',
      hash_function: hashFunction,
      nonce_length: 11,
    })

    const request = {
      url: url,
      method: method,
    }

    const oauthObject = oauth.authorize(request)

    return url + char +
      'oauth_consumer_key=' + oauthObject.oauth_consumer_key + '&' +
      'oauth_signature_method=' + oauthObject.oauth_signature_method + '&' +
      'oauth_timestamp=' + oauthObject.oauth_timestamp + '&' +
      'oauth_nonce=' + oauthObject.oauth_nonce + '&' +
      'oauth_version=' + oauthObject.oauth_version + '&' +
      'oauth_signature=' + oauthObject.oauth_signature;
  }

  getProductList(page): Observable<Product[]> {
    let url = this.base + 'products?page=' + page;
    let char = '&';
    let method = 'GET';
    let authUrl = this.Auth(url, method, char);

    return this.http.get<Product[]>(authUrl)
      .pipe(
        tap(_ => console.log(`Product fetched: ${page}`)),
        catchError(this.handleError<Product[]>(`Get Product page=${page}`))
      );
  }

  getProduct(id): Observable<Product[]> {
    let url = this.base + 'products/' + id;
    let char = '?';
    let method = 'GET';
    let authUrl = this.Auth(url, method, char);

    return this.http.get<Product[]>(authUrl)
      .pipe(
        tap(_ => console.log(`Product fetched: ${id}`)),
        catchError(this.handleError<Product[]>(`Get Product id=${id}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
