export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    name(state) {
        return state.name;
    },
    photo(state) {
        return state.photo;
    },
    isAdmin(state) {
        return state.isAdmin;
    },
    isAuthenticated(state) {
        return !!state.token;
    }


}