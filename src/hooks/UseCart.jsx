import { useQuery } from '@tanstack/react-query'
const UseCart = () => {
  
  const { isLoading,refetch, data: cart = [] } = useQuery({
    queryKey:['carts'],
    queryFn:async () => {
      const response = await fetch('http://localhost:3000/carts')
      return response.json();
    }
  })
  return [cart, refetch]
};

export default UseCart;