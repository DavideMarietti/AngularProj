import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

// We can define the format of the data we get back from the server
interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;

}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('url', {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

}
