package com.neuedu.hisweb.controller.neureg;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neuedu.hisweb.entity.JsonResult;
import com.neuedu.hisweb.entity.Register;
import com.neuedu.hisweb.entity.User;
import com.neuedu.hisweb.entity.vo.DepartmentVo;
import com.neuedu.hisweb.entity.vo.RegParam;
import com.neuedu.hisweb.entity.vo.RegisterVo;
import com.neuedu.hisweb.entity.vo.UserVo;
import com.neuedu.hisweb.service.IRegisterService;
import com.neuedu.hisweb.service.IRegisterVoService;
import com.neuedu.hisweb.service.IRegistlevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public JsonResult<Register> add(@RequestBody RegParam param){
        boolean rs=iRegisterService.saveRegister(param);
        if(rs)
            return new JsonResult<Register>(param.getRegister());
        else
            return new JsonResult<>("添加失败");
    }

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

    @PostMapping("/del")
    public JsonResult<Register> del(@RequestBody RegParam param){
        boolean rs=iRegisterService.updateRegisterState(param);
        if(rs)
            return new JsonResult<Register>(rs);
        else
            return new JsonResult<>("退号失败");
    }

}
