const core = require('@actions/core');
const extractor = require('./src/extractor.js');
const parser = require('./src/parser.js');
const githubActionsIO = require('./src/actions_io.js');

function runAction(getInput, writeOutput) {
    const inputString = getInput('string', true);
    const extractorRegex = getInput('extractor_regex');
    const extractorGroup = getInput('extractor_group') || '1';
    const failOnError = getInput('fail-on-error');

    versionString = inputString;

    try {
        if (extractorRegex) {
            versionString = extractor.extractWithRegexString(inputString, extractorRegex, extractorGroup);
        }

        semanticVersion = parser.parse(versionString);

        writeOutput('major', semanticVersion.major);
        writeOutput('minor', semanticVersion.minor);
        writeOutput('patch', semanticVersion.patch);
        writeOutput('prerelease', semanticVersion.preRelease);
        writeOutput('build', semanticVersion.build);
        writeOutput('fullversion', semanticVersion.fullVersion);
        writeOutput('version', `${semanticVersion.major}.${semanticVersion.minor}.${semanticVersion.patch}`);
        writeOutput('minorversion', `${semanticVersion.major}.${semanticVersion.minor}`);
        
    }
    catch (error) {
        writeOutput('failed', 'true');
        if (failOnError) {
            core.setFailed(error.message);
        } else {
            core.warning(error.message);
        }
    }
}

runAction(githubActionsIO.getInput, githubActionsIO.writeOutput);
