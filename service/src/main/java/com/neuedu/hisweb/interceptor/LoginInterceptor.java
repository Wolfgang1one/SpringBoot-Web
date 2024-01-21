package com.neuedu.hisweb.interceptor;

import com.neuedu.hisweb.entity.Customer;
import com.neuedu.hisweb.entity.JsonResult;
import com.neuedu.hisweb.entity.User;
import com.neuedu.hisweb.utils.JwtUtils;
import com.neuedu.hisweb.utils.UserUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class LoginInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);

    /*
     * 在请求处理之前进行调用(Controller方法调用之前)
     * 若返回true请求将会继续执行后面的操作
     * */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");

        // 如果不是映射到方法不拦截 直接通过
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        //验证token
        if (null == token || "".equals(token) || !JwtUtils.verify(token)) {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json; charset=utf-8");
            try (PrintWriter writer = response.getWriter()) {
                writer.print(new JsonResult<User>("未登录"));
            } catch (Exception e) {
                logger.error("login token error is {}", e.getMessage());
            }
            return false;
        }
        //若token验证成功，把用户信息存储在ThreadLocal
        Object userObj = JwtUtils.getUserByToken(token);
        if (userObj instanceof Customer){
            // 微信用户操作
            UserUtils.setLoginCustomer((Customer) userObj);
        }
        else{
            UserUtils.setLoginUser((User) userObj);
        }
        return true;
    }


    /***
     * 请求处理之后进行调用，但是在视图被渲染之前（Controller方法调用之后）
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("执行了拦截器的postHandle方法");
    }

    /***
     * 整个请求结束之后被调用，也就是在DispatchServlet渲染了对应的视图之后执行（主要用于进行资源清理工作）
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        //清除线程变量
        UserUtils.removeUser();
    }

}
