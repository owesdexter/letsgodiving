<template>
    <div class="position-relative d-flex flex-column align-items-center">
        <img :src="`${props.userProfile.userPicURL}`" alt="FB-pic" class="d-block fb-pic">
        <img src="@/assets/imgs/freediver.png" alt="freediver" class="d-block diver-pic">
    </div>
</template>

<script>
export default {
    props:{
        userProfile:{
            type: Object,
        }
    },
    setup(props){
        return {
            props,
        }
    }
}
</script>

<style lang="scss" scoped>
.fb-pic{
    width: 50px;
    object-fit: cover;
	border-radius: 50%;
	position: absolute;
    top: -13px;
    right: 60px;

	@media (max-width: 768px){
		width: 25px;
		height: 25px;
        top: -4px;
        right: 74px;
    }
}

.diver-pic{
    width: 200px;
    object-fit: cover;
    top: -5px;
    right: 10px;
	
	@media (max-width: 768px){
		width: 100px;
	}

}
</style>