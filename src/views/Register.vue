<template>
    <div class="register-container d-flex flex-column justify-content-between align-items-center">
        <div class="container container-md container-lg container-xl">
            <div class="register-container d-flex flex-column justify-content-center align-items-center">
                <div class="loading-pic-box position-relative">
                    <div class="position-relative">
                        <ul class="bubble-group position-absolute">
                            <li class="bubble1" v-if="stage1" key="bubble1"></li>
                            <li class="bubble2" v-if="stage2" key="bubble2"></li>
                            <li class="bubble3" v-if="stage3" key="bubble3"></li>
                        </ul>
                    </div>

                    <user-diver :userProfile="items.userProfile"/>
                    <div class="loading-text position-relative mt-3 mt-md-4">
                        <h2 class="text-primary d-inline-block mr-1 h4-md">{{hintText}}</h2>
                        <span class="dot" v-if="stage1" key="bubble1">·</span>
                        <span class="dot" v-if="stage2" key="bubble2">·</span>
                        <span class="dot" v-if="stage3" key="bubble3">·</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {ref, reactive, computed, onMounted, onUnmounted} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
import userDiver from '../components/userDiver'
export default {
    setup(){
        const router = useRouter();
        const store = useStore();

        const items = reactive({
            userProfile: computed(()=>store.state.profile),
            isLogin: false,
        });


        const totalDelay = 1800;
        const totalStage = 3;
        const sectionDelay = totalDelay/totalStage;

        let stage1 = ref(false);
        let stage2 = ref(false);
        let stage3 = ref(false);
        let hintText = ref(computed(()=>{
            if(items.isLogin){
                return '登入成功，跳轉中'
            }else{
                return '登入失敗，跳轉中'
            }
        }));
        
        onMounted(()=>{
            for(let i=1; i<=totalStage*5; i++){
                (stage=>{
                    setTimeout(duration=>{ 
                        switch(duration % (totalStage+1)){
                            case 1: 
                                stage1.value = true;
                                stage2.value = false;
                                stage3.value = false;
                                break;
                            case 2: 
                                stage1.value = true;
                                stage2.value = true;
                                stage3.value = false;
                                break;
                            case 3: 
                                stage1.value = true;
                                stage2.value = true;
                                stage3.value = true;
                                break;
                            case 0:
                                stage1.value = false;
                                stage2.value = false;
                                stage3.value = false;
                                break;
                        }
                    }, sectionDelay*stage, stage)
                })(i)
            }

        });

        (async()=>{
            let restURL = window.location.search.slice(1);
            await store.dispatch('Logining')
            if(restURL.startsWith('code')){
                items.isLogin = true;
                let code = restURL.split('&')[0];
                await store.dispatch('userLogin', code);
                setTimeout(()=>{router.push({ path: '/result' })},3000);
            }else{
                items.isLogin = false;
                setTimeout(()=>{router.push({ path: '/result' })},3000);
            }
        })();

        onUnmounted(()=>{
            store.dispatch('unLogining')
        })

        return {
            items,
            stage1,
            stage2,
            stage3,
            hintText,
        }
    },
    components:{
        userDiver,
    }
}
</script>

<style lang="scss" scoped>
    .register-container{
        height: 85vh;
    }

    .loading-pic-box{
        width: 310px;
        @media (max-width: 768px){
            width: 245px;
        }
    }

    .bubble-group{
        left: 260px;
        top: 15px;
        @media (max-width: 768px){
            left: 180px;
            top: 9px;
        }
    }

    .bubble1, .bubble2, .bubble3{
        content: '';
        display: inline-block;
        border-radius: 50%;
        border: 2px #343a40 solid;
        position: absolute;
    }

    .bubble1{
        width: 15px;
        height: 15px;
        @media (max-width: 768px){
            width: 8px;
            height: 8px;
        }
    }

    .bubble2{
        width: 20px;
        height: 20px;
        bottom: 20px;
        left: 15px;
        @media (max-width: 768px){
            width: 13px;
            height: 12px;
            bottom: 12px;
            left: 15px;
        }
    }

    .bubble3{
        width: 25px;
        height: 25px;
        bottom: 45px;
        left: -15px;
        @media (max-width: 768px){
            width: 17px;
            height: 17px;
            bottom: 35px;
            left: -13px;
        }
    }

</style>