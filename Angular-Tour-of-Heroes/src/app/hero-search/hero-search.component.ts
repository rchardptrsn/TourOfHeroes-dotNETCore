import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  /** searchTerms is an RxJS Subject.
   * A subject is both a source of observable values and an Observable itself.
   * You can subscribe to a subject as you would any observable.
   * You can push values into that Observable by not calling its next(value)
   * method as the search() method does.
   */
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  /** Push a search term into the observable stream.
   * Event binding from hero-search.component.html <button> calls the search() method.
   * Every time the user types in the textbox, the binding calls search() with the textbox value,
   * a "search term". The searchTerms becomes an Observable emitting a steady stream of search terms.
   */
  search(term: string): void {
    // feed a new value to the Subject by calling next(term),
    // and it will be multicasted to the Observers registered to listen 
    // to the subject.
    // https://rxjs-dev.firebaseapp.com/guide/subject
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // Pass the  new searchTerm string to searchHeroes,
    // after waiting 300ms and ignoring if same as previous term.
    // notice how heroes$ is an observable.
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // calls the search service for each search term that makes it through debounce()
      // and distinctUntilChanged(). It cancels and discards previous search observables, 
      // returning only the latest search service observable.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}