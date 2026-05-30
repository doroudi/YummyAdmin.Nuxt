import { useWindowSize } from '@vueuse/core'

export const useLayout = () => {
  const collapsed = useState('collapsed', () => false)
  const forceCollapsed = useState('forceCollapsed', () => false)
  const mobileMenuClosed = useState('mobileMenuClosed', () => true)
  const mobileMode = useState('mobileMode', () => false)
  const activeLanguage = useState('activeLanguage', () => 'en')
  const isRtl = useState('isRtl', () => false)
  const themeColor = useState('themeColor', () => '#00ad4c')
  const isDark = useState('isDark', () => true)
  const isWelcomeShown = ref(false)
  const isFluid = useState('isFluid', () => false)
  const flatDesign = useState('flatDesign', () => true)
  const supportEnabled = useState('supportEnabled', () => false)
  const locale = useState('locale', () => 'en')

  const dialogPlacement = computed(() => (isRtl.value ? 'left' : 'right'))

  watch(
    () => useWindowSize().width.value,
    (newValue: number) => {
      forceCollapsed.value = newValue <= 1024
      mobileMode.value = newValue < 600
    },
    { immediate: true },
  )

  function toggleSidebar() {
    if (mobileMode.value) mobileMenuClosed.value = false
    else collapsed.value = !collapsed.value

    window.umami?.track({ ToggleSidebar: mobileMenuClosed.value })
  }

  function closeSidebar() {
    mobileMenuClosed.value = true
  }

  function setDarkTheme(state: boolean) {
    isDark.value = state
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    window.umami?.track('ToggleDarkMode', {
      theme: isDark.value ? 'Dark' : 'Light',
    })
  }

  function changeLanguage(lang: string) {
    activeLanguage.value = lang
    locale.value = lang
    const dir = lang === 'fa' ? 'rtl' : 'ltr' // t('direction')
    isRtl.value = dir !== null && dir === 'rtl'
    window.umami?.track('LanguageChange', { language: lang })
    // showWelcome()
  }

  function setThemeColor(color: string) {
    themeColor.value = color
    window.umami?.track('ChangeTheme', { color })
  }

  function showWelcome() {
    setTimeout(() => {
      useNotification().create({
        content: $t('notify.welcome'),
        type: 'success',
        duration: 10000,
      })
      isWelcomeShown.value = true
    }, 1500)
  }

  function resetWelcomeState() {
    isWelcomeShown.value = false
  }

  function $reset() {
    mobileMode.value = false
  }

  function setSupportEnabled() {
    supportEnabled.value = true
  }

  return {
    collapsed,
    forceCollapsed,
    mobileMode,
    toggleSidebar,
    toggleTheme,
    isRtl,
    activeLanguage,
    changeLanguage,
    isDark,
    setThemeColor,
    themeColor,
    dialogPlacement,
    isWelcomeShown,
    showWelcome,
    resetWelcomeState,
    closeSidebar,
    $reset,
    mobileMenuClosed,
    isFluid,
    flatDesign,
    setDarkTheme,
    supportEnabled,
    setSupportEnabled,
  }
}
