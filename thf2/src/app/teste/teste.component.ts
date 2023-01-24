import { Component, OnInit, OnDestroy } from '@angular/core';
import { PoI18nPipe, PoI18nService, PoNotificationService, PoDialogService, PoTableColumn } from '@po-ui/ng-components';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

@Component({
    selector: 'app-teste',
    templateUrl: './teste.component.html',
    styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit, OnDestroy {
    literals: any = {};

    servSubscription$: Subscription;

    constructor(
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private poDialogService: PoDialogService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'teste' })
        ]).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));

            console.log('LOG', 'Início do Programa Teste');

            this.setupComponents();
        });
    }

    setupComponents(): void {

    }

    ngOnDestroy(): void {
        if (this.servSubscription$) { this.servSubscription$.unsubscribe(); }
    }
}
