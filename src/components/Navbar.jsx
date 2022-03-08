import React from 'react'
import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai';
import logo from './../assets/images/logo.png'
const NavbarItem = ({title, classProps}) => {
return (
  <li className={`mx-4  cursor-pointer ${classProps}`}>
    {title}
  </li>

)

}
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
   <nav className="w-full flex md:justify-center justify-between items-center p-4">
     <div className="md:flex-[0.5] justify-center items-center flex-initial">
    <img src={logo} alt="logo" className="cursor-pointer  w-32"/>
     </div>
     <ul className="hidden text-white list-none md:flex    justify-center items-center flex-initial">
    {[
      "Market", "Exchange", "Tutorials", "Wallets"
    ].map((item, index) => ( 
      <NavbarItem title={item}   key={item + index}/>
    ))}
    <li className="bg-blue-500 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]" >
      Login
    </li>
       </ul>
       <div className="flex relative">
         {
           toggleMenu ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}  /> : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
          
         }
         {toggleMenu && (
           <ul 
           className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
           >
             <li className="text-xl w-full my-2">
               <AiOutlineClose onClick={() => setToggleMenu(false)} />
             </li>
             {[
      "Market", "Exchange", "Tutorials", "Wallets"
    ].map((item, index) => ( 
      <NavbarItem title={item} classProps="my-2 text-lg"  key={item + index}/>
    ))}
               </ul>
         )}
       </div>
       
       
   </nav>
  )
}

export default Navbar