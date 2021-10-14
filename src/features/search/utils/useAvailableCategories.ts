import { omit } from 'lodash'

import { SearchGroupNameEnum } from 'api/gen'
import { CategoryCriteria, CATEGORY_CRITERIA } from 'features/search/enums'

export const useAvailableCategories = (): Partial<CategoryCriteria> => {
  return omit(CATEGORY_CRITERIA, [SearchGroupNameEnum.NONE])
}