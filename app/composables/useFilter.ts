import { useI18n } from 'vue-i18n'

export default function useFilter() {
  const { t } = useI18n()
  function enumToFilter(type: any, typeName: string): any[] {
    return Object.keys(type)
      .filter((key) => !Number.isNaN(parseInt(key, 10)))
      .map((key) => ({
        label: t(`enums.${typeName}.${type[key]}`),
        value: key.replace(' ', '').toLowerCase(),
      }))
  }

  return {
    enumToFilter,
  }
}
