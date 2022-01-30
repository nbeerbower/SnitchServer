<template>
    <div>
        <div v-for="crash in crashes" :key="crash._id" class="card">
            <crash-card :crash="crash" @crashDeleted="removeCrash" />
        </div>
        <div v-if="!crashes.length" class="text-center">
            <p class="text-muted">No crashes here!</p>
        </div>
    </div>
</template>

<script>
import CrashCard from './CrashCard.vue';

export default {
    components: { CrashCard },
    data() {
        return {
            crashes: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$http.get('/api/crash').then(response => {
                this.crashes = response.data;
            });
        },
        removeCrash(crash) {
            let idx = -1;
            for (let i = 0; i < this.crashes.length && idx === -1; i++) {
                if (this.crashes[i]._id === crash._id) idx = i;
            }
            if (idx !== -1) {
                this.crashes.splice(idx, 1);
            }
        },
    },
}
</script>
