import { useWindowSize } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
    const collapsed = ref(false)
    const forceCollapsed = ref(false)
    const mobileMenuClosed = ref(true)
    const mobileMode = ref(false)
    const activeLanguage = ref('en')
    const isRtl = ref(false)
    const themeColor = ref('#00ad4c')
    const isDark = ref(false)
    const isWelcomeShown = ref(false)
    const isFluid = ref(false)
    const flatDesign = ref(true)
    const supportEnabled = ref(true)
    const locale = ref('en')

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
    }

    function closeSidebar() {
        mobileMenuClosed.value = true
    }

    function setDarkTheme(state: boolean) {
        isDark.value = state
    }

    function toggleTheme() {
        isDark.value = !isDark.value
    }

    function changeLanguage(lang: string) {
        activeLanguage.value = lang
        locale.value = lang
        const dir = lang === 'fa' ? 'rtl' : 'ltr'
        isRtl.value = dir !== null && dir === 'rtl'
    }

    function setThemeColor(color: string) {
        themeColor.value = color
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
}, { persist: true }
)
