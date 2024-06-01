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
    getOneDirector(directorName: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/directors/' + directorName, {
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
  
    //make api call to the endpoint for a single user
    getOneUser(userName: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
    //make api call to a single user's favorite movies endpoint 
    getUsersMovies(genreName: string): Observable<any> {
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
    addFavMovies(Username: string, MovieID: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.put(apiUrl + `users/${Username}/movies/${MovieID}`, {
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
    editUserProfile(Username: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.put(apiUrl + 'users/' + Username, {
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
    deleteUser(Username: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.delete(apiUrl + 'users/' + Username, {
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
    deleteMovie(Username: string, MovieID: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.delete(apiUrl + `users/${Username}/movies/${MovieID}`, {
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
