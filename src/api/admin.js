import { get, put } from './apiClient.js'
import { backendFeatures } from './compat.js'

export function getAnalytics() {
  if (!backendFeatures.adminAnalytics) {
    return {
      unavailable: true,
      events: 0,
      registrations: 0,
      attendance: 0,
      noShowRate: 0,
    }
  }
  return get('/admin/analytics')
}

export function getUsersWithRoles() {
  if (!backendFeatures.adminRoles) return []
  return get('/admin/roles')
}

export function updateUserRole(userId, role) {
  if (!backendFeatures.adminRoles) return Promise.resolve(null)
  return put(`/admin/roles/${userId}`, { role })
}

export function getAuditLog() {
  if (!backendFeatures.adminAudit) return []
  return get('/admin/audit')
}
