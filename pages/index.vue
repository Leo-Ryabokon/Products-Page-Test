<template>
  <div :class="$style.app">
    <TopBar/>
    <div :class="$style.contentContainer">
      <SideBar/>
      <Content/>
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" module>
@import "./static/assets/scss/colors.scss";
.app{

  .contentContainer{
    display: flex;
    width: 100%;
    height: calc(100vh - 83px);
  }
}
</style>