<template>
    <div class="card">
        <button class="btn fs-3" :class="crash.uncaught ? 'btn-danger' : 'btn-primary'" @click="toggleBodyCollapse">
            {{ crash.message }}
        </button>
        <div class="card-body container" v-if="!collapsed">
            <div class="alert alert-secondary">
                <button class="btn btn-outline-danger btn-sm float-end" @click="deleteCrash">Delete</button>
                <span class="fs-2">{{ crash.script }} ({{ crash.line }})</span>
                <p class="fw-light">Uploaded {{ date.toLocaleString() }}</p>
                <p v-if="crash.version" class="fw-light">{{ crash.version }}</p>
                <p v-if="crash.server" class="fw-light">{{ crash.server }}:{{ crash.port }}</p>
            </div>
            <div class="row">
                <div class="col-6">
                    <p>{{ crash.longMessage }}</p>
                    <button v-if="crash.os" class="btn btn-secondary btn-sm" @click="toggleOSInfo">Show OS Info</button>
                    <div v-if="showOSInfo">
                        <pre>
                            <code>
                                {{ JSON.stringify(JSON.parse(crash.os),null,2) }}
                            </code>
                        </pre>
                    </div>
                </div>
                <div class="col-6">
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr><th>Stacktrace</th></tr>
                        </thead>
                        <tbody>
                            <tr v-for="script in crash.stacktrace" :key="script">
                                <td>{{ script }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            crash: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                collapsed: true,
                date: new Date(this.crash.timestamp),
                showOSInfo: false
            };
        },
        methods: {
            toggleBodyCollapse() {
                this.collapsed = !this.collapsed;
            },
            toggleOSInfo() {
                this.showOSInfo = !this.showOSInfo;
            },
            deleteCrash() {
                if (confirm("Are you sure you want to delete this crash?")) {
                    this.$http.delete(`/api/crash/${this.crash._id}`).then(() => {
                        this.$emit('crashDeleted', this.crash);
                    });
                }
            },
        }
    }
</script>