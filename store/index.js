export const state = () => ({
    products: [],
    sortedProducts: [],
});
export const actions = {
    // Получение данных с API
    async getProducts ({ commit }) {
        const products = localStorage.products ?
        JSON.parse(localStorage.getItem('products')) :
        await this.$axios.$get('https://frontend-test.idalite.com/api/product')
        commit('updateProducts', products)
    },
};
export const mutations = {
    // Обновление стейта
    updateProducts(state, products) {
        state.products = products
        this.commit('sortProductsByDefault')
        this.commit('saveToLocalStorage')
    },
    // Добавление товара из формы
    addProduct(state, newProduct) {
        state.sortedProducts.unshift(newProduct)
        state.products.unshift(newProduct)
        this.commit('saveToLocalStorage')
    },
    // Удаление товара со страницы
    removeProduct(state, product) {
        let indexP = state.products.indexOf(product)
        let indexSP = state.sortedProducts.indexOf(product)
        state.products.splice(indexP, 1)
        state.sortedProducts.splice(indexSP, 1)
        this.commit('saveToLocalStorage')
    },
    // Сохранение данных в LocalStorage
    saveToLocalStorage(state){
        if(state.sortedProducts.length > 1) {
            let parsed = JSON.stringify(state.sortedProducts)
            localStorage.setItem('products', parsed)
        } else {
            let parsed = JSON.stringify(state.products)
            localStorage.setItem('products', parsed)
        }

    },
    // Сортировка товара по умолчанию
    sortProductsByDefault(state) {
        state.sortedProducts = [...state.products]
        this.commit('saveToLocalStorage')
    },
    // Сортировка товара по наименованию
    sortProductsByName(state) {
        state.sortedProducts = [...state.products]
        state.sortedProducts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        this.commit('saveToLocalStorage')
    },
    // Сортировка товара по цене от меньшего к большему
    sortProductsByPriceMin(state) {
        state.sortedProducts = [...state.products]
        state.sortedProducts.sort((a, b) => a.price - b.price)
        this.commit('saveToLocalStorage')
    },
    // Сортировка товара по цене от большего к меньшему
    sortProductsByPriceMax(state) {
        state.sortedProducts = [...state.products]
        state.sortedProducts.sort((a, b) => b.price - a.price)
        this.commit('saveToLocalStorage')
    },
};
export const getters = {
    // Получение данных из стейта
    allProducts(state) {
        return state.sortedProducts
    },
}