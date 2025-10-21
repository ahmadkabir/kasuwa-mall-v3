import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { LoadingScreen } from '@/components/ui/loading-spinner'
import { productApi } from '@/lib/api/client'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id!),
    enabled: !!id,
  })

  if (isLoading) return <LoadingScreen />

  return (
    <div className="glass-card p-8 rounded-2xl">
      <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
      <p className="text-muted-foreground">{product?.description}</p>
      <p className="text-2xl font-bold text-primary mt-4">
        ₦{product?.price.toLocaleString()}
      </p>
    </div>
  )
}
