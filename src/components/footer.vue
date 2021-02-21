<template>
  
  <nav-bar/>
  
  <router-view/>

  <div class="navbar bg-primary">
        <div class="container container-md container-lg container-xl">
            <div class="d-flex justify-content-between align-content-center py-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h1 class="mb-0 d-none d-md-block"><router-link to="/" class="logo">Letsgodiving</router-link></h1>
                    <p class="text-md-xs text-lg-s text-secondary pb-0 mb-0 ml-3 ml-md-4">© 2021. All Rights Reserved.</p>
                </div>
                <ul class="main-nav d-flex justify-content-between align-items-center">
                    <li class="align-middle text-md-s"><router-link to="/host" class="text-light">揪潛伴</router-link></li>
                    <li class="ml-3 ml-md-4 align-middle text-md-s"><router-link to="/cart" class="text-light">我的行程</router-link></li>
                </ul>
            </div>
        </div>
  </div>

</template>