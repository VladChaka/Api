import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  constructor(private http: HttpClient) { }

    auth(authInfo: object): Observable<any>{
        return this.http.post('http://localhost:4000/login', authInfo);
    } 
    getAll(token: string): Observable<any>{
        return this.http.get('http://localhost:4000/users', { params: { token: token } });
    }
    create(data: object, token: string): Observable<any>{
        return this.http.post('http://localhost:4000/users', data, { params: { token: token } });
    }
    delete(id: string, token: string): Observable<any>{
        return this.http.delete(`http://localhost:4000/users/${id}`, { params: { token: token } });
    }
    getById(id: string, token: string): Observable<any>{
        return this.http.get(`http://localhost:4000/users/${id}`, { params: { id: id, token: token } });
    }
    update(data: object, id: string, token: string): Observable<any>{
        return this.http.put(`http://localhost:4000/users/${id}`, data, { params: { token: token } });
    }
    // getBookById(data: object, id: string, token: string): Observable<any> {
    //     return this.http.get(`http://localhost:4000/users/${id}/books`, { params: { token: token } });
    // }
    takeBook(data: object, id: string, token: string): Observable<any>{
        return this.http.post(`http://localhost:4000/users/${id}/books`, data, { params: { token: token } });
    }
    passBook(data: object, id: string, token: string): Observable<any>{
        return this.http.delete(`http://localhost:4000/users/${id}/books`, { params: { token: token } });
    }
}
