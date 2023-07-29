'use client'

import useRegisterModal from "@/hooks/use-register-modal";
import useLoginModal from "@/hooks/use-login-modal";
import { Button } from "@/components/ui/button";

const Header = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    return (
        <header className="container flex justify-end gap-4 py-8">
            <Button variant="secondary" onClick={() => loginModal.onOpen()}>
                Login
            </Button>
            <Button onClick={() => registerModal.onOpen()}>
                Register
            </Button>
        </header>
    );
}

export default Header;