
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            username:'',
            token:null,
			permissions:''
        },
        title: ''
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            window.localStorage.ms_token = data.token;
            window.localStorage.ms_username = data.username;
			window.localStorage.ms_permissions = data.permissions;
            state.user.token = data.token;
            state.user.username = data.username;
			state.user.permissions = data.permissions;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('ms_token');
            localStorage.removeItem('ms_username');
			localStorage.removeItem('ms_permissions');
            state.user.token = null;
            state.user.username = '';
			state.user.permissions = '';
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
})