<template>
    <div>
        <div v-for="crash in crashes" :key="crash._id" class="card">
            <crash-card :crash="crash" @crashDeleted="removeCrash" />
        </div>
        <div v-if="!crashes.length" class="text-center">
            <p class="text-muted">{{ displayText }}</p>
        </div>
    </div>
</template>

<script>
import CrashCard from './CrashCard.vue';

export default {
    components: { CrashCard },
    data() {
        return {
            displayText: 'Loading...',
            crashes: [],
            password: '',
        };
    },
    mounted() {
        this.checkForPassword();
        this.getData();
    },
    methods: {
        checkForPassword() {
            // check local storage for password
            if (localStorage.getItem('password')) {
                this.password = localStorage.getItem('password');
            }
        },
        getData() {
            // if password then add to auth header
            let options = {};
            if (this.password) {
                options.headers = {
                    Authorization: this.password
                };
            }

            this.$http.get('/api/crash', options).then(response => {
                // success
                this.crashes = response.data;
                this.displayText = 'No crashes here!';
                // save password to local storage
                localStorage.setItem('password', this.password);
            }, error => {
                if (error.response.status === 401) {
                    this.password = prompt('Enter password');
                    this.getData();
                } else {
                    console.log(error);
                    this.displayText = 'Error loading crashes';
                }
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
