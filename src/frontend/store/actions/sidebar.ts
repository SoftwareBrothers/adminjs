import { SidebarMessageInState } from "../store";

export const toggleSidebar = (): {
    type: string;
    data: SidebarMessageInState;
} => ({
    type: 'SIDEBAR_TOGGLE',
    data: {},
})