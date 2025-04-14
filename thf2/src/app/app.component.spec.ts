import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterModule } from '@angular/router';
import { I18N_CONFIG, PoI18nModule, PoModule } from '@po-ui/ng-components';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: I18N_CONFIG, useValue: {
            default: {
              language: 'pt-BR',
              context: 'general',
              cache: true
            }
          }
        },
        provideHttpClient(),
        provideHttpClient(withInterceptorsFromDi())
      ],
      imports: [
        BrowserTestingModule,
        BrowserDynamicTestingModule,
        PoModule,
        CommonModule,
        FormsModule,
        PoI18nModule,
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
