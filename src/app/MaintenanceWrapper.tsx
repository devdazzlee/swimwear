'use client'

import React, { useEffect, useState } from 'react'

export default function MaintenanceWrapper({ children }: { children: React.ReactNode }) {
  const [isLive, setIsLive] = useState<boolean | null>(null)
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://swimwear-backend.vercel.app'

  useEffect(() => {
    fetch(`${backendUrl}/api/site-status`)
      .then(res => res.json())
      .then(data => setIsLive(data.isLive))
      .catch(() => setIsLive(true)) // fallback: show site if API fails
  }, [])

  if (isLive === null) return null

  if (!isLive) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl">🚧 Website Under Maintenance 🚧</h1>
      </div>
    )
  }

  return <>{children}</>
}
