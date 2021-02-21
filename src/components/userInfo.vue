<template>
    <fb-profile/>
    <contact-info />
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
    
</style>