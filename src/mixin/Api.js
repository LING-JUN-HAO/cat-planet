import axios from 'axios'

export async function getProducts (category = '', page = 1) {
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
