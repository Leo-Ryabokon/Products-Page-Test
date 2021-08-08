<template>
    <div :class="$style.topBar">
        <h1 :class="$style.text">Добавление товара</h1>
        <SortBtn />
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" module>
@import "./static/assets/scss/colors.scss";
.topBar{
    margin: 32px 32px 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text{
        font-weight: 600;
        font-size: 28px;
        line-height: 35px;
        color: $mainTextColor;
    }
}
</style>