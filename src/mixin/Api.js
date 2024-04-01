import axios from 'axios'

// admin使用的API
// 後台登入驗證使用
export async function signInApi (userInfo) {
  const { VITE_API } = import.meta.env
  const response = await axios.post(`${VITE_API}/admin/signin`, userInfo)
  return response.data
}
export async function checkAdminApi () {
  const { VITE_API } = import.meta.env
  const response = await axios.post(`${VITE_API}/api/user/check`, {})
  return response.data
}
// 產品管理（創建、讀取(含分頁)、變更、刪除)
export async function createProductApi (productInfo) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.post(`${VITE_API}/api/${VITE_PATH}/admin/product`, { data: productInfo })
  return response.data
}
export async function getAdminProductsApi (page = 1) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const url = `${VITE_API}/api/${VITE_PATH}/admin/products?page=${page}`
  const response = await axios.get(url)
  return response.data
}
export async function updateProductApi (id, productInfo) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.put(`${VITE_API}/api/${VITE_PATH}/admin/product/${id}`, { data: productInfo })
  return response.data
}
export async function deleteProductApi (id) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.delete(`${VITE_API}/api/${VITE_PATH}/admin/product/${id}`)
  return response.data
}
// 圖片上傳
export async function uploadImgApi (formData) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.post(`${VITE_API}/api/${VITE_PATH}/admin/upload`, formData)
  return response.data
}
// 訂單管理(讀取訂單(含分頁)、變更、刪除)
export async function getOrdersApi (page = 1) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.get(`${VITE_API}/api/${VITE_PATH}/admin/orders?page=${page}`)
  return response.data
}
export async function updateOrdersApi (id, orderInfo) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.put(`${VITE_API}/api/${VITE_PATH}/admin/order/${id}`, { data: orderInfo })
  return response.data
}
export async function deleteOrderApi (id) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.delete(`${VITE_API}/api/${VITE_PATH}/admin/order/${id}`)
  return response.data
}
// 優惠卷管理(創建、讀取(含分頁)、變更、刪除)
export async function createCouponApi (couponInfo) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.post(`${VITE_API}/api/${VITE_PATH}/admin/coupon`, { data: couponInfo })
  return response.data
}
export async function getCouponsApi (page = 1) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.get(`${VITE_API}/api/${VITE_PATH}/admin/coupons?page=${page}`)
  return response.data
}
export async function updateCouponApi (id, couponInfo) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.put(`${VITE_API}/api/${VITE_PATH}/admin/coupon/${id}`, { data: couponInfo })
  return response.data
}
export async function deleteCouponApi (id) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.delete(`${VITE_API}/api/${VITE_PATH}/admin/coupon/${id}`)
  return response.data
}
// consumer使用的API
// 產品(全部產品(含分頁)、單筆產品資訊查看)
export async function getProductsApi (category = '', page = 1) {
  const { VITE_API, VITE_PATH } = import.meta.env
  let url
  if (category === '所有產品') {
    url = `${VITE_API}/api/${VITE_PATH}/products?page=${page}`
  } else {
    url = `${VITE_API}/api/${VITE_PATH}/products?category=${category}&page=${page}`
  }
  const response = await axios.get(url)
  return response.data
}
export async function getProductApi (id) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.get(`${VITE_API}/api/${VITE_PATH}/product/${id}`)
  return response.data
}
// 購物車(加入購物車、取得購物車資訊、變更、刪除單筆購物車資訊、全部刪除)
export async function addCartApi (cartInfo) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.post(`${VITE_API}/api/${VITE_PATH}/cart`, { data: cartInfo })
  return response.data
}
export async function getCartApi () {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.get(`${VITE_API}/api/${VITE_PATH}/cart`)
  return response.data
}
export async function updateCartApi (id, cart) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.put(`${VITE_API}/api/${VITE_PATH}/cart/${id}`, { data: cart })
  return response.data
}
export async function removeCartItemApi (id) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.delete(`${VITE_API}/api/${VITE_PATH}/cart/${id}`)
  return response.data
}
export async function deleteCartsApi (id) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.delete(`${VITE_API}/api/${VITE_PATH}/carts`)
  return response.data
}
// 訂單(創建訂單、取得單筆訂單資訊)
export async function createOrderApi (orderData) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.post(`${VITE_API}/api/${VITE_PATH}/order`, { data: orderData })
  return response.data
}
export async function getOrderApi (id) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.get(`${VITE_API}/api/${VITE_PATH}/order/${id}`)
  return response.data
}
// 優惠卷(客戶使用優惠卷變更產品價格及總計資訊)
export async function useCouponsApi (id) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.post(`${VITE_API}/api/${VITE_PATH}/coupon`, { data: { code: id } })
  return response.data
}
