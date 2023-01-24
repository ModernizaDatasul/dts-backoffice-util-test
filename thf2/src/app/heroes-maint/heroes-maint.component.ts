import { Component, OnInit, ViewChild } from '@angular/core';
import { PoDecimalComponent, PoLookupColumn, PoTableColumn } from '@po-ui/ng-components';
import { IHeroes, Heroes } from '../shared/model/heroes.model';
import { HeroesService } from '../shared/services/heroes.service';
import { TotvsResponse } from 'dts-backoffice-util';

@Component({
    selector: 'app-heroes-maint',
    templateUrl: './heroes-maint.component.html',
    styleUrls: ['./heroes-maint.component.css']
})
export class HeroesMaintComponent implements OnInit {
    @ViewChild('fieldId', { static: true }) fieldId: PoDecimalComponent;
    //@ViewChild('fieldSalary', { static: true }) fieldSalary: PoDecimalComponent;

    heroesColumns: Array<PoTableColumn>;
    heroesItems: Array<IHeroes>;

    //zoomHeroesColumns: Array<PoLookupColumn>;
    zoomHeroesColumns: Array<PoTableColumn>;

    hero: IHeroes = new Heroes();

    invalidFieldClass = '';

    constructor(
        public heroesService: HeroesService,
    ) { }

    ngOnInit(): void {
        this.setupComponents();
        this.searchHero('Gohan');
        this.searchHeroes();
    }

    zoomHeroesFormat(value: IHeroes): string {
        return `${value.nickname} - ${value.label}`;
    }

    searchHero(label: string) {
        this.heroesService
            .getByLabel(label)
            .subscribe((response: IHeroes) => {
                if (response) {
                    this.hero = response;
                }
            });
    }

    searchHeroes(): void {
        this.heroesService
            .query(null)
            .subscribe((response: TotvsResponse<IHeroes>) => {
                if (response && response.items) {
                    this.heroesItems = response.items;
                }
            });
    }

    onClickButton(): void {
        //this.fieldSalary.focus();

        this.focusInternalInput('fieldSalary');

        this.invalidFieldClass = 'ng-invalid ng-dirty';
    }

    focusInternalInput(idField: string) {
        const fieldComponent = document.getElementById(idField);
        const fieldInput = (<HTMLScriptElement[]><any>fieldComponent.getElementsByClassName('po-input'))[0];
        fieldInput.focus();
    }

    cleanValid(): void {
        this.invalidFieldClass = '';
    }

    setupComponents(): void {
        this.heroesColumns = [
            { property: 'value', label: 'ID', type: 'number', format: '1.0-0' },
            { property: 'label', label: 'Label', type: 'string' },
            { property: 'nickname', label: 'Nickname', type: 'string' },
            { property: 'email', label: 'Email', type: 'string' },
            { property: 'salary', label: 'Salary', type: 'number', format: '1.2-2' }
        ];

        this.zoomHeroesColumns = [
            { property: 'value', label: 'ID', type: 'number', width: '10%' },
            { property: 'label', label: 'Label', type: 'string', width: '10%' },
            { property: 'nickname', label: 'Nickname', type: 'string', width: '10%' },
            { property: 'email', label: 'Email', type: 'string', width: '10%', visible: false },
            { property: 'salary', label: 'Salary', type: 'number', format: '1.2-2', width: '10%', visible: false },
            {
                property: 'type', label: 'Tipo', type: 'label', width: '10%', labels: [
                    { label: 'Human', value: 'Human' },
                    { label: 'Mutant', value: 'Mutant' },
                    { label: 'God', value: 'God' },
                    { label: 'Extraterrestrial', value: 'Extraterrestrial' },
                    { label: 'Demon', value: 'Demon' }
                ]
            },
            { property: 'superPower', label: 'SuperPower', type: 'string', width: '20%', visible: false },
            { property: 'idSP', label: 'ID Super-Power', type: 'string', width: '20%', visible: false },
        ];
    }
}
