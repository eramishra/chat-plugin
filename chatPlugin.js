        var username = getCookie('username');
        var chattext = getCookie('chattext');

        function createPlugin() 
        {
            var template = "<div id='am_login'>" +
                                "<p>Please enter your name to continue:</p>" +
                                "<label for='am_name'>Name:</label>" +
                                "<input type='text' name='am_name' id='am_name' />" +
                                "<button name='am_enter' id='am_enter' onClick='return(validateLoginForm());'>Enter</button>" +
                            "</div>" +
                            "<div id='am_chatPlugin'>" +
                                "<div id='am_menu'>" +
                                    "<p class='am_welcome'>Welcome, <span id='username'></span></p>" +
                                    "<p class='am_logout'><a id='am_exit' onClick='logout();'>Exit Chat</a></p>" + 
                                "</div>" +
                                "<div id='am_chatbox'></div>" +
                                "<input name='am_usermsg' type='text' id='am_usermsg' size='60' />" + 
                            "</div>";
            $('#am_container').html(template);
        }
        function validateLoginForm()
        {
            var usernameField = $('#am_name');
            if (usernameField.val() == '')
            {
                alert( "Please enter your name!" );
                usernameField.focus() ;
                return false;
            } else
            {
                setCookie('username',usernameField.val(),1);
                username = getCookie('username');
                showChatPlugin();
                hideLogin();
                var joinAlert = "<p class='chatAlert'>" +
                                    username +
                                    " has joined the chat." +
                                    "<span class='time'>" +
                                        getCurrentTime() +
                                    "</span>" +
                                "</p>";
                $('#am_chatbox').append(joinAlert);
            }
        }
        
        function getCurrentTime () {
            var time = new Date();
            var time = time.getHours() + ":" + time.getMinutes();
            return time;
        }

        function getCookie(c_name)
        {
            var c_value = document.cookie;
            var c_start = c_value.indexOf(" " + c_name + "=");
            if (c_start == -1)
                {
                    c_start = c_value.indexOf(c_name + "=");
                }
                if (c_start == -1)
                {
                    c_value = null;
                }
            else
            {
                c_start = c_value.indexOf("=", c_start) + 1;
                var c_end = c_value.indexOf(";", c_start);
                if (c_end == -1)
                {
                    c_end = c_value.length;
                }
                c_value = unescape(c_value.substring(c_start,c_end));
            }
            return c_value;
        }

        function setCookie(c_name,value,exdays)
        {
            var exdate=new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
            document.cookie=c_name + "=" + c_value;
        }

        function checkUsername()
        {
            if (username!=null && username!="")
            {
                showChatPlugin();

            }
            else 
            {
                showLogin();
            }
        }
        
        function clearCookie(c_name)
        {
            setCookie(c_name,"",-1);
        }
    
        function showLogin() 
        {
            $('#am_login').css({'display':'block'});
        }
        function hideLogin()
        {
            $('#am_login').css({'display':'none'});
        }
    
        function showChatPlugin() 
        {
            $('#am_chatPlugin').css({'display':'block'});
            $('#username').text(username);
            $('#am_submitmsg').focus();
        }
        function hideChatPlugin()
        {
            $('#am_chatPlugin').css({'display':'none'});
        }
        
        function logout()
        {
            var exit = confirm("Are you sure you want to exit?");
            if (exit) 
            {
                clearCookie('username');
                clearCookie('chattext');
                hideChatPlugin();
                showLogin();
                $('#am_chatbox').html('');
            }
        }
        
        function enterChat()
        {
            var text = $('#am_usermsg').val();
            if (text) 
            {
                var text = "<p class='chatText'><b>" +
                                username +
                                ": </b>" +
                                text +
                                "<span class='time'>" +
                                    getCurrentTime() +
                                "</span>" +
                            "</p>";
                $('#am_chatbox').append(text);
                $('#am_usermsg').val('');
                var pastChat = $('#am_chatbox').html();
                setCookie('chattext',pastChat,1);
            }
        }

        function initiate_chat() {
            createPlugin();
            checkUsername();
            $(document).keypress(function(event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if(keycode == '13') 
                {
                    enterChat();
                }
            });
            $('#am_chatbox').html(chattext);
        }
