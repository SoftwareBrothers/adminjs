import { SidebarMessageInState } from '../store'

const toggleSidebar = (): {
    type: string;
    data: SidebarMessageInState;
} => ({
  type: 'SIDEBAR_TOGGLE',
  data: {},
})

export default toggleSidebar
