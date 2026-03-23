export const backendFeatures = {
  // Temporarily keep UI features visible even if backend routes are not ready.
  eventUpdate: true,
  eventDelete: true,
  eventAnnouncements: true,
  participants: true,
  reviews: true,
  adminAnalytics: true,
  adminRoles: true,
  adminAudit: true,
  attendanceCheck: false,
}

export function isMissingEndpointError(error) {
  const status = Number(error?.status ?? 0)
  return status === 404 || status === 405 || status === 501
}
