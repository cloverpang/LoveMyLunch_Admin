
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            username:'',
            token:null,
			permissions:'',
			operationCenter:''
        },
        title: ''
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            window.localStorage.ms_token = data.token;
            window.localStorage.ms_username = data.username;
			window.localStorage.ms_permissions = data.permissions;
			window.localStorage.ms_operationCenter = data.operationCenter;
            state.user.token = data.token;
            state.user.username = data.username;
			state.user.permissions = data.permissions;
			state.user.operationCenter = data.operationCenter;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('ms_token');
            localStorage.removeItem('ms_username');
			localStorage.removeItem('ms_permissions');
			localStorage.removeItem('ms_operationCenter');
            state.user.token = null;
            state.user.username = '';
			state.user.permissions = '';
			state.user.operationCenter = '';
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
})