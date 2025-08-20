import React from 'react'

const NavBar = () => {
  return (
    <section className='text-black'>
        <nav className='hidden md:block'>Desktop view</nav>
        <nav className='md:hidden'>Mobile Vie</nav>
    </section>
  )
}

export default NavBar