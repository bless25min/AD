import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type FriendshipStatus = 'checking' | 'friend' | 'not_friend_or_blocked' | 'unknown';

export interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
}

interface AppState {
  // Persisted state
  selectedPainPoint: string | null;
  selectedFollowUpOption: string | null;
  entryPath: string;
  utmData: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  setPainPoint: (id: string | null) => void;
  setFollowUpOption: (id: string | null) => void;
  setEntryPath: (path: string) => void;
  setUtmData: (data: Partial<AppState['utmData']>) => void;

  // In-memory state (from Server or LIFF)
  profile: UserProfile | null;
  friendshipStatus: FriendshipStatus;
  isLoggedIn: boolean;
  setProfile: (profile: UserProfile | null) => void;
  setFriendshipStatus: (status: FriendshipStatus) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  resetUserSession: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // initial persisted state
      selectedPainPoint: null,
      selectedFollowUpOption: null,
      entryPath: '/',
      utmData: {},
      setPainPoint: (id) => set({ selectedPainPoint: id, selectedFollowUpOption: null }),
      setFollowUpOption: (id) => set({ selectedFollowUpOption: id }),
      setEntryPath: (path) => set({ entryPath: path }),
      setUtmData: (data) => set((state) => ({ utmData: { ...state.utmData, ...data } })),

      // initial in-memory state
      profile: null,
      friendshipStatus: 'checking',
      isLoggedIn: false,
      setProfile: (profile) => set({ profile }),
      setFriendshipStatus: (status) => set({ friendshipStatus: status }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      resetUserSession: () => set({ profile: null, friendshipStatus: 'checking', isLoggedIn: false })
    }),
    {
      name: 'ad-sales-funnel-storage',
      // Only persist these keys
      partialize: (state) => ({
        selectedPainPoint: state.selectedPainPoint,
        selectedFollowUpOption: state.selectedFollowUpOption,
        entryPath: state.entryPath,
        utmData: state.utmData,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
