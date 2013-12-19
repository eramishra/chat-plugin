        var username = getCookie('username');
        var chattext = getCookie('chattext');

        function createPlugin() 
        {
            var template = "<div class='am_title'>" +
                                "<div class='am_control'>" +
                                    "<span class='am_min_max am_min' onClick='toggleChat();'>min</span>" +
                                    "<span class='am_exit' onClick='logout();'>x</span>" +
                                "</div>" +
                                "<p class='am_welcomeText'>Chat</p>" +
                            "</div>" +
                            "<div class='am_chatWindow'>" +
                            "<div id='am_login' class='am_hidden'>" +
                                "<p>Please enter your name to continue</p>" +
                                "<input type='text' name='am_name' id='am_name' />" +
                                "<button name='am_enter' id='am_enter' onClick='return(validateLoginForm());'>Enter</button>" +
                            "</div>" +
                            "<div id='am_chat' class='am_hidden'>" +
                                "<div id='am_chatbox'></div>" +
                                "<input name='am_usermsg' type='text' id='am_usermsg' size='60' />" + 
                            "</div>" +
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
                var joinAlert = "<p class='am_chatAlert'>" +
                                    username +
                                    " has joined the chat." +
                                    "<span class='am_time'>" +
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
            $('#am_login').toggleClass('am_hidden');
            $('#am_login').addClass('am_visible');
        }
        function hideLogin()
        {
            $('#am_login').removeClass('am_visible');
            $('#am_login').addClass('am_hidden');
        }
    
        function showChatPlugin() 
        {
            $('#am_chat').removeClass('am_hidden');
            $('#am_chat').addClass('am_visible');
            $('.am_welcomeText').text('Welcome ' + username);
            $('#am_submitmsg').focus();
        }
        function hideChatPlugin()
        {
            $('#am_chat').removeClass('am_visible');
            $('#am_chat').addClass('am_hidden');
        }
        
        function logout()
        {
            username = getCookie('username');
            if (username!=null && username!="") {
                var exit = confirm("Are you sure you want to exit?");
                if (exit) 
                {
                    clearCookie('username');
                    clearCookie('chattext');
                    hideChatPlugin();
                    showLogin();
                    $('#am_chatbox').html('');
                    $('#am_name').val('');
                    $('.am_welcomeText').text('Chat');
                }
            }
        }
        
        function enterChat()
        {
            var text = $('#am_usermsg').val();
            if (text) 
            {
                var text = "<p class='am_chatText'><b>" +
                                username +
                                ": </b>" +
                                text +
                                "<span class='am_time'>" +
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
            document.createStyleSheet('http://eramishra.github.io/chat-plugin/css/chatPlugin.css'); 
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
        
        function toggleChat() {
            $('.am_chatWindow').toggle();
            $('.am_min_max').toggleClass('am_max');
        }
	    if(typeof document.createStyleSheet === 'undefined') {
	        document.createStyleSheet = (function() {
		        function createStyleSheet(href) {
                    if(typeof href !== 'undefined') 
                    {
                        var element = document.createElement('link');
                        element.type = 'text/css';
                        element.rel = 'stylesheet';
                        element.href = href;
                    }
                    else 
                    {
                        var element = document.createElement('style');
                        element.type = 'text/css';
                    }

                    document.getElementsByTagName('head')[0].appendChild(element);
                    var sheet = document.styleSheets[document.styleSheets.length - 1];

                    if(typeof sheet.addRule === 'undefined')
                    sheet.addRule = addRule;

                    if(typeof sheet.removeRule === 'undefined')
                    sheet.removeRule = sheet.deleteRule;

                    return sheet;
                }

                function addRule(selectorText, cssText, index) {
                    if(typeof index === 'undefined')
                    index = this.cssRules.length;

                    this.insertRule(selectorText + ' {' + cssText + '}', index);
                }

                return createStyleSheet;
            })();
        }
	

