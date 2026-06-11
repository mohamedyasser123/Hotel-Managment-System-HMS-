export interface Facility {
  _id: string; 
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    userName: string;
  };
}

export interface GetFacilitiesResponse {
  success: boolean;
  message: string;
  data: {
    facilities: Facility[];
    totalCount: number;
  };
}

export interface ActionItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}


export interface ActionsMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  actions: ActionItem[];
}