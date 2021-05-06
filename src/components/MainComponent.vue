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
                        <textarea></textarea>
                        <div class="button_add_post">
                            <div class="text">Добавить запись</div>
                        </div>
                    </div>
                    <div class="feed_content">
                        <div class="post" v-for="(post, index) in posts" :key="index">
                            <div class="original_post">
<!--                                [randomRGBA()]-->
<!--                                , {'background-image': 'url(' + getAvatar(post.avatar) + ')'}-->
                                <div class="avatar" :style="randomRGBA()"></div>
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
<!--                                        [randomRGBA()]-->
<!--                                        , {'background-image': 'url(' + getAvatar(comment.avatar) + ')'}-->
                                        <div class="avatar" :style="randomRGBA()" ></div>
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
    </div>
</template>

<script>
    export default {
        name: 'MainComponent',
        data() {
            return {
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
                        name_user: 'vasya',
                        avatar: 12,
                        preview: '',
                        comments: {
                            1: {
                                id: 1,
                                text: '131231',
                                avatar: 9,
                                name_user: 'sf sf 234',
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
                                name_user: 'sfs 23',
                                preview: '',
                            },
                        }
                    },
                   3: {
                        id: 3,
                        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
                        name_user: 'vasya',
                        avatar: 12,
                        preview: '',
                        comments: {
                            1: {
                                id: 1,
                                text: '131231',
                                avatar: 7,
                                name_user: '',
                                preview: '',
                            }
                        }
                    },
                },
                top_themes: {

                }
            }
        },
        computed: {
            getAvatar: {
                get() {
                    return this.way
                },
                set(number) {
                    this.way = '../assets/images/avataaars_' + number + '.svg'
                }
            }
        },
        methods: {
            randomRGBA() {
                let o = Math.round;
                let r = Math.random;
                let s = 255;
                return 'background-color : rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
            },
            makeId(length) {
                let result = [];
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;
                for (let i = 0; i < length; i++ ) {
                    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
                }
                return result.join('');
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
                            border: 1px solid rgba(0,0,0,.1);
                            font-size: 18px;
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
