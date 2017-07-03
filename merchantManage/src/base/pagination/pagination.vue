<template>
  <div class="paginationWrapper">
    <div class="page-wrap">
      <ul v-show="prePage" class="li-page prevPage" @click="goPrePage">上一页</ul>
      <ul class="list">
        <li v-for="i in showPageBtn" 
            :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage}" 
            @click="pageOffset(i)">
          <a v-if="i" class="notPointer">{{i}}</a>
          <a v-else>···</a>
        </li>
      </ul>
      <ul v-show="nextPage" class="li-page nextPage" @click="goNextPage">下一页</ul>
    </div>
  </div>
</template>

<script  type="text/ecmascript-6">
  export default{
    props: {
      num: {
        type: Number
      },
      limit: {
        type: Number
      }
    },
    data(){
      return {}
    },
    computed: {
      offset() {
        return this.$store.state.offset
      },
      prePage() {
        return this.offset !== 0 && this.num
      },
      nextPage() {
        return (this.offset + this.limit < this.num) && this.num
      },
      totalPage() {
        return Math.ceil(this.num / this.limit)
      },
      currentPage() {
        return Math.ceil(this.offset / this.limit) + 1
      },
      showPageBtn() {
        let pageNum = this.totalPage,
            index = this.currentPage,
            arr = []
        if (pageNum <= 5) {
          for(let i = 1; i <= pageNum; i++) {
            arr.push(i)
          }
          return arr
        }
        if (index <= 2) return [1,2,3,0,pageNum]
        if (index >= pageNum -1) return [1,0, pageNum -2, pageNum -1, pageNum]
        if (index === 3) return [1,2,3,4,0,pageNum]
        if (index === pageNum -2) return [1,0, pageNum-3, pageNum-2, pageNum-1, pageNum]
        return [1,0, index-1, index, index + 1, 0, pageNum]
      }
    },
    methods: {
      pageOffset(i) {
        if (i === 0 || i === this.currentPage) return
        this.$store.commit('GO_PAGE', (i-1) * this.limit)
        this.$emit('getNew', this.currentPage)
        console.log(this.currentPage)
      },
      goPrePage() {
        this.$store.commit('PRE_PAGE', this.limit)
        this.$emit('getNew', this.currentPage)
        console.log(this.currentPage)
      },
      goNextPage() {
        let page = this.currentPage + 1
        this.$store.commit('NEXT_PAGE', this.limit)
        this.$emit('getNew', page)
        console.log(this.currentPage)
      },
      init() {
        let page = this.$route.query.page || 1
        console.log(page, 'page')
      }
    },
    watch: {
      '$router': 'init'
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.paginationWrapper
  text-align: right
  .page-wrap
    display: inline-block
    text-align: right
    font-size: 18px
    margin-top: 10px
    margin: 2px 0
    white-space: nowrap
    border-radius: 4px
    font-size: 13px
    ul
      display: inline-block
      list-style: none
      overflow: hidden
      border: 1px solid #ddd
      float: left
      margin-left: -1px
      &.prePage
        border-top-left-radius: 3px
        border-bottom-left-radius: 3px
      li
        float: left
        color: #1e5a6b
        padding: 1px 10px
        margin-left: -1px
        user-select: none
        border: 1px solid transparent
      &.list
        li:last-child
          border-right: 0
    .pointer
      cursor: pointer
      background-color: #FFFFFF
      border-color: #DDDDDD
      color: inherit
      cursor: default
      z-index: 2
      padding: 5px 10px
      border-top: transparent
      border-bottom: transparent
    .hover
      &:hover
        cursor: pointer
        background-color: #f4f4f4
        border-color: #DDDDDD
        color: inherit
        cursor: default
        z-index: 2
        cursor: pointer
    .li-page 
      line-height: 1.5
      font-size: 13px
      cursor: pointer
      color: #1e5a6b
      padding: 2px 10px
      &:hover
        background-color: #DDDDDD
    .active
      background-color: #f4f4f4
      border-color: #DDDDDD
      color: inherit
      cursor: default
      z-index: 2
</style>
