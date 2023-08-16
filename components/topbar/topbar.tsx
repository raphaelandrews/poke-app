import Logo from "@/components/logo";
import TopItem from "./top-item";

interface TopbarProps {
    children?: React.ReactNode
}

const Topbar: React.FC<TopbarProps> = ({ children }) => {
    return (
        <section
            className="
                flex
                justify-between
                items-center
                w-11/12
                md:w-full
                md:px-[2.5rem]
                mx-auto
                my-0
                py-4
            "
        >
            <div className="flex items-center gap-3 md:gap-0">
                <Logo className="md:hidden" />
                <div className="hidden md:block">
                    <TopItem link="/" label="Home" />
                    {children}
                </div>
            </div>
            <div className="flex gap-2">
                a
            </div>
        </section>
    );
}

export default Topbar;