export interface UADSaleType {
  type: 'REO' | 'Short' | 'CrtOrd' | 'Estate' | 'Relo' | 'NonArm' | 'ArmLth' | 'Listing';
  description: string;
}

export interface UADFinancing {
  type: 'FHA' | 'VA' | 'Conv' | 'Seller' | 'Cash' | 'RH' | 'Other';
  description: string;
}

export interface UADLocation {
  rating: 'N' | 'B' | 'A';
  type: 'Res' | 'Ind' | 'Comm' | 'BsyRd' | 'WtrFr' | 'GlfCse' | 'AdjPrk' | 'AdjPwr' | 'Lndfl' | 'PubTrn' | 'Other';
  description?: string;
}

export interface UADView {
  rating: 'N' | 'B' | 'A';
  type: 'Wtr' | 'Pstrl' | 'Woods' | 'Glfvw' | 'CtySky' | 'Mtn' | 'Res' | 'CtyStr' | 'Ind' | 'PwrLn' | 'LtdSght' | 'Other';
  description?: string;
}

export interface UADCondition {
  rating: 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';
  description: string;
}

export interface UADQuality {
  rating: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5' | 'Q6';
  description: string;
}