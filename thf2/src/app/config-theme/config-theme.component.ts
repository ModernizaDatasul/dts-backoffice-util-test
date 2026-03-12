import { Component } from '@angular/core';
import { PoNotificationService, PoRadioGroupOption, PoThemeA11yEnum, poThemeDefault, PoThemeService, PoThemeTypeEnum } from '@po-ui/ng-components';
import { myTheme } from './my-theme.constant';

@Component({
    selector: 'app-config-theme',
    templateUrl: './config-theme.component.html',
    styleUrls: ['./config-theme.component.css'],
    standalone: false,
})
export class ConfigThemeComponent {
    // Properties
    theme = poThemeDefault;

    themeType: PoThemeTypeEnum = 0;
    themeTypeOptions: PoRadioGroupOption[] = [
        { label: 'Light', value: 0 },
        { label: 'Dark', value: 1 },
    ];

    themeA11y: PoThemeA11yEnum = PoThemeA11yEnum.AAA;
    themeA11yOptions: PoRadioGroupOption[] = [
        { label: 'AAA', value: PoThemeA11yEnum.AAA },
        { label: 'AA', value: PoThemeA11yEnum.AA },
    ];

    themeSize = 'medium';
    themeSizeOptions: PoRadioGroupOption[] = [
        { label: 'small', value: 'small' },
        { label: 'medium', value: 'medium' },
    ];

    fontFamilyTheme!: string;
    fontFamilyThemeBold!: string;
    fontFamilyThemeExtraLight!: string;

    colors = {
        brand: {},
        action: {},
        neutral: {},
        feedback: {},
    };

    constructor(
        private themeService: PoThemeService,
        public poNotification: PoNotificationService) {
        // get the active theme, if exists, then persist the user preference
        const themeActive = this.themeService.getThemeActive();
        if (!themeActive) {
            this.themeService.setTheme(
                poThemeDefault,
                PoThemeTypeEnum.light,
                PoThemeA11yEnum.AAA
            );
            this.theme = poThemeDefault;
        } else {
            this.theme = this.themeService.persistThemeActive();
            // get Active values
            this.getActiveValues();
        }

        // notification duration
        this.poNotification.setDefaultDuration(2000);

        // update screen values
        this.getCssVariables();
    }

    // change the active theme
    changeTheme(value: string) {
        if (value === 'default') {
            this.theme = poThemeDefault;
        } else if (value === 'myTheme') {
            this.theme = myTheme;
        }

        this.themeService.setTheme(this.theme, this.themeType, this.themeA11y);

        // update screen values
        this.getCssVariables();
    }

    // change theme type
    changeThemeType(value: PoThemeTypeEnum) {
        this.themeService.setCurrentThemeType(value);

        // update screen values
        this.getCssVariables();
    }

    // change theme a11y
    changeThemeA11y(value: PoThemeA11yEnum) {
        this.themeService.setCurrentThemeA11y(value);

        // update theme size
        this.changeThemeSize(this.themeSize);

        // update screen values
        this.getCssVariables();
    }

    // change theme size
    changeThemeSize(value: string) {
        this.themeService.setA11yDefaultSizeSmall(value === 'small' ? true : false);
    }

    getActiveTheme() {
        return this.themeService.getThemeActive();
    }

    getActiveValues() {
        const active = this.getActiveTheme();
        if (active && active.active) {
            const { type, a11y } = active.active as { type: PoThemeTypeEnum; a11y: PoThemeA11yEnum };
            this.themeType = type;
            this.themeA11y = a11y;
        }
        this.themeSize = this.themeService.getA11yDefaultSize();
    }

    isThemeActive(value: string) {
        return this.getActiveTheme().name === value;
    }

    /// -----
    /**
     * this method is just a helper for this application to get all applied tokens on screen
     */
    getCssVariables() {
        const styles = getComputedStyle(document.documentElement);
        this.fontFamilyTheme = styles.getPropertyValue('--font-family-theme').trim();
        this.fontFamilyThemeBold = styles.getPropertyValue('--font-family-theme-bold').trim();
        this.fontFamilyThemeExtraLight = styles.getPropertyValue('--font-family-theme-extra-light').trim();

        this.colors.brand = {
            '01': {
                lightest: styles.getPropertyValue('--color-brand-01-lightest').trim(),
                light: styles.getPropertyValue('--color-brand-01-light').trim(),
                base: styles.getPropertyValue('--color-brand-01-base').trim(),
                dark: styles.getPropertyValue('--color-brand-01-dark').trim(),
                darkest: styles.getPropertyValue('--color-brand-01-darkest').trim(),
            },
            '02': { base: styles.getPropertyValue('--color-brand-02-base').trim(), },
            '03': { base: styles.getPropertyValue('--color-brand-03-base').trim() },
        };

        this.colors.action = {
            default: styles.getPropertyValue('--color-action-default').trim(),
            hover: styles.getPropertyValue('--color-action-hover').trim(),
            pressed: styles.getPropertyValue('--color-action-pressed').trim(),
            disabled: styles.getPropertyValue('--color-action-disabled').trim(),
            focus: styles.getPropertyValue('--color-action-focus').trim(),
        };

        this.colors.neutral = {
            light: {
                '00': styles.getPropertyValue('--color-neutral-light-00').trim(),
                '05': styles.getPropertyValue('--color-neutral-light-05').trim(),
                '10': styles.getPropertyValue('--color-neutral-light-10').trim(),
                '20': styles.getPropertyValue('--color-neutral-light-20').trim(),
                '30': styles.getPropertyValue('--color-neutral-light-30').trim(),
            },
            mid: {
                '40': styles.getPropertyValue('--color-neutral-mid-40').trim(),
                '60': styles.getPropertyValue('--color-neutral-mid-60').trim(),
            },
            dark: {
                '70': styles.getPropertyValue('--color-neutral-dark-70').trim(),
                '80': styles.getPropertyValue('--color-neutral-dark-80').trim(),
                '90': styles.getPropertyValue('--color-neutral-dark-90').trim(),
                '95': styles.getPropertyValue('--color-neutral-dark-95').trim(),
            },
        };

        this.colors.feedback = {
            negative: {
                lightest: styles.getPropertyValue('--color-feedback-negative-lightest').trim(),
                light: styles.getPropertyValue('--color-feedback-negative-light').trim(),
                base: styles.getPropertyValue('--color-feedback-negative-base').trim(),
                dark: styles.getPropertyValue('--color-feedback-negative-dark').trim(),
                darkest: styles.getPropertyValue('--color-feedback-negative-darkest').trim(),
            },
            info: {
                lightest: styles.getPropertyValue('--color-feedback-info-lightest').trim(),
                light: styles.getPropertyValue('--color-feedback-info-light').trim(),
                base: styles.getPropertyValue('--color-feedback-info-base').trim(),
                dark: styles.getPropertyValue('--color-feedback-info-dark').trim(),
                darkest: styles.getPropertyValue('--color-feedback-info-darkest').trim(),
            },
            positive: {
                lightest: styles.getPropertyValue('--color-feedback-positive-lightest').trim(),
                light: styles.getPropertyValue('--color-feedback-positive-light').trim(),
                base: styles.getPropertyValue('--color-feedback-positive-base').trim(),
                dark: styles.getPropertyValue('--color-feedback-positive-dark').trim(),
                darkest: styles.getPropertyValue('--color-feedback-positive-darkest').trim(),
            },
            warning: {
                lightest: styles.getPropertyValue('--color-feedback-warning-lightest').trim(),
                light: styles.getPropertyValue('--color-feedback-warning-light').trim(),
                base: styles.getPropertyValue('--color-feedback-warning-base').trim(),
                dark: styles.getPropertyValue('--color-feedback-warning-dark').trim(),
                darkest: styles.getPropertyValue('--color-feedback-warning-darkest').trim(),
            },
        };
    }
 
    getArrayFormObject(obj: Record<string, unknown> | null | undefined): [string, unknown][] | undefined {
        return obj ? Object.entries(obj) : undefined;
    }

    getTextColor(tone: unknown): string {
        if (typeof tone === 'string') {
            return tone.includes('light')
                ? 'var(--color-neutral-dark-80)'
                : 'var(--color-neutral-light-10)';
        }

        // fallback when tone is not a string
        return 'var(--color-neutral-light-10)';
    }

    copyClipboard(code: string) {
        navigator.clipboard.writeText(code);
        this.poNotification.information(`Token copiado: '${code}'`);
    }
}
