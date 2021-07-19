import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/users';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  // @ts-ignore
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      // @ts-ignore
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      // @ts-ignore
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    // @ts-ignore
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmail(email: string) {
    return this.http.get(this.baseUrl + `account/emailexists?email=${email}`);
  }
}
