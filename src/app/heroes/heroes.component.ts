import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import {  HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  hero: Hero;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.heroesService.getHeroes()
    .subscribe(heroes=>{
      this.heroes = heroes;
    });
  }

  onAdd(name: string){
    name = name.trim();
    if (!name){ return;}
    this.heroesService.addHero({name} as Hero)
    .subscribe(hero=>{
      this.heroes.push(hero);
    });
  }
  onDelete(hero: Hero){
    this.heroesService.deleteHero(hero.id);
    this.heroes = this.heroes.filter(h=> h !== hero);
  }
 
}
