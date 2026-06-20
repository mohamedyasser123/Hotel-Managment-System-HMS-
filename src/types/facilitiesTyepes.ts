// GET
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


// CREAT
export interface CreateFacilityData {
  name: string;
}

export interface CreateFacilityResponse {
  success: boolean;
  message: string;
  data: {
    facility: Facility;
  };
}


// UPDATE
export interface UpdateFacilityData {
  name: string;
}

export interface UpdateFacilityResponse {
  success: boolean;
  message: string;
  data: {
    facility: Facility;
  };
}


// Delete
export interface DeleteFacilityResponse {
  success: boolean;
  message: string;
  data: {
    facility: Facility;
  };
}



// MENU
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



// FORM
export interface FacilityFormData {
  name: string;
}