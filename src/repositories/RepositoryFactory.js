import SearchRepository from './SearchRepository';
const repositories = {
    'search': SearchRepository
}
export default {
    get: name => repositories[name]
};