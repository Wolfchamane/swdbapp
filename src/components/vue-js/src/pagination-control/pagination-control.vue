<script lang='ts' setup>
import type { PaginationControlEvents, PaginationControlProperties } from "./pagination-control.types";
import {
    faCircleLeft,
    faCircleRight,
    faSquareCaretLeft,
    faSquareCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { currentPage, min, totalPages } = defineProps<PaginationControlProperties>();
const emits = defineEmits<PaginationControlEvents>();

const onFirstClick = () => {
    emits('paginate', min);
};

const onPreviousClick = () => {
    if (currentPage > min) {
        emits('paginate', Number(currentPage - 1));
    }
};

const onNextClick = () => {
    if (currentPage <= totalPages) {
        emits('paginate', Number(currentPage + 1));
    }
};

const onLastClick = () => {
    emits('paginate', totalPages);
};

</script>
<template>
    <div class="d-flex align-center justify-space-evenly">
        <button class="btn color-primary fs-l" @click="onFirstClick" :disabled="disabled || currentPage === min">
            <font-awesome-icon :icon="faSquareCaretLeft" />
        </button>
        <button class="btn color-primary fs-l" @click="onPreviousClick" :disabled="disabled || currentPage === min">
            <font-awesome-icon :icon="faCircleLeft" />
        </button>
        <span>Page: {{ currentPage }} / {{ totalPages }}</span>
        <button class="btn color-primary fs-l" @click="onNextClick" :disabled="disabled || currentPage === totalPages">
            <font-awesome-icon :icon="faCircleRight" />
        </button>
        <button class="btn color-primary fs-l" @click="onLastClick" :disabled="disabled || currentPage === totalPages">
            <font-awesome-icon :icon="faSquareCaretRight" />
        </button>
    </div>
</template>
