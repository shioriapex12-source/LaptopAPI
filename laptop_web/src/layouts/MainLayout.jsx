import { Link, NavLink, Outlet } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';

function MainLayout() {
    return (
        <div className='container py-4'>
            <nav className='navbar navbar-expand-lg bg-white border rounded px-3 mb-3'>
                <Link className='navbar-brand fw-semibold' to="/">Laptop Demo</Link>
                <div className='navbar-nav gap-2'>
                    <NavLink className='nav-link' to="/">Home</NavLink>
                    <NavLink className='nav-link' to="/auth">Auth</NavLink>
                    <NavLink className='nav-link' to="/laptops">Laptops</NavLink>
                </div>
            </nav>
            <AlertMessage message={message} />
            <Outlet />
        </div>
    );
}

export default MainLayout;