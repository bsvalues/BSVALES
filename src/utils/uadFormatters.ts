import { UADSaleType, UADFinancing, UADLocation, UADView, UADCondition, UADQuality } from '../types/uad';

export const formatUADSaleType = (type: UADSaleType['type']): string => {
  const types: Record<UADSaleType['type'], string> = {
    REO: 'REO Sale',
    Short: 'Short Sale',
    CrtOrd: 'Court Ordered Sale',
    Estate: 'Estate Sale',
    Relo: 'Relocation Sale',
    NonArm: 'Non-Arms Length Sale',
    ArmLth: 'Arms Length Sale',
    Listing: 'Listing'
  };
  return types[type];
};

export const formatUADFinancing = (type: UADFinancing['type']): string => {
  const types: Record<UADFinancing['type'], string> = {
    FHA: 'FHA',
    VA: 'VA',
    Conv: 'Conventional',
    Seller: 'Seller',
    Cash: 'Cash',
    RH: 'USDA - Rural housing',
    Other: 'Other'
  };
  return types[type];
};

export const formatUADLocation = (location: UADLocation): string => {
  const ratings = { N: 'Neutral', B: 'Beneficial', A: 'Adverse' };
  const types = {
    Res: 'Residential',
    Ind: 'Industrial',
    Comm: 'Commercial',
    BsyRd: 'Busy Road',
    WtrFr: 'Water Front',
    GlfCse: 'Golf Course',
    AdjPrk: 'Adjacent to Park',
    AdjPwr: 'Adjacent to Power Lines',
    Lndfl: 'Landfill',
    PubTrn: 'Public Transportation',
    Other: 'Other'
  };
  return `${ratings[location.rating]} - ${types[location.type]}`;
};

export const formatUADCondition = (condition: UADCondition): string => {
  const descriptions: Record<UADCondition['rating'], string> = {
    C1: 'New/Recently Constructed',
    C2: 'No deferred maintenance',
    C3: 'Well maintained, limited deterioration',
    C4: 'Minor deferred maintenance',
    C5: 'Obvious deferred maintenance',
    C6: 'Substantial damage/deterioration'
  };
  return `${condition.rating} - ${descriptions[condition.rating]}`;
};