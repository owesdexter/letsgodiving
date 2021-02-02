<template>
    <form>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li v-for="(act, index) in items.sourceArr" :key="index">{{act}}</li>
        </ul>
    </form>
        <button @click="addInfo">submit</button>
    <div>
        <h2>{{items.counter}}</h2>
        <button @click = "addValue">
            Add counter
        </button>
    </div>
    <div>
        <h3 class="w" id="D">W</h3>
        <button @click="changText">
            change words
        </button>
    </div>
</template>

<script>
  import {reactive} from 'vue';

  export default {
    setup(){
        const items = reactive({
            sourceArr: [
                5,6,7
            ],
            counter:'',


        })
        
        const addValue = ()=>items.counter++;
        const changText = ()=>{
            var t=document.getElementById('D').innerText;
            if(t=='W'){
                document.getElementById('D').innerText = 'zzz';
            }else{
                document.getElementById('D').innerText = 'W';
            }
        }

        const addInfo = ()=>{
            // if (!value) {return};
            let g = 'abcdefg';
            console.log("add is touched")
            console.log(g.split("").reverse())
        }
        
      return{
          items,
          addValue,
          changText,
          addInfo,
      }
    }
  }
</script>

<style scoped>

</style>
