import { PoTheme, PoThemeA11yEnum, poThemeDefaultActions, poThemeDefaultActionsDark, poThemeDefaultDarkValues, poThemeDefaultFeedback } from '@po-ui/ng-components';
import { poThemeDefaultFeedbackDark, poThemeDefaultLightValues, poThemeDefaultNeutrals, PoThemeTokens, PoThemeTypeEnum } from '@po-ui/ng-components';

const onRoot = {
    '--font-family-theme': 'san-serif',
    '--font-family-theme-extra-light': 'monospace',
    '--font-family-theme-bold': 'fantasy',
    '--color-page-background-color-page': 'var(--color-neutral-light-05)',
};
const perComponent = {
    /** BUTTON */
    'po-button': {
        '--font-size': 'var(--font-size-sm)',
        '--border-width': 0,
        '--outline-color-focused': 'transparent',
    },
    'po-button[p-kind="primary"]': {
        '--text-color': 'var(--color-brand-01-base)',
        '--shadow': 'var(--shadow-md)',
        '--color': 'transparent',
        '--color-hover': 'var(--color-brand-01-lightest)',
    },
};

const myThemeLight: PoThemeTokens = {
    color: {
        brand: {
            '01': {
                lightest: '#f2eaf6',
                lighter: '#d9c2e5',
                light: '#bd94d1',
                base: '#753399',
                dark: '#5b1c7d',
                darker: '#400e58',
                darkest: '#260538',
            },
            '02': {
                base: '#b92f72',
            },
            '03': {
                base: '#ffd464',
            },
        },
        action: {
            ...poThemeDefaultActions,
            disabled: 'var(--color-neutral-mid-40)',
        },
        feedback: poThemeDefaultFeedback,
        neutral: {
            ...poThemeDefaultNeutrals,
        },
    },
    onRoot: {
        ...poThemeDefaultLightValues.onRoot,
        ...onRoot,
    },
    perComponent: {
        ...poThemeDefaultLightValues.perComponent,
        ...perComponent,
    },
};

const myThemeDark: PoThemeTokens = {
    color: {
        brand: {
            '01': {
                darkest: '#f2eaf6',
                darker: '#d9c2e5',
                dark: '#bd94d1',
                base: '#753399',
                light: '#5b1c7d',
                lighter: '#400e58',
                lightest: '#260538',
            },
            '02': {
                base: '#b92f72',
            },
            '03': {
                base: '#ffd464',
            },
        },
        action: {
            ...poThemeDefaultActionsDark,
            disabled: 'var(--color-neutral-mid-40)',
        },
        feedback: poThemeDefaultFeedbackDark,
        neutral: {
            light: {
                '00': '#1c1c1c',
                '05': '#202020',
                '10': '#2b2b2b',
                '20': '#3b3b3b',
                '30': '#5a5a5a',
            },
            mid: {
                '40': '#7c7c7c',
                '60': '#a1a1a1',
            },
            dark: {
                '70': '#c1c1c1',
                '80': '#d9d9d9',
                '90': '#eeeeee',
                '95': '#fbfbfb',
            },
        },
    },
    onRoot: {
        ...poThemeDefaultDarkValues.onRoot,
        ...onRoot,
    },
    perComponent: {
        ...poThemeDefaultDarkValues.perComponent,
        ...perComponent,
    },
};

export const myTheme: PoTheme = {
    name: 'my-theme',
    type: [
        {
            light: myThemeLight,
            dark: myThemeDark,
            a11y: PoThemeA11yEnum.AAA,
        },
        {
            light: myThemeLight,
            dark: myThemeDark,
            a11y: PoThemeA11yEnum.AA,
        },
    ],
    active: { type: PoThemeTypeEnum.light, a11y: PoThemeA11yEnum.AAA },
};
