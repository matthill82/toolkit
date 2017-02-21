angular
    .module('uitoolkit')
    .run(simpleHbRun);

/**
 * @param hbNodeTemplate
 */
function simpleHbRun(hbNodeTemplate) {
    // Overriding template based on type and format
    hbNodeTemplate.addTemplate(
        '/components/ng-components/simple-hb/hidden-field.html',
        'string',
        'hidden-field'
    );

    hbNodeTemplate.addTemplate(
        '/components/ng-components/simple-hb/signature-capture.html',
        'string',
        'signature-capture'
    );

    hbNodeTemplate.addTemplate(
        '/components/ng-components/simple-hb/auto-boolean.html',
        'boolean',
        'hidden-field'
    );

    hbNodeTemplate.addTemplate(
        '/components/ng-components/simple-hb/auto-password.html',
        'string',
        'password'
    );

    hbNodeTemplate.addTemplate(
        '/components/ng-components/simple-hb/auto-string-image-capture.html',
        'string',
        'image-capture'
    );

    hbNodeTemplate.addTemplate(
        '/components/ng-components/simple-hb/auto-string-scannable.html',
        'string',
        'scannable'
    );
}
