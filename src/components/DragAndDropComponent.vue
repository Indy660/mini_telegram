<template v-show="shown">
    <div class="overlay" @click="closePopup()">
        <div class="pop_up" @click.stop>

            <div class="name">Прикрепление фотографий к посту</div>
            <form ref="fileform" class="form">
                Перетащите файлы, которые хотите закрепить в посте (максимум 4)
            </form>
<!--            <div class="area_file">-->
<!--                <div class="file" v-for="(file, index) in files" :key="index">-->
<!--&lt;!&ndash;                    {{ file }}&ndash;&gt;-->
<!--                </div>-->
<!--            </div>-->
            <div class="area_file">
                <div v-for="(file, key) in files" :key="key">
                    <div class="file" v-bind:ref="'preview'+parseInt( key )">
                        <div class="delete_file">&#10005;</div>
<!--                    </img>-->
                    <!--                {{ file.name }}-->
                    </div>
                </div>
            </div>
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
                this.getImagePreviews();
            }
            // this.submitFiles();
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
        // submitFiles() {
        //     // console.log(this.workflowData.current_user)
        //     const formData = new FormData();
        //     for (let i = 0; i < this.files.length; i++) {
        //         const file = this.files[i];
        //         formData.append('file_' + (i + 1), file);
        //     }
        // },
        getImagePreviews() {
            for (let i = 0; i < this.files.length; i++) {
                if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
                    let reader = new FileReader();
                    reader.addEventListener("load", function () {
                        this.$refs['preview' + parseInt(i)][0].backgroundImage = reader.result;
                        // this.$refs['preview' + parseInt(i)][0].src = reader.result;
                    }.bind(this), false);
                    reader.readAsDataURL(this.files[i]);
                } else {
                    this.$nextTick(function () {
                        this.$refs['preview' + parseInt(i)][0].backgroundImage = "url('../assets/images/default_image.png')";
                        // this.$refs['preview' + parseInt(i)][0].src = '/images/file.png';
                    });
                }
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
        height: 550px;
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
        flex-direction: column;
    }

    .name {
        font-size: 25px;
        margin-bottom: 20px;
        flex: none
    }

    .form {
        /*width: inherit;*/
        /*height: inherit;*/
        width: 80%;
        height: 280px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #8b8dc0;
        color: rgba(0, 0, 0, 0.7);
        text-align: center;
        padding: 0 30px;
        flex: none
    }

    .form_dragEnter {
        background: #98ebfd;
        border: 1px dashed #000000;
        transition: 0.3s;
    }

    .area_file {
        display: flex;
        flex-wrap: wrap;
        flex: none;
        height: 200px;
        width: 100%;
        overflow-y: auto;
        margin-top: 20px;
    }
    .file {
        width: 100px;
        height: 100px;
        flex: none;
        margin-right: 30px;
        margin-bottom: 30px;
        position: relative;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .delete_file {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: white;
        /*text-align: center;*/
        border: 1px solid rgba(0, 0, 0, 0.3);
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
    }

    .delete_file:hover {
        background-color: red;
        color: white;
    }


</style>
