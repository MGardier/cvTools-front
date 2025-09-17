
interface MainLayoutProps {
  children: React.ReactNode
}

export const Layout =({children} : MainLayoutProps)=> {
   return (<div className="container mx-auto py-10 flex flex-col justify-center items-center">
     {children}
    </div>)
}