import React, { useState } from 'react'
import { motion } from 'framer-motion';

const navbar = () => {
  const[menu, setMenu] = useState(false);

  const open = () =>{
    setMenu(!menu);
    removeMenu();
  }
  
  const removeMenu = () =>{
    const menuBar = document.getElementById('menubar');
    if (menu) {
      setTimeout(() => {
        menuBar.classList.add('hidden');
      }, 100);
    }else{
      menuBar.classList.remove('hidden');
    }
  }
 
  return (
    <>
      <div className='flex justify-between items-center text-sm mx-8 my-4'>
        <div className="flex">
          <img className="w-36 h-auto mr-4" src="src\assets\Logo.png" alt="" />
        </div>
          <ul className='lg:flex items-center *:mx-2 hover:*:text-gray-400 hover:*:transition-colors hidden'>
            <li><a href="#">Home</a></li>
            <li><a href="#">Packages</a></li>
            <li><a href="#">Destinations</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">About</a></li>
          </ul>
        <div className='lg:flex items-center *:mx-2 hidden'>
          <img className='invert hover:contrast-50 cursor-pointer' src="src\assets\search.svg" alt="" />
          <a className='hover:text-gray-400 hover:transition-colors' href="#">Login</a>
          <button className='text-black bg-white rounded-full px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors'>Sign Up</button>
        </div>
        <img className="lg:hidden invert w-8" src={`src/assets/menu${menu?"_open":""}.svg`} alt="" onClick={open}/>

        <motion.div id="menubar" animate={{x: menu?0:200}} className={`hidden lg:hidden absolute right-8 top-16 bg-white text-black p-4 rounded-lg text-base`}>
          <ul className='items-center *:mx-2 *:my-3 hover:*:text-gray-400 hover:*:transition-colors'>
            <li><a href="#">Home</a></li>
            <li><a href="#">Packages</a></li>
            <li><a href="#">Destinations</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">About</a></li>
            <a href="#">Log In</a>
            <button className='text-white bg-black rounded-full px-4 py-2 transition-colors'>Sign Up</button>
          </ul>
        </motion.div>

      </div>
    </>
  )
}

export default navbar;
