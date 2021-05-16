// export default {
//     build: {
//         loaders: {
//             // file: { esModule: false },
//             imgUrl: {esModule: false},
//         }
//     },
// }
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/mini_twitter/'
        : '/'
}