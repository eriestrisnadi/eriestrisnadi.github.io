import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export const sanitizePost = <T extends ParsedContent>(value: T) => {
  const _dateParts = value._id.split(':').splice(2, 1).pop().split('')
  const slug = value._id
    .replace(/(^(:?(content|writing))*|\.md$)/g, '')
    .replace(/:/g, '/')
  const dd = _dateParts.splice(0, 2).join('')
  const mm = _dateParts.splice(0, 2).join('')
  const yyyy = _dateParts.splice(0, 4).join('')
  const date = `${yyyy}-${mm}-${dd}`

  return {
    ...value,
    slug,
    date,
  }
}
