package vn.edu.topedu.socket;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage") // prefix app
    @SendTo("/topic/public")	//
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.addUser") //app
    @SendTo("/topic/public") //simple broker
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
    @Autowired
	private SpringTemplateEngine templateEngine;
	
	@GetMapping("/test/socket")
	@ResponseBody
	public String cancelPay(){
		Context context = new Context();
		Map<String, Object> props = new HashMap<>();
		context.setVariables(props);
		String html = templateEngine.process("demo_chat_socket/index.html", context);
		
		return html;
	}

}
