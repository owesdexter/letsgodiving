<template>
    <div class="navbar bg-primary">
        <div class="container container-md container-lg container-xl">
            <div class="d-flex justify-content-between align-content-center py-2">
                <h1 class="mb-0"><router-link to="/" class="logo">Letsgodiving</router-link></h1>
                <ul class="main-nav d-flex justify-content-between align-items-center">
                    <li class="align-middle"><router-link to="/host" class="text-light">揪潛伴</router-link></li>
                    <li class="ml-3 ml-md-4 align-middle"><router-link to="/cart" class="text-light">我的行程</router-link></li>
                    <li class="ml-3 ml-md-4 align-middle"><login-button/></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import loginButton from './loginButton'
    
    export default{
        components:{
            loginButton,
        }
    }
</script>



