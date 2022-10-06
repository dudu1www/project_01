$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中

    //resetui重置滚动条的位置
    // resetui()   
    //发送请求       为发送按钮绑定点击事件处理函数
    $('#btnSend').on('click',function(){
        var text=$('#ipt').val().trim()//获取用户输入的内容
        if(text.length<=0){
        return $('#ipt').val('')
        }
        //将用户输入的内容
        $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>'+text+'</span></li>')
        $('#ipt').val('')//清空输入框的内容
        //重置滚动条的位置
        resetui() 
        //发起请求获取聊天内容
        getMsg(text) 
 
    })
     //发起请求获取聊天消息   获取聊天机器人发回来的消息
     function getMsg(text){
        $.ajax({
            method: 'GET',
            url:'http://www.liulongbin.top:3006/api/robot',
            data:{
                spoken:text
            },
            success:function(res){
                console.log(res);
                if(res.message==='success'){
                    var msg=res.data.info.text
                    $('.talk_list').append('<li class="left_word"><img src="img/person01.png"/><span>'+msg+'</span></li>')
                    // 重置滚动条的位置 
                    resetui()
                    //机器人回复语言
                    getVoice(msg)
                }
            }
        })
    }
    
    //将机器人的聊天内容转为语言
    function getVoice(text){
        $.ajax({
            methods:'GET',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text
            },
            success:function(res){
                //如果请求成功则res.voiceURL是服务器返回的音频URL地址
                if(res.status===200){
                    $('#voice').attr('src',res.voiceUrl)
                }
            }
        })
    }
    //使用回车发送信息
    $('#ipt').on('keyup',function(e){
        //e.keyCode可以获取到当前按键的键码
        if(e.keyCode===13){
            //调用按钮的click函数
            $('#btnSend').click()
        }
    })
  })