import { MasterDetailsContext } from '@/contexts/MasterDetailsContext';
import { useContext } from 'react';

export function useMasterDetails() {
  return useContext(MasterDetailsContext);
}
