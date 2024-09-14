import { createStorage, StorageType } from './base';

export type DomainRule = {
  domain: string;
  selector: string;
};

export const CopyRuleStorage = createStorage<{
  rules: DomainRule[];
}>(
  'domains',
  { rules: [] },
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);
