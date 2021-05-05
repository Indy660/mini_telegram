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
                                <div class="avatar"></div>
                                <div class="text_block">
                                    <div class="preview"></div>
                                    <div class="text"></div>
                                </div>
                            </div>
                            <template v-if="post.comments">
                                <div class="comments">
                                    <div class="comment_block" v-for="(comment, index) in post.comments" :key="index">
                                        <div class="avatar">

                                        </div>
                                        <div class="comment">
                                            {{ comment }}
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
                user_info: {},
                posts: {
                    1: {
                        id: 1,
                        text: '131231',
                        name_user: 'vasya',
                        avatar: '',
                        preview: '',
                        comments: {
                            1: {
                                id: 1,
                                text: '131231',
                                name_user: '',
                                preview: '',
                            }
                        }
                    }
                },
                top_themes: {

                }
            }
        },
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
                    & >:first_of_type {
                        margin-right: 20px;
                    }
                }
            }

            .main_blocks {
                display: flex;
                flex: 1;
                .feed_block {
                    width: 700px;
                    margin-bottom: 30px;
                    .input_block {
                        height: 200px;
                        display: flex;
                        align-items: flex-end;
                        justify-content: space-between;
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
                                justify-content: space-between;
                                flex: 1;
                                border: 1px black solid;
                                padding: 20px 10px;
                                min-height: 70px;
                                .avatar {
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    background-size: contain;
                                    background-repeat: no-repeat;
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
                                    }
                                }
                            }
                            .comments {
                                .comment_block {
                                    margin-bottom: 15px;
                                    display: flex;
                                    justify-content: space-between;
                                    min-height: 50px;
                                    .avatar {
                                        width: 30px;
                                        height: 30px;
                                        border-radius: 50%;
                                        background-size: contain;
                                        background-repeat: no-repeat;
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
