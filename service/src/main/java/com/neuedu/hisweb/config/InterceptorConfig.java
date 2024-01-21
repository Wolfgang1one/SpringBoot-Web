package com.neuedu.hisweb.config;

import com.neuedu.hisweb.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //运行跨域
        registry.addMapping("/**")
                //放行哪些原始域
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .exposedHeaders("*");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //注册TestInterceptor拦截器
//        registry.addInterceptor(loginInterceptor())
//                .excludePathPatterns("/user/login")				//添加不拦截的请求路径
//                .excludePathPatterns("/user/logout")
//                .excludePathPatterns("/wechat/loginByCode")
//                .excludePathPatterns("/wechat/reg/**")
////                .excludePathPatterns("/constant/**")
////                .excludePathPatterns("/constantitem/**")
//                .addPathPatterns("/**");						//添加需要拦截的路径
    }

//    @Bean
//    public LoginInterceptor loginInterceptor(){
//        return new LoginInterceptor();
//    }
}