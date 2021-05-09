<template>
    <div class="main">
        <div class="content">
            <div class="header">
                <div class="themes">
                    <div class="light">Светлая тема</div>
                    <div class="black">Тёмная тема</div>
                </div>
            </div>
            <div class="main_blocks">
                <div class="feed_block">
                    <div class="input_block">
                        <textarea v-model="new_post"></textarea>
                        <div class="block_with_buttons">
                            <div class="button_add_image" @click="open_popup = true">
                                <div class="text">+</div>
                            </div>
                            <div class="button_add_post" @click="addPost()">
                                <div class="text">Добавить запись</div>
                            </div>
                        </div>
                    </div>
                    <div class="feed_content">
                        <div class="post" v-for="(post, index) in posts" :key="index">
                            <div class="original_post">
<!--                                [randomRGBA()]-->
<!--                                , {'background-image': 'url(' + getAvatar(post.avatar) + ')'}-->
<!--                                {'background-image': 'url(' + getAvatar(post.avatar) + ')'},-->
                                <div class="avatar"
                                     :style="{backgroundImage: 'url(' + getAvatar(post.avatar) + ')',backgroundColor: randomRGBA(post.avatar)}"
                                     @mouseover="showUserName(post)" @mouseleave="hideUserName()">
                                    <div v-if="post.id === show_user_name.id" class="user_name_block">{{ post.name_user }}</div>
                                </div>
                                <div class="text_block">
                                    <template v-if="post.preview">
                                        <div class="preview"></div>
                                    </template>
                                    <div class="text">
                                        {{ post.text }}
                                    </div>
                                </div>
                            </div>
                            <template v-if="post.comments">
                                <div class="comments">
                                    <div class="comment_block" v-for="(comment, index) in post.comments" :key="index">
                                        <div class="avatar"
                                             :style="{backgroundImage: 'url(' + getAvatar(comment.avatar) + ')', backgroundColor: randomRGBA(comment.avatar)}"
                                            @mouseover="showUserName(comment)" @mouseleave="hideUserName()">
                                        ></div>
                                        <div class="comment">
                                            {{ comment.text }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="most_popular_posts">

                </div>
            </div>
        </div>
        <template v-if="open_popup">
            <DragAndDropComponent :shown.sync="open_popup"/>
        </template>
    </div>
</template>

<script>
    import DragAndDropComponent from "./DragAndDropComponent";
    export default {
        name: 'MainComponent',
        components: {
            DragAndDropComponent
        },
        data() {
            return {
                open_popup: false,
                new_post: '',
                user_info: {
                    name_user: 'user_user',
                },
                posts: {
                    1: {
                        id: 1,
                        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                        name_user: 'vasya',
                        avatar: 12,
                        preview: '',
                        comments: {
                            1: {
                                id: 1,
                                text: '131231',
                                avatar: 7,
                                name_user: 'sf sf 234',
                                preview: '',
                            },
                            2: {
                                id: 2,
                                text: '312 1231 sfdfs fs',
                                avatar: 6,
                                name_user: 'fs 2 3423',
                                preview: '',
                            },
                            3: {
                                id: 3,
                                text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                                avatar: 2,
                                name_user: 'sfs 23',
                                preview: '',
                            },
                        }
                    },
                    2: {
                        id: 2,
                        text: '131231',
                        name_user: 'nikita',
                        avatar: 7,
                        preview: '',
                        comments: {
                            1: {
                                id: 1,
                                text: '131231',
                                avatar: 9,
                                name_user: 'dima',
                                preview: '',
                            },
                            2: {
                                id: 2,
                                text: '312 1231 sfdfs fs',
                                avatar: 2,
                                name_user: 'fs 2 3423',
                                preview: '',
                            },
                            3: {
                                id: 3,
                                text: '13fs21341 sf1231',
                                avatar: 11,
                                name_user: 'sasha 666',
                                preview: '',
                            },
                        }
                    },
                   3: {
                        id: 3,
                        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                        name_user: 'dima',
                        avatar: 555,
                        preview: '',
                        comments: {
                            1: {
                                id: 1,
                                text: '131231',
                                avatar: 7,
                                name_user: 'katya',
                                preview: '',
                            }
                        }
                    },
                },
                show_user_name: '',
                top_themes: {

                }
            }
        },
        computed: {
            // getAvatar: {
            //     get() {
            //         return this.way
            //     },
            //     set(number) {
            //         this.way = '../assets/images/avataaars_' + number + '.svg'
            //     }
            // }
        },
        methods: {
            randomRGBA(id) {
                // let o = Math.round;
                // let r = Math.random;
                // let s = 255;
                // return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
                const colors = ['#48C7AD', '#883227', '#E3AB6A', '#87DE20', '#FBE2EB', '#380D96', '#2B70D8', '#E64BC9', '#F9E6E6', '#8C00FB']
                return id <= 10 ? colors[id-1] : colors[id % colors.length]

            },
            makeId(length) {
                let result = [];
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;
                for (let i = 0; i < length; i++ ) {
                    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
                }
                return result.join('');
            },
            // getAvatar(number) {
            //     console.log('getAvatar', number)
            //     // return "background-image:url('../assets/images/avataaars_8.svg')"
            //     // return require(`~/assets/images/big_cards_slider/${top_block_image[this.top_block_slide]}`).default
            //     // return require(`~/assets/logo.png`)
            //     // return '../assets/logo.png'
            //     return '@/assets/images/avataaars_8.svg'
            //     // return '/assets/images/avataaars_' + number + '.svg'
            // },
            getAvatar(avatar) {
                //12 - по количеству фотографий в аватарках
                const name = avatar <= 10 ? avatar : avatar % 12 === 0 ? 1 : avatar % 12
                // console.log(name)
                let images = require.context('../assets/images/avatars', false, /\.svg$/)
                return images('./' + name + ".svg")
            },
            addPost() {

            },
            showUserName(obj) {
                this.show_user_name = obj;
                if (Object.prototype.hasOwnProperty.call(obj, "comments")) {
                    this.show_user_name.post = true
                } else {
                    this.show_user_name.post = false
                }
            },
            hideUserName() {
                this.show_user_name = {}
            }
        }
    }
</script>

<!--scoped-->
<style lang="scss">
    .main {
        display: flex;
        justify-content: center;
        flex: 1;
        .content {
            width: 1192px;
            .header {
                margin: 30px 0;
                display: flex;
                align-items: center;
                .themes {
                    display: flex;
                    font-size: 18px;
                    opacity: 0.7;
                    &>*:hover {
                        opacity: 1;
                    }
                    .light {
                        margin-right: 20px;
                    }
                }
            }

            .main_blocks {
                display: flex;
                /*flex: 1;*/
                .feed_block {
                    width: 700px;
                    margin-bottom: 30px;
                    .input_block {
                        height: 200px;
                        display: flex;
                        align-items: flex-end;
                        justify-content: space-between;
                        margin-bottom: 30px;

                        textarea {
                            width: 450px;
                            height: 100%;
                            resize: none;
                            border: 1px solid rgba(0, 0, 0, .1);
                            font-size: 18px;

                            &:focus {
                                border-color: #98a8f8;
                                outline: none;
                            }
                        }

                        .block_with_buttons {
                            .button_add_image {
                                width: 50px;
                                height: 50px;
                                background-color: #87ed74;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;
                                margin-bottom: 30px;

                                &:hover {
                                    background-color: #b6edab;
                                }

                                &:active {
                                    background-color: #18ed0c;
                                }

                                .text {
                                    color: black;
                                    font-size: 20px;
                                    text-align: center;
                                }
                            }

                            .button_add_post {
                                width: 200px;
                                height: 50px;
                                background-color: #3440ed;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;

                                &:hover {
                                    background-color: #3560ed;
                                }

                                &:active {
                                    background-color: #1226ed;
                                }

                                .text {
                                    color: white;
                                    font-size: 14px;
                                    text-align: center;
                                }
                            }
                        }
                    }
                    .feed_content {
                        .post {
                            margin-bottom: 20px;
                            .original_post {
                                display: flex;
                                /*justify-content: space-between;*/
                                /*flex: 1;*/
                                border: 1px black solid;
                                padding: 20px 10px;
                                min-height: 70px;
                                margin-bottom: 20px;
                                .avatar {
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    background-size: contain;
                                    background-repeat: no-repeat;
                                    flex: none;
                                    margin-right: 20px;
                                    position: relative;
                                    .user_name_block {
                                        /*all: unset;*/
                                        position: absolute;
                                        min-width: 50px;
                                        max-height: 20px;
                                        background: white;
                                        top: -30px;
                                        z-index: 3;
                                        font-style: normal;
                                        font-weight: normal;
                                        font-size: 14px;
                                        line-height: 17px;
                                        color: black;
                                        opacity: 1;
                                        text-align: center;
                                        /*padding: 10px;*/
                                        white-space: nowrap;
                                    }
                                }
                                .text_block {
                                    width: 600px;
                                    .preview {
                                        height: 200px;
                                        width: 100%;
                                        margin-bottom: 15px;
                                    }
                                    .text {
                                        font-size: 14px;
                                        text-align: left;
                                    }
                                }
                            }
                            .comments {
                                .comment_block {
                                    margin-bottom: 15px;
                                    display: flex;
                                    /*justify-content: space-between;*/
                                    min-height: 50px;
                                    .avatar {
                                        width: 30px;
                                        height: 30px;
                                        border-radius: 50%;
                                        background-size: contain;
                                        background-repeat: no-repeat;
                                        flex: none;
                                        border: 1px solid rgba(0,0,0,.1);
                                        margin-right: 20px;
                                    }
                                    /*.avatar_1 {*/
                                    /*    background-image: url('../assets/logo.png')*/
                                    /*}*/
                                    .comment {
                                        text-align: left;
                                    }
                                }
                            }
                        }
                    }
                }

                .most_popular_posts {
                    width: 300px;
                }
            }
        }

    }
</style>
