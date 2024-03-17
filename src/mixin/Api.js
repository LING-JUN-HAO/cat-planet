import axios from 'axios'

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

export async function updateCartApi (id, cart) {
  const { VITE_API, VITE_PATH } = import.meta.env
  await axios.put(`${VITE_API}/api/${VITE_PATH}/cart/${id}`, { data: cart })
  const response = await axios.delete(`${VITE_API}/api/${VITE_PATH}/cart/${id}`)
  return response.data
}

export async function removeCartItemApi (id) {
  const { VITE_API, VITE_PATH } = import.meta.env
  const response = await axios.delete(`${VITE_API}/api/${VITE_PATH}/cart/${id}`)
  return response.data
}
