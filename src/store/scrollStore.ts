import { useEffect, useState } from "react";
import { create } from "zustand";

interface ScrollType {
    position: number;
    setPosition: (position: number) => void;
  }
  
  // Zustand store 생성
  export const useScrollStore = create<ScrollType>((set) => ({
    position: 0,
    setPosition: (position: number) => set({ position }),
  }));
  
  // Scroll 이벤트 핸들러
  export const onScroll = () => {
    useScrollStore.setState({ position: window.scrollY });
  };
  
  // 컴포넌트에서 useEffect 사용

