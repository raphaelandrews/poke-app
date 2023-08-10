import { create } from 'zustand';

interface CreatePokemonModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePokemonModal = create<CreatePokemonModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default usePokemonModal;