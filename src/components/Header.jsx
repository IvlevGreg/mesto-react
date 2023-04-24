import logo from '../images/logo/logo.svg'


export function Header() {
return <header className='header'>
    <a href='#' className='logo'>
        <img
            className='logo__img'
            src={logo}
            alt='логотип Место'
        />
    </a>
</header>
}
