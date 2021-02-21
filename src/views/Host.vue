<template>
  <div class="host-page container container-md container-lg container-xl mt-2 mt-md-4 mb-3 mb-md-5">
    <h2 class="mb-2 mb-md-3 h3-md">個人檔案</h2>
    <div class="row">
      <div class="col-12 col-md-8 mb-4 mb-md-5">
        <div class="host-profile-box d-flex p-2 p-md-3">
          <user-info/>
        </div>
      </div>
      <h2 class="col-12 col-md-8 h3-md mb-2 mb-md-3">活動資訊</h2>
      <div class="col-12 col-md-8">
        <form class="form-host" @submit.prevent="onSubmit">
          <div class="form-group row">
            <label for="title" class="col col-md-3 col-lg-2 col-form-label"><span class="text-danger">*</span>標題:</label>
            <div class="col-8 col-md">
              <input name="title" id="title" class="form-control" type="text" placeholder="為活動想個吸引人的標題吧" maxlength="11" v-model.trim="items.activity.details.title" required>
            </div>
          </div>

          <div class="form-group row">
            <label for="area" class="col col-md-3 col-lg-2 col-form-label"><span class="text-danger">*</span>區域: </label>
            <div class="col-8 col-md">
              <select name="area" id="area" class="form-control" v-model="items.activity.details.area" required>
                <option value="北部" selected>北部</option>
                <option value="中部" >中部</option>
                <option value="南部" >南部</option>
                <option value="東部" >東部</option>
                <option value="澎湖" >澎湖</option>
                <option value="綠島" >綠島</option>
                <option value="蘭嶼" >蘭嶼</option>
                <option value="小琉球" >小琉球</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label for="location" class="col col-md-3 col-lg-2 col-form-label"><span class="text-white">*</span>潛點: </label>
            <div class="col-8 col-md">
              <input name="location" id="location" class="form-control" type="text" maxlength="20" v-model.trim="items.activity.details.location">
            </div>
          </div>

          <div class="datepicker form-group row">
            <label for="startDate" class="col col-md-3 col-lg-2 col-form-label"><span class="text-danger">*</span>出發日:</label>
            <div class="col-8 col-md">
              <datepicker-lite @value-changed="changeStart"/>
            </div>
          </div>

          <div class="datepicker form-group row">
            <label for="endDate" class="col col-md-3 col-lg-2 col-form-label"><span class="text-danger">*</span>回程日:</label>
            <div class="col-8 col-md">
              <datepicker-lite @value-changed="changeEnd"/>
            </div>
          </div>
        
          <div class="form-group row">
            <label for="num" class="col col-md-3 col-lg-2 col-form-label"><span class="text-danger">*</span>人數:</label>
            <div class="col-8 col-md">
              <input id="num" class="form-control" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="2" v-model.number="items.activity.details.num" required>
            </div>
          </div>

          <p class="w-100 text-right text-danger" v-if="items.isNumErr">最小邀請人數為1，最大為99</p>

          <div class="form-group row">
            <label for="fee" class="col col-md-3 col-lg-2 col-form-label"><span class="text-white">*</span>車馬費:</label>
            <div class="col-8 col-md">
              <input id="fee" class="form-control" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="5" placeholder="NTD/人" v-model="items.activity.details.fee">
            </div>
          </div>

          <div class="form-group row">
            <label for="comment" class="col col-md-3 col-lg-2 col-form-label"><span class="text-white">*</span>備註</label>
            <div class="col-8 col-md">
              <textarea id="comment" class="form-control" name="description" placeholder="說明..." maxlength="240" v-model="items.activity.details.description"></textarea>
            </div>
          </div>

          <p class="w-100 text-right text-danger" v-if="items.isSubmitErr">*為必填欄位</p>

          <div class="host-buttons text-right ">
            <button class="d-inline-block btn btn-primary" @click="submitDetail" :class="{disabled: !items.isLogin}">提交</button> 
            <router-link class="d-inline-block btn btn-outline-primary ml-3 ml-md-4" to="/result" tag="button">取消</router-link>
          </div>

        </form>
      </div>
    </div>
  </div>

</template>

<script>
  import{reactive, provide, computed} from 'vue';
  import{useStore} from 'vuex';
  import{useRouter} from 'vue-router';
  import {apipostAct} from '../assets/axiosAPI.js';
  import DatepickerLite from "vue3-datepicker-lite";
  import userInfo from '../components/userInfo';

  export default{ 
    setup(){
      const store = useStore();
      const router = useRouter();

      const items = reactive({
        activity: {
          actID:'',
          isAdded: false,
          bulitTime: '',
          host:{
            name: computed(() =>store.state.profile.name),
            userPicURL: computed(() =>store.state.profile.userPicURL),
            link: computed(() =>store.state.profile.link),
            license: computed(() =>store.state.profile.license),
            phone: computed(() =>store.state.profile.phone),
            email: computed(() =>store.state.profile.email),
          },
          details: {
            title:'',
            area: '',
            location: '',
            date: {
              start: '',
              end:'',
            },
            num: '',
            fee: '',
            description: '',
            attendee: '',
          },
        },
        isLogin: true,
        // isLogin: isNaN(store.state.profile.loginTime),
        isSubmitErr: false,
        isNumErr: false,

      });

      const submitDetail = ()=>{
        if(!(isNaN(items.activity.details.title) 
        & isNaN(items.activity.details.area) 
        & isNaN(items.activity.details.date.start) 
        & isNaN(items.activity.details.date.end)
        & (items.activity.details.num>0) )){
          items.isSubmitErr = true;
        }else if(items.activity.details.num<1){
          items.isNumErr == true;
        }else{
          // Submit activity
          let act = items.activity;
          let now = new Date();
          if(act.details.date.start>items.activity.details.date.end){
            let replacement = items.activity.details.date.start;
            act.details.date.start = items.activity.details.date.end;
            act.details.date.end = replacement;
          }
          
          if(!isNaN(store.state.profile.loginTime)){
            // act.host.userPicURL = 'https://raw.githubusercontent.com/owesdexter/letsgodiving/master/src/assets/imgs/unloggined.png';
            act.host.name = '未登入'
            act.host.id = now.getTime();
          }

          if(!isNaN(act.details.fee)){
            act.details.fee = 0;
          }else{
            act.details.fee = parseInt(items.activity.details.fee)
          }

          act.num = parseInt(items.activity.details.num)
          act.bulitTime = now.getTime();
          store.dispatch('reloadUserActObj')
          apipostAct(act)
          console.log('upload activity!')

          // Redirect to Home
          router.push({ path: '/' });
          // setTimeout(()=>{ window.location.reload(); },900);
        }
      };

      const changeStart = (Start) => {
        items.activity.details.date.start = Start;
      };
      const changeEnd = (End) => {
        items.activity.details.date.end = End;
      };

      provide('profile', store.state.profile);

      return{
        items,
        submitDetail,
        DatepickerLite,
        changeStart,
        changeEnd,
      }

    },
    components:{
      userInfo,
    }
  }


</script>

<style lang="scss">
  .host-page .disabled{
    background-color: gray;
  }

  .host-page .datepicker input{
    background-color: white;
    text-align: center;
    line-height: 2;
    border: #ced4da 1px solid;
    border-radius: 0.25rem;
    width: 100%;
  }

  /*--------------------------HostProfile--------------------------*/
  .host-profile-box{
    border-radius: 20px;
    background-color:rgb(35,212,240,0.1);
  }

</style>