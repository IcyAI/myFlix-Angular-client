import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-flix50-8c220c6131d7.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  private getToken(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : '';
}

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

    //making the api call for the login endpoint
    public userLogin(userDetails: any): Observable<any> {
      console.log(userDetails);
      return this.http.post(apiUrl + 'login', userDetails).pipe(
        catchError(this.handleError)
      );
    }
  
    //making the api call to fetch all movies
    getAllMovies(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
  
    //make api call to fetch a single movie 
    getOneMovie(movieTitle: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/' + movieTitle, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
    //make api call to the endpoint for a single director 
    getOneDirector(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/directors/', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
    //make api call to the endpoint for a single genre
    getOneGenre(genreName: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
    //get one user information
    getOneUser(): Observable<any> {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user;
    }

    //make api call to a single user's favorite movies endpoint 
    getUsersMovies(genreName: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'users/movies/' + genreName, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
    }
  
    //make api call to add a movie to a users favorites 
    addFavMovies( movieID: string): Observable<any> {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      return this.http.post(apiUrl + `users/${user.Username}/movies/${movieID}`, {}, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
    //make api call to edit a users info 
    editUserProfile(userDetails: any): Observable<any> {
      const token = localStorage.getItem('token');
      console.log(userDetails);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return this.http.put(apiUrl + 'users/' + user.Username, userDetails, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    //make api call to delete a user's account
    deleteUser(): Observable<any> {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      return this.http.delete(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
    //make api call to delete a movie from a user's favorites
    deleteMovie(movieID: string): Observable<any> {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      return this.http.delete(apiUrl + `users/${user.Username}/movies/${movieID}`, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
    private extractResponseData(res: any): any {
      const body = res;
      return body || {};
    }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened - please try again later.');
  }
}
