import {  useState } from "react";


export function useTabActive<T extends string>( initialTab: T) {

    const [activeTab, setActiveTab] = useState<T>(initialTab);

    const changeTab = (newTab: T) => setActiveTab(newTab) ;
    return {

        activeTab,
        setActiveTab,
        changeTab,
        isActive: (aba: T) => aba === activeTab,
    }

}