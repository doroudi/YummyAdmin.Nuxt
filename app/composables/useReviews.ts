import type { PagedAndSortedRequest } from "~/models/PagedAndSortedRequest"
import type { Review } from "~/models/Review"
import { useReviewService } from '~/services/review.service'

export const useReviews = () => {
    const reviewService = useReviewService()
    const reviews = useState<Review[]>('reviews', () => [])

    const reviewItem = ref<Review>()
    const isLoading = ref(false)
    const isSaving = ref(false)
    const { options } = useOptions()

    async function getReviews(options: PagedAndSortedRequest) {
        isLoading.value = true
        try {
            const response = await reviewService.getReviewList(options)
            reviews.value = response.items
            options.pageCount = Math.ceil(response.totalCount! / options.pageSize!)
        } finally {
            isLoading.value = false
        }
    }
    return {
        reviews,
        isSaving,
        isLoading,
        getReviews,
        reviewItem,
        options,
    }
}