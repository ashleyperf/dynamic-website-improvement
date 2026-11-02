import { createFileRoute, redirect } from '@tanstack/react-router'

// The original ebook is the entry point, including its cover and folder index.
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ href: '/guia.html', replace: true })
  },
})
