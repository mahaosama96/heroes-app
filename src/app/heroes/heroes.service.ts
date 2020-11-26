import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../messages/message.service';
import { Hero } from './hero';

@Injectable({providedIn: "root"})
export class HeroesService {
    private heroesUrl = 'api/heroes';
    heroes: Hero[];

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    constructor(private http: HttpClient,
                private messageService: MessageService){}
    
    private log(message: string){
        this.messageService.addMessage(`HeroService: ${message}`);
    }

    getHeroes(): Observable<Hero[]>{
        return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
            tap(_=>this.log('fetched Heroes')),
            catchError(this.handleError<Hero[]>('getHeroes',[]))
            );
       
    }

    getHero(id: number):Observable<Hero>{
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url)
        .pipe(
            tap(_=>this.log(`fetched hero id = ${id}`)),
            catchError(this.handleError<Hero>(`getHero id = ${id}`)),
        );
    }

    updateHero(hero: Hero):Observable<any>{
        return this.http.put(this.heroesUrl, hero, this.httpOptions)
        .pipe(
            tap(_=>this.log(`updated hero id= ${hero.id}`)),
            catchError(this.handleError<any>(`updatedHero`))
        );
    }

    addHero(hero: Hero): Observable<Hero>{
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
        .pipe(
            tap((newHero: Hero)=>this.log(`added hero ${newHero.name} id=${newHero.id}`)),
            catchError(this.handleError<Hero>('added hero'))
        );
    }

    deleteHero(id: number ){
        const url = `${this.heroesUrl}/${id}`;
         this.http.delete<Hero>(url, this.httpOptions)
        .pipe(
            tap(_=>this.log(`deleted hero id = ${id}`)),
            catchError(this.handleError<Hero>('deleted hero'))
        )
        .subscribe();
    }

    searchHeroes(term: string): Observable<Hero[]>{
        if(!term.trim()){
            return;
        }
        return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
        .pipe(
            tap(x=>x.length?
                this.log(`found heroes matching "${term}"`):
                this.log(`no heroes matching "${term}"`)
                ),
            catchError(this.handleError<Hero[]>('search heroes', []))
        );
    }

    private handleError<T>(operation = 'operation', result?: T ){
        return (error: any): Observable<T>=>{
            console.log(error);
            this.log(`${operation} failed: ${error.message}`);
            return of (result as T);

        }
    }
}