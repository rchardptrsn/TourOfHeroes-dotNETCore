import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    /** subscribe is extremely important. If you neglect to subscribe(), 
     * * the service will not send the delete request to the server. 
     * As a rule, an Observable does nothing until something subscribes.*/
    this.heroService.deleteHero(hero).subscribe();
  }

  /** HeroService:Define a private heroService property and 
   * identify it as a HeroService injection site.
   * When Angular creates a HeroesComponent, the 
   * Dependency Injection system sets the heroService
   * parameter to the singleton instance of HeroService.
   * Returns an asynchronous Observable array.
   *
   * MessageService: Displays messages.
   */
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    /** Call the function that uses the injected Service */
    this.getHeroes();
  }

    /** Create a function that uses the injected Service */
  getHeroes(): void {
    /** Waits for Observable to emit array of heroes,
     * subscribe() passes the emitted array to the callback,
     * which sets the component's heroes property.
     */
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    }


}
