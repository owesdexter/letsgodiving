<template>
    <form>
        <div class="form-group mb-0">
            <input type="text" name="bonus" id="bonus" class="form-control w-100" maxlength="14"
                :value="items.keywords" @input="keying($event.target.value)" @blur="blurEvent">
        </div>
        <ul class="options-container pl-0 position-relative border border-secondary" v-if="items.isKeying"> 
            <li :key="index" v-for="(option, index) in items.searchResult" 
                class="options d-flex justify-content-between"
                @click="selectOption(option.id)">
                <span>{{option.title}}</span>
                <span>{{option.desc}}</span>
            </li>
        </ul>
    </form>
    <p class="text-danger" v-if="items.isBonusAdded"><slot></slot></p>
</template>

<script>

import {computed, reactive, inject} from 'vue';
import {useStore} from 'vuex';

export default {
    props:{
        bonusIndexArr:{
            type: Array,
        }
    },
    emits:['getOption'],
    setup(props, context){
        const store = useStore();
        const optionSource = inject('optionSource', store.state.bonus);


        const items = reactive({
            keywords:'',
            isKeying: '',
            isBonusAdded: '',
            searchResult: computed(()=>{
                let resultArr = [];
                for(let option of optionSource){
                    if(option.title.startsWith(items.keywords)){
                        resultArr.push(option)
                    }
                }
                let n = resultArr.length;
                if(n==0){
                    resultArr.push({id: 101, title: '查無結果', desc: ''});
                    return resultArr;
                }
                return resultArr.slice(0, n)
            })                
        });

        const keying = value=>{
            items.isBonusAdded = false;
            if(value==''){
                items.isKeying = false;
                items.keywords = '';
            }else{
                items.isKeying = true;
                items.keywords = value;
            }
        }

        const selectOption = optionIndex=>{
            if(props.bonusIndexArr.indexOf(optionIndex)<0){
                context.emit('getOption', optionIndex)
                items.keywords = '';
                items.isKeying = false;
                items.isBonusAdded = false;
            }else if(optionIndex>100){
                console.log('no result')
            }else{
                items.isBonusAdded = true;
            }
        }

        const blurEvent = ()=>{
            items.isBonusAdded = false;
            setTimeout(()=>{items.isKeying = false}, 500);
        }

        return{
            items,
            selectOption,
            keying,
            blurEvent
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
