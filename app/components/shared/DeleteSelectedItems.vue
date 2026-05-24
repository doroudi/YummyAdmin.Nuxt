<script setup lang="ts">
const emits = defineEmits(['delete'])
const negativeButtonProps  = { ghost: true, type: 'tertiary' }
</script>


<template>
    <n-tooltip trigger="hover">
        <template #trigger>
            <n-popconfirm :negative-button-props="negativeButtonProps" @positive-click="emits('delete')" :positive-text="$t('common.confirm')"
                :negative-text="$t('common.cancel')">
                <template #trigger>
                    <NButton mx-2 quaternary circle>
                        <template #icon>
                            <Icon name="fluent:delete-20-regular" />
                        </template>
                    </NButton>
                </template>
                {{ $t('common.deleteMultipleConfirm') }}
            </n-popconfirm>
        </template>
        <span>{{ $t('common.delete') }}</span>
    </n-tooltip>
</template>


<style scoped></style>