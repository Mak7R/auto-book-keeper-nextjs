import styles from './root-navigation-bar.module.css'
import Link from "next/link";
import UserNavigation from "@/components/layout/header/user-navigation";

export default function RootNavigationBar(){    
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
            <a className="navbar-brand" href="">AutoBookKeeper</a>
            <div className={"offcanvas d-inline-block offcanvas-end text-bg-dark " + styles.offCanvas} id="navbarNav" tabIndex={-1} data-bs-scroll="true" aria-labelledby="navbarNavLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="navbarNavLabel">AutoBookKeeper</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/books">Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"  href="/about">About</Link>
                        </li>

                    </ul>

                    <UserNavigation />
            </div>
        </div>
        <div className="nav-item dropdown justify-content-end ms-auto">
            <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown">
                <span>EN</span>
            </button>
            <ul className={"dropdown-menu dropdown-menu-dark dropdown-menu-start " + styles.langDropdown}>
                <li>
                    <a className="dropdown-item">UA</a>
                </li>
                <li>
                    <a className="dropdown-item">EN</a>
                </li>
            </ul>
        </div>

        <button className="navbar-toggler ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        </nav>
        </>
    );
}