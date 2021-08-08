<template>
    <div :class="$style.content">
        <ProductCard v-for="product in allProducts" :key="product.id" :product="product"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed: mapGetters(["allProducts"]),
    methods: {...mapActions(["getProducts"])
    },
    async mounted() {
        this.getProducts()
    },
}
</script>

<style lang="scss" module>
@import "./static/assets/scss/colors.scss";
.content{
    flex: 9;
    display: flex;
    flex-wrap: wrap;
}
</style>