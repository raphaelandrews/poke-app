import { UserButton, auth } from "@clerk/nextjs";

const Header = () => {
    const { userId } = auth();

    return (
        <header className="container flex justify-end gap-4 py-8">
            {userId ?
                <UserButton />
                :
                <UserButton afterSignOutUrl="/" />
            }
        </header>
    );
}

export default Header;