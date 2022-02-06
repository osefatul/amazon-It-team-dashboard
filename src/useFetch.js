import { useState, useEffect } from 'react';

//useFecth will take any url.
export const useFetch = (url) => {
  // ATTENTION!!!!!!!!!!
  // I SWITCHED TO PERMANENT DOMAIN
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const response = await fetch(url)
    const products = await response.json()
    setProducts(products)
    setLoading(false)
  }

  //Run getProduction by default and when a URL changes 
  useEffect(() => {getProducts()}, [url])
  
  //this hook will return an objec
  return {loading, products}
}
