import { get, del } from './apiClient.js'
import { backendFeatures } from './compat.js'

export function getParticipants(eventId) {
  if (!backendFeatures.participants) return []
  return get(`/participants/get/${eventId}`)
}

export function removeParticipant(eventId, userId) {
  if (!backendFeatures.participants) return Promise.resolve(null)
  return del(`/participants/remove/${eventId}/${userId}`)
}
