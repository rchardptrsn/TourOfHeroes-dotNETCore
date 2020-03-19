import { Injectable, TemplateRef } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { tokenReference } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HeroService {


  private heroesUrl = 'http://localhost:5000/api/Heroes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  getHeroes(): Observable<Hero[]>{
    /** Returns the array of mock heroes. */
    // TODO: send the message _after_ fetching the heroes
    // catchError operator intercepts an Observable that failed
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message  _after_ fetching the hero
    // Asynchronous - returns a mock hero as an Observable, using the RxJS of() function.
    const url = `${this.heroesUrl}/${id}`;
    // getHero() constructs a request URL with the desired hero's id.
    // returns an Observable Hero rather than an array of heroes
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );

  }
  /** Declare a private messageService property.
   * Angular will inject the singleton MessageService
   * into that property when it creates the HeroService.
   *
   * Typical 'Service-in-Service' where MessageService is
   * injected into HeroService which is injected into
   * HeroesComponenent
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** PUT: update the hero on the server.
   * https://github.com/johnpapa/angular-tour-of-heroes/blob/master/src/app/hero.service.ts
   */
  updateHero (hero: Hero): Observable<any> {

    // Create the route - getting 405 Method not allowed errors
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put(url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`),
      catchError(this.handleError<Hero>('deleteHero')))
    );
  }

  /** Notes on Delete:
   * deleteHero() calls HttpClient.delete().
   * The URL is the heroes resource URL plus the id of the hero to delete.
   * You don't send data as you did with put() and post().
   * You still send the httpOptions.
   */

   // GET: Search Heroes method whose name contains search term
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  // hits the url with a request that the back end can understand - the URL search string
  // heroesUrl is api/heroes --> which a backend controller can easily understand.
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}



}
