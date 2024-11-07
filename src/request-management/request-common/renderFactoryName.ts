import {
  FactoryName,
  renderNameFactory,
} from '../../request-management/request-list/list-interface';

export const renderFactoryName = (value: string) => {
  if (value === renderNameFactory.Aiwa) {
    return FactoryName.Aiwa;
  }
};
