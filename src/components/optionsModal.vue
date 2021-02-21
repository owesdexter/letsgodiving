<template>
    <ul class="options-container pl-0 position-relative border border-secondary" v-if="items.isKeying"> 
        <li :key="index" v-for="(option, index) in items.searchResult" 
            class="options d-flex justify-content-between"
            @click="selectOption(option.id)">
            <span>{{option.title}}</span>
            <span>{{option.desc}}</span>
        </li>
    </ul>
</template>

<script>

import {computed, reactive, inject, ref} from 'vue';

export default {
    props:{
        bonusIndexArr:{
            type: Array,
        }
    },
    emits:['getOption'],
    setup(props, context){
        const optionSource = inject('optionSource');
        let isBonusAdded = ref();

        const items = reactive({
            searchResult: computed(()=>{
                let resultArr = [];
                for(let option of optionSource){
                    if(option.title.startsWith(items.keywords)){
                        resultArr.push(option)
                    }
                }
                let n = resultArr.length;
                if(n==0){
                    resultArr.push({title: '查無結果', desc: ''});
                    return resultArr;
                }
                return resultArr.slice(0, n)
            })                
        });



        const selectOption = optionIndex =>{
            if(props.bonusIndexArr.indexOf(optionIndex)<0){
                items.keywords = '';
                items.isKeying = false;
                isBonusAdded.value = false;
                context.emit('optionSelected', optionIndex)
            }else{
                isBonusAdded.value = true;
            }
        }


        return{
            items,
            selectOption,
            isBonusAdded,
        }
    },

}
</script>

<style>
    .options-container{
        position: absolute;
        top: 0;
        z-index: 1;
    }
</style>
