import i18n from 'src/common/locales/i18n';
import * as Yup from 'yup';

export const GiftCreateSchema = Yup.object().shape({
  name: Yup.string().required(i18n.t('name_required')),
  price: Yup.number()
    .required(i18n.t('price_required'))
    .moreThan(0, i18n.t('price_more_than_0')),
  thumbnailId: Yup.number().required(i18n.t('thumbnail_required')),
});
