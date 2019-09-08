export default {
    namespaced: true,
    state:{
        currentTask: '',
        currentTaskName: ''
    },
    mutations:{
        setTask(state, payload){
            state.currentTask = payload;
        },
        setCurrentTaskName(state, payload){
            state.currentTaskName = payload
        }
    }
}