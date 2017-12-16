//初始化
const namespaced = true

const state = {
    styleClass: 'normal',
    closeBtn: 1,
    show: 0,
    style: { width: '500px', height: '240px', marginLeft: '-250px', marginTop: '-120px' },
    tle: '彈框標題',
    cnt: '彈框內容',
    btn: [
        {
            txt: '取消',
            type: 'cle'
        },
        {
            txt: '確定',
            type: 'ok'
        }
    ]
}
//action
const actions = {
    show({ commit, state }, data) {
        commit('doshow', data);
    },
    hide({ commit, state }) {
        commit('dohide');
    }
}
//reducer
const mutations = {
    doshow(state, payload) {
        if (!payload) payload = {};
        Object.assign(state, payload);
        state.show = 1;
    },
    dohide(state) {
        state.show = 0;
    }
}

export default {
    namespaced,
    state,
    actions,
    mutations
}