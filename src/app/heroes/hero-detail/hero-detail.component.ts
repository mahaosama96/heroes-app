import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Hero } from '../hero';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  id: number;

  constructor(private heroesService: HeroesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params)=>{
        this.id = +params['id'];
      }
      );
    this.heroesService.getHero(this.id).subscribe(
      hero=>{
         this.hero = hero;
       });
  } 

  onSave(){
    this.heroesService.updateHero(this.hero)
    .subscribe(()=>{
      this.router.navigate(['heroes']);
    });

  }
}
