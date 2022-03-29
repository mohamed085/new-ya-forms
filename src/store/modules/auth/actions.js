import router from "@/router";

export default {
    async login(context, payload) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let data = JSON.stringify({
            "email": payload.email,
            "password": payload.password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        let url = "https://yaformelbanna.we-work.pro/api/unauth/login"

        const response = await fetch(url, requestOptions);

        const responseData = await response.json();

        if (!responseData.status) {
            const error = new Error('');
            throw error;
        }

        let isAdmin = false
        if (responseData.msg.type == "admin") {
            isAdmin = 'true'
        }


        localStorage.setItem('token', responseData.msg.token)
        localStorage.setItem('id', responseData.msg.id)
        localStorage.setItem('name', responseData.msg.name)
        localStorage.setItem('photo', responseData.msg.img_src)
        localStorage.setItem('isAdmin', isAdmin)

        context.commit('setUser', {
            token: responseData.msg.token,
            userId: responseData.msg.id,
            name: responseData.msg.name,
            photo: responseData.msg.photo,
        })

    },

    tryLogin(context) {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        const name = localStorage.getItem('name')
        const photo = localStorage.getItem('photo')
        const isAdmin = localStorage.getItem('isAdmin')

        console.log(isAdmin)
        if (token && id) {
            context.commit('setUser', {
                token: token,
                userId: id,
                photo: photo,
                name: name,
                isAdmin: isAdmin
            })
        }
    },

    logout(context) {
        // let myHeaders = new Headers();
        // const token = localStorage.getItem('token')
        //
        // myHeaders.append("authToken", token);
        //
        // let requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     redirect: 'follow'
        // };
        //
        // let url = "https://yaformelbanna.we-work.pro//api/unauth/forget-password"
        // fetch(url, requestOptions)
        //     .then(response => response.json())

        context.commit('setUser', {
            token: null,
            userId: null,
            photo: null,
            name: null
        })
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        localStorage.removeItem('photo')
        localStorage.removeItem('isAdmin')

        router.push("/");
    }
}