import { Component, OnInit } from '@angular/core';
import { IHeroes } from '../shared/model/heroes.model';
import { HeroesService } from '../shared/services/heroes.service';
import { TotvsResponse } from 'dts-backoffice-util';
import { PoSlideItem } from '@po-ui/ng-components';

@Component({
    selector: 'app-heroes-view',
    templateUrl: './heroes-view.component.html',
    styleUrls: ['./heroes-view.component.css']
})
export class HeroesViewComponent implements OnInit {

    listHeroes: Array<IHeroes> = [];
    listHeroesImage: Array<PoSlideItem> = [];

    constructor(
        public heroesService: HeroesService
    ) { }

    ngOnInit(): void {
        this.setupComponents();
    }

    searchHeroes(): void {
        this.heroesService
            .query(null)
            .subscribe((response: TotvsResponse<IHeroes>) => {
                if (response && response.items) {
                    this.listHeroes = response.items;
                }
            });
    }

    add() {
        this.listHeroes = [...this.listHeroes, {
            value: 3334234234,
            label: 'Nome do novo Heroi',
            nickname: 'Nick novo heroi',
            email: 'email@marvel.com',
            salary: 41637.21,
            image: 'https://i.em.com.br/Paz9YhvA-D7HBs1p0ebgdvNm0Tw=/675x0/smart/imgsapp.em.com.br/app/noticia_127983242361/2021/12/06/1328889/imagem-de-um-sapo-cururu_1_151268.jpg'
        }];

        this.listHeroesImage = [...this.listHeroesImage, {
            image: 'https://i.em.com.br/Paz9YhvA-D7HBs1p0ebgdvNm0Tw=/675x0/smart/imgsapp.em.com.br/app/noticia_127983242361/2021/12/06/1328889/imagem-de-um-sapo-cururu_1_151268.jpg'
        }];
    }

    edit(ID: number) {

    }

    delete(ID: number) {

    }

    setupComponents(): void {
        //this.add();
        //this.searchHeroes();
    }
}
