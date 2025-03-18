import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:9000/api";

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // No s'utilitza però es pot fer servir per obtenir un usuari en concret a partir de la seva id
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  register(userData: { username: string; age: number; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);  // Endpoint del backend para registrar usuarios
  }
}