<template v-show="shown">
    <div class="overlay" @click="closePopup()">
        <div class="pop_up" @click.stop>
            <div class="name">Прикрепление фотографий к посту</div>
            <form ref="fileform" class="form">
                Перетащите файлы, которые хотите закрепить в посте (максимум 4)
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DragAndDropComponent',
    data() {
        return {
            files: [],
            preMapping: [],
            mapping: {},
        }
    },
    props: {
        shown: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
            this.$refs.fileform.addEventListener(evt, function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        }.bind(this));

        this.$refs.fileform.addEventListener('drop', function (e) {
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                this.files.push(e.dataTransfer.files[i]);
            }
            this.submitFiles();
        }.bind(this));

        this.$refs.fileform.addEventListener('dragenter', function (event) {
            event.target.classList.add('form_dragEnter');
        }, false);
        this.$refs.fileform.addEventListener('dragleave', function (event) {
            event.target.classList.remove('form_dragEnter');
        }, false);
        this.$refs.fileform.addEventListener('drop', function (event) {
            event.target.classList.remove('form_dragEnter');
        }, false);
    },
    methods: {
        submitFiles() {
            // console.log(this.workflowData.current_user)
            const formData = new FormData();
            for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                formData.append('file_' + (i + 1), file);
            }
        },
        closePopup() {
            this.$emit('update:shown', false)
        },
    }
}
</script>

<style scoped>
    .overlay {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 10;
        overflow-y: auto;
        cursor: pointer;
    }

    .pop_up {
        width: 650px;
        height: 350px;
        padding: 40px;
        position: absolute;
        left: calc(50% - 325px);
        top: 60px;
        z-index: 11;
        background-color: white;
        overflow: hidden;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .name {
        font-size: 25px;
        margin-bottom: 20px;
    }

    .form {
        /*width: inherit;*/
        /*height: inherit;*/
        width: 80%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #8b8dc0;
        color: rgba(0, 0, 0, 0.7);
        text-align: center;
        padding: 0 30px;
    }

    .form_dragEnter {
        background: #98ebfd;
        border: 1px dashed #000000;
        transition: 0.3s;
    }
</style>
