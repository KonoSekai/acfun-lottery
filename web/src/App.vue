<template>
  <div class="main">
    <div class="content">
      <!--警告提示-->
      <Alert type="warning" style="margin: 0 auto 10px;width: calc(100% - 16px);" show-icon closable>
        警告
        <span slot="desc">为避免不可预知的严重后果,请勿乱用本工具</span>
      </Alert>
      <!--内容面板-->
      <div class="section">
        <!--顶部logo&title-->
        <div class="header">
          <h1 class="logo">AcFun</h1>
          <h2 class="title">评论抽奖工具</h2>
        </div>
        <!--中间输入框-->
        <div class="center">
          <Row type="flex" justify="center" align="middle" class-name="center-row">
            <Col span="2">
              抽奖地址&nbsp:
            </Col>
            <Col span="10">
              <Input v-model="acUrl" @on-blur="acUrlChangeEvent"/>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle" class-name="center-row">
            <Col span="2">
              抽奖数量&nbsp:
            </Col>
            <Col span="3">
              <InputNumber v-model="number" @on-blur="numberChangeEvent" :min="1"/>
            </Col>
            <Col span="2">
              评论去重&nbsp:
            </Col>
            <Col span="5">
              <Switch v-model="repeat" @on-change="repeatChangeEvent"/>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle" class-name="center-row">
            <Col span="14">
              <Button type="success" @click="lotteryDrawFunction" :loading="loading" long>Go
              </Button>
            </Col>
          </Row>
        </div>
        <!--底部结果list-->
        <div class="footer" v-if="results.length > 0">
          <Button class="send-button" type="info" @click="sendMailFunction">一键打开私信页面</Button>
          <!--result list-->
          <div class="result-list">
            <!--result-->
            <div class="result" v-for="(result,i) in results">
              <!--分割线-->
              <hr class="horizontal-rule" v-if="i > 0">
              <!--头像-->
              <div class="result-avatar">
                <a :href="`http://www.acfun.cn/u/${result.userId}.aspx`">
                  <img class="user-avatar-bg" :src="result.avatarImage">
                  <img class="user-avatar" :src="result.headUrl[0].url">
                </a>
              </div>
              <!--评论-->
              <div class="result-comment">
                <!--顶部信息-->
                <p class="comment-header">
                  <span>#{{result.floor}}</span>
                  <a :href="`http://www.acfun.cn/u/${result.userId}.aspx`"
                     :class="{'name-gray':result.nameRed == 0,'name-red':result.nameRed == 1}">{{result.userName}}</a>
                  <span style="float: right">{{i+1}}</span>
                </p>
                <!--评论-->
                <p class="comment-content">
                  <span v-html="result.content"></span>
                </p>
                <!--底部信息-->
                <p class="comment-footer">
                  <span style="margin-right: 10px">发表于 {{result.postDate}}</span><span style="margin-left: 10px">来自 {{result.deviceModel}}</span>
                  <a class="mail-span" target="_blank" :href="`${mailUrl}${result.userName}`">
                    私信
                  </a>
                </p>
              </div>
            </div>
          </div>
          <Button class="send-button" type="info" v-if="results.length > 5" @click="sendMailFunction">一键打开私信页面
          </Button>
        </div>
      </div>
      <!--页面信息-->
      <div class="page_footer">
        <p class="light-gray-font">Copyright&nbsp;<a href="https://github.com/KonoSekai" target="_blank">Sekai</a>&nbsp;2019-2029&nbsp;All&nbsp;Right&nbsp;Reserved
        </p>
      </div>
    </div>
    <!--抽屉-->
    <Drawer title="抽奖记录" width="500" v-model="exchange">
      <div>
        <div v-for="record in records">
          <p>
            <span style="margin-left: 10px">AC号:</span>
            <a target="_blank" :href="`http://www.acfun.cn/a/ac${record.acid}`">ac{{record.acid}}</a>
            <span style="float: right;margin-right: 10px;">{{getRecordDate(record.date)}}</span>
          </p>
          <div :class="{'records-comment1':true,'records-comment2':record.results.length == 1}">
            <p style="min-width: 100%" v-for="result in record.results">
              <span>#{{result.floor}} </span>
              <a target="_blank" :href="`http://www.acfun.cn/u/${result.userId}.aspx`">{{result.userName}}</a>
              <span style="float: right;">{{result.postDate}}</span>
            </p>
          </div>
        </div>
      </div>
    </Drawer>
    <!--左右下角浮动按钮-->
    <div class="affix">
      <a title="点击访问源码地址" href="https://github.com/KonoSekai/acfun-lottery" target="_blank">
        <div class="icon-button">
          <img src="/static/img/github.svg" style="height: 36px;vertical-align: middle;"/>
          <span>源码地址</span>
        </div>
      </a>
      <a title="点击下载Chrome插件" href="https://lottery.anyplayer.cc/download/acfun-lottery.zip" target="_blank">
        <div class="icon-button">
          <img src="/static/img/chrome.svg" style="height: 36px;vertical-align: middle;"/>
          <span>Chrome插件</span>
        </div>
      </a>
    </div>
    <div class="record-button" @click="exchange = !exchange">抽奖记录</div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import axios from 'axios'

  //通过key获取localstorage中的数据并反序列化
  function get(key) {
    return eval(window.localStorage.getItem(key))
  }

  //将数据储存进localstorage
  function set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  export default {
    data() {
      return {
        mailUrl: 'http://www.acfun.cn/member/#area=mail-new;username=', //私信地址
        number: 1, //抽奖数量

        acid: '', //抽奖页面的acid
        acUrl: '', //抽奖页面的url
        sourceType: 0, //抽奖页面的类型

        totalPage: 0, //评论页面总数
        totalCount: 0, //评论总数

        repeat: true, //是否去重
        loading: false, //载入状态
        exchange: false, //界面切换

        results: [], //抽奖结果
        comments: new Map(), //评论map
      }
    },
    computed: {
      //页面路径
      url() {
        return `/rest/pc-direct/comment/listByFloor?sourceId=${this.acid}&sourceType=${this.sourceType}&pivotCommentId=0&_=${this.time}`
      },
      //抽奖结果记录
      records() {
        let records = get('records')
        if (records == null) records = []
        return records
      }
    },
    methods: {
      //处理日期格式函数
      getRecordDate(date) {
        date = new Date(date)
        let year = date.getFullYear()
        year = year == new Date().getFullYear() ? '' : `${year}-`
        let month = date.getMonth()
        month = month < 9 ? `0${month + 1}` : month + 1
        let day = date.getDate()
        day = day < 10 ? `0${day}` : day
        let hours = date.getHours()
        hours = hours < 10 ? `0${hours}` : hours
        let minutes = date.getMinutes()
        minutes = minutes < 10 ? `0${minutes}` : hours

        return `${year}${month}-${day} ${hours}:${minutes}`
      },
      //页面地址事件绑定函数
      acUrlChangeEvent() {
        let url = this.acUrl
        let regexA = /^www\.acfun\.cn\/([avz])\/ac([0-9]+)$/
        let regexB = /^http(s)?:\/\/www\.acfun\.cn\/([avz])\/ac([0-9]+)$/
        //判断url格式是否正确
        if (regexA.test(url)) url = `http://${url}`
        if (!regexB.test(url)) {
          this.$Message.error('输入的地址是错误的呢(　^ω^)b')
          return true
        }
        //判断是否正常获取acid
        let str = url.match(regexB)
        if (str.length != 4) {
          this.$Message.warning('本页面不能进行抽奖呢(　^ω^)b')
          return true
        }
        //储存数据
        let type = str[2]
        this.acid = str[3]
        this.time = new Date().getTime()
        if (type == "a") this.sourceType = 1
        else this.sourceType = 3

        return false
      },
      //私信按钮事件绑定函数
      sendMailFunction() {
        this.results.forEach((result) => {
          window.open(`${this.mailUrl}${result.userName}`)
        })
      },
      //抽奖数量输入框事件绑定函数
      numberChangeEvent() {
        let num = Math.ceil(this.number)
        //判断抽奖数量是否合法
        if (isNaN(num) || num < 1) {
          num = 1
          this.$Message.warning('至少要抽取一位幸运用户呢(　^ω^)b')
        }

        this.number = num
      },
      //评论去重按钮事件绑定函数
      repeatChangeEvent() {
        set('repeat', this.repeat)
      },
      //储存抽奖记录函数
      saveRecordsFunction() {
        let records = get('records')
        if (records == null) records = []

        let results = []
        this.results.forEach((result) => {
          results.push({
            userId: result.userId,
            userName: result.userName,
            floor: result.floor,
            postDate: result.postDate
          })
        })

        records.push({acid: this.acid, date: new Date().getTime(), results: results})
        set('records', records)
      },
      //抽奖按钮事件绑定函数
      lotteryDrawFunction() {
        this.loading = true
        if (this.acUrlChangeEvent()) {
          this.loading = false
          return
        }

        let results = this.results
        if (results.length > 0 && results[0].sourceId == this.acid) {
          this.$Message.error('已经抽过奖了呢(　^ω^)b')
          this.loading = false
          return
        }
        //调用获取commentinfo函数
        this.getCommentInfoFunction().then(() => {
          //如果评论数量超过1页调用getOverplusComment
          if (this.totalPage > 1) {
            this.getOverplusCommentFunction(2).then(() => {
              //调用抽奖函数
              this.getLotteryResultsFunction()
            }).catch((err) => {
              console.log(err)
            })
          } else {
            //调用抽奖函数
            this.getLotteryResultsFunction()
          }
        }).catch((err) => {
          console.log(err)
        })

        this.loading = false
      },
      //获取commentinfo函数
      getCommentInfoFunction() {
        return new Promise((resolve, reject) => {
          axios.get(this.url).then((res) => {
            let data = res.data
            //判断评论数量
            if (data.totalCount < 1) {
              this.$Message.warning('一条评论都没有你还想抽奖?(　^ω^)b')
              reject()
            } else {
              //清空评论
              this.comments = new Map()
              //保存commentinfo
              this.totalPage = data.totalPage
              this.totalCount = data.totalCount
              this.pushCommentFunction(data.commentsMap)
              resolve()
            }
          }).catch(() => {
            this.$Message.error('发生了错误呢(　^ω^)b')
            this.disabled = true
            reject()
          })
        })
      },
      //获取抽奖结果函数
      getLotteryResultsFunction() {
        let results = new Set()
        let number = this.number
        let comments = this.comments
        let keys = Array.from(comments.keys())

        if (number > keys.length) {
          number = keys.length
          this.$Message.warning('只能抽这几个人了呢(　^ω^)b')
        }

        while (results.size < number) {
          if (keys.length < 1) break

          let random = Math.floor(Math.random() * keys.length)
          let key = keys[random]
          let result = comments.get(key)
          //调用处理评论格式函数
          result.content = this.handleContentFunction(result.content)
          //储存结果
          results.add(result)
          keys.splice(random, 1)
        }

        //对results排序
        results = Array.from(results)
        results.sort((x, y) => {
          return y.floor - x.floor
        })

        this.number = number
        this.results = results
        this.saveRecordsFunction()
      },
      //获取剩余页面评论函数
      getOverplusCommentFunction(i) {
        return new Promise((resolve, reject) => {
          if (this.totalPage < i) {
            resolve()
            return
          }
          axios.get(`${this.url}&page=${i}`).then((res) => {
            this.pushCommentFunction(res.data.commentsMap)
            this.getOverplusCommentFunction(i + 1).then(() => {
              resolve()
            }).catch((err) => {
              reject(err)
            })
          }).catch((err) => {
            reject(err)
          })
        })
      },
      //处理评论格式函数
      handleContentFunction(content) {
        let regex = [
          //处理表情正则表达式
          [/(\[emot=)(\w+)(,)(\w+)(\/])/g, `<img src="http://cdn.aixifan.com/dotnet/20130418/umeditor/dialogs/emotion/images/$2/$4.gif" style="max-width: 88px">`],
          //处理At正则表达式
          [/(\[at])(.*?)(\[\/at])/g, `<a href="http://www.acfun.cn/member/findUser.aspx?userName=$2" style="color: #2B85E4 !important;" target="_blank">@$2</a>`],
          //处理ac号正则表达式
          [/(\[ac=)(.*?)(])(.*?)(\[\/ac])/g, `<a href="http://www.acfun.cn/a/$4" style="color: #2B85E4 !important;" target="_blank">$4</a>`],
          //处理字体大小正则表达式
          [/(\[size=)(.*?)(])(.*?)(\[\/size])/g, `<span style="font-size: $2">$4</span>`],
          //处理图片正则表达式
          [/(\[img=图片])(.*?)(\[\/img])/g, `<img src="$2" style="max-width: 250px"><br>`],
          //处理字体颜色正则表达式
          [/(\[color=)(.*?)(])(.*?)(\[\/color])/g, `<span color="$2">$4</span>`],
          //处理字体删除线正则表达式
          [/(\[s])(.*?)(\[\/s])/g, `<del">$2</del>`],
          //处理字体加粗正则表达式
          [/(\[b])(.*?)(\[\/b])/g, `<b">$2</b>`],
          //处理字体下划线正则表达式
          [/(\[u])(.*?)(\[\/u])/g, `<u">$2</u>`],
          //处理字体倾斜正则表达式
          [/(\[i])(.*?)(\[\/i])/g, `<i">$2</i>`],
          //处理换行正则表达式
          [/&lt;br\/&gt;/g, `<br>`],
          //处理空格正则表达式
          [/&amp;nbsp;/g, `&nbsp;`]
        ]

        regex.forEach((reg) => {
          content = content.replace(reg[0], reg[1])
        })

        return content
      },
      //将评论储存进comments中
      pushCommentFunction(commentsMap) {
        let repeat = this.repeat
        for (let prop in commentsMap) {
          //评论是否为被删除评论
          if (commentsMap[prop].userId == 0) continue
          //判断评论是否去重并分别按照userid和cid储存
          if (repeat) this.comments.set(commentsMap[prop].userId, commentsMap[prop])
          else this.comments.set(commentsMap[prop].cid, commentsMap[prop])
        }
      }
    },
    created() {
      let repeat = get('repeat')
      if (repeat == null) repeat = true
      this.repeat = repeat
    }
  }
</script>

<style>
  @import url('app.css');
</style>
