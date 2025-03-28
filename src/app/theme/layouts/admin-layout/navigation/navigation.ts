export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Home',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/contractual',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'contractual',
        title: 'Contractual',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/contractual',
        icon: 'global'
      },
      {
        id: 'data-management',
        title: 'Data Management',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/data-management',
        icon: 'team'
      },
      {
        id: 'operations',
        title: 'Operations',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/operations',
        icon: 'user-add',
      },
      {
        id: 'service-management',
        title: 'Service Management',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/service-management',
        icon: 'sync',
      },
      {
        id: 'technical',
        title: 'Technical',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/technical',
        icon: 'info-circle',
      },      
      {
        id: 'technical',
        title: 'Generate',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/gendoc',
        icon: 'info-circle',
      }
      //,{
      //   id: 'hire',
      //   title: 'New Hire',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/stc/hire',
      //   icon: 'team',
      // },{
      //   id: 'project-movement',
      //   title: 'Project Movement',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/stc/project-movement',
      //   icon: 'project',
      // },{
      //   id: 'location-transfer',
      //   title: 'Location Transfer',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/stc/location-transfer',
      //   icon: 'dashboard',
      // },{
      //   id: 'short-trip',
      //   title: 'Short Trip',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/stc/short',
      //   icon: 'sync',
      // },{
      //   id: 'inactivate',
      //   title: 'Inactivate',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/stc/inactivate',
      //   icon: 'info-circle',
      // },{
      //   id: 'reactivate',
      //   title: 'Reactivate',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/stc/re-activate',
      //   icon: 'issues-close',
      // },{
      //   id: 'terminate',
      //   title: 'Terminate',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/stc/terminate',
      //   icon: 'usergroup-delete',
      // },{
      //   id: 'reports',
      //   title: 'Reports',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/stc/reports',
      //   icon: 'file-done',
      // },{
      //   id: 'generate-activity',
      //   title: 'Generate Activity',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/stc/generate-activity',
      //   icon: 'carry-out',
      // }
    ]
  }
];

export const NavigationItemsAdmin: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Admin',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/admin-setting',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'contractual',
        title: 'Sevirity',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/admin-setting/severity',
        icon: 'global'
      },
      {
        id: 'data-management',
        title: 'Sub Area',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/admin-setting/subarea',
        icon: 'carry-out'
      },
      {
        id: 'operations',
        title: 'Item/Action',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/admin-setting/item',
        icon: 'issues-close'
      },
      {
        id: 'service-management',
        title: 'Product Name',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/admin-setting/productname',
        icon: 'project'
      },
      {
        id: 'technical',
        title: 'Owner',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/admin-setting/owner',
        icon: 'info-circle'
      },
      {
        id: 'technical',
        title: 'Status',
        type: 'item',
        classes: 'nav-item',
        url: '/stc/admin-setting/status',
        icon: 'global'
      }
    ]
  }
];

// sub area
//  item
//  product name
//  owner
//  status