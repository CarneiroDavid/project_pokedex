import Navigation from '../components/navigation/Navigation'

const Layout = ({ children }) => {
    return (
        <>
            <Navigation />

            <main className='container'>{children}</main>

            <footer></footer>
        </>
    )
}

export default Layout
