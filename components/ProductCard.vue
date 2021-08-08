<template>
    <div :class="$style.productWrapper">
        <div :class="$style.productCard">
            <div :class="$style.productImgWrapper">
                <img :src="'https://frontend-test.idalite.com' + product.photo" :alt="product.name" :class="$style.productImg">
                <img src="../static/assets/trash-icon.png" @click.prevent="removeProduct(product)" alt="" role="button" :class="$style.trashIcon">
            </div>
            <h1 :class="$style.productName">{{ product.name }}</h1>
            <div :class="$style.productDescription">{{ product.description ?  product.description : "Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк"}}</div>
            <div :class="$style.productPrice">{{ product.price }} руб.</div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: {
        product: {
            type: Object,
            default: () => {
            }
        },
    },
    methods: {
        ...mapMutations(["removeProduct"]),
    },
}
</script>

<style lang="scss" module>
@import "./static/assets/scss/colors.scss";
.productWrapper{
    flex: 3;
    margin: 0 32px 16px 0;
    .productCard{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 332px;
        height: 423px;
        background: #FFFEFB;
        box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
        border-radius: 4px;
        cursor: pointer;

        .productImgWrapper{
            position: relative;

            .productImg{
                display: block;
                width: 332px;
                height: 200px;
            }

            .trashIcon{
                display: block;
                width: 32px;
                height: 32px;
                background: unset;
                position: absolute;
                top: -9px;
                right: -9px;
                opacity: 0;
            }
        }

        &:hover .trashIcon{
            opacity: 1;
        }

        .productName{
            font-weight: 600;
            font-size: 20px;
            line-height: 25px;
            color: $mainTextColor;
            margin: 16px 0 0 16px;
        }

        .productDescription{
                font-size: 16px;
                line-height: 20px;
                color: $mainTextColor;
                margin: 16px;
        }
        .productPrice{
            font-weight: 600;
            font-size: 24px;
            line-height: 30px;
            color: $mainTextColor;
            margin: 16px 16px 24px 16px;
        }
    }
}
</style>