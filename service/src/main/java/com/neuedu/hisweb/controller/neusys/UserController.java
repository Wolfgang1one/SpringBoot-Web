package com.neuedu.hisweb.controller.neusys;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neuedu.hisweb.entity.JsonResult;
import com.neuedu.hisweb.entity.User;
import com.neuedu.hisweb.entity.vo.UserVo;
import com.neuedu.hisweb.service.IUserService;
import com.neuedu.hisweb.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author lynn
 * @since 2023-07-17
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService iUserService;

    @PostMapping("/login")
    public JsonResult<User> login(HttpServletRequest request, @RequestBody User user){
        String uname = user.getUserName();
        String pwd = user.getPassword();

        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUserName, uname).eq(User::getPassword,pwd).eq(User::getDelMark,1);

        user= iUserService.getOne(wrapper);
        JsonResult<User> jsonResult;
        if (user == null) {
            jsonResult= new JsonResult<User>("用户名或密码不正确！");
        }else {
            request.getSession().setAttribute("user", user);
            jsonResult = new JsonResult<>(user, JwtUtils.sign(user));
        }
        return jsonResult;
    }

    @PostMapping("/logout")
    public JsonResult<User> logout(HttpServletRequest request){
        request.getSession().removeAttribute("user");
        request.getSession().invalidate();
        JsonResult<User> jsonResult=new JsonResult<>(null,"");
        return jsonResult;
    }

    @GetMapping("/page")
    public JsonResult<Page> getUserPage(@RequestParam(value = "pn", defaultValue = "1") Integer pn,
                                                @RequestParam(value = "count", defaultValue = "10") Integer count,
                                                @RequestParam(value = "keyword",required = false)String keyword,
                                                @RequestParam(value = "userType",required = false)String userType,
                                                @RequestParam(value = "dept",required = false)String dept,
    @RequestParam(value = "docType",required = false)String docType){
        Page<UserVo> page=Page.of(pn,count);
        iUserService.selectPage(page,keyword,userType,dept,docType);
        return new JsonResult<Page>(page);
    }

    @PostMapping("/add")
    public JsonResult<User>addUser(@RequestBody User user){
        user.setPassword("123456");
        boolean rs= iUserService.save(user);
        if(rs)return new JsonResult<User>(user);
        else return new JsonResult<>("添加失败");
    }

    @PostMapping("/update")
    public JsonResult<User> updateUser(@RequestBody User user){
        boolean rs= iUserService.updateById(user);
        if(rs)return new JsonResult<User>(user);
        else return new JsonResult<>("修改失败");
    }

    @PostMapping("/changePwd")
    public JsonResult<User> updateChangePwd(@RequestParam(value = "uid",required = true) Integer uid,
                                            @RequestParam(value = "oldPwd",required = true) String oldPwd,
                                            @RequestParam(value = "newPwd",required = true) String newPwd){
        boolean rs= iUserService.updatePwd(uid,oldPwd,newPwd);
        if(rs){
            JsonResult<User> jsonResult= new JsonResult<>();
            jsonResult.setResult(true);
            return jsonResult;
        }
        else return new JsonResult<>("修改失败");
    }

    @PostMapping("/del")
    public JsonResult<User> delUser(@RequestParam(value = "id",required = true) Integer id){
        boolean rs= iUserService.removeById(id);
        if(rs){
            JsonResult<User> jsonResult= new JsonResult<>();
            jsonResult.setResult(true);
            return jsonResult;
        }
        else return new JsonResult<>("删除失败");
    }

    @GetMapping("/getById")
    public JsonResult<UserVo> getById(@RequestParam(value = "id",required = true) Integer id){
        UserVo userVo = iUserService.selectById(id);
        if(userVo!=null){
            JsonResult<UserVo> jsonResult= new JsonResult<>();
            jsonResult.setResult(true);
            jsonResult.setData(userVo);
            return jsonResult;
        }
        else return new JsonResult<>("查找失败");
    }



}

