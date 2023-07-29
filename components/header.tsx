'use client'

import useRegisterModal from "@/hooks/use-register-modal";
import useLoginModal from "@/hooks/use-login-modal";
import { Button } from "@/components/ui/button";
import { SafeUser } from "@/types";

interface HeaderProps {
    currentUser?: SafeUser | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    return (
        <header className="container flex justify-end gap-4 py-8">
            {currentUser ?
                <Button>
                    Hello {currentUser.name}
                </Button>
                :
                <>
                    <Button variant="secondary" onClick={() => loginModal.onOpen()}>
                        Login
                    </Button>
                    <Button onClick={() => registerModal.onOpen()}>
                        Register
                    </Button>
                </>
            }

        </header>
    );
}

export default Header;