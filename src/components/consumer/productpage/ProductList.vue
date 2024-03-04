<template>
    <div class="productList-container col-9 row">
        <div v-for="item in products" :key="item.id" class="col-4 mb-4 text-center">
            <div class="border border-1 border-secondary pb-4 rounded-1">
                <div class="image-container overflow-hidden position-relative" @click="productItemOnclick(item.id)">
                    <img :src="item.imageUrl" :alt="item.id" class="w-100 object-fit-cover productImg ">
                    <div class="w-100 position-absolute top-50 translate-middle-y">
                        <button type="button" class="btn btn-danger p-3 rounded-2 me-4" @click="productItemOnclick(item.id)">
                            <i class="bi bi-search fs-4"></i>
                        </button>
                        <button type="button" class="btn btn-hex p-3 rounded-2" @click.stop="addToCart(item.id)"
                            :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
                            <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                            <i class="bi bi-cart fs-4" v-else></i>
                        </button>
                    </div>
                </div>
                <div class="container">
                    <h3 class="fs-5 fw-bold my-3">{{ item.title }}</h3>
                    <p>
                        <span class="fs-5 text-pink fw-bold">NT{{ item.price }}</span>
                        <span class="text-decoration-line-through ps-3 fs-6">原價: {{ item.origin_price }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['products', 'loadingStatus', 'productItemOnclick' ,'addToCart']
}
</script>

<style lang="scss">
// 產品圖片
.productImg {
  height: 250px;
  transition: all ease .3s;
}
.image-container:hover .productImg{
  cursor: pointer;
  scale: 1.1;
  opacity: .7;
}
.image-container .btn{
    transition: all .4s ease;
    opacity: 0;
}
.image-container:hover .btn{
    opacity: .9;
}
</style>
