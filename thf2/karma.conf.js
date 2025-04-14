// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('karma-junit-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        jasmineHtmlReporter: {
            //suppressAll: true // removes the duplicated traces
        },
        coverageReporter: {
            dir: require('path').join(__dirname, 'coverage'),
            subdir: '.',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
                { type: 'lcov', subdir: '.', file: 'lcov.info' },
                { type: 'cobertura', subdir: '.', file: 'coverage.xml' }
            ]
        },
        reporters: ['progress', 'junit', 'kjhtml'],
        browsers: ['Chrome'],
        restartOnFileChange: true,
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        junitReporter: {
            outputDir: 'reports',
            outputFile: 'tu-report.xml',
            useBrowserName: false
        }
    });
};
