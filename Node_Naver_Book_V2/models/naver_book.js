var mongoose = require('mongoose')

var book = mongoose.Schema({
    search: String,         // 검색어로 사용하기 위한 칼럼
    title : String,
    link : String,
    image : String,
    author : String,
    price : String,
    discount : String,
    publisher : String,
    pubdate : String,
    isbn : {
        type : String,
        unique : true // ISBN이 같은 도서는 저장 금지
    },
    discription : String
})

module.exports = mongoose.model('tbl_naver_book', book)