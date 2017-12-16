const namespaced = true
//初始化
const state = {
    fn: '',
    opacity: .7,
    show: 0
}

const actions = {
    show({ commit, state }, data) {
        commit('doshow', data);
    },
    hide({ commit, state }) {
        commit('dohide');
    }
}

const mutations = {
    doshow(state, payload) {
        if(!payload) payload = {};
        Object.assign(state,payload);
        state.show = 1;
    },
    dohide(state) {
        state.show = 0;
        state.fn = '';
    }
}

export default {
    namespaced,
    state,
    actions,
    mutations
}