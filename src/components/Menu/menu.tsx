import { GetProp, Menu, MenuProps } from "antd"

type MenuTheme = GetProp<MenuProps, 'theme'>

type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: 'pie-chart',
    label: 'Opcion 1',
  },
  {
    key: '2',
    icon: 'desktop',
    label: 'Opcion 2',
  },
  {
    key: '3',
    icon: 'inbox',
    label: 'Opcion 3',
  },
  {
    key: '4',
    icon: 'mail',
    label: 'Opcion 4',
  },
  {
    key: '5',
    icon: 'appstore',
    label: 'Opcion 5',
  },
  {
    key: '6',
    icon: 'setting',
    label: 'Opcion 6',
  }];

export const MenuDashboard = () => {
  return (
    <Menu items={items}/>
  )
}