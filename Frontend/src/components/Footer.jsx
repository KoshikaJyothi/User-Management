import React from 'react'

function Footer() {
  return (
    <footer className="text-center py-4 text-gray-500 text-sm border-t mt-10">
      &copy; {new Date().getFullYear()} User Management App
    </footer>
  )
}

export default Footer
