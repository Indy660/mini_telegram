<template>
    <div class="main" :class="black_theme ? 'black_theme' : ''">
        <div class="content">
            <div class="header">
                <div class="themes">
                    <div class="light" @click="black_theme = false">Светлая тема</div>
                    <div class="black" @click="black_theme = true">Тёмная тема</div>
                </div>
            </div>
            <div class="main_blocks">
                <div class="feed_block">
                    <div class="input_block">
                        <textarea v-model="text_new_post"></textarea>
                        <div class="block_with_buttons">
                            <div class="button_add_image" @click="open_popup = true">
                                <div class="text">+</div>
                            </div>
                            <div class="button_add_post" :class="!text_new_post ? 'disabled' : 'active'" @click="addPost()">
                                <div class="text">Добавить запись</div>
                            </div>
                        </div>
                    </div>
                    <div class="feed_content">
                        <div class="post" v-for="(post, index) in sortPosts()" :key="index">
                            <div class="original_post">
                                <div class="avatar"
                                     :style="{backgroundImage: 'url(' + getAvatar(post.avatar) + ')', backgroundColor: randomRGBA(post.avatar)}"
                                     @mouseover="showUserName('post', post.id)" @mouseleave="hideUserName()"
                                >
<!--                                    v-if="post.id === show_user_name.id && show_user_name.type === 'post'"-->
                                    <div v-if="post.id === show_user_name.id && show_user_name.type === 'post'" class="user_name_block">
                                        {{ post.name_user }}
                                        <div class="arrow"></div>
                                    </div>
                                </div>
                                <div class="text_block">
<!--                                    <template v-if="post.preview">-->
<!--                                        <div class="preview"></div>-->
<!--                                    </template>-->
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
                                            @mouseover="showUserName('comment', comment.id, post.id)" @mouseleave="hideUserName()"
                                        >
<!--                                            v-if="comment.id === show_user_name.id && show_user_name.type === 'comment' && post.id === show_user_name.post_id"-->
                                            <div   v-if="comment.id === show_user_name.id && show_user_name.type === 'comment' && post.id === show_user_name.post_id" class="user_name_block">
                                                {{ comment.name_user }}
                                                <div class="arrow"></div>
                                            </div>
                                        </div>
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
                    <div class="name">
                        Самые часто обсуждаемые посты
                    </div>
                    <div class="post">
                        <div class="circle">14</div>
                        <div class="text">Тема</div>
                    </div>
                    <div class="post">
                        <div class="circle">11</div>
                        <div class="text">Другая, но с ооооооочень длиным названием, даже незнаю, как её продолжить.</div>
                    </div>
                    <div class="post">
                        <div class="circle">9</div>
                        <div class="text">Ещё одна тема</div>
                    </div>
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
                black_theme: false,
                open_popup: false,
                text_new_post: '',
                user_info: {
                    name_user: 'Анонимный анонимус',
                },
                posts: {
                    1: {
                        id: 1,
                        text: 'Это первый комментарий',
                        name_user: 'vasya Panfilov 1111',
                        avatar: 12,
                        preview: '',
                        comments: {
                            1: {
                                id: 1,
                                text: '131231',
                                avatar: 7,
                                name_user: 'sf sf 234 sdfsfdasasd',
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
                                avatar: 12,
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
                        text: 'А это третий пост',
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
                show_user_name: {},
                top_themes: {

                }
            }
        },
        computed: {

        },
        mounted() {
            const posts = localStorage.getItem('post');
            posts ? (this.posts = JSON.parse(posts)) : this.sortPosts()

            // this.sortPosts()
            // let openRequest = indexedDB.open("posts", 1);
            // openRequest.onupgradeneeded = () => {
            //     console.log("Базы нет");
            //     this.sortPosts()
            // };
            // openRequest.onsuccess = () => {
            //     const db = openRequest.result;
            //     if (db) {
            //         console.log('baza', db);
            //         this.posts = db
            //     }
            // }
        },
        methods: {
            sortPosts() {
                // console.log('sortPosts')
                const id_array_reverse = Object.keys(this.posts).sort((a, b) => {
                    return b - a;
                });
                const reverse_posts = {};
                for (let i = 0; i < id_array_reverse.length; i++) {
                    reverse_posts[i] = this.posts[id_array_reverse.length - i]
                }
                return reverse_posts
            },
            randomRGBA(id) {
                // let o = Math.round;
                // let r = Math.random;
                // let s = 255;
                // return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
                const colors = ['#48C7AD', '#883227', '#E3AB6A', '#87DE20', '#FBE2EB', '#380D96', '#2B70D8', '#E64BC9', '#F9E6E6', '#8C00FB'];
                return id <= 10 ? colors[id - 1] : colors[id % colors.length]

            },
            generateMessage(length_message) {
                let result = [];
                let characters = 'abcdefghijklmnopqrstuvwxyz0123456789 ';
                let characters_length = characters.length;
                for (let i = 0; i < length_message; i++ ) {
                    result.push(characters.charAt(Math.floor(Math.random() * characters_length)));
                }
                return result.join('');
                // return result.charAt(0).toUpperCase() + result.slice(1);
            },
            getAvatar(avatar) {
                //12 - по количеству фотографий в аватарках
                const name = avatar <= 10 ? avatar : avatar % 12 === 0 ? 1 : avatar % 12;
                // console.log(name)
                let images = require.context('../assets/images/avatars', false, /\.svg$/);
                return images('./' + name + ".svg")
            },
            addPost() {
                if (this.text_new_post) {
                    const id_post = parseInt(this.findLastIdPost()) + 1;
                    // console.log(id_post)
                    // от 1 до 4 раз ещё будет сгенерирован комментарийй
                    const time_generate_comment = Math.floor(Math.random() * 4) + 1;
                    // console.log('time_generate_comment', time_generate_comment)
                    const post = {
                        id: id_post,
                        text: this.text_new_post,
                        avatar: 1,
                        name_user: this.user_info.name_user,
                        comments: {
                            // 1: {
                            //     id: 1,
                            //     text: '131231',
                            //     avatar: 7,
                            //     name_user: 'katya',
                            //     preview: '',
                            // }
                        }
                    };
                    this.posts[id_post] = post;
                    this.sortPosts();
                    this.text_new_post = '';
                    this.generateRandomComments(id_post, time_generate_comment)
                }
            },
            async generateRandomComments(id_post, step_generate = 0) {
                // console.log('!!!', id_post, step_generate)
                // console.log('generateRandomComments', this.posts[id_post], this.posts[id_post].comments)
                const index_comment = this.findLastIdComment(id_post);
                // const index_comment = 4
                // console.log('index_comment', index_comment);
                let comment = this.generateMessage(10);
                let name_user = this.generateMessage(5);
                let avatar = Math.floor(Math.random() * 11) + 1;
                const obj_comment = {
                    id: index_comment,
                    text: comment,
                    avatar: avatar,
                    name_user: name_user,
                    preview: '',
                };
                // console.log('index_commen', index_comment)
                // от 5 до 30 сек
                const time = Math.floor(Math.random() * 25) + 5;
                // console.log(time)
                // console.log(this.posts[id_post], this.posts[id_post].comments)
                const add_comment = () => {
                    this.$set(this.posts[id_post].comments, index_comment, obj_comment);
                    // console.log(1, this.posts[id_post].comments[index_comment])
                    // this.sortPosts()
                    this.$forceUpdate()
                };

               await new Promise(resolve => {
                    setTimeout(
                        () => {
                            add_comment();
                            resolve();
                        },
                    time * 100
                    )}
               );
               if (step_generate > 0) {
                   this.generateRandomComments(id_post, step_generate - 1)
               } else {
                   localStorage.setItem('post', JSON.stringify(this.posts));
                   return
               }
                // clearTimeout(timerId);

            },
            // findLastIdPost2(data_key) {
                // this.posts
                // console.log(data_key, 'closure')
                // console.log(this[data_key], 'closure11')
                // console.log(this.posts['4'])
                // console.log(this.posts[4].comments, 'closure11')
                // if (this[data_key] && Object.keys(this[data_key]) && Object.keys(this[data_key]).length > 0) {
                //     console.warn(111, Object.keys(this[data_key]))
                //     const sorted_id = Object.keys(this[data_key]).sort((a, b) => {
                //         return b - a;
                //     });
                //     return sorted_id[0]
                // } else {
                //     return 1
                // }
            // },
            findLastIdComment(data_key) {
                console.log(this.posts[data_key], this.posts[data_key].comments)
                if (Object.keys(this.posts[data_key]) && Object.keys(this.posts[data_key].comments) && Object.keys(this.posts[data_key].comments).length > 0) {
                    const sorted_id = Object.keys(this.posts[data_key].comments).sort((a, b) => {
                        return b - a;
                    });
                    // console.log('sorted_id[0]', sorted_id[0] + 1)
                    return sorted_id[0] + 1
                } else {
                    return 1
                }
            },
            findLastIdPost() {
                if (this.posts && Object.keys(this.posts) && Object.keys(this.posts).length > 0) {
                    const sorted_id = Object.keys(this.posts).sort((a, b) => {
                        return b - a;
                    });
                    // console.log('sorted_id[0]!!!', sorted_id[0])
                    return sorted_id[0]
                } else {
                    return 1
                }
            },
            // findLastIndex() {
            //
            // },
            showUserName(type, id, post_id) {
                // console.log(this.show_user_name);
                this.$set(this.show_user_name, 'type', type);
                this.$set(this.show_user_name, 'id', id);
                post_id ? this.$set(this.show_user_name, 'post_id', post_id) : ''
            },
            hideUserName() {
                this.show_user_name = {}
            }
        }
    }
</script>

<!--scoped-->
<style lang="scss">
    * {
        box-sizing: border-box;
    }
    .main {
        display: flex;
        justify-content: center;
        flex: 1;
        &.black_theme {
            background: #000000a6;
            color: #fff6e6;
        }
        .content {
            width: 1192px;
            .header {
                margin: 30px 0;
                display: flex;
                align-items: center;
                .themes {
                    display: flex;
                    font-size: 18px;
                    &>* {
                        opacity: 0.7;
                    }
                    &>*:hover {
                        cursor: pointer;
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
                justify-content: space-between;
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
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;
                                border: 1px solid rgba(0, 0, 0, .2);
                                &.disabled {
                                    cursor: auto;
                                    background-color: rgba(18, 16, 33, 0.65);
                                }
                                &.active {
                                    background-color: #3440ed;
                                    &:hover {
                                        background-color: #3560ed;
                                    }
                                    &:active {
                                        background-color: #1226ed;
                                    }
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
                                    background-position: center;
                                    flex: none;
                                    margin-right: 20px;
                                    position: relative;
                                    .user_name_block {
                                        /*all: unset;*/
                                        position: absolute;
                                        min-width: 50px;
                                        /*max-height: 20px;*/
                                        height: 26px;
                                        background: #9de9ff;
                                        top: 10px;
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
                                        border: 1px solid rgba(0, 0, 0, .1);
                                        border-left: none;
                                        padding: 3px;
                                        right: 120%;
                                        .arrow {
                                            position: absolute;
                                            width: 0;
                                            height: 0;
                                            border: 13px solid #9de9ff;
                                            border-top-color: transparent;
                                            /*border-left-color: transparent;*/
                                            border-bottom-color: transparent;
                                            border-right-color: transparent;
                                            top: -1px;
                                            right: -26px;
                                            z-index: 3;
                                        }
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
                                margin-left: 30px;
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
                                        background-position: center;
                                        flex: none;
                                        border: 1px solid rgba(0,0,0,.1);
                                        margin-right: 20px;
                                        position: relative;
                                        .user_name_block {
                                            position: absolute;
                                            min-width: 50px;
                                            height: 26px;
                                            background: #d2dbff;
                                            top: 1px;
                                            z-index: 3;
                                            font-style: normal;
                                            font-weight: normal;
                                            font-size: 14px;
                                            line-height: 17px;
                                            color: black;
                                            opacity: 1;
                                            text-align: center;
                                            white-space: nowrap;
                                            border: 1px solid rgba(0, 0, 0, .1);
                                            border-left: none;
                                            padding: 3px;
                                            right: 140%;
                                            .arrow {
                                                position: absolute;
                                                width: 0;
                                                height: 0;
                                                border: 13px solid #d2dbff;
                                                border-top-color: transparent;
                                                border-bottom-color: transparent;
                                                border-right-color: transparent;
                                                top: -1px;
                                                right: -26px;
                                                z-index: 3;
                                            }
                                        }
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
                    .name {
                        font-size: 18px;
                        margin-bottom: 70px;
                    }
                    .post {
                        display: flex;
                        align-items: center;
                        height: 80px;
                        margin-bottom: 30px;
                        .circle {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            flex: none;
                            border: 1px solid rgba(0,0,0,.1);
                            margin-right: 30px;
                        }
                        .text {
                            text-align: left;
                        }
                    }
                }
            }
        }

    }
</style>
