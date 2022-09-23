import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <>
      <div className='relative leading-normal tracking-normal text-indigo-400 bg-cover bg-fixed' style={{ backgroundImage: "url(bg.png)"}}>
        <div className='h-full p-6' style={{minHeight: "100vh"}}>
        <Navbar />
        <div class="container pt-24 md:pt-36 mx-auto">
         {children}
          <Footer />
        </div>
        </div>
      </div>
    </>
  )
}

export default Layout;