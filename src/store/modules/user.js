const namespaced = true

const initState = {
    uid: 0,
    username: '未登入',
    super: 0,
    score: 0,
    photo: '',
    english_name: ''
}
const state = Object.assign({},initState);

const actions = {
    login({commit}) {
        return new Promise((resolve, reject) => {
            Api.loginUser().then(res => {
                if (res.status === 1){
                    commit('login',{
                        uid: res.data.user.uid,
                        username: res.data.user.username,
                        super: res.data.user.super,
                        score: res.data.user.score,
                        photo: res.data.user.photo ? res.data.user.photo : '',
                        english_name: res.data.user.english_name ? res.data.user.english_name : '',
                    });
                    setInterval(() => { Api.pingUser(); }, 60000);
                }
                resolve();                
            });
        });
    },
    loginout({commit}) {
        commit('loginout');
    },
    changeData({commit},data){
        commit('login',data);
    }
}

const mutations = {
    login(state, payload) {
        if (!payload) payload = {};
        Object.assign(state, payload);
    },
    loginout(state) {
        state = Object.assign({}, initState);
    }
}

export default {
    namespaced,
    state,
    actions,
    mutations
}