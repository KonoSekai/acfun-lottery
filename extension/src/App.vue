<template>
  <!--主界面-->
  <Card class="card" dis-hover>
    <!--logo-->
    <Row type="flex" justify="center" align="middle">
      <Col span="8" class-name="logo center">AcFun</Col>
    </Row>
    <!--title-->
    <Row type="flex" justify="center" align="middle">
      <Col span="8" class-name="center">评论抽奖工具</Col>
    </Row>
    <!--container-->
    <Row type="flex" justify="center" align="middle" class-name="container">
      <Col span="4" class-name="center">
        抽奖数量&nbsp:
      </Col>
      <Col span="5" class-name="center">
        <InputNumber v-model="number" @on-blur="change" :min="1" :max="20"/>
      </Col>
      <Col span="4" class-name="center">
        评论去重&nbsp:
      </Col>
      <Col span="3" class-name="center">
        <Switch v-model="repeat"/>
      </Col>
    </Row>
    <Row type="flex" justify="center" align="middle" class-name="go-button">
      <Col span="22">
        <Button type="success" @click="click" :disabled="disabled" :loading="loading" long>Go</Button>
      </Col>
    </Row>
    <Button class="send-button" type="info" v-if="results.length > 0" @click="sendMail">打开私信页面</Button>
    <!--result list-->
    <div class="result-list" v-if="results.length > 0">
      <!--result-->
      <div class="result" v-for="(result,i) in results">
        <!--头像、昵称、序号-->
        <Row type="flex" justify="end" align="middle" class-name="result-avatar">
          <Col span="4">
            <div>
              <img :src="result.headUrl[0].url" class="avatar">
              <img :src="result.avatarImage" class="avatar-bg">
            </div>
          </Col>
          <Col span="15">{{result.userName}}</Col>
          <Col span="4" align="right">{{i+1}}</Col>
        </Row>
        <!--评论-->
        <Row type="flex" justify="center" align="middle" class-name="result-row">
          <Col span="23" v-html="result.content"></Col>
        </Row>
        <!--分割线-->
        <hr v-if="i+1 != results.length">
      </div>
    </div>
  </Card>
</template>

<script>
  //引入axios.js
  import axios from 'axios'

  export default {
    name: 'App',
    data() {
      return {
        number: 1, //抽奖数量

        acid: 0, //抽奖页面的acid
        time: 0, //时间戳
        sourceType: 0, //抽奖页面的类型

        totalPage: 0, //评论页面总数
        totalCount: 0, //评论总数

        repeat: true, //是否去重
        loading: false, //载入状态
        disabled: false, //禁用状态

        results: [], //抽奖结果
        comments: new Map(), //评论map
      }
    },
    computed: {
      //页面路径
      url() {
        return `http://www.acfun.cn/rest/pc-direct/comment/listByFloor?sourceId=${this.acid}&sourceType=${this.sourceType}&pivotCommentId=0&_=${this.time}`
      }
    },
    methods: {
      //抽奖按钮事件绑定函数
      click() {
        this.loading = true
        this.getTabInfo().then(() => {
          //调用获取commentinfo函数
          this.getCommentInfo().then(() => {
            //如果评论数量超过1页调用getOverplusComment
            if (this.totalPage > 1) {
              this.getOverplusComment(2).then(() => {
                //调用抽奖函数
                this.getLotteryResults()
                this.disabled = true
              }).catch((err) => {
                console.log(err)
              })
            } else {
              //调用抽奖函数
              this.getLotteryResults()
              this.disabled = true
            }
          }).catch((err) => {
            console.log(err)
            this.$Message.warning('发生了错误呢(　^ω^)b')
            this.disabled = true
          })
        }).catch((err) => {
          console.log(err)
          this.$Message.warning('本页面不能进行抽奖呢(　^ω^)b')
          this.disabled = true
        })

        this.loading = false
      },
      //抽奖数量输入框事件绑定函数
      change() {
        let num = Math.ceil(this.number)
        //判断抽奖数量是否合法
        if (isNaN(num) || num < 1) {
          num = 1
          this.$Message.warning('至少要抽取一位幸运用户呢(　^ω^)b')
        }
        if (num >= 20) {
          num = 20
          this.$Message.warning('最多能抽取二十位幸运用户呢(　^ω^)b')
        }

        this.number = num
      },
      //私信按钮事件绑定函数
      sendMail() {
        let url
        this.results.forEach((result) => {
          url = `http://www.acfun.cn/member/#area=mail-new;username=${result.userName}`
          chrome.tabs.create({url: url})
        })
      },
      //获取tabinfo函数
      getTabInfo() {
        return new Promise((resolve, reject) => {
          //通过chrome.tabs查询tabinfo
          chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
            let regex = /^http(s)?:\/\/www\.acfun\.cn\/([avz])\/ac([0-9]+)$/
            let url = tab[0].url
            //判断url格式是否正确
            if (!regex.test(url)) reject()
            //判断是否正常获取acid
            let str = url.match(regex)
            if (str.length != 4) reject()
            //储存数据
            let type = str[2]
            this.acid = str[3]
            this.time = new Date().getTime()
            if (type == "a") this.sourceType = 1
            else this.sourceType = 3
            //正常执行结束
            resolve()
          })
        })
      },
      //获取commentinfo函数
      getCommentInfo() {
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
              this.pushComment(data.commentsMap)
              //正常执行结束
              resolve()
            }
          }).catch(() => {
            reject()
          })
        })
      },
      //获取抽奖结果函数
      getLotteryResults() {
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
          result.content = this.handleContent(result.content)
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
      },
      //获取剩余页面评论
      getOverplusComment(i) {
        return new Promise((resolve, reject) => {
          if (this.totalPage < i) {
            resolve()
            return
          }
          axios.get(`${this.url}&page=${i}`).then((res) => {
            this.pushComment(res.data.commentsMap)
            this.getOverplusComment(i + 1).then(() => {
              resolve()
            }).catch((err) => {
              reject(err)
            })
          }).catch((err) => {
            reject(err)
          })
        })
      },
      //处理图片格式和表情格式函数
      handleContent(content) {
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
      pushComment(commentsMap) {
        let repeat = this.repeat
        for (let prop in commentsMap) {
          //评论是否为被删除评论
          if (commentsMap[prop].userId == 0) continue
          //判断评论是否去重并分别按照userid和cid储存
          if (repeat) this.comments.set(commentsMap[prop].userId, commentsMap[prop])
          else this.comments.set(commentsMap[prop].cid, commentsMap[prop])
        }
      }
    }
  }
</script>

<style>
  ::-webkit-scrollbar {width: 8px;height: 6px;}

  ::-webkit-scrollbar-track-piece {-webkit-border-radius: 6px;}

  ::-webkit-scrollbar-thumb:vertical {height: 5px;background-color: #CCC;-webkit-border-radius: 6px;}

  ::-webkit-scrollbar-thumb:horizontal {width: 5px;background-color: #CCC;-webkit-border-radius: 6px;}

  .card {width: 500px;padding-bottom: 18px;}

  .center {text-align: center;}

  .logo {color: #FC4D5B;font-size: 30px;font-weight: bolder;}

  .container {margin: 28px auto;}

  .send-button {margin: 18px 0 18px 20px !important;}

  .result-list {border: 1px solid #DCDEE2;max-height: 288px;overflow-y: scroll;padding: 0 10px;width: 466px;}

  .result {padding: 10px 10px 0;}

  .result-avatar {height: 100px;}

  .result-row {margin-top: -20px;min-height: 80px;padding: 10px 0 15px;}

  .result hr {border: 1px solid #CCC;border-bottom: 0;width: 100%;}

  .avatar {border: 1px solid #FFF;border-radius: 50%;box-shadow: 0 0 0 transparent;height: 50px;margin: 0;padding: 0;width: 50px; }

  .avatar-bg {background-color: transparent;border: none;left: -15px;position: absolute;top: -17px;}
</style>
