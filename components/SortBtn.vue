<template>
    <select :class="$style.sortButton" v-model="selected" @change.prevent="sortProducts">
        <option :class="$style.sortText" 
                v-for="(option, index) in options" :key="index" 
                v-bind:value="option.value">
                {{ option.text }}
        </option>
    </select>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return (
            {
                selected: 'byDefault',
                options: [
                    {text: 'По умолчанию', value: 'byDefault'},
                    {text: 'По наименованию', value: 'byName'},
                    {text: 'По цене max', value: 'byPriceMax'},
                    {text: 'По цене min', value: 'byPriceMin'},
                ]
            }
        )
    },
    methods: {
        ...mapMutations(['sortProductsByDefault', 'sortProductsByName', 'sortProductsByPriceMax', 'sortProductsByPriceMin']),
        sortProducts() {
            switch(this.selected) {
                case 'byDefault':
                    this.sortProductsByDefault()
                    break
                case 'byName':
                    this.sortProductsByName()
                    break
                case 'byPriceMax':
                    this.sortProductsByPriceMax()
                    break
                case 'byPriceMin':
                    this.sortProductsByPriceMin()
                    break
                default:
                    this.sortProductsByDefault()
            }
        }
    }

}
</script>

<style lang="scss" module>
@import "./static/assets/scss/colors.scss";
.sortButton{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background: #FFFEFB;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        border:none;
        outline: none;
        font-size: 12px;
        line-height: 15px;
        color: $subTextColor;
        margin-right: 5px;
        &:hover{
            cursor: pointer;
        }

        .sortText{
            font-size: 12px;
            line-height: 15px;
            color: $subTextColor;
            margin-right: 5px;
        }
    }
</style>