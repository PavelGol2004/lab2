import { get, post } from './apiClient.js'
import { backendFeatures } from './compat.js'

export function getEventReviews(eventId) {
  if (!backendFeatures.reviews) return []
  return get(`/reviews/get/${eventId}`)
}

export function addEventReview(eventId, rating, comment) {
  if (!backendFeatures.reviews) return Promise.resolve(null)
  return post(`/reviews/add/${eventId}`, { rating, comment })
}
