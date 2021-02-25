<template>
    <div class="navbar bg-primary">
        <div class="container container-md container-lg container-xl">
            <div class="d-flex justify-content-between align-content-center py-2">
                <h1 class="mb-0"><router-link to="/" class="logo">Letsgodiving</router-link></h1>
                <ul class="main-nav d-flex justify-content-between align-items-center">
                    <li class="align-middle"><router-link to="/host" class="text-light">揪潛伴</router-link></li>
                    <li class="ml-3 ml-md-4 align-middle"><router-link to="/cart" class="text-light">我的行程</router-link></li>
                    <li class="ml-3 ml-md-4 align-middle"><login-button/></li>
                    <!-- <li class="ml-3 ml-md-4 align-middle"><a class="text-light" :href="loginURL">手動登入</a></li> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import loginButton from './loginButton'
    export default{
        // setup(){
        //     let now = new Date();
        //     let statement = Date.parse(now) + 248738799749062;

        //     const loginURL = "https://www.facebook.com/v9.0/dialog/oauth/?"
        //         +"client_id=248738799749062"
        //         +"&redirect_uri=https://localhost:8080/register"
        //         +"&state=" 
        //         + statement;
        //     return{
        //         loginURL,
        //     }
        // },
        components:{
            loginButton,
            
        }
    }
</script>



