<template v-show="shown">
    <div class="overlay" @click="closePopup()">
        <div class="pop_up" @click.stop>

            <div class="name">Прикрепление фотографий к посту</div>
            <form ref="fileform" class="form">
                Перетащите файлы, которые хотите закрепить в посте <br/> (на данный момент только выводит в этом попапе и никак не связан с предыдущим полем)
            </form>
            <input type="file" class="input_files" @change="onFileChange" multiple/>
            <div class="area_file">
                <div v-for="(file, key) in files" :key="key">
<!--                    <div class="file" v-bind:ref="'preview' + parseInt(key)">-->
<!--                        <div class="delete_file" @click="deleteFile(file, key)">&#10005;</div>-->
<!--                    </div>-->
                    <div class="file"  :style="{backgroundImage: `url('${file}')`}">
                        <div class="delete_file" @click="deleteFile(file, key)">&#10005;</div>
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
                this.files.push(URL.createObjectURL(e.dataTransfer.files[i]))
                //cтарая реализация
                // this.files.push(e.dataTransfer.files[i]);
                // this.getImagePreviews();
            }
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
        onFileChange(event) {
            // console.log('onFileChange')
            //cтарая реализация
            // const file = event.target.files[0];
            // this.files.push(URL.createObjectURL(file));
            // this.getImagePreviews()
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                this.files.push(URL.createObjectURL(files[i]));
            }
        },
        //cтарая реализация
        // getImagePreviews() {
        //     for (let i = 0; i < this.files.length; i++) {
        //         this.files.push(URL.createObjectURL(this.files[i]))
                // if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
                //     let reader = new FileReader();
                //     reader.addEventListener("load", function () {
                //         this.$refs['preview' + parseInt(i)][0].style.backgroundImage = `url("${reader.result}")`;
                //     }.bind(this), false);
                //     reader.readAsDataURL(this.files[i]);
                // } else {
                //     this.$nextTick(function () {
                //         this.$refs['preview' + parseInt(i)][0].style.backgroundImage = `url("../assets/images/default_image.png")`
                //     });
                // }
        //     }
        // },
        deleteFile(file, index) {
            this.files.splice(index, 1)
        },
        closePopup() {
            this.$emit('update:shown', false)
        },
    }
}
</script>

<style lang="scss" scoped>
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
            cursor: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
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
                flex: none;
                &.form_dragEnter {
                    background: #98ebfd;
                    border: 1px dashed #000000;
                    transition: 0.3s;
                }
            }
            .input_files {
                flex: none;
                margin: 20px 0;
            }

            .area_file {
                display: flex;
                flex-wrap: wrap;
                flex: none;
                height: 200px;
                width: 100%;
                overflow-y: auto;
                margin-top: 20px;
                &::-webkit-scrollbar {
                    width: 5px;
                    /*height: 8px;*/
                }
                &::-webkit-scrollbar-thumb {
                    background-color: #919bab;
                }
                .file {
                    width: 150px;
                    height: 100px;
                    flex: none;
                    margin-right: 30px;
                    margin-bottom: 30px;
                    position: relative;
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                    border: 1px solid rgba(0, 0, 0, 0.1);

                    .delete_file {
                        position: absolute;
                        top: 10px;
                        right: 10px;
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

                        &:hover {
                            background-color: red;
                            color: white;
                        }
                    }
                }
            }
        }
    }
</style>
