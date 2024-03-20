<script setup lang="ts">


defineProps<{title:string }>()

const login = ()=>{
  console.log("Clicked Login.");
  
}
const signup = ()=>{
  console.log("Clicked Signup.");

}
</script>

<template>
  <nav class="nav">
    <h1 class="title">{{title}}</h1>

    <div class="buttons-container">
      <button disabled id="btn-signup" @click="signup" >Signup</button>
      <button disabled id="btn-login" @click="login" >Login</button>
    </div>
   
  </nav>
</template>

<style scoped>
.nav{
  display: flex;
  justify-content: space-evenly;
  align-self: center;
  width: 100%;

  align-items: center;

  background-color: color-mix(in srgb,var(--background),#0f0f0f 15%); 
}
.buttons-container > button{
 margin: 0.5em;
 
}
.buttons-container>button:hover{
  cursor: not-allowed;
  
}
</style>
