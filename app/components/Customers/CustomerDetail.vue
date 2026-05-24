<script lang="ts" setup>
import type { Customer } from '~/models/Customer'
interface Props {
    customer: Customer
}

defineProps<Props>()
</script>


<template>
    <div class="p-2 px-8">
        <div class="row">
            <span>
                <n-tag round :bordered="false" :type="customer.emailConfirmed ? 'success' : 'warning'">
                    {{ $t('customers.email') }} : {{ customer.email }}

                    <template #icon>
                        <Icon v-if="customer.emailConfirmed" name="fluent:checkmark-circle-20-filled" />
                        <Icon v-else name="fluent:warning-20-filled" />
                    </template>
                </n-tag>
            </span>
        </div>
        <div class="row">
            <span>
                <n-tag round :bordered="false" :type="customer.phoneConfirmed ? 'success' : 'warning'">
                    {{ $t('customers.phone') }} : {{ customer.mobile }}
                    <template #icon>
                        <template #icon>
                            <Icon v-if="customer.phoneConfirmed" name="fluent:checkmark-circle-20-filled" />
                            <Icon v-else name="fluent:warning-20-filled" />
                        </template>
                    </template>
                </n-tag>
            </span>
        </div>
        <div class="row">
            <span>
                <NTag round>{{ $t('customers.userGroup') }}: {{ customer.userGroup }}</NTag>
            </span>
        </div>
        <div class="row">
            <span>
                <NTag round :color="{ color: '#FC0' }">
                    <template #icon>
                        <Icon name="fluent:star-24-regular" />
                    </template>
                    {{ $t('customers.points') }}: {{ customer.points }}
                </NTag>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.row {
    margin: .3rem 0;

    .content {
        display: inline-flex;
        background: #CCC;
        border-radius: varA(n-border-radius);
    }
}
</style>