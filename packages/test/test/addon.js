'use strict';

const removeUnused = require('@putout/plugin-remove-unused-variables');

const removeConsole = require('./fixture/remove-console');
const test = require('..')(__dirname, {
    'remove-console': removeConsole
});

test('test: property identifier', (t) => {
    t.transform('var', {
        'remove-unused-variable': removeUnused,
    });
    
    t.end();
});

