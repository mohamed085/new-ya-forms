export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.name = payload.name;
        state.photo = payload.photo;
        state.isAdmin = payload.isAdmin;
    }
}