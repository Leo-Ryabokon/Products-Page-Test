<template>
    <div :class="$style.sideBar">
        <form @submit.prevent="submit" :class="$style.sideBarFormWrapper">
            <div :class="$style.productNameWrapper">
                <div :class="$style.labelText">Наименование товара<span :class="$style.redStar"></span></div>
                <div :class="$style.productRequiredFieldWrapper">
                    <input v-model="$v.name.$model" type="text" :class="[$style.productRequiredField, {[$style.invalid]: ($v.name.$dirty && !$v.name.required)}]" placeholder="Введите наименование товара">
                </div>
                <div :class="$style.error" v-if="$v.name.$dirty && !$v.name.required">Поле является обязятельным</div>
            </div>
            <div :class="$style.productDescriptionWrapper">
                <div :class="$style.labelText">Описание товара</div>
                <div :class="$style.productDescriptionFieldWrapper">
                    <textarea v-model="description" type="text" :class="$style.productDescriptionField" placeholder="Введите описание товара"></textarea>
                </div>
            </div>
            <div :class="$style.productImgUrlWrapper">
                <div :class="$style.labelText">Ссылка на изображение товара<span :class="$style.redStar"></span></div>
                <div :class="$style.productRequiredFieldWrapper">
                    <input v-model.trim="$v.urlImg.$model" type="text" :class="[$style.productRequiredField, {[$style.invalid]: $v.urlImg.$dirty && !$v.urlImg.required || !$v.urlImg.url}]" placeholder="Введите ссылку">
                </div>
                <div :class="$style.error" v-if="$v.urlImg.$dirty && !$v.urlImg.required">Поле является обязятельным</div>
                <div :class="$style.error" v-else-if="$v.urlImg.$dirty && !$v.urlImg.url">Введите URL</div>
            </div>
            <div :class="$style.productPriceWrapper">
                <div :class="$style.labelText">Цена товара<span :class="$style.redStar"></span></div>
                <div :class="$style.productRequiredFieldWrapper">
                <input v-model.number="$v.price.$model" type="text" :class="[$style.productRequiredField, {[$style.invalid]: ($v.price.$dirty && !$v.price.required || !$v.price.numeric)}]" placeholder="Введите цену">
                </div>
                <div :class="$style.error" v-if="$v.price.$dirty && !$v.price.required">Поле является обязятельным</div>
                <div :class="$style.error" v-else-if="$v.price.$dirty && !$v.price.numeric">Введите цену цифрами</div>
            </div>
            <div :class="$style.sideBarFormButtonWrapper">
                <button :class="[$style.sideBarFormButton, {[$style.disabled]: !isComplete || $v.$error}]" type="submit" :disabled="!isComplete || $v.$error">Добавить товар</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { required, url, numeric } from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            id: Date.now(),
            name: "",
            description: "",
            urlImg: "",
            price: "",
        }
    },
    computed:{
        isComplete() {
            return this.name && this.urlImg && this.price
        }
    },
    validations: {
        name: { required },
        urlImg: { required, url },
        price: { required, numeric },
    },
    methods: {
        ...mapMutations(["addProduct"]),
        submit() {
            this.addProduct({
                id: this.id,
                name: this.name.toUpperCase(),
                description: this.description,
                urlImg: this.urlImg,
                price: this.price
            });
            this.name = this.description = this.urlImg = this.price = "";
            this.$v.$reset();
        }
    }
}
</script>

<style lang="scss" module>
@import "./static/assets/scss/colors.scss";
.sideBar{
    flex: 3;
    
    .sideBarFormWrapper{
        width: 332px;
        margin: 0 32px 32px 32px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        background: #FFFEFB;
        box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
        border-radius: 4px;

        .labelText{
            font-size: 10px;
            line-height: 13px;
            letter-spacing: -0.02em;
            color: $formTextColor;
            margin-bottom: 5px;

        .redStar{
            width: 4px;
            height: 4px;
            border-radius: 50%;
            margin-left: 1px;

            &::after{
                content: "\2022";
                color:$warningColor;
                vertical-align: super;
                font-size: 16px;
                    }
                }
            }

        .productRequiredFieldWrapper{
                width: 284px;
                height: 36px;
                background: #FFFEFB;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                margin-bottom: 5px;

                .productRequiredField{
                    width: 95%;
                    height: 100%;
                    padding-left: 16px;
                    vertical-align: middle;
                    border: none;
                    outline: none;
                    font-size: 12px;
                    &::-webkit-input-placeholder{
                        font-size: 12px;
                        line-height: 32px;
                        color: $subTextColor;
                    }
                    &::-moz-placeholder{
                        font-size: 12px;
                        line-height: 32px;
                        color: $subTextColor;
                    }
                }
                .invalid{
                    border: 1px solid $warningColor;
                    border-radius: 4px;
                }
        }

        .error{
                font-size: 8px;
                line-height: 10px;
                letter-spacing: -0.02em;
                color: $warningColor;
            }

        .productNameWrapper{
            margin: 24px 24px 16px 24px;
        }

        .productDescriptionWrapper{
            margin: 0 24px 16px 24px;

            .textDescription{
                font-size: 10px;
                line-height: 13px;
                letter-spacing: -0.02em;
                color: $mainTextColor;
                margin-bottom: 5px;
            }

            .productDescriptionFieldWrapper{
                    width: 284px;
                    height: 108px;
                    background: #FFFEFB;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    margin-bottom: 5px;

                    .productDescriptionField{
                        width: 95%;
                        height: 90%;
                        padding: 10px 0 0 16px;
                        border: none;
                        outline: none;
                        resize: none;
                        font-size: 12px;
                        &::-webkit-input-placeholder{
                            font-size: 12px;
                            line-height: 15px;
                            color: $subTextColor;
                        }
                        &::-moz-placeholder{
                            font-size: 12px;
                            line-height: 15px;
                            color: $subTextColor;
                        }
                    }
                }
        }

        .productImgUrlWrapper{
            margin: 0 24px 16px 24px;
        }
        .productPriceWrapper{
            margin: 0 24px 16px 24px;
        }
        .sideBarFormButtonWrapper{
            margin: 0 24px 24px 24px;
            width: 284px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;

            .sideBarFormButton{
                width: 100%;
                height: 100%;
                font-weight: 600;
                font-size: 12px;
                line-height: 15px;
                text-align: center;
                letter-spacing: -0.02em;
                background: $successBtnColor;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                color: #FFFFFF;
                border: none;
                cursor: pointer;                
            }
            .disabled{
                width: 100%;
                height: 100%;
                font-weight: 600;
                font-size: 12px;
                line-height: 15px;
                text-align: center;
                letter-spacing: -0.02em;
                background: $disabledBtnColor;
                border-radius: 10px;
                color: $subTextColor;
                border: none;
                cursor: pointer;
            }
        }
    }
}
</style>