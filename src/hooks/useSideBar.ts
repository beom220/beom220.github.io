import {useRecoilState} from "recoil";
import {sideBarState} from "@/app/layout/sidebar";

export default function useSideBar() {
    const [isOpenSideBar, setIsOpenSideBar] = useRecoilState(sideBarState);
    const handleOpenSideBar = (): void => setIsOpenSideBar(true);
    const handleCloseSideBar = (): void => setIsOpenSideBar(false);
    const handleToggleSideBar = (): void => setIsOpenSideBar(!isOpenSideBar);

    return {isOpenSideBar, handleOpenSideBar, handleCloseSideBar, handleToggleSideBar};
}