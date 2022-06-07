import Repository from "./../../repositories/RepositoryFactory";
const SearchRepository = Repository.get("search");

export default {
  state: {
    datas: [],
  },
  getters: {
    getDatas: state => state.datas,
  },
  mutations: {
    SET_SEARCH(state,datas) { 
        return state.datas = datas
    },
  },
  actions: {
    async setSearch({commit},payload) {
        try {
            const res = await SearchRepository.get(payload)
            commit('SET_SEARCH', res.results)
        } catch (error) {
            return Promise.reject(error)
        }
    },
  }
}
