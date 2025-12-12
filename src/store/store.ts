import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GeoInfo {
    asn: number;
    ip: string;
    country: string;
    city: string;
    country_code: string;
}

interface State {
    isModalOpen: boolean;
    isInfoModalOpen: boolean;
    geoInfo: GeoInfo | null;
    messageId: number | null;
    setModalOpen: (isOpen: boolean) => void;
    setInfoModalOpen: (isOpen: boolean) => void;
    setGeoInfo: (info: GeoInfo) => void;
    setMessageId: (id: number | null) => void;
}

export const store = create<State>()(
    persist(
        (set) => ({
            isModalOpen: false,
            isInfoModalOpen: false,
            geoInfo: null,
            messageId: null,
            setModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
            setInfoModalOpen: (isOpen: boolean) => set({ isInfoModalOpen: isOpen }),
            setGeoInfo: (info: GeoInfo) => set({ geoInfo: info }),
            setMessageId: (id: number | null) => set({ messageId: id })
        }),
        {
            name: 'storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                geoInfo: state.geoInfo,
                messageId: state.messageId
            })
        }
    )
);
