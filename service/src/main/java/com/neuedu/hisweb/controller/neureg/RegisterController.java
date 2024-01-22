package com.neuedu.hisweb.controller.neureg;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neuedu.hisweb.entity.JsonResult;
import com.neuedu.hisweb.entity.vo.DepartmentVo;
import com.neuedu.hisweb.entity.vo.RegisterVo;
import com.neuedu.hisweb.service.IRegisterService;
import com.neuedu.hisweb.service.IRegistlevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * create by simon at 2024-01-22
 *
 * @Description:文件描述：
 */
@RestController
@RequestMapping("/register")
public class RegisterController {
    @Autowired
    private IRegisterService iRegisterService;


    // registermapper的查找page方法 page,Integer deptId,Integer docId,Integer state,String keyword,String regDate
    @GetMapping("/page")
    public JsonResult<Page> getRegisterPage(@RequestParam(value = "pn", defaultValue = "1") Integer pn,
                                              @RequestParam(value = "count", defaultValue = "10") Integer count,
                                              @RequestParam(value = "keyword",required = false)String keyword,
                                              @RequestParam(value = "regDate",required = false)String regDate,
                                              @RequestParam(value = "state",required = false)Integer state,
                                              @RequestParam(value = "docId",required = false)Integer docId,
                                              @RequestParam(value = "deptId",required = false)Integer deptId
                                            ){
        Page<RegisterVo> page=Page.of(pn,count);
        iRegisterService.selectPage(page,deptId,docId,state,keyword,regDate);
        return new JsonResult<Page>(page);
    }

}
