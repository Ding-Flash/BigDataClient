export default {
    namespaced: true,
    state:{
        currentTask: {},

    },
    mutations:{
        setTask(state, payload){
            state.currentTask = payload;
        }
    },
    getters:{

    }
}