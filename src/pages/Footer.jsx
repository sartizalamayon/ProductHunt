const Footer = () => {
    return (
        <footer className="bg-primary text-white h-[3rem] flex justify-center items-center">
            <div className="w-full px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm">
                    © {new Date().getFullYear()} ProductHunt. All rights reserved.
                </div>
                <div className="flex space-x-4">
                    <a href="#privacy" className="hover:underline font-light">
                        Privacy Policy
                    </a>
                    <a href="#terms" className="hover:underline font-light">
                        Terms of Service
                    </a>
                    <a href="#contact" className="hover:underline font-light">
                        Contact Us
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
