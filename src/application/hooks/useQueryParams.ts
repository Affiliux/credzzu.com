import { useSearchParams } from 'next/navigation'

export function useQueryParams() {
  const searchParams = useSearchParams()

  return {
    debtorId: searchParams.get('debtorId') || '',
  }
}
