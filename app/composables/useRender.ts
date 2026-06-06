import { Icon } from '@iconify/vue'
import {
  NBadge,
  NButton,
  NIcon,
  NImage,
  NPopconfirm,
  NSpace,
  NTag,
  NText,
} from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { NuxtLink } from '#components'
// import { useLocalePath } from '#imports'
// import { RouterLink } from 'vue-router'

export function useRender() {
  const { t } = useI18n()
  function renderLinkedLabel(title: string, path: string, isNew = false) {
    const localePath = useLocalePath()
    const convertedPath = localePath(path)
    const to = {
      to: convertedPath
    }
    return h(
      NuxtLink,
      {
        ...to,
      },
      {
        default: () => [
          h(NText, { class: 'mx-2' }, { default: () => title }),
          isNew &&
          h(
            NTag,
            { type: 'primary', bordered: false, round: true, size: 'small' },
            { default: () => t('common.new') },
          ),
        ],
      },
    )
  }

  function renderIcon(icon: string, showBadge = false) {
    if (!icon) return

    const iconNode = () =>
      h(NIcon, null, {
        default: () => h(Icon, { icon }),
      })

    if (showBadge) {
      return () =>
        h(
          NBadge,
          { processing: true, dot: true, type: 'success', offset: [-2, 2] },
          { default: iconNode },
        )
    }

    return iconNode
  }

  function renderColoredIcon(icon: string, color: string | null = null) {
    if (!icon) return

    return h(
      NIcon,
      { color: color ?? undefined },
      {
        default: () => h(Icon, { icon }),
      },
    )
  }

  function renderTag(
    text: string,
    type: 'error' | 'default' | 'success' | 'warning' | 'primary' | 'info',
    stateEnum: any,
    typename: string,
    round = false,
    bordered = false,
  ) {
    return h(
      NTag,
      { type, bordered, round, size: 'small' },
      {
        default: () => t(`enums.${typename}.${stateEnum[text]}`),
      },
    )
  }

  function renderPrice(value: number, postfix = '') {
    return h(
      NText,
      {},
      {
        default: () => `${value.toLocaleString()} ${postfix}`,
      },
    )
  }

  function renderRate(rate: number) {
    return h(
      NSpace,
      { align: 'center' },
      {
        default: () => [
          renderColoredIcon('fluent:star-24-filled', 'gold'),
          h(NText, {}, { default: () => rate }),
        ],
      },
    )
  }

  function renderProductImage(image: string, name: string) {
    return h(
      NSpace,
      { align: 'center' },
      {
        default: () => [
          h(
            NImage,
            {
              src: image ?? '/assets/images/fallback.png',
              fallbackSrc: '/assets/images/fallback.png',
              width: 38,
              height: 38,
              objectFit: 'contain',
              showToolbar: false,
              alt: name,
              style: { 'border-radius': 'var(--n-border-radius)' },
            },
            {},
          ),
          h(NText, {}, { default: () => name }),
        ],
      },
    )
  }

  function renderUserAvatar(image: string, username: string) {
    return h(
      NSpace,
      { align: 'center' },
      {
        default: () => [
          h(
            NImage,
            {
              src: image,
              fallbackSrc: '/assets/images/avatar.png',
              width: 38,
              height: 38,
              objectFit: 'contain',
              showToolbar: false,
              style: { 'border-radius': '50%' },
            },
            {},
          ),
          h(NText, {}, { default: () => username }),
        ],
      },
    )
  }

  function renderConfirmStatus(status: boolean, label: string) {
    const icon = status
      ? 'fluent:checkmark-circle-20-filled'
      : 'fluent:warning-20-filled'
    const iconColor = status ? 'green' : 'orange'
    return h(
      NSpace,
      { align: 'center', justify: 'start' },
      {
        default: () => [
          renderColoredIcon(icon, iconColor),
          h(NText, {}, { default: () => label }),
        ],
      },
    )
  }

  function renderText(text: string) {
    return h(NText, {}, { default: () => text })
  }

  function renderDate(date: string) {
    return h(
      NText,
      {},
      { default: () => `${new Date(date).toLocaleDateString()}` },
    )
  }

  function renderActionButton(icon: any, onClickAction: any) {
    return h(NButton, {
      size: 'medium',
      quaternary: true,
      circle: true,
      renderIcon: renderIcon(icon),
      onClick: onClickAction,
    })
  }

  function renderDeleteActionButton(
    confirmMessage: string,
    confirmAction: any,
  ) {
    return h(
      NPopconfirm,
      {
        onPositiveClick: confirmAction,
        positiveText: t('common.confirm'),
        negativeText: t('common.cancel'),
        negativeButtonProps: { ghost: true, type: 'tertiary' },
      },
      {
        trigger: () =>
          renderActionButton('fluent:delete-20-regular', () => null),
        default: () => confirmMessage,
      },
    )
  }

  function renderActionLabel(text: string, onClickAction: any) {
    return h(NText, { onClick: onClickAction }, { default: () => text })
  }

  function renderEmailAddress(email: string, confirmed?: boolean) {
    if (confirmed === undefined) {
      return h(NText, { class: 'en' }, { default: () => email.toLowerCase() })
    }

    return h(
      NTag,
      {
        class: 'en',
        round: true,
        bordered: false,
        color: { color: 'transparent' },
      },
      {
        icon: renderColoredIcon(
          confirmed
            ? 'fluent:checkmark-circle-20-filled'
            : 'fluent:warning-20-filled',
          confirmed ? 'green' : 'orange',
        ),
        default: () => email.toLowerCase(),
      },
    )
  }

  return {
    renderIcon,
    renderTag,
    renderPrice,
    renderRate,
    renderProductImage,
    renderUserAvatar,
    renderLinkedLabel,
    renderText,
    renderDate,
    renderActionButton,
    renderConfirmStatus,
    renderActionLabel,
    renderDeleteActionButton,
    renderEmailAddress,
  }
}
