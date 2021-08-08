
function extractWithRegexString(inputString, regexString, regexGroup='1')
{
    const group = regexGroup.toString()
    const regex = new RegExp(regexString, 'g');
    matches = regex.exec(inputString);

    if (null === matches) {
        throw new Error("Could not extract version using the given regex!");
    }

    return matches[group];
}

exports.extractWithRegexString = extractWithRegexString;

