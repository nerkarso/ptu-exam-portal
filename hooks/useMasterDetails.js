import { MasterDetailsContext } from '@/hooks/MasterDetailsContext';
import { useContext } from 'react';

export function useMasterDetails() {
  return useContext(MasterDetailsContext);
}
