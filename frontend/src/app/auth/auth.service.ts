
import { LoginInfo } from './../models/login-info';
// import { User } from './../models/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CategoryInfo } from '../models/category-info';
import { ContactInfo } from '../models/contact-info';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://bitesbraces.store'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api';
  private baseUrl1 = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
  ) { }

  public createContact(data: ContactInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
      })
    };
    return this.http.post<string>(`${this.baseUrl}/contact/add`, data, httpOptionsSaved);
  }
  public getAllContacts() {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
      })
    };
    return this.http.get(`${this.baseUrl}/allContacts/get`, httpOptionsSaved);
  }
  public setIdforDetail(data: ContactInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
      })
    };
    return this.http.post<string>(`${this.baseUrl}/oneContact/set`, data, httpOptionsSaved);
  }
  public getDetail(data: ContactInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
      })
    };
    return this.http.post<string>(`${this.baseUrl}/oneContact/get`, data, httpOptionsSaved);
  }
  public createCategory(data: CategoryInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${this.baseUrl}/contact/ad`, data, httpOptionsSaved);
  }
  public getParentCategories(data: CategoryInfo)  : Observable<string>{
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${this.baseUrl}/parentCategories/get`, data, httpOptionsSaved);
    // <string>
  }
  public createSubcategory(data: CategoryInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${this.baseUrl}/subcategory/add`, data, httpOptionsSaved);
  }
  public getcategorySubcategories(data: CategoryInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${this.baseUrl}/categoriesSubcategories/get`, data, httpOptionsSaved);
  }
  public updateName(data: CategoryInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${this.baseUrl}/name/update`, data, httpOptionsSaved);
  }
  public deleteItem(data: CategoryInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${this.baseUrl}/name/delete`, data, httpOptionsSaved);
  }
  public getAllItems() {
    // : Observable<string>
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.get(`${this.baseUrl}/allItems/get`, httpOptionsSaved);
    // <string>
  }
  public getDetailForOne(data: CategoryInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${this.baseUrl}/getOneItem`, data, httpOptionsSaved);
  }
  public updateItem(data: CategoryInfo): Observable<string> {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.post<string>(`${this.baseUrl}/item/update`, data, httpOptionsSaved);
  }
  public getEveryThing() {
    const httpOptionsSaved = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `${this.baseUrl1}`,
        // 'x-access-token': this.tokenStorage.getToken()
      })
    };
    return this.http.get(`${this.baseUrl}/everyThing/get`, httpOptionsSaved);
  }
}
