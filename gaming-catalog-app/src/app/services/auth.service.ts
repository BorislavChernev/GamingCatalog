import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface'; // Assuming you have a User interface

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://127.0.0.1:3000';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const currentUserJson = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      currentUserJson ? JSON.parse(currentUserJson) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${this.baseUrl}/api/login`, { username, password })
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(username: string, password: string, role: string = 'user') {
    console.log('Registering:', username, password, role);

    return this.http
      .post<any>(`${this.baseUrl}/api/register`, { username, password, role })
      .pipe(
        map((user) => {
          console.log('User registered', user);
          return user;
        })
      );
  }

  isAdmin(): boolean | null {
    const currentUser = this.currentUserValue;
    return currentUser && currentUser.role === 'admin';
  }
}
