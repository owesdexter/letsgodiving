<template>
    <div class="contact-info w-100 bg-transparent">
      <ul class="pl-0 ml-3 ml-md-4 ml-xl-5" >
        <li class="mb-2 mb-md-3 h6-md text-lg-m text-h5">PADI freediver</li>
        <li class="mb-2 mb-md-3 text-lg-m text-h5"><a href="tel:+886928039477" class="text-lg-m text-h5">+886 928039477</a></li>
        <li class="mb-2 text-lg-m text-h5"><a href="mailto:owesdexter2011@gmail" class="text-lg-m text-h5">owesdexter2011@gmail.com</a></li>
      </ul>
      <ul class="socail-media d-flex justify-content-end pl-0">
        <li><a href="https://www.facebook.com/juzhong.chen"><i class="fab fa-facebook icons h5-sm text-h2"></i></a></li>
        <li class="ml-2 ml-md-3 ml-xl-4"><a href="https://www.instagram.com/owesdexter2011/"><i class="fab fa-instagram h5-sm text-h2"></i></a></li>
        <li class="ml-2 ml-md-3 ml-xl-4"><a href="#"><i class="fab fa-line icons h5-sm text-h2"></i></a></li>
      </ul>
    </div>
</template>

<script>
    import {reactive, inject} from 'vue';
    import {useStore} from 'vuex';
    export default {
        setup(){
            const store = useStore();
            const index = inject('index', 0);
            const resourceActivity = inject('resourceActivity', store.state.actDisplay)
            
            const items = reactive({
                activity: resourceActivity[index],
            })
            return{
                items,
            }
        }
    }
</script>

<style scoped>

</style>