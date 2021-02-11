<template>
    <form>
        <div class="form-group">
            <label for="bonus">折扣碼</label>
            <input type="text" name="bonus" id="bonus" class="form-control w-100" maxlength="14"
                :value="items.keywords" @input="keying($event.target.value)">
                <!-- v-model="keying()"> -->
                <!-- @input="showOptions" :value="selectedValue" > -->
        </div>
    </form>
    <ul class="pl-0" v-if="items.isKeying"> 
        <li :key="optionTitle" v-for="(option, optionTitle) in items.searchResult" 
            class="d-flex justify-content-between"
            @click="selectOption(optionTitle)">

            <span>{{optionTitle}}</span>
            <!-- <span>{{option}}</span> -->
            <span>{{items.searchResult[optionTitle].desc}}</span>
        </li>
    </ul>
</template>

<script>
// import {computed, reactive, inject, onBeforeUpdate} from 'vue';
import {computed, reactive, inject} from 'vue';
import {useStore} from 'vuex';

export default {
    setup(context){
        const store = useStore();
        const optionSource = inject('optionSource', store.state.bonus);
        // let resultObj = {};

        const items = reactive({
            keywords:'',
            isKeying: '',
            searchResult: computed(()=>{
            // return JSON.parse(JSON.stringify(resultObj)); 
                items.isKeying = true;
                let resultObj = {};
                for(let optionName in optionSource){
                    if(optionName.startsWith(items.keywords)){
                        resultObj[optionName] = optionSource[optionName].desc;
                    }
                }
                if(Object.keys(resultObj)==0){
                    resultObj.查無優惠券 = '';
                    return resultObj;
                }
                return JSON.parse(JSON.stringify(resultObj));
            })                
        });

        const keying = value=>{
            if(value==''){
                items.isKeying = false;
                items.keywords = '';
            }else{
                items.isKeying = true;
                items.keywords = value;
            }
        }

        // onBeforeUpdate(()=>{
        //     items.isKeying = true;
        //     let resultObj = {};
        //     for(let optionName in optionSource){
        //         if(optionName.startsWith(items.keywords)){
        //             resultObj[optionName] = optionSource[optionName].desc;
        //         }
        //     }
        //     if(Object.keys(resultObj)==0){
        //         resultObj.查無優惠券 = '';
        //     }
        //     items.searchResult = JSON.parse(JSON.stringify(resultObj));
        //     console.log(resultObj)
        //     console.log(items.searchResult);
        // })


        const selectOption = optionTitle=>{
            items.keywords = optionTitle;
            context.emit('getOption', optionTitle)
        }

        return{
            items,
            selectOption,
            keying,
        }
    },

}
</script>

<style>

</style>
