import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="fixed flex justify-between left-0 w-full z-50  px-8 py-8 md:px-12 mx-6">
            <div className="flex gap-4 items-center ">
                <Image
                    src={'/swanson_logo.png'}
                    alt="Swanson logo"
                    width={55}
                    height={45}
                    unoptimized
                />
                <Image
                    src={'/swanson_text.png'}
                    alt="Swanson text"
                    width={192}
                    height={0}
                    // className="w-full h-auto"
                />
            </div>
            <div className="w-245 h-16.25 text-[14px] bg-[#6C6C6C33] backdrop-blur-sm rounded-bl-2xl pl-8 pr-4 mt-[-8] flex justify-between">
                <button>About Us</button>

                <button>Our Story</button>
                <button>Team</button>
                <button>Governance</button>

                <button className="bg-[#DCC562] px-5 my-3 rounded-lg text-black flex gap-2 items-center">
                    <img src="/+symbol.png" className="w-3 h-3" />
                    Schedule
                </button>
            </div>
        </nav>
    );
};
export default Navbar;
