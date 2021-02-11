<template>
    <div class="buyer-info shadow rounded mb-3 mb-md-4 p-2 p-lg-1 p-xl-2">
        <fb-profile  class="d-flex flex-column align-items-center"/>
        <contact-info />
    </div>
</template>

<script>
    import {provide} from 'vue';
    import {useStore} from 'vuex'
    import fbProfile from'../components/fbProfile';
    import contactInfo from '../components/contactInfo';
    export default {
        setup(){
            const store = useStore();
            provide('profile', store.state.profile);
        },
        components:{
            contactInfo,
            fbProfile,
        }
    }
</script>

<style>
    .buyer-info{
        background-color:rgb(35,212,240,0.1);
    }
    .buyer-info .contact-info ul{
        margin: 0 !important;
    }
</style>