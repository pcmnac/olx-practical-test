
const SUCCESS_SUFFIX = '_SUCCESS';
const ERROR_SUFFIX = '_ERROR';

const successType = type => type + SUCCESS_SUFFIX;
const errorType = type => type + ERROR_SUFFIX;

export {
    successType,
    errorType,
}