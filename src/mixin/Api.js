import axios from 'axios'

export async function createProductApi (productInfo) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.post(`${VITE_API}/api/${VITE_PATH}/admin/product`, { data: productInfo })
  return response.data
}

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

export async function createOrderApi (orderData) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.post(`${VITE_API}/api/${VITE_PATH}/order`, { data: orderData })
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

export async function getOrderApi (id) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.get(`${VITE_API}/api/${VITE_PATH}/order/${id}`)
  return response.data
}

export async function signInApi (userInfo) {
  const { VITE_API } = import.meta.env
  const response = await axios.post(`${VITE_API}/admin/signin`, userInfo)
  return response.data
}

export async function checkAdminApi (userInfo) {
  const { VITE_API } = import.meta.env
  const response = axios.post(`${VITE_API}/api/user/check`, userInfo)
  return response.data
}

export async function CreateCouponApi (couponInfo) {
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
