<template>
    <h2>已登入</h2>
</template>
<script>
import {onMounted} from 'vue';
import FB_SDK from '../assets/FBSdk.js';
// import {useStore} from 'vuex';
// import {useRouter} from 'vue-router'
export default {
    setup(){
        // const router = useRouter();
        // const store = useStore();

        onMounted(async()=>{
            let profile = ()=>{FB_SDK.manualLogin()}
            await FB_SDK.initFbSdk();
            // let profile = await FB_SDK.manualLogin();
            setTimeout(()=>{console.log(profile())},1000);
            // console.log(profile);
            // store.dispatch('storeProfile', profile);
            // store.dispatch('manualLogin');
            // setTimeout(()=>{router.push({ path: '/result' })},1000);
        })
        return{

        }
    }
}
</script>