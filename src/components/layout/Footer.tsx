export default function Footer() {
    return (
        <footer className="border-t border-border-light bg-white py-4 px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-muted">
                <p>© 2024 Student Hub. Integrated Campus Management System.</p>
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-text-secondary transition-colors">Support</a>
                    <a href="#" className="hover:text-text-secondary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-text-secondary transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
}
