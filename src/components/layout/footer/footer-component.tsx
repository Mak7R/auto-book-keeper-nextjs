import styles from './footer.module.css';
import Link from "next/link";

export default function Footer(){
    return (
        <footer className="border-top w-100 text-muted bg-white">
            <div className="container">
                <div className="row">
                    <p className="text-center m-3 col">&copy; 2024 - AutoBookKeeper - <Link href="/privacy">Privacy</Link></p>
                </div>
            </div>
        </footer>
    );
}